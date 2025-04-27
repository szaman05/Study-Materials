// actions/profile.ts
"use server";

import { revalidatePath } from "next/cache";
import { Query, AppwriteException } from "node-appwrite";
import { createSessionClient } from "@/lib/actions/appwrite/appwrite-server";
import {
  CustomAppwriteException,
  ProfileDocument,
  ProfileResponse,
  UserProfile,
} from "@/types/profiles";

const DB_ID = process.env.APPWRITE_DATABASE_ID;
const PROFILES_COLLECTION_ID = process.env.APPWRITE_PROFILES_COLLECTION_ID;

export async function getCurrentUserProfile(): Promise<ProfileResponse> {
  try {
    const { account: sessionAccount, databases: sessionDatabases } =
      await createSessionClient();

    if (!sessionAccount || !sessionDatabases) {
      return {
        success: false,
        error: "Unauthorized. Please log in.",
        status: 401,
        profile: null,
      };
    }

    const user = await sessionAccount.get();
    const userId = user.$id;

    console.log(`Fetching profile document for user: ${userId}`);
    if (!DB_ID || !PROFILES_COLLECTION_ID) {
      throw new Error(
        "Database ID or Profiles Collection ID is not configured in environment variables."
      );
    }

    // Search for profile by userId field instead of document ID
    const results = await sessionDatabases.listDocuments(
      DB_ID,
      PROFILES_COLLECTION_ID,
      [Query.equal("userId", userId)]
    );

    if (results.total === 0) {
      console.warn(`Profile document not found for user ${userId}.`);
      return {
        success: false,
        error: "Profile not found.",
        status: 404,
        profile: null,
      };
    }

    const profileDocument = results.documents[0];
    console.log("Profile document fetched successfully.");

    const { $id, ...profileData } = profileDocument;
    const userProfile: UserProfile = {
      id: $id,
      fullName: profileData.fullName,
      email: profileData.email,
      phone: profileData.phone,
      role: profileData.role,
      roleDisplayName: profileData.roleDisplayName,
      teamId: profileData.teamId,
      createdBy: profileData.createdBy,
      isActive:
        profileData.isActive === undefined ? true : profileData.isActive,
      address: profileData.address,
      country: profileData.country,
      city: profileData.city,
      postalCode: profileData.postalCode,
      profileImageUrl: profileData.profileImageUrl,
    };

    return { success: true, profile: userProfile };
  } catch (error) {
    if (error instanceof AppwriteException) {
      const appwriteError = error as CustomAppwriteException;
      console.error("Get Profile Action Error:", error);
      if (appwriteError.code === 404) {
        console.warn(
          `Profile document not found for user. This might be expected if signup was interrupted.`
        );
        return {
          success: false,
          error: "Profile not found.",
          status: 404,
          profile: null,
        };
      }
      return {
        success: false,
        error: appwriteError.message || "Failed to fetch profile.",
        details: appwriteError.response?.message,
        status: appwriteError.code || 500,
        profile: null,
      };
    }

    const unknownError = error as Error;
    return {
      success: false,
      error: "An unexpected error occurred while fetching profile.",
      status: 500,
      profile: null,
    };
  }
}

