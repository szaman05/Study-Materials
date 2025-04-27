// /Users/sohelzaman/dev/nextjs-leaning/zmn-admin/components/users/user-table.tsx
"use client";

import type { UserProfile } from "@/types/profiles";
import { Trash2, Edit } from "lucide-react";

interface UserTableProps {
  users: UserProfile[];
  onDelete: (user: UserProfile) => void;
  onEdit: (user: UserProfile) => void;
  isLoading?: boolean; // Optional loading state
}

export function UserTable({ users, onDelete, onEdit, isLoading }: UserTableProps) {
  if (isLoading && users.length === 0) {
     return <div className="text-center p-4">Loading users... <span className="loading loading-spinner loading-sm"></span></div>;
  }

  if (!isLoading && users.length === 0) {
    return <div className="text-center p-4 italic">No users found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* Head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId} className="hover">
              <td>
                <div className="flex items-center gap-3">
                  {/* Optional: Add Avatar later */}
                  <div>
                    <div className="font-bold">{user.fullName}</div>
                    <div className="text-sm opacity-50">{user.userId}</div> {/* Display userId */}
                  </div>
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                 <span className={`badge badge-ghost badge-sm ${
                     user.role === 'admin' ? 'badge-secondary' :
                     user.role === 'editor' ? 'badge-primary' : ''
                 }`}>
                    {user.roleDisplayName || user.role}
                 </span>
              </td>
              <td>
                <span className={`badge ${user.isActive ? 'badge-success' : 'badge-error'} badge-sm`}>
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td>
                <div className="flex gap-2">
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => onEdit(user)}
                    title="Edit User"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="btn btn-ghost btn-xs text-error"
                    onClick={() => onDelete(user)}
                    title="Delete User"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}