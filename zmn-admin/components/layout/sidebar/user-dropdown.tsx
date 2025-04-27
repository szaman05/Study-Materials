import Link from "next/link";
import {
  ChevronsUpDown,
  User,
  Settings,
  LayoutDashboard,
  AlertCircle,
} from "lucide-react";
import { getCurrentUserProfile } from "@/lib/actions/appwrite/profile";
import { logout } from "@/lib/actions/appwrite/auth"; // Import the logout action
import { LogoutButton } from "./logout-button"; // Import the client component

export async function UserDropdown() {
  // Fetch user profile data using the existing profile action
  const {
    success,
    profile: userProfile,
    error,
  } = await getCurrentUserProfile();

  // Handle error state or if user profile is not found/not logged in
  if (!success || !userProfile) {
    // Use a more specific message if profile is missing vs. not logged in
    const errorMessage =
      error === "Profile not found."
        ? "Profile setup needed"
        : error || "Login required";
    return (
      <div className="p-2 text-error flex items-center gap-2 text-sm">
        <AlertCircle size={16} />
        <span>{errorMessage}</span>
      </div>
    );
  }

  // Use the fetched user profile data
  const user = {
    // Use fullName from the profile
    name: userProfile.fullName || "User", // Provide default if fullName is empty
    email: userProfile.email,
    // Use profileImageUrl from the profile
    avatarUrl:
      userProfile.profileImageUrl ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        userProfile.fullName || "U"
      )}&background=random`,
  };

  return (
    <div className="dropdown dropdown-top w-full">
      {/* Dropdown Trigger */}
      <div
        tabIndex={0}
        role="button"
        // Adjusted styling to look less like a button itself, more like a trigger area
        className="flex items-center justify-between w-full h-auto p-2 rounded-md hover:bg-base-200 cursor-pointer"
      >
        {/* Avatar */}
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-md">
              <img alt={`${user.name}'s Avatar`} src={user.avatarUrl} />
            </div>
          </div>
          {/* User Name and Email */}
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold">{user.name}</span>
            <span className="text-xs text-base-content/60">{user.email}</span>
          </div>
        </div>
        {/* Chevron Icon */}
        <ChevronsUpDown size={16} className="text-base-content/60" />
      </div>

      {/* Dropdown Content */}
      <ul
        tabIndex={0}
        // Use menu class for proper styling of items
        className="dropdown-content z-[50] menu p-2 shadow bg-base-100 rounded-box w-full mb-2"
      >
        <li>
          <Link href="/dashboard/profile" className="flex items-center gap-2">
            <User size={16} />
            Profile
          </Link>
        </li>
        <li>
          <Link href="/dashboard/settings" className="flex items-center gap-2">
            <Settings size={16} />
            Settings
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className="flex items-center gap-2">
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
        </li>
        <div className="divider my-1 px-4"></div>{" "}
        {/* Add padding to divider within menu */}
        {/* Replace the static button with the LogoutButton component */}
        <li>
          <LogoutButton logoutAction={logout} />
        </li>
      </ul>
    </div>
  );
}
