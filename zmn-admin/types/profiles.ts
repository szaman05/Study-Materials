import { AppwriteException } from "node-appwrite";

// Extend the AppwriteException type properly
export type CustomAppwriteException = AppwriteException & {
  response?: {
    message?: string;
  };
};

export interface ProfileDocument {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  userId: string; // Field in schema that stores the user ID
  fullName: string; // Full name from auth user
  email: string; // Email from auth user
  phone: string;
  role: string; // User's role in the system for RBAC
  roleDisplayName?: string; // Human-readable role name
  teamId?: string; // Team ID for team-based permissions
  createdBy?: string; // ID of admin who created this user
  isActive: boolean; // Whether the user account is active
  address?: string;
  country?: string;
  city?: string;
  postalCode?: string;
  profileImageUrl?: string; // Direct URL to profile image instead of ID
  [key: string]: string | string[] | boolean | undefined;
}

export interface ProfileResponse {
  success: boolean;
  error?: string;
  status?: number;
  details?: string;
  profile?: UserProfile | null;
  message?: string;
  updatedProfile?: UserProfile;
}

export interface UserProfile {
  id?: string;
  fullName: string; // Combined full name instead of first/last name
  email: string; // From auth user
  phone: string;
  role?: string; // Role identifier for RBAC
  roleDisplayName?: string; // Human-readable role name
  teamId?: string; // Team ID for team-based permissions
  createdBy?: string; // ID of admin who created this user
  isActive?: boolean; // Whether the user account is active
  address?: string;
  country?: string;
  city?: string;
  postalCode?: string;
  profileImageUrl?: string; // Direct URL instead of ID
}
