'use server';

import { createAdminClient } from '@/config/appwrite';

export default async function getAllRooms() {
  try {
    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_APPWRITE_DATABASE || !process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS) {
      console.error('Missing required environment variables for Appwrite');
      return [];
    }

    // Get database client
    const { databases } = await createAdminClient();
    if (!databases) {
      console.error('Failed to initialize Appwrite database client');
      return [];
    }

    // Fetch rooms with error handling
    try {
      const { documents: rooms } = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
        // Add query parameters to ensure we get all rooms
        [
          // You can add queries here if needed
        ],
        100, // Limit - adjust as needed
        0, // Offset
        'DESC', // Order
        '$id', // Order by field
        ['*'] // Get all attributes
      );

      if (!rooms) {
        return [];
      }

      

      return rooms;
    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      return [];
    }
  } catch (error) {
    console.error('getAllRooms failed:', error.message);
    return [];
  }
}