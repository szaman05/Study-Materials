// actions/storage.ts
"use server";

import {
  AppwriteException,
  ID,
  Permission,
  Role,
  Storage,
} from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import {
  createSessionClient,
  createAdminClient,
} from "@/lib/actions/appwrite/appwrite-server";
import { updateProfileImage } from "@/lib/actions/appwrite/profile";

// --- Configuration ---
const BUCKET_ID =
  process.env.APPWRITE_PROFILE_PICTURES_BUCKET_ID || "userProfile";

// --- Response Type ---
interface UploadResponse {
  success: boolean;
  message: string;
  fileId?: string;
  fileUrl?: string;
  error?: string;
  errorCode?: number | string;
}

/**
 * Upload a profile image to Appwrite storage and update user profile
 */
export async function uploadProfileImage(
  userId: string,
  file: File
): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
  try {
    if (!BUCKET_ID) {
      throw new Error("Storage bucket ID is not configured.");
    }

    // Get Appwrite client with admin privileges for storage operations
    const { storage } = createAdminClient();

    // Create a unique file ID
    const fileId = ID.unique();

    // Convert the Web API File to a Buffer for node-appwrite
    const buffer = Buffer.from(await file.arrayBuffer());
    // Use InputFile.fromBuffer to create the file object
    const inputFile = InputFile.fromBuffer(buffer, file.name);

    // Upload the file with user-specific permissions
    const uploadedFile = await storage.createFile(
      BUCKET_ID,
      fileId,
      inputFile, // Pass the correctly created InputFile object
      [
        // Allow the specific user to read/update/delete their own image
        Permission.read(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
        // Allow any user to read the image (public) - Adjust if needed
        Permission.read(Role.any()),
      ]
    );

    if (!uploadedFile || !uploadedFile.$id) {
      throw new Error("Failed to upload file.");
    }

    console.log(`File uploaded successfully with ID: ${uploadedFile.$id}`);

    // Get direct file URL
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || ""; // Use NEXT_PUBLIC_ prefix if defined there
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID; // Use NEXT_PUBLIC_ prefix

    if (!endpoint || !projectId) {
      throw new Error(
        "Appwrite endpoint or project ID is not configured correctly in environment variables."
      );
    }

    // Generate direct URL to the file,
    const directUrl = `${endpoint}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${projectId}`;

    // Update the user's profile with the new image URL using updateProfileImage
    await updateProfileImage(
      undefined, // prevState is undefined for direct calls
      fileId, // fileId parameter
      directUrl // profileImageUrl parameter
    );

    console.log(`Profile image link updated for user: ${userId}`);

    return {
      success: true,
      imageUrl: directUrl,
    };
  } catch (error) {
    console.error("Profile image upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown upload error",
    };
  }
}

// --- Server Action ---
export async function uploadProfilePicture(
  prevState: UploadResponse | undefined,
  formData: FormData
): Promise<UploadResponse> {
  // 1. Check for Bucket ID Configuration
  if (!BUCKET_ID) {
    return {
      success: false,
      message: "Server configuration error: Target storage bucket not set.",
      error:
        "Missing APPWRITE_PROFILE_PICTURES_BUCKET_ID environment variable.",
    };
  }

  // 2. Get the File from FormData
  const file = formData.get("profileImage") as File | null;
  const userId = formData.get("userId") as string | null;

  if (!userId) {
    console.error("Upload Action: userId is missing from form data");
    return {
      success: false,
      message: "User ID is required for profile image upload.",
      error: "Missing userId in form submission",
    };
  }

  if (!file || file.size === 0) {
    return { success: false, message: "No file selected or file is empty." };
  }

  // --- Initialize Appwrite Client ---
  let storage: Storage | null = null;
  let account = null;

  try {
    const clientResult = await createSessionClient();
    storage = clientResult.storage;
    account = clientResult.account;

    // 3. Check Authentication
    if (!storage || !account) {
      return {
        success: false,
        message: "Authentication required.",
        error: "User not logged in or session client failed",
        errorCode: 401,
      };
    }

    // 4. Get User ID for Permissions
    const user = await account.get();
    const currentUserId = user.$id;

    // 5. Prepare File for Upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const inputFile = InputFile.fromBuffer(buffer, file.name);

    // 6. Upload the file
    const fileId = ID.unique();
    const uploadedFile = await storage.createFile(
      BUCKET_ID,
      fileId,
      inputFile,
      [
        Permission.read(Role.any()),
        Permission.update(Role.user(currentUserId)),
        Permission.delete(Role.user(currentUserId)),
      ]
    );

    // 7. Get the file URL
    const fileUrl = storage.getFileView(BUCKET_ID, fileId).href;

    // 8. Update user profile with new image URL
    await updateProfileImage(undefined, fileId, fileUrl);

    // 9. Return success response
    return {
      success: true,
      message: "Profile picture uploaded successfully",
      fileId: uploadedFile.$id,
      fileUrl: fileUrl,
    };
  } catch (error) {
    console.error("Profile Picture Upload Error:", error);
    if (error instanceof AppwriteException) {
      return {
        success: false,
        message: "Upload failed",
        error: error.message,
        errorCode: error.code,
      };
    }
    return {
      success: false,
      message: "Upload failed",
      error: "An unexpected error occurred during upload",
    };
  }
}
