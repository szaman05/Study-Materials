// lib/appwrite-server.ts
// Utility functions to initialize Appwrite SDK clients for Server Actions using TypeScript
"use server"
import {
  Client,
  Account,
  Databases,
  Users,
  Storage, // Ensure Storage is imported
  Teams, // Add Teams import
  Permission,
  Role,
  ID,
  AppwriteException, // Import AppwriteException for type checking
} from "node-appwrite";
import { cookies } from "next/headers";

// --- Interfaces for Client Types ---

// Interface for clients with guaranteed services (Admin, Basic without Users)
interface AppwriteClientBase {
  account: Account;
  databases: Databases;
  storage: Storage; // Added Storage
  teams: Teams; // Add Teams service
}

// Interface for the Admin client which includes Users
interface AdminClient extends AppwriteClientBase {
  users: Users;
}

// Interface for the Session client where services might be null if no session exists
interface SessionClient {
  account: Account | null;
  databases: Databases | null;
  storage: Storage | null;
  teams: Teams | null; // Add Teams service
}

// **FIX:** Use a type alias instead of an empty interface extending the base
type BasicClient = AppwriteClientBase;

// --- Factory Functions ---

/**
 * Creates an Appwrite client with Admin privileges using the API Key.
 * Use this for server-side operations requiring elevated permissions.
 * @returns {AdminClient} An object containing initialized Appwrite services (Account, Databases, Users, Storage).
 */
function createAdminClient(): AdminClient {
  try {
    // Ensure environment variables are defined (using non-null assertion '!' for brevity)
    // In production, consider more robust checks or default values.
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
    const apiKey = process.env.APPWRITE_API_KEY!;

    if (!endpoint || !projectId || !apiKey) {
      throw new Error(
        "Missing required Appwrite environment variables for Admin Client."
      );
    }

    const client = new Client()
      .setEndpoint(endpoint)
      .setProject(projectId)
      .setKey(apiKey);

    // Use getters for lazy initialization if preferred, or direct instantiation
    return {
      account: new Account(client),
      databases: new Databases(client),
      users: new Users(client),
      storage: new Storage(client),
      teams: new Teams(client), // Add Teams service
    };
  } catch (error) {
    console.error("Failed to create Appwrite Admin Client:", error);
    throw new Error(
      "Could not create Appwrite Admin Client. Check API Key, Project ID, and Endpoint in environment variables."
    );
  }
}

/**
 * Creates an Appwrite client authenticated with the user's current session cookie.
 * Use this for actions performed *as* the logged-in user.
 * Returns null for services if no valid session is found.
 * @returns {Promise<SessionClient>} A promise resolving to an object containing potentially initialized Appwrite services.
 */
async function createSessionClient(): Promise<SessionClient> {
  try {
    const cookieStore = await cookies(); // cookies() is synchronous in Server Components/Actions
    const session = cookieStore.get("appwrite-session")?.value;

    if (!session) {
      // console.log("createSessionClient: No active session cookie found."); // Keep logs minimal unless debugging
      return { account: null, databases: null, storage: null, teams: null }; // Add teams: null
    }

    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

    if (!endpoint || !projectId) {
      throw new Error(
        "Missing required Appwrite environment variables for Session Client."
      );
    }

    const client = new Client()
      .setEndpoint(endpoint)
      .setProject(projectId)
      .setSession(session); // Set the session cookie

    // Successfully created client with session
    return {
      account: new Account(client),
      databases: new Databases(client),
      storage: new Storage(client),
      teams: new Teams(client), // Add Teams service
    };
  } catch (error: unknown) {
    // Catch error as 'unknown'
    // Log error but return null services, letting the calling action handle it
    console.error("Failed to create Appwrite Session Client:", error);

    // Check if the error is an instance of AppwriteException
    if (error instanceof AppwriteException) {
      // Check if it's an AppwriteException indicating an invalid session (e.g., 401)
      if (error.code === 401) {
        // General unauthorized or invalid session code
        console.warn(
          "createSessionClient: Session might be invalid or expired (Code: 401)."
        );
        // Optionally delete the potentially invalid cookie here, though the calling action might also do it
        // cookies().delete('appwrite-session');
      } else {
        // Log other Appwrite error codes if needed
        console.warn(
          `createSessionClient: Caught AppwriteException with code ${error.code}: ${error.message}`
        );
      }
    } else if (error instanceof Error) {
      // Handle generic JavaScript errors
      console.warn(
        `createSessionClient: Caught generic error: ${error.message}`
      );
    } else {
      // Handle cases where the thrown value might not be an Error object
      console.warn("createSessionClient: Caught an unknown error type.");
    }

    // Regardless of the error type, return null services
    return { account: null, databases: null, storage: null, teams: null }; // Add teams: null
  }
}

/**
 * Creates a basic Appwrite client without admin keys or user sessions.
 * Use this for public operations or initiating auth flows (login/signup).
 * @returns {BasicClient} An object containing initialized Appwrite services (Account, Databases, Storage).
 */
function createBasicClient(): BasicClient {
  // Return type is now the alias
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

  if (!endpoint || !projectId) {
    throw new Error(
      "Missing required Appwrite environment variables for Basic Client."
    );
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId);

  return {
    account: new Account(client),
    databases: new Databases(client),
    storage: new Storage(client),
    teams: new Teams(client), // Add Teams service
  };
}

// --- Exports ---

// Export the factory functions
export { createAdminClient, createSessionClient, createBasicClient };

// Export Appwrite constants needed elsewhere (Permissions, Roles, ID)
export { Permission, Role, ID };

// Export types for use in other files if needed (e.g., typing action function parameters)
export type { AdminClient, SessionClient, BasicClient }; // BasicClient is now the type alias
