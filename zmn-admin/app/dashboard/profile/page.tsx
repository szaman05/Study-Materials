import { getCurrentUserProfile } from "@/lib/actions/appwrite/profile";
import { ProfileForm } from "@/components/profile/profile-form";
import { ProfileInfoCard } from "@/components/profile/profile-info-card";
import { AlertTriangle, User } from "lucide-react";

export default async function ProfilePage() {
  const { profile, success, error, status } = await getCurrentUserProfile();

  return (
    <div className="space-y-6">
      {/* User Profile Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <User size={24} className="text-primary" />
          User Profile
        </h1>
        <p className="text-base-content/70">
          Your personal account information.
        </p>
      </div>

      {/* Display Profile Content or Error/Loading State */}
      {success && profile ? (
        <>
          {/* Profile Info Card - 3 column layout */}
          <ProfileInfoCard profile={profile} />

          {/* Profile Form for editing other details */}
          <ProfileForm initialProfile={profile} />
        </>
      ) : (
        // Handle case where profile fetch failed or profile doesn't exist
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <AlertTriangle className="w-12 h-12 text-error mb-4" />
            <h2 className="card-title">Could not load profile</h2>
            <p className="text-base-content/70">
              {error || "An unexpected error occurred."} (Status:{" "}
              {status || 500})
            </p>
            <p className="text-sm mt-2">
              Please try again later or contact support.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