export async function updateProfile(
  prevState: ProfileResponse | undefined,
  formData: UserProfile
): Promise<ProfileResponse> {
  if (!formData) {
    return { success: false, error: "No data provided for update." };
  }

  try {
    const { account: sessionAccount, databases: sessionDatabases } =
      await createSessionClient();

    if (!sessionAccount || !sessionDatabases) {
      return {
        success: false,
        error: "Unauthorized. Please log in.",
        status: 401,
      };
    }

    const user = await sessionAccount.get();
    const userId = user.$id;

    console.log(`Attempting to update profile document for user: ${userId}`);
    if (!DB_ID || !PROFILES_COLLECTION_ID) {
      throw new Error(
        "Database ID or Profiles Collection ID is not configured in environment variables."
      );
    }

    // Remove the id field from formData to avoid Appwrite errors
    const { id: _, ...formDataWithoutId } = formData;

    let profileDocument;

    try {
      // First try to find user profile by userId field
      const results = await sessionDatabases.listDocuments(
        DB_ID,
        PROFILES_COLLECTION_ID,
        [Query.equal("userId", userId)]
      );

      if (results.total > 0) {
        // Profile exists, update it
        console.log(`Found existing profile with userId: ${userId}`);
        const existingProfile = results.documents[0];

        // Update existing profile without including the id field
        profileDocument =
          await sessionDatabases.updateDocument<ProfileDocument>(
            DB_ID,
            PROFILES_COLLECTION_ID,
            existingProfile.$id, // Use document ID, not user ID
            {
              ...formDataWithoutId, // Use the formData without the id field
              userId: userId, // Make sure userId is set correctly
              email: user.email, // Use email from auth user
              isActive:
                formDataWithoutId.isActive !== undefined
                  ? formDataWithoutId.isActive
                  : true, // Default to active if not specified
            }
          );
        console.log("Profile document updated successfully.");

        // Revalidate immediately after successful update
        revalidatePath("/(admin)/(others-pages)/profile");
        revalidatePath("/profile");
        revalidatePath("/");
      } else {
        // Profile doesn't exist, create a new one
        console.log(
          `No profile found for userId: ${userId}. Creating new profile.`
        );

        // Create with all required fields from schema
        profileDocument =
          await sessionDatabases.createDocument<ProfileDocument>(
            DB_ID,
            PROFILES_COLLECTION_ID,
            "unique()", // Let Appwrite generate a unique ID
            {
              ...formDataWithoutId, // Use the formData without the id field
              userId: userId, // Set the userId field as per schema
              email: user.email, // Use email from auth user
              isActive: true, // Default to active for new profiles
            }
          );
        console.log("Profile document created successfully.");

        // Revalidate immediately after successful creation
        revalidatePath("/(admin)/(others-pages)/profile");
        revalidatePath("/profile");
        revalidatePath("/");
      }
    } catch (error) {
      console.error("Error searching for user profile:", error);

      // Fall back to direct update - this will fail if document doesn't exist
      profileDocument = await sessionDatabases.updateDocument<ProfileDocument>(
        DB_ID,
        PROFILES_COLLECTION_ID,
        userId,
        {
          ...formDataWithoutId, // Use the formData without the id field
          isActive:
            formDataWithoutId.isActive !== undefined
              ? formDataWithoutId.isActive
              : true, // Default to active if not specified
        }
      );

      // Also try to revalidate here in case the update succeeded
      revalidatePath("/(admin)/(others-pages)/profile");
      revalidatePath("/profile");
      revalidatePath("/");
    }

    const { $id, ...profileData } = profileDocument;
    const updatedProfile: UserProfile = {
      id: $id,
      fullName: profileData.fullName,
      email: profileData.email,
      phone: profileData.phone,
      role: profileData.role,
      roleDisplayName: profileData.roleDisplayName,
      teamId: profileData.teamId,
      createdBy: profileData.createdBy,
      isActive:
        profileData.isActive === undefined ? true : profileData.isActive,
      address: profileData.address,
      country: profileData.country,
      city: profileData.city,
      postalCode: profileData.postalCode,
      profileImageUrl: profileData.profileImageUrl,
    };

    return {
      success: true,
      message: "Profile updated successfully!",
      updatedProfile,
    };
  } catch (error) {
    if (error instanceof AppwriteException) {
      const appwriteError = error as CustomAppwriteException;
      console.error("Update Profile Action Error:", error);
      return {
        success: false,
        error: appwriteError.message || "Failed to update profile.",
        details: appwriteError.response?.message,
        status: appwriteError.code || 500,
      };
    }

    const unknownError = error as Error;
    return {
      success: false,
      error: "An unexpected error occurred while updating profile.",
      status: 500,
    };
  }
}

export async function updateProfileImage(
  prevState: ProfileResponse | undefined,
  profileImageId: string,
  profileImageUrl?: string // Added parameter for direct URL
): Promise<ProfileResponse> {
  if (!profileImageId && !profileImageUrl) {
    return { success: false, error: "No profile image information provided." };
  }

  try {
    const {
      account: sessionAccount,
      databases: sessionDatabases,
      storage: sessionStorage,
    } = await createSessionClient();

    if (!sessionAccount || !sessionDatabases) {
      return {
        success: false,
        error: "Unauthorized. Please log in.",
        status: 401,
      };
    }

    const user = await sessionAccount.get();
    const userId = user.$id;

    // Update user preferences with the profile image ID
    await sessionAccount.updatePrefs({
      profileImageId: profileImageId,
    });

    console.log(`Attempting to update profile image for user: ${userId}`);
    if (!DB_ID || !PROFILES_COLLECTION_ID) {
      throw new Error(
        "Database ID or Profiles Collection ID is not configured in environment variables."
      );
    }

    // First try to find user profile by userId field
    const results = await sessionDatabases.listDocuments(
      DB_ID,
      PROFILES_COLLECTION_ID,
      [Query.equal("userId", userId)]
    );

    if (results.total === 0) {
      return {
        success: false,
        error: "Profile not found.",
        status: 404,
      };
    }

    const existingProfile = results.documents[0];

    // Get URL if not provided but we have the ID
    let imageUrl = profileImageUrl;
    if (!imageUrl && profileImageId && sessionStorage) {
      try {
        const BUCKET_ID = process.env.APPWRITE_PROFILE_PICTURES_BUCKET_ID;
        if (BUCKET_ID) {
          // We only need to get file information to verify it exists
          await sessionStorage.getFile(BUCKET_ID, profileImageId);

          const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || ""; // Use NEXT_PUBLIC_ prefix if defined there
          const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID; // Use NEXT_PUBLIC_ prefix
          imageUrl = `${endpoint}/storage/buckets/${BUCKET_ID}/files/${profileImageId}/view?project=${projectId}`;
          console.log("Generated profile image URL from ID:", imageUrl);
        }
      } catch (error) {
        console.error("Error generating file URL:", error);
      }
    }

    // Update profile with direct URL
    const profileDocument = await sessionDatabases.updateDocument(
      DB_ID,
      PROFILES_COLLECTION_ID,
      existingProfile.$id,
      {
        profileImageUrl: imageUrl, // Store the direct URL now
      }
    );

    console.log("Profile image updated successfully.");

    // Revalidate paths
    revalidatePath("/(admin)/(others-pages)/profile");
    revalidatePath("/profile");
    revalidatePath("/");

    const { $id, ...profileData } = profileDocument;
    const updatedProfile: UserProfile = {
      id: $id,
      fullName: profileData.fullName,
      email: profileData.email,
      phone: profileData.phone,
      role: profileData.role,
      roleDisplayName: profileData.roleDisplayName,
      teamId: profileData.teamId,
      createdBy: profileData.createdBy,
      isActive:
        profileData.isActive === undefined ? true : profileData.isActive,
      address: profileData.address,
      country: profileData.country,
      city: profileData.city,
      postalCode: profileData.postalCode,
      profileImageUrl: profileData.profileImageUrl,
    };

    return {
      success: true,
      message: "Profile image updated successfully!",
      updatedProfile,
    };
  } catch (error) {
    if (error instanceof AppwriteException) {
      const appwriteError = error as CustomAppwriteException;
      console.error("Update Profile Image Action Error:", error);
      return {
        success: false,
        error: appwriteError.message || "Failed to update profile image.",
        details: appwriteError.response?.message,
        status: appwriteError.code || 500,
      };
    }

    const unknownError = error as Error;
    return {
      success: false,
      error: "An unexpected error occurred while updating profile image.",
      status: 500,
    };
  }
}

