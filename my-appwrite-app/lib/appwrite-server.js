// lib/appwrite-server.js
// Utility functions to initialize Appwrite SDK clients for Server Actions

import {
  Client,
  Account,
  Databases,
  Users,
  Permission,
  Role,
  ID,
} from "node-appwrite";
import { cookies } from "next/headers"; // Import cookies from next/headers

// --- Server Client (Admin Privileges) ---
// Use this when your Server Action needs admin rights (using API Key).
// Example: Setting specific permissions when creating a user profile document.
function createAdminClient() {
  // console.log("Attempting to create Admin Client..."); // Debug log
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY); // Use the secret API Key

    // console.log("Admin Client created successfully."); // Debug log
    return {
      get account() {
        return new Account(client);
      },
      get databases() {
        return new Databases(client);
      },
      get users() {
        return new Users(client);
      }, // Requires API Key
    };
  } catch (error) {
    console.error("Failed to create Appwrite Admin Client:", error);
    throw new Error(
      "Could not create Appwrite Admin Client. Check API Key and Endpoint."
    );
  }
}

// --- Session Client (Acts as the Logged-In User) ---
// Use this when your Server Action needs to perform actions *as the user*.
// It reads the session cookie set during login.
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
// Use this for actions that don't need an API key or a user session.
// Example: Starting the login/signup process.
function createBasicClient() {
  // console.log("Attempting to create Basic Client..."); // Debug log
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  // console.log("Basic Client created successfully."); // Debug log
  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    }, // For public reads if allowed
  };
}

// Export factory functions and constants
export {
  createAdminClient,
  createSessionClient,
  createBasicClient,
  Permission,
  Role,
  ID,
};
