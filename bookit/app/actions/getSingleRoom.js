'use server';

import { createAdminClient } from '@/config/appwrite';

export default async function getSingleRoom(id) {
  try {
    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_APPWRITE_DATABASE || !process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS) {
      console.error('Missing required environment variables for Appwrite');
      return null;
    }

    // Get database client
    const { databases } = await createAdminClient();
    if (!databases) {
      console.error('Failed to initialize Appwrite database client');
      return null;
    }

    // Fetch rooms with error handling
    try {
      const room = await databases.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
        await id
      );

      if (!room) {
        return null;
      }

      // Format and return room data without revalidation
      return {
        ...room,
        amenities: room.amenities || ''
      };
    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      return null;
    }
  } catch (error) {
    console.error('getAllRooms failed:', error.message);
    return [];
  }
}