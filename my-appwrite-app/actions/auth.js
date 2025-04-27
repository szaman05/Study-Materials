// actions/auth.js
"use server"; // Mark all functions in this file as Server Actions

import { cookies } from "next/headers";
import { redirect } from "next/navigation"; // Used for redirecting after actions
import {
  createAdminClient,
  createSessionClient,
  createBasicClient,
  Permission,
  Role,
  ID,
} from "@/lib/appwrite-server"; // Adjust path if needed
import { revalidatePath } from "next/cache"; // To refresh UI data reflecting auth state

// Environment variables (ensure they are set in .env.local)
const DB_ID = process.env.APPWRITE_DATABASE_ID;
const PROFILES_COLLECTION_ID = process.env.APPWRITE_PROFILES_COLLECTION_ID;

// --- Sign Up Action ---
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
    const { account: authAccount } = createAdminClient();
    const { databases: adminDatabases } = createAdminClient();

    console.log(`Attempting to create user: ${email}`);
    const newUser = await authAccount.create(
      ID.unique(),
      email,
      password,
      name
    );
    const userId = newUser.$id;
    console.log(`User created successfully: ${userId}`);

    console.log(`Creating profile document for user: ${userId}`);
    if (!DB_ID || !PROFILES_COLLECTION_ID) {
      throw new Error(
        "Database ID or Profiles Collection ID is not configured."
      );
    }
    await adminDatabases.createDocument(
      DB_ID,
      PROFILES_COLLECTION_ID,
      userId,
      { username: name, bio: "", userId: userId },
      [Permission.read(Role.user(userId)), Permission.update(Role.user(userId))]
    );
    console.log(`Profile document created for user: ${userId}`);

    console.log(`Creating session for new user: ${email}`);
    const session = await basicAccount.createEmailPasswordSession(
      email,
      password
    );
    console.log(`Session created: ${session.$id}`);

    // 4. Set the session cookie
    const cookieStore = await cookies();
    cookieStore.set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      priority: "high",
    });
    console.log("Session cookie set.");
  } catch (error) {
    console.error("Signup Server Action Error:", error);
    return {
      success: false,
      error:
        error.code === 409
          ? "User with this email already exists."
          : error.message || "An error occurred during signup.",
      details: error.response?.message,
    };
  }

  redirect("/profile");
}

// --- Login Action ---
export async function login(prevState, formData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  try {
    const { account: basicAccount } = createAdminClient();

    console.log(`Attempting login for: ${email}`);
    const session = await basicAccount.createEmailPasswordSession(
      email,
      password
    );
    console.log(`Login successful, session created: ${session.$id}`);

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
    console.log("Session cookie set.");

    // Revalidate the root layout to potentially update Navbar, etc.
    revalidatePath("/", "layout");

    // Redirect to profile page on successful login
    redirect("/profile");
  } catch (error) {
    console.error("Login Server Action Error:", error);
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

// --- Logout Action ---
export async function logout() {
  try {
    const { account: sessionAccount } = await createSessionClient(); // Need session client to delete session

    if (sessionAccount) {
      console.log("Attempting to delete current session...");
      await sessionAccount.deleteSession("current");
      console.log("Appwrite session deleted.");
    } else {
      console.log(
        "No active Appwrite session found to delete, clearing cookie anyway."
      );
    }
  } catch (error) {
    console.error(
      "Logout Server Action Error (Appwrite deletion failed):",
      error
    );
    // Log the error, but proceed to delete the cookie
  } finally {
    // Always delete the local session cookie
    const cookieStore = await cookies();
    cookieStore.delete("appwrite-session");
    console.log("Local session cookie deleted.");
  }

  // Redirect to login page after logout
  redirect("/login");
}

// --- Get Current User Action ---
export async function getCurrentUser() {
  console.log("--- getCurrentUser Action Started ---");
  let sessionAccount;
  try {
    const clientResult = await createSessionClient();
    sessionAccount = clientResult.account;

    if (!sessionAccount) {
      console.log("getCurrentUser: No valid session client created.");
      return null;
    }

    console.log(
      "getCurrentUser: Session client created. Attempting to fetch user details..."
    );
    const user = await sessionAccount.get();
    console.log(
      `getCurrentUser: Successfully fetched user: ${user.name} (${user.$id})`
    );
    return user;
  } catch (error) {
    console.error("getCurrentUser: Error during execution:", error);
    if (error.code === 401) {
      console.log(
        "getCurrentUser: Caught 401 error, likely invalid/expired session. Deleting cookie."
      );
      const cookieStore = await cookies();
      cookieStore.delete("appwrite-session");
    } else {
      console.log("getCurrentUser: Caught unexpected error:", error.message);
    }
    return null;
  } finally {
    console.log("--- getCurrentUser Action Finished ---");
  }
}
