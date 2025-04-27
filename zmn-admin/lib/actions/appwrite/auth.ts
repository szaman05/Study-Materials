// actions/auth.js
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createAdminClient,
  createSessionClient,
  Permission,
  Role,
  ID,
} from "@/lib/actions/appwrite/appwrite-server";
import { revalidatePath } from "next/cache";
import { AppwriteException, Models } from "node-appwrite";

interface AuthResponse {
  success: boolean;
  error?: string;
  details?: string;
  redirectTo?: string; // Add redirectTo property to enable client-side redirect
}

// Extend the AppwriteException type properly
type CustomAppwriteException = AppwriteException & {
  response?: {
    message?: string;
  };
};

const DB_ID = process.env.APPWRITE_DATABASE_ID;
const PROFILES_COLLECTION_ID = process.env.APPWRITE_PROFILES_COLLECTION_ID;
const VIEWER_TEAM_ID = process.env.APPWRITE_VIEWER_TEAM_ID; // Add this environment variable

export async function signup(
  prevState: AuthResponse | undefined,
  formData: FormData
): Promise<AuthResponse> {
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
  if (!VIEWER_TEAM_ID) {
    console.error("Viewer Team ID is not configured in environment variables.");
    return {
      success: false,
      error: "Server configuration error. Please contact support.",
    };
  }

  try {
    const {
      account: authAccount,
      databases: adminDatabases,
      teams: adminTeams,
    } = createAdminClient();

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

    // Update profile creation with correct field names matching the Appwrite schema
    await adminDatabases.createDocument(
      DB_ID,
      PROFILES_COLLECTION_ID,
      userId,
      {
        fullName: name, // Changed from username to fullName
        email: email, // Added email as it's required in schema
        userId: userId,
        isActive: true, // Set default active status
      },
      [Permission.read(Role.user(userId)), Permission.update(Role.user(userId))]
    );
    console.log(`Profile document created for user: ${userId}`);

    // Add user to viewer team
    console.log(`Adding user ${userId} to viewer team ${VIEWER_TEAM_ID}`);
    await adminTeams.createMembership(
      VIEWER_TEAM_ID,
      [], // Default roles, can be empty if not using custom team roles
      email // Invite user by email
    );
    console.log(`User ${userId} added to viewer team.`);

    console.log(`Creating session for new user: ${email}`);
    const session = await authAccount.createEmailPasswordSession(
      email,
      password
    );
    console.log(`Session created: ${session.$id}`);

    const cookiesApi = await cookies();
    cookiesApi.set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });
    console.log("Session cookie set.");

    revalidatePath("/", "layout");

    // Return success with a redirect path
    return {
      success: true,
      redirectTo: "/dashboard",
    };
  } catch (error) {
    if (error instanceof AppwriteException) {
      const appwriteError = error as CustomAppwriteException;
      console.error("Signup Server Action Error:", error);
      return {
        success: false,
        error:
          error.code === 409
            ? "User with this email already exists."
            : error.message,
        details: appwriteError.response?.message,
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred during signup.",
    };
  }
}

export async function login(
  prevState: AuthResponse | undefined,
  formData: FormData
): Promise<AuthResponse> {
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

    const cookiesApi = await cookies();
    cookiesApi.set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });
    console.log("Session cookie set.");

    revalidatePath("/", "layout");

    // Return success with redirect path
    return {
      success: true,
      redirectTo: "/dashboard",
    };
  } catch (error) {
    if (error instanceof AppwriteException) {
      const appwriteError = error as CustomAppwriteException;
      console.error("Login Server Action Error:", error);
      return {
        success: false,
        error:
          error.code === 401 || error.code === 400
            ? "Invalid email or password."
            : error.message,
        details: appwriteError.response?.message,
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred during login.",
    };
  }
}

export async function logout(): Promise<void> {
  try {
    const { account: sessionAccount } = await createSessionClient();

    if (sessionAccount) {
      console.log("Attempting to delete current session...");
      await sessionAccount.deleteSession("current");
      console.log("Appwrite session deleted.");
    }
  } catch (error) {
    console.error(
      "Logout Server Action Error (Appwrite deletion failed):",
      error
    );
  } finally {
    const cookiesApi = await cookies();
    cookiesApi.delete("appwrite-session");
    console.log("Local session cookie deleted.");
  }

  redirect("/signin");
}

export async function getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
  try {
    const { account: sessionAccount } = await createSessionClient();

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
    if (error instanceof AppwriteException) {
      console.error("getCurrentUser: Error during execution:", error);
      if (error.code === 401) {
        console.log(
          "getCurrentUser: Caught 401 error, likely invalid/expired session. Deleting cookie."
        );
        const cookiesApi = await cookies();
        cookiesApi.delete("appwrite-session");
      }
    } else {
      console.log("getCurrentUser: Caught unexpected error:", error);
    }
    return null;
  } finally {
    console.log("--- getCurrentUser Action Finished ---");
  }
}

