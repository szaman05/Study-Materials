# Integrating Appwrite with Next.js

This guide demonstrates how to integrate Appwrite with a Next.js application using Server Actions, focusing on authentication, user management, and secure data access patterns.

## Table of Contents

- [Setup & Configuration](#setup--configuration)
- [Client Initialization Strategies](#client-initialization-strategies)
- [Authentication Flow](#authentication-flow)
- [Session Management](#session-management)
- [Server Actions](#server-actions)
- [Common Issues & Solutions](#common-issues--solutions)

## Setup & Configuration

### 1. Install Required Dependencies

```bash
npm install node-appwrite
```

### 2. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
APPWRITE_API_KEY=your-api-key
APPWRITE_DATABASE_ID=your-database-id
APPWRITE_PROFILES_COLLECTION_ID=your-profiles-collection-id
```

> ⚠️ Note: `NEXT_PUBLIC_` prefix is used for variables that need to be accessible in the browser.

## Client Initialization Strategies

Create an Appwrite client utility file (`lib/appwrite-server.js`) to handle different authentication contexts:

```javascript
// lib/appwrite-server.js
import {
  Client,
  Account,
  Databases,
  Users,
  Permission,
  Role,
  ID,
} from "node-appwrite";
import { cookies } from "next/headers";

// --- Server Client (Admin Privileges) ---
// Use when your Server Action needs admin rights (using API Key)
function createAdminClient() {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    return {
      get account() {
        return new Account(client);
      },
      get databases() {
        return new Databases(client);
      },
      get users() {
        return new Users(client);
      },
    };
  } catch (error) {
    console.error("Failed to create Appwrite Admin Client:", error);
    throw new Error(
      "Could not create Appwrite Admin Client. Check API Key and Endpoint."
    );
  }
}

// --- Session Client (Acts as the Logged-In User) ---
// Use when your Server Action needs to perform actions *as the user*
async function createSessionClient() {
  try {
    // Get the session cookie directly using next/headers
    const cookieStore = await cookies();
    const session = cookieStore.get("appwrite-session")?.value;

    if (!session) {
      return { account: null, databases: null };
    }

    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
      .setSession(session);

    return {
      get account() {
        return new Account(client);
      },
      get databases() {
        return new Databases(client);
      },
    };
  } catch (error) {
    console.error("Failed to create Appwrite Session Client:", error);
    return { account: null, databases: null };
  }
}

// --- Basic Client (No Auth Context) ---
// Use for actions that don't need an API key or a user session
function createBasicClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
}

export {
  createAdminClient,
  createSessionClient,
  createBasicClient,
  Permission,
  Role,
  ID,
};
```

## Authentication Flow

### 1. Sign Up Implementation

Create a Server Action for user signup that:

1. Creates a new user account
2. Creates a user profile document
3. Establishes a session
4. Sets a session cookie

```javascript
// actions/auth.js
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createAdminClient,
  createSessionClient,
  createBasicClient,
  Permission,
  Role,
  ID,
} from "@/lib/appwrite-server";
import { revalidatePath } from "next/cache";

const DB_ID = process.env.APPWRITE_DATABASE_ID;
const PROFILES_COLLECTION_ID = process.env.APPWRITE_PROFILES_COLLECTION_ID;

export async function signup(prevState, formData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();

  if (!email || !password || !name) {
    return { success: false, error: "Email, password, and name are required." };
  }

  if (password.length < 8) {
    return {
      success: false,
      error: "Password must be at least 8 characters long.",
    };
  }

  try {
    // 1. Create user account
    const { account: authAccount } = createAdminClient();
    const { databases: adminDatabases } = createAdminClient();

    const newUser = await authAccount.create(
      ID.unique(),
      email,
      password,
      name
    );
    const userId = newUser.$id;

    // 2. Create user profile with proper permissions
    await adminDatabases.createDocument(
      DB_ID,
      PROFILES_COLLECTION_ID,
      userId,
      { username: name, bio: "", userId: userId },
      [Permission.read(Role.user(userId)), Permission.update(Role.user(userId))]
    );

    // 3. Create session
    const session = await basicAccount.createEmailPasswordSession(
      email,
      password
    );

    // 4. Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      priority: "high",
    });

    redirect("/profile");
  } catch (error) {
    return {
      success: false,
      error:
        error.code === 409
          ? "User with this email already exists."
          : error.message || "An error occurred during signup.",
      details: error.response?.message,
    };
  }
}
```

### 2. Login Implementation

```javascript
// actions/auth.js (continued)
export async function login(prevState, formData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  try {
    const { account: basicAccount } = createAdminClient();

    const session = await basicAccount.createEmailPasswordSession(
      email,
      password
    );

    // Set the session cookie
    const cookieStore = await cookies();
    cookieStore.set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      priority: "high",
    });

    // Revalidate the root layout to update UI elements
    revalidatePath("/", "layout");

    redirect("/profile");
  } catch (error) {
    return {
      success: false,
      error:
        error.code === 401 || error.code === 400
          ? "Invalid email or password."
          : error.message || "An error occurred during login.",
      details: error.response?.message,
    };
  }
}
```

### 3. Logout Implementation

```javascript
// actions/auth.js (continued)
export async function logout() {
  try {
    const { account: sessionAccount } = await createSessionClient();

    if (sessionAccount) {
      await sessionAccount.deleteSession("current");
    }
  } catch (error) {
    console.error("Logout error (Appwrite deletion):", error);
  } finally {
    // Always delete the local session cookie
    const cookieStore = await cookies();
    cookieStore.delete("appwrite-session");
  }

  redirect("/login");
}
```

### 4. Get Current User

```javascript
// actions/auth.js (continued)
export async function getCurrentUser() {
  try {
    const { account: sessionAccount } = await createSessionClient();

    if (!sessionAccount) {
      return null; // Not logged in
    }

    const user = await sessionAccount.get();
    return user;
  } catch (error) {
    // If session is invalid/expired, clean up cookie and return null
    if (error.code === 401) {
      const cookieStore = await cookies();
      cookieStore.delete("appwrite-session");
    }
    return null;
  }
}
```

## Session Management

### Using Cookies for Sessions

Next.js provides the `cookies()` API for secure cookie management:

```javascript
import { cookies } from "next/headers";