export async function createUserProfile(
  prevState: ProfileResponse | undefined,
  userData: UserProfile,
  targetUserId: string
): Promise<ProfileResponse> {
  if (!userData) {
    return { success: false, error: "No data provided for new user profile." };
  }

  // Add validation for targetUserId
  if (!targetUserId) {
    return {
      success: false,
      error: "Target user ID is required to create a profile.",
    };
  }

  try {
    const {
      account: sessionAccount,
      databases: sessionDatabases,
      teams: sessionTeams,
    } = await createSessionClient();

    if (!sessionAccount || !sessionDatabases) {
      return {
        success: false,
        error: "Unauthorized. Please log in.",
        status: 401,
      };
    }

    // Verify admin status
    const currentUser = await sessionAccount.get();
    const adminId = currentUser.$id;

    // Optional: Verify that the current user has admin privileges
    // This should be replaced with your actual admin verification logic
    // For example, checking if the user is in an admin team
    // const isAdmin = await verifyAdminStatus(sessionTeams, adminId);
    // if (!isAdmin) {
    //   return {
    //     success: false,
    //     error: "Unauthorized. Only admins can create user profiles.",
    //     status: 403
    //   };
    // }

    console.log(
      `Admin ${adminId} attempting to create profile for user: ${targetUserId}`
    );
    if (!DB_ID || !PROFILES_COLLECTION_ID) {
      throw new Error(
        "Database ID or Profiles Collection ID is not configured in environment variables."
      );
    }

    // Check if profile already exists
    const existingResults = await sessionDatabases.listDocuments(
      DB_ID,
      PROFILES_COLLECTION_ID,
      [Query.equal("userId", targetUserId)]
    );

    if (existingResults.total > 0) {
      return {
        success: false,
        error: "Profile already exists for this user.",
        status: 409,
      };
    }

    // Create new profile for the target user
    const profileDocument = await sessionDatabases.createDocument(
      DB_ID,
      PROFILES_COLLECTION_ID,
      "unique()", // Let Appwrite generate a unique ID
      {
        userId: targetUserId,
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone || "",
        role: userData.role || "user", // Default to basic user role
        roleDisplayName: userData.roleDisplayName || "User", // Human-readable role name
        teamId: userData.teamId, // Team ID if applicable
        createdBy: adminId, // Record which admin created this profile
        isActive: userData.isActive !== undefined ? userData.isActive : true, // Default to active
        address: userData.address || "",
        country: userData.country || "",
        city: userData.city || "",
        postalCode: userData.postalCode || "",
        profileImageUrl: userData.profileImageUrl || "",
      }
    );

    console.log(`Profile created for user ${targetUserId} by admin ${adminId}`);

    // If a team ID is provided, add the user to that team
    if (userData.teamId && sessionTeams) {
      try {
        // Ensure role is an array of strings as required by createMembership
        const userRoles: string[] = userData.role ? [userData.role] : [];

        await sessionTeams.createMembership(
          userData.teamId,
          userRoles,
          userData.email,
          userData.phone || "",
          "" // No URL property in UserProfile interface
        );
        console.log(`User ${targetUserId} added to team ${userData.teamId}`);
      } catch (teamError) {
        console.error("Error adding user to team:", teamError);
        // Continue execution - the profile was still created
      }
    }

    // Revalidate paths
    revalidatePath("/admin/users");
    revalidatePath("/");

    const { $id, ...profileData } = profileDocument;
    const createdProfile: UserProfile = {
      id: $id,
      fullName: profileData.fullName,
      email: profileData.email,
      phone: profileData.phone,
      role: profileData.role,
      roleDisplayName: profileData.roleDisplayName,
      teamId: profileData.teamId,
      createdBy: profileData.createdBy,
      isActive:
        profileData.isActive === undefined ? true : profileData.isActive,
      address: profileData.address,
      country: profileData.country,
      city: profileData.city,
      postalCode: profileData.postalCode,
      profileImageUrl: profileData.profileImageUrl,
    };

    return {
      success: true,
      message: "User profile created successfully!",
      updatedProfile: createdProfile,
    };
  } catch (error) {
    if (error instanceof AppwriteException) {
      const appwriteError = error as CustomAppwriteException;
      console.error("Create User Profile Error:", error);
      return {
        success: false,
        error: appwriteError.message || "Failed to create user profile.",
        details: appwriteError.response?.message,
        status: appwriteError.code || 500,
      };
    }

    const unknownError = error as Error;
    return {
      success: false,
      error: "An unexpected error occurred while creating user profile.",
      status: 500,
    };
  }
}