export async function forgotPassword(
  prevState: AuthResponse | undefined,
  formData: FormData
): Promise<AuthResponse> {
  const email = formData.get("email")?.toString();

  if (!email) {
    return { success: false, error: "Email is required." };
  }

  try {
    const { account: basicAccount } = createAdminClient();

    console.log(`Attempting to create password recovery for: ${email}`);
    await basicAccount.createRecovery(
      email,
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`
    );

    console.log("Password recovery email sent successfully");
    return { success: true };
  } catch (error) {
    if (error instanceof AppwriteException) {
      const appwriteError = error as CustomAppwriteException;
      console.error("Password Recovery Server Action Error:", error);
      return {
        success: false,
        error: error.message,
        details: appwriteError.response?.message,
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred during password recovery.",
    };
  }
}
// --- NEW createUser function for Admin ---
// --- MODIFIED createUser function for Admin ---
export async function createUser(
  userData: UserProfile & { password?: string }
): Promise<AuthResponse> {
  // --- *** ADD SERVER-SIDE LOGGING HERE *** ---
  console.log("ADMIN CREATE USER: Received userData object:", JSON.stringify(userData, null, 2));

  // Destructure AFTER logging to ensure we see the raw input
  const {
    email,
    password,
    fullName,
    phone,
    role,
    roleDisplayName,
    teamId,
    isActive,
    address,
    city,
    country,
    postalCode,
  } = userData || {}; // Add default empty object to prevent destructuring errors if userData is null/undefined

  // --- Validation ---
  // Check destructured values
  if (!email || !password || !fullName || !role || !teamId || !roleDisplayName) {
    // Log the destructured values for detailed debugging
    console.error("ADMIN CREATE USER: Validation Failed - Missing required fields after destructuring.", {
        email: email, password: password ? '******' : undefined, fullName: fullName, role: role, teamId: teamId, roleDisplayName: roleDisplayName
    });
    return { success: false, error: "Validation Failed: Email, password, name, role, teamId, and roleDisplayName are required." };
  }
  // ... rest of the validation and function logic remains the same ...
  if (password.length < 8) {
    return {
      success: false,
      error: "Password must be at least 8 characters long.",
    };
  }
  if (!DB_ID || !PROFILES_COLLECTION_ID) {
    console.error("ADMIN CREATE USER: Database ID or Profiles Collection ID is not configured.");
    return {
      success: false,
      error: "Server configuration error (DB/Collection ID missing). Please contact support.",
    };
  }
  if (!teamId) {
     console.error("ADMIN CREATE USER: Team ID is missing after destructuring.");
     return { success: false, error: "Server configuration error (Team ID missing)." };
  }

  // --- Try block remains the same ---
  try {
    const {
      account: authAccount,
      databases: adminDatabases,
      teams: adminTeams,
    } = createAdminClient();

    // Step 1: Create Auth User
    console.log(`ADMIN CREATE USER: Attempting to create auth user: ${email}`);
    const newUser = await authAccount.create(ID.unique(), email, password, fullName);
    const userId = newUser.$id;
    console.log(`ADMIN CREATE USER: Successfully created auth user: ${userId}`);

    // Step 2: Create Profile Document
    console.log(`ADMIN CREATE USER: Creating profile document for user: ${userId}`);
    const profileData = {
      userId: userId, fullName: fullName, email: email, phone: phone || "", role: role,
      roleDisplayName: roleDisplayName, teamId: teamId, isActive: isActive !== undefined ? isActive : true,
      address: address || "", city: city || "", country: country || "", postalCode: postalCode || "",
    };
    await adminDatabases.createDocument(DB_ID, PROFILES_COLLECTION_ID, userId, profileData,
      [Permission.read(Role.user(userId)), Permission.update(Role.user(userId))]
    );
    console.log(`ADMIN CREATE USER: Profile document created for user: ${userId}`);

    // Step 3: Add User to Team
    console.log(`ADMIN CREATE USER: Adding user ${userId} to team ${teamId} (Role: ${role})`);
    await adminTeams.createMembership(teamId, [], email);
    console.log(`ADMIN CREATE USER: User ${userId} added to team ${teamId}.`);

    // Success
    return {
      success: true,
      message: `User ${fullName} created successfully with role ${roleDisplayName}.`,
    };

  } catch (error) {
    // --- Catch block remains the same ---
    console.error("ADMIN CREATE USER: Error during creation process:", error);
    if (error instanceof AppwriteException) {
      const appwriteError = error as CustomAppwriteException;
      let errorMessage = error.message || "Failed to create user.";
      if (error.code === 409) { /* ... */ }
      else if (error.code === 404 && error.message.includes('Team not found')) { /* ... */ }
      else if (error.code === 400 && error.message.includes('Invalid document structure')) { /* ... */ }
      return { success: false, error: errorMessage, details: appwriteError.response?.message };
    }
    return { success: false, error: "An unexpected error occurred during user creation." };
  }
}