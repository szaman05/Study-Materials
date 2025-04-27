"use client";

import { useState, forwardRef, RefObject } from "react";
import { uploadProfilePicture } from "@/lib/actions/appwrite/storage";
import { useActionState } from "react";
import { X } from "lucide-react";

// Define initial state structure matching UploadResponse from storage.ts
const initialState = {
  success: false,
  message: "",
  error: undefined,
  fileId: undefined,
  fileUrl: undefined,
  errorCode: undefined,
};

interface ProfileImageUploadProps {
  profile: {
    userId: string;
    name?: string;
    profileImageUrl?: string;
  };
  onUploadSuccess?: (imageUrl: string) => void;
  className?: string;
  fileInputRef?: RefObject<HTMLInputElement>;
}

export function ProfileImageUpload({
  profile,
  onUploadSuccess,
  className = "",
  fileInputRef,
}: ProfileImageUploadProps) {
  const [state, formAction] = useActionState(
    uploadProfilePicture,
    initialState
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Function to handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);

    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB.");
        return;
      }

      // Create and display preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Auto-submit the form when file is selected
      setIsUploading(true);
      const form = document.getElementById("uploadForm") as HTMLFormElement;
      if (form) form.requestSubmit();
    }
  };

  // Handle server action response
  if (state?.success && state.fileUrl && onUploadSuccess && !isUploading) {
    // Call the success callback with the file URL if upload was successful
    onUploadSuccess(state.fileUrl);
  }

  // Reset the uploading state when we get a response
  if (state && isUploading) {
    setIsUploading(false);
  }

  // Clear preview URL when upload is complete
  const clearPreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <form id="uploadForm" action={formAction} className="space-y-4">
        {/* Hidden input to pass the userId to the server action */}
        <input type="hidden" name="userId" value={profile.userId} />

        {/* File input - now using fileInputRef */}
        <input
          ref={fileInputRef}
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={!profile.userId}
        />

        {/* Show error message if any */}
        {(error || state?.error) && (
          <div className="text-error text-sm mt-2">
            {error || state?.message}
          </div>
        )}

        {/* Show success message */}
        {state?.success && (
          <div className="text-success text-sm mt-2">
            Image uploaded successfully!
          </div>
        )}

        {/* Preview container */}
        {previewUrl && (
          <div className="relative w-40 h-40 mx-auto">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover rounded-full"
            />
            <button
              type="button"
              onClick={clearPreview}
              className="btn btn-circle btn-xs absolute top-0 right-0 bg-base-100"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* Loading indicator */}
        {isUploading && (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )}
      </form>
    </div>
  );
}