// Set a session cookie
const cookieStore = await cookies();
cookieStore.set("appwrite-session", sessionSecret, {
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 30, // 30 days
  priority: "high",
});

// Get a session cookie
const session = cookieStore.get("appwrite-session")?.value;

// Delete a session cookie
cookieStore.delete("appwrite-session");
```

> ⚠️ Important: Always remember to `await cookies()` before calling methods like `.set()` or `.get()`.

## Server Actions

### Creating and Using Server Actions

1. Create the action file with the `"use server"` directive:

```javascript
// actions/profile.js
"use server";

import { redirect } from "next/navigation";
import { createSessionClient, createAdminClient } from "@/lib/appwrite-server";

const DB_ID = process.env.APPWRITE_DATABASE_ID;
const PROFILES_COLLECTION_ID = process.env.APPWRITE_PROFILES_COLLECTION_ID;

export async function updateProfile(prevState, formData) {
  try {
    const { databases } = await createSessionClient();

    if (!databases) {
      return { success: false, error: "You must be logged in." };
    }

    const userId = formData.get("userId")?.toString();
    const username = formData.get("username")?.toString();
    const bio = formData.get("bio")?.toString();

    if (!userId || !username) {
      return { success: false, error: "User ID and username are required." };
    }

    await databases.updateDocument(DB_ID, PROFILES_COLLECTION_ID, userId, {
      username,
      bio: bio || "",
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Failed to update profile.",
    };
  }
}

export async function getProfile(userId) {
  try {
    const { databases } = await createSessionClient();

    if (!databases) {
      return null;
    }

    const profile = await databases.getDocument(
      DB_ID,
      PROFILES_COLLECTION_ID,
      userId
    );

    return profile;
  } catch (error) {
    return null;
  }
}
```

2. Use the actions in your React components:

```jsx
// components/ProfileForm.jsx
"use client";

import { useFormState } from "react-dom";
import { updateProfile } from "@/actions/profile";

export default function ProfileForm({ profile, userId }) {
  const [state, formAction] = useFormState(updateProfile, null);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="userId" value={userId} />

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            defaultValue={profile?.username || ""}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            defaultValue={profile?.bio || ""}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        {state?.error && (
          <div className="text-red-500 text-sm">{state.error}</div>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
```

## Common Issues & Solutions

### 1. Awaiting `cookies()` Function

When working with the Next.js cookies API, always await the `cookies()` function before calling methods on it:

```javascript
// ❌ WRONG: This will cause errors
cookies().set("appwrite-session", session.secret, {...})

// ✅ CORRECT: Always await cookies() first
const cookieStore = await cookies();
cookieStore.set("appwrite-session", session.secret, {...});
```

### 2. Environment Variables Loading

Ensure you're using the correct prefix for environment variables:

- `NEXT_PUBLIC_` - For variables accessible in browser code
- No prefix - For variables only accessible in server code

### 3. Session Not Persisting

If you're having trouble with sessions not persisting:

1. Check that cookies are being set properly with correct parameters
2. Ensure you're handling errors appropriately in `getCurrentUser`
3. Verify that your Appwrite project settings allow sessions

### 4. Debugging Session Issues

Add debug logs to your `createSessionClient` function:

```javascript
async function createSessionClient() {
  try {
    console.log("Creating session client...");
    const cookieStore = await cookies();
    const session = cookieStore.get("appwrite-session")?.value;

    console.log("Session cookie found:", !!session);

    if (!session) {
      return { account: null, databases: null };
    }

    // More code...
  } catch (error) {
    console.error("Session client error:", error);
    return { account: null, databases: null };
  }
}
```

### 5. Access Control with Appwrite Permissions

Secure your documents with the correct permission structure:

```javascript
// Give read access only to the document owner
[Permission.read(Role.user(userId))][
  // Give read access to document owner and update/delete permission to admin
  (Permission.read(Role.user(userId)),
  Permission.update(Role.user("admin-user-id")),
  Permission.delete(Role.user("admin-user-id")))
][
  // Public read access, write access only for the owner
  (Permission.read(Role.any()), Permission.update(Role.user(userId)))
];
```

## Conclusion

This guide demonstrates a comprehensive implementation of Appwrite authentication and data access in a Next.js application using Server Actions. The approach provides a secure and efficient way to handle user sessions and data while leveraging the benefits of Next.js's server components and actions architecture.

For more advanced use cases, refer to the official Appwrite documentation at [https://appwrite.io/docs](https://appwrite.io/docs).