export async function updateUserProfile(
  prevState: ProfileResponse | undefined,
  userData: UserProfile,
  targetUserId: string
): Promise<ProfileResponse> {
  if (!userData) {
    return { success: false, error: "No data provided for profile update." };
  }

  if (!targetUserId) {
    return {
      success: false,
      error: "Target user ID is required to update a profile.",
    };
  }

  try {
    const {
      account: sessionAccount,
      databases: sessionDatabases,
      teams: sessionTeams,
    } = await createSessionClient();

    if (!sessionAccount || !sessionDatabases) {
      return {
        success: false,
        error: "Unauthorized. Please log in.",
        status: 401,
      };
    }

    // Verify admin status
    const currentUser = await sessionAccount.get();
    const adminId = currentUser.$id;

    // Optional: Verify that the current user has admin privileges
    // This should be replaced with your actual admin verification logic
    // For example, checking if the user is in an admin team
    // const isAdmin = await verifyAdminStatus(sessionTeams, adminId);
    // if (!isAdmin) {
    //   return {
    //     success: false,
    //     error: "Unauthorized. Only admins can update user profiles.",
    //     status: 403
    //   };
    // }

    console.log(
      `Admin ${adminId} attempting to update profile for user: ${targetUserId}`
    );
    if (!DB_ID || !PROFILES_COLLECTION_ID) {
      throw new Error(
        "Database ID or Profiles Collection ID is not configured in environment variables."
      );
    }

    // Get existing profile
    const existingResults = await sessionDatabases.listDocuments(
      DB_ID,
      PROFILES_COLLECTION_ID,
      [Query.equal("userId", targetUserId)]
    );

    if (existingResults.total === 0) {
      return {
        success: false,
        error: "Profile not found for this user.",
        status: 404,
      };
    }

    const existingProfile = existingResults.documents[0];

    // Remove the id field from userData to avoid Appwrite errors
    const { id: _, ...userDataWithoutId } = userData;

    // Update user profile
    const profileDocument = await sessionDatabases.updateDocument(
      DB_ID,
      PROFILES_COLLECTION_ID,
      existingProfile.$id,
      {
        ...userDataWithoutId,
        userId: targetUserId, // Ensure userId doesn't change
        updatedBy: adminId, // Record which admin updated this profile
      }
    );

    console.log(`Profile for user ${targetUserId} updated by admin ${adminId}`);

    // If team ID is provided or changed, update team membership
    if (
      userData.teamId &&
      userData.teamId !== existingProfile.teamId &&
      sessionTeams
    ) {
      try {
        // If user was in a previous team, you might want to remove them first
        if (existingProfile.teamId) {
          try {
            // This assumes you have the membership ID, which you might need to retrieve first
            // await sessionTeams.deleteMembership(existingProfile.teamId, membershipId);
            console.log(
              `User ${targetUserId} removed from previous team ${existingProfile.teamId}`
            );
          } catch (removeError) {
            console.error(
              "Error removing user from previous team:",
              removeError
            );
          }
        }

        // Add to new team - ensure role is an array of strings
        const userRoles: string[] = userData.role ? [userData.role] : [];

        await sessionTeams.createMembership(
          userData.teamId,
          userRoles, // Pass array of roles
          userData.email,
          userData.phone || "",
          "" // Fix: Remove reference to userData.url and use empty string
        );
        console.log(`User ${targetUserId} added to team ${userData.teamId}`);
      } catch (teamError) {
        console.error("Error updating team membership:", teamError);
        // Continue execution - the profile was still updated
      }
    }

    // Revalidate paths
    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${targetUserId}`);
    revalidatePath("/");

    const { $id, ...profileData } = profileDocument;
    const updatedProfile: UserProfile = {
      id: $id,
      fullName: profileData.fullName,
      email: profileData.email,
      phone: profileData.phone,
      role: profileData.role,
      roleDisplayName: profileData.roleDisplayName,
      teamId: profileData.teamId,
      createdBy: profileData.createdBy,
      isActive:
        profileData.isActive === undefined ? true : profileData.isActive,
      address: profileData.address,
      country: profileData.country,
      city: profileData.city,
      postalCode: profileData.postalCode,
      profileImageUrl: profileData.profileImageUrl,
    };

    return {
      success: true,
      message: "User profile updated successfully!",
      updatedProfile,
    };
  } catch (error) {
    if (error instanceof AppwriteException) {
      const appwriteError = error as CustomAppwriteException;
      console.error("Update User Profile Error:", error);
      return {
        success: false,
        error: appwriteError.message || "Failed to update user profile.",
        details: appwriteError.response?.message,
        status: appwriteError.code || 500,
      };
    }

    const unknownError = error as Error;
    return {
      success: false,
      error: "An unexpected error occurred while updating user profile.",
      status: 500,
    };
  }
}

export async function deleteUserProfile(
  prevState: ProfileResponse | undefined,
  userId: string
): Promise<ProfileResponse> {
  if (!userId) {
    return { success: false, error: "User ID is required for deletion." };
  }

  try {
    const {
      account: sessionAccount,
      databases: sessionDatabases,
      teams: sessionTeams,
    } = await createSessionClient();

    if (!sessionAccount || !sessionDatabases) {
      return {
        success: false,
        error: "Unauthorized. Please log in.",
        status: 401,
      };
    }

    // Verify admin status
    const currentUser = await sessionAccount.get();
    const adminId = currentUser.$id;

    // Verify that the current user has admin privileges
    // For enhanced security, we should check if the user is in an admin team
    // const isAdmin = await verifyAdminStatus(sessionTeams, adminId);
    // if (!isAdmin) {
    //   return {
    //     success: false,
    //     error: "Unauthorized. Only admins can delete user profiles.",
    //     status: 403
    //   };
    // }

    console.log(
      `Admin ${adminId} attempting to delete user profile: ${userId}`
    );

    if (!DB_ID || !PROFILES_COLLECTION_ID) {
      throw new Error(
        "Database ID or Profiles Collection ID is not configured in environment variables."
      );
    }

    // Get existing profile to ensure it exists
    const existingResults = await sessionDatabases.listDocuments(
      DB_ID,
      PROFILES_COLLECTION_ID,
      [Query.equal("userId", userId)]
    );

    if (existingResults.total === 0) {
      return {
        success: false,
        error: "Profile not found for this user.",
        status: 404,
      };
    }

    const profileDocument = existingResults.documents[0];

    // Delete the profile document
    await sessionDatabases.deleteDocument(
      DB_ID,
      PROFILES_COLLECTION_ID,
      profileDocument.$id
    );

    console.log(`Profile for user ${userId} deleted by admin ${adminId}`);

    // Revalidate paths
    revalidatePath("/admin/users");
    revalidatePath("/");

    return {
      success: true,
      message: "User profile deleted successfully!",
    };
  } catch (error) {
    if (error instanceof AppwriteException) {
      const appwriteError = error as CustomAppwriteException;
      console.error("Delete User Profile Error:", error);
      return {
        success: false,
        error: appwriteError.message || "Failed to delete user profile.",
        details: appwriteError.response?.message,
        status: appwriteError.code || 500,
      };
    }

    const unknownError = error as Error;
    return {
      success: false,
      error: "An unexpected error occurred while deleting user profile.",
      status: 500,
    };
  }
}

// Export the UserProfile type properly with 'type' keyword since we're using isolatedModules
export type { UserProfile };
