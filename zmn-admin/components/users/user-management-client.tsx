// /Users/sohelzaman/dev/nextjs-leaning/zmn-admin/components/users/user-management-client.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, Edit, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { UserCreateForm } from "@/components/users/user-create-form"; // Your existing form
import { UserTable } from "@/components/users/user-table"; // The new table component
import { getUsersWithProfiles, deleteUserAndProfile } from "@/lib/actions/appwrite/auth"; // Or users.ts
import type { UserProfile } from "@/types/profiles";

// Define props if needed, e.g., initial data
interface UserManagementClientProps {
    initialUsers: UserProfile[];
}

export function UserManagementClient({ initialUsers }: UserManagementClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<UserProfile[]>(initialUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // State for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast display state
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  // Function to refresh user list
  const refreshUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getUsersWithProfiles();
      if (result.success && result.users) {
        setUsers(result.users);
      } else {
        setError(result.error || "Failed to fetch users.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle successful user creation
  const handleCreateSuccess = () => {
    setIsModalOpen(false); // Close modal
    setSuccessMessage("User created successfully!"); // Show success feedback
    refreshUsers(); // Refresh the table
  };

  // Handle delete request from table
  const handleDeleteRequest = (user: UserProfile) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  // Confirm and execute deletion
  const confirmDelete = async () => {
    if (!userToDelete || !userToDelete.userId) return;

    setIsDeleting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await deleteUserAndProfile(userToDelete.userId);
      if (result.success) {
        setSuccessMessage(result.message || "User deleted successfully.");
        // Refresh list optimistically or after success
        setUsers(currentUsers => currentUsers.filter(u => u.userId !== userToDelete.userId));
      } else {
        setError(result.error || "Failed to delete user.");
      }
    } catch (err) {
       setError(err instanceof Error ? err.message : "An unexpected error occurred during deletion.");
    } finally {
       setIsDeleting(false);
       setShowDeleteConfirm(false);
       setUserToDelete(null);
    }
  };

  // Handle edit request (placeholder)
  const handleEditRequest = (user: UserProfile) => {
    // TODO: Implement edit functionality
    // Typically involves opening another modal pre-filled with user data
    alert(`Edit action for user: ${user.fullName} (ID: ${user.userId}) - Not implemented yet.`);
    console.log("Edit user:", user);
  };

   // Effects for showing toasts
   useEffect(() => {
    if (successMessage) {
      setShowSuccessToast(true);
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
        setSuccessMessage(null); // Clear message after toast fades
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (error) {
      setShowErrorToast(true);
      const timer = setTimeout(() => {
        setShowErrorToast(false);
        // Don't clear error here, let user see it until next action
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);


  return (
    <div className="space-y-4">
       {/* Toast Notifications */}
       {showSuccessToast && successMessage && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <CheckCircle size={20} />
            <span>{successMessage}</span>
          </div>
        </div>
      )}
      {showErrorToast && error && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex justify-between items-center">
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} /> Add User
        </button>
        <button
            className={`btn btn-ghost ${isLoading ? 'loading' : ''}`}
            onClick={refreshUsers}
            disabled={isLoading}
            title="Refresh User List"
        >
           {!isLoading && <RefreshCw size={18} />}
        </button>
      </div>

      {/* User Table */}
      <UserTable
        users={users}
        onDelete={handleDeleteRequest}
        onEdit={handleEditRequest}
        isLoading={isLoading}
      />

      {/* Create User Modal */}
      {isModalOpen && (
        <dialog id="create_user_modal" className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl">
            {/* Pass the success handler to the form */}
            <UserCreateForm onSuccess={handleCreateSuccess} />
            <div className="modal-action mt-[-1rem] mr-2"> {/* Adjust positioning */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
          </div>
           {/* Optional: Click outside to close */}
           <form method="dialog" className="modal-backdrop">
             <button onClick={() => setIsModalOpen(false)}>close</button>
           </form>
        </dialog>
      )}

       {/* Delete Confirmation Modal */}
       {showDeleteConfirm && userToDelete && (
        <dialog id="delete_confirm_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error">Confirm Deletion</h3>
            <p className="py-4">
              Are you sure you want to delete user{" "}
              <strong>{userToDelete.fullName}</strong> ({userToDelete.email})?
              This action cannot be undone.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className={`btn btn-error ${isDeleting ? 'loading' : ''}`}
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete User'}
              </button>
            </div>
          </div>
           <form method="dialog" className="modal-backdrop">
             <button onClick={() => setShowDeleteConfirm(false)}>close</button>
           </form>
        </dialog>
      )}
    </div>
  );
}