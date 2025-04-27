"use client";

import { useState, useRef, useTransition, useEffect } from "react"; // Import useTransition and useEffect
import { Mail, Shield, Upload } from "lucide-react";
import type { UserProfile } from "@/types/profiles";
import { uploadProfilePicture } from "@/lib/actions/appwrite/storage";
import { useActionState } from "react";

interface ProfileInfoCardProps {
  profile: UserProfile;
}

interface UploadResponse {
  success: boolean;
  message: string;
  fileId?: string;
  fileUrl?: string;
  error?: string;
  errorCode?: number | string;
}

type ProfileImageUploadAction = (
  prevState: UploadResponse | undefined,
  formData: FormData
) => Promise<UploadResponse>;

export function ProfileInfoCard({ profile }: ProfileInfoCardProps) {
  const [profileImage, setProfileImage] = useState<string>(
    profile.profileImageUrl ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        profile.fullName || "User"
      )}&background=random`
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition(); // Add useTransition

  const [uploadState, uploadAction] = useActionState<UploadResponse, FormData>(
    uploadProfilePicture as ProfileImageUploadAction,
    {
      success: false,
      message: "",
    }
  );

  // Handle image update after successful upload
  const handleImageUpdated = (imageUrl: string) => {
    const cacheBuster = new Date().getTime();
    setProfileImage(
      `${imageUrl}${imageUrl.includes("?") ? "&" : "?"}cb=${cacheBuster}`
    );
  };

  // Function to handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // No need for async here if we use startTransition
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);
    formData.append("userId", profile.id || ""); // Ensure userId is passed if needed by action

    // Create and display a simple preview immediately
    const objectUrl = URL.createObjectURL(file);
    setProfileImage(objectUrl); // Show preview

    // Call the upload server action within a transition
    startTransition(() => {
      uploadAction(formData);
    });
  };

  // Use useEffect to react to changes in uploadState *after* the action completes
  useEffect(() => {
    if (uploadState.success && uploadState.fileUrl) {
      console.log(
        "Upload successful, updating image URL:",
        uploadState.fileUrl
      );
      handleImageUpdated(uploadState.fileUrl);
      // Optionally revoke the object URL after successful update
      // URL.revokeObjectURL(profileImage); // Be careful if profileImage state was updated elsewhere
    } else if (!uploadState.success && uploadState.error && !isPending) {
      // Check !isPending to avoid reacting during the action
      console.error("Upload failed:", uploadState.error);
      // Reset to previous image if upload fails
      setProfileImage(
        profile.profileImageUrl ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            profile.fullName || "User"
          )}&background=random`
      );
      // Optionally revoke the object URL if it's still set from the preview
      // URL.revokeObjectURL(profileImage);
    }
  }, [uploadState, isPending, profile.profileImageUrl, profile.fullName]); // Add dependencies

  return (
    <div className="card bg-base-100 shadow-xl mb-6">
      <div className="card-body p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          {/* Profile Picture Column */}
          <div className="flex flex-col items-center justify-center">
            {/* Avatar with click handler and visible upload button */}
            <div className="relative">
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />

              {/* Avatar image that triggers file dialog when clicked */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="avatar cursor-pointer relative group"
              >
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {/* Add loading state overlay */}
                  {isPending && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center z-10">
                      <span className="loading loading-spinner text-white"></span>
                    </div>
                  )}
                  <img
                    src={profileImage}
                    alt={`${profile.fullName || "User"}'s avatar`}
                    key={profileImage} // Key helps React re-render the img tag if src changes
                  />
                </div>

                {/* Overlay with hover effect (only show if not pending) */}
                {!isPending && (
                  <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <div className="text-white text-xs font-medium flex flex-col items-center gap-1">
                      <Upload className="h-4 w-4" />
                      <span>Change Photo</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <h2 className="text-lg font-semibold mt-3">
              {profile.fullName || "User"}
            </h2>
            {/* Display upload errors */}
            {uploadState?.error && !isPending && (
              <p className="text-error text-xs mt-2">{uploadState.error}</p>
            )}
            {uploadState?.success && !isPending && uploadState.message && (
              <p className="text-success text-xs mt-2">{uploadState.message}</p>
            )}
          </div>

          {/* Email Column */}
          <div className="card card-border bg-base-200/50 h-full">
            <div className="card-body p-4">
              <div className="flex flex-col items-center sm:items-start gap-2">
                <div className="bg-base-300 p-3 rounded-lg">
                  <Mail className="text-primary h-6 w-6" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-base-content/70 text-sm">Email</h3>
                  <p className="font-medium break-all">
                    {profile.email || "Not set"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Role Column */}
          <div className="card card-border bg-base-200/50 h-full">
            <div className="card-body p-4">
              <div className="flex flex-col items-center sm:items-start gap-2">
                <div className="bg-base-300 p-3 rounded-lg">
                  <Shield className="text-primary h-6 w-6" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-base-content/70 text-sm">Role</h3>
                  <p className="font-medium">
                    {profile.roleDisplayName || "User"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
