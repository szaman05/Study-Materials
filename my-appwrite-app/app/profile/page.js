// app/profile/page.js (Server Component)
import { getCurrentUser } from "@/actions/auth";
import { getCurrentUserProfile } from "@/actions/profile";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/ProfileForm"; // Import the client component form

export default async function ProfilePage() {
  // 1. Check if user is logged in (fetches Appwrite Account)
  const user = await getCurrentUser();

  // If not logged in, redirect to login page
  if (!user) {
    redirect("/login");
  }

  // 2. Fetch the user's profile document data
  const profileResult = await getCurrentUserProfile();

  // ProfileForm needs the initial data, handle cases where it might be missing
  const initialProfileData = profileResult.success
    ? profileResult.profile
    : null;

  // If profile fetch failed unexpectedly (not just 404), show an error
  if (!profileResult.success && profileResult.status !== 404) {
    return (
      <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Error Loading Profile</h2>
        <p>{profileResult.error}</p>
        {profileResult.details && (
          <p className="text-sm mt-1">Details: {profileResult.details}</p>
        )}
      </div>
    );
  }
  // If profile is not found (404), maybe show a specific message or allow creation?
  // For now, we'll still render the form but it will be empty / show default values.
  if (profileResult.status === 404) {
    console.warn(
      `Profile document not found for user ${user.name} (${user.$id}). Rendering form with empty fields.`
    );
    // Optionally, you could show a message indicating the profile needs to be created/completed.
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Profile</h2>
        <p className="text-gray-700">
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">User ID:</span> {user.$id}
        </p>
        {/* Display initial profile data if fetched */}
        {initialProfileData && (
          <>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Username (from profile):</span>{" "}
              {initialProfileData.username}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Bio:</span>{" "}
              {initialProfileData.bio || (
                <span className="italic text-gray-500">No bio set.</span>
              )}
            </p>
          </>
        )}
        {profileResult.status === 404 && (
          <p className="mt-2 text-orange-600 bg-orange-100 p-2 rounded border border-orange-300">
            Profile details not found. Please complete your profile below.
          </p>
        )}
      </div>

      {/* Render the ProfileForm (Client Component) and pass initial data */}
      <ProfileForm initialProfile={initialProfileData} />
    </div>
  );
}
