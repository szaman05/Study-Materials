// actions/profile.js
'use server'; // Mark as Server Actions

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import {
    createSessionClient, // Need to act AS the logged-in user
    ID // Potentially needed if creating things, though not in these examples
} from '@/lib/appwrite-server'; // Adjust path

const DB_ID = process.env.APPWRITE_DATABASE_ID;
const PROFILES_COLLECTION_ID = process.env.APPWRITE_PROFILES_COLLECTION_ID;

// --- Get Current User's Profile Action ---
// Fetches the profile document associated with the logged-in user
export async function getCurrentUserProfile() {
    try {
        // Get clients acting as the logged-in user
        const { account: sessionAccount, databases: sessionDatabases } = await createSessionClient();

        if (!sessionAccount || !sessionDatabases) {
            // If no session client could be created, user is not logged in
            return { success: false, error: 'Unauthorized. Please log in.', status: 401, profile: null };
        }

        // First, get the user ID from the active session
        const user = await sessionAccount.get();
        const userId = user.$id;

        // Now, fetch the profile document using the userId as the document ID
        console.log(`Fetching profile document for user: ${userId}`);
        if (!DB_ID || !PROFILES_COLLECTION_ID) {
            throw new Error("Database ID or Profiles Collection ID is not configured in environment variables.");
        }
        const profileDocument = await sessionDatabases.getDocument(
            DB_ID,
            PROFILES_COLLECTION_ID,
            userId // Document ID === User ID
        );
        console.log("Profile document fetched successfully.");

        // Return only the necessary profile data + document ID ($id)
        // Exclude metadata like $collectionId, $databaseId, $permissions for cleaner state
        const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...profileData } = profileDocument;
        return { success: true, profile: { id: $id, ...profileData } };


    } catch (error) {
        console.error("Get Profile Action Error:", error);
        if (error.code === 404) {
            // Profile document doesn't exist (maybe signup failed midway?)
             console.warn(`Profile document not found for user ${error.userId || '(unknown)'}. This might be expected if signup was interrupted.`);
            return { success: false, error: 'Profile not found.', status: 404, profile: null };
        }
        // Other errors (permissions, network, etc.)
        return {
            success: false,
            error: error.message || 'Failed to fetch profile.',
            details: error.response?.message,
            status: error.code || 500,
            profile: null
        };
    }
}


// --- Update Current User's Profile Action ---
export async function updateProfile(prevState, formData) {
    // Get the data from the form
    const username = formData.get('username')?.toString();
    const bio = formData.get('bio')?.toString();
    // Add other fields from your profile form here

    // Basic validation
    const updateData = {};
    // Only include fields if they are actually provided in the form data
    if (username !== undefined) updateData.username = username.trim();
    if (bio !== undefined) updateData.bio = bio.trim();
    // Add other fields...

    // Validate required fields after trimming
    if (updateData.username === '') {
         return { success: false, error: 'Username cannot be empty.' };
    }

    if (Object.keys(updateData).length === 0) {
        return { success: false, error: 'No data provided for update.' };
    }

    try {
        // Get clients acting as the logged-in user
        const { account: sessionAccount, databases: sessionDatabases } = await createSessionClient();

        if (!sessionAccount || !sessionDatabases) {
            return { success: false, error: 'Unauthorized. Please log in.', status: 401 };
        }

        // Get the user ID to know which document to update
        const user = await sessionAccount.get();
        const userId = user.$id;

        console.log(`Attempting to update profile document for user: ${userId}`);
        if (!DB_ID || !PROFILES_COLLECTION_ID) {
            throw new Error("Database ID or Profiles Collection ID is not configured in environment variables.");
        }
        // Update the document. Appwrite automatically enforces the permissions
        // set during creation (i.e., only this user can update their document).
        const updatedDocument = await sessionDatabases.updateDocument(
            DB_ID,
            PROFILES_COLLECTION_ID,
            userId, // Document ID === User ID
            updateData // The data fields to update
        );
        console.log("Profile document updated successfully.");

        // Revalidate the profile page to show updated data
        revalidatePath('/profile');

        // Return only necessary data
        const { $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...profileData } = updatedDocument;
        return { success: true, message: 'Profile updated successfully!', updatedProfile: { id: updatedDocument.$id, ...profileData } };


    } catch (error) {
        console.error("Update Profile Action Error:", error);
        return {
            success: false,
            error: error.message || 'Failed to update profile.',
            details: error.response?.message,
            status: error.code || 500
        };
    }
}
