'use server';

import { createAdminClient } from '@/config/appwrite';
import { revalidatePath } from 'next/cache';
import { ID } from 'node-appwrite';

export default async function addRoom(formData) {
  try {
    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_APPWRITE_DATABASE || !process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS) {
      throw new Error('Missing required environment variables for Appwrite');
    }

    // Get database client
    const { databases } = await createAdminClient();
    if (!databases) {
      throw new Error('Failed to initialize Appwrite database client');
    }

    // Create the room document
    const room = {
      ...formData,
      images: formData.images || [], // Ensure images is an array
      user_id: '1', // You would typically get this from the authenticated user
    };

    // Add the room to the database
    const createdRoom = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      ID.unique(),
      room
    );

    // Revalidate the rooms pages
    revalidatePath('/');
    revalidatePath('/rooms');

    return createdRoom;
  } catch (error) {
    console.error('Failed to add room:', error);
    throw new Error('Failed to add room');
  }
}