// filepath: /Users/sohelzaman/dev/nextjs-leaning/zmn-admin/components/layout/sidebar/logout-button.tsx
"use client";

import { LogOut } from "lucide-react";
import { useFormStatus } from "react-dom";

// Define props including the server action type
interface LogoutButtonProps {
  logoutAction: () => Promise<void>; // Action redirects, so Promise<void>
}

// Separate component for the button content to use useFormStatus
function ButtonContent() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <LogOut size={16} />
      )}
      Logout
    </>
  );
}

export function LogoutButton({ logoutAction }: LogoutButtonProps) {
  return (
    // Use a form to trigger the server action
    <form action={logoutAction} className="w-full">
      {/* Style the button to match the menu item appearance */}
      <button
        type="submit"
        className="flex items-center gap-2 text-error w-full p-2 rounded-md hover:bg-base-200 focus:bg-base-200"
      >
        <ButtonContent />
      </button>
    </form>
  );
}
