// /Users/sohelzaman/dev/nextjs-leaning/zmn-admin/app/admin/users/page.tsx
import { UserManagementClient } from "@/components/users/user-management-client";
import { getUsersWithProfiles } from "@/lib/actions/appwrite/auth"; // Or users.ts if you moved it

export default async function UserManagementPage() {
  // Fetch users server-side for initial load
  const { users, error } = await getUsersWithProfiles();

  if (error) {
    // Handle error display appropriately
    return <div className="p-4 text-error">Error loading users: {error}</div>;
  }

  return (
    <div className="p-4 md:p-6 space-y-4">
      <h1 className="text-2xl font-semibold">User Management</h1>
      {/* Pass fetched users to the client component */}
      <UserManagementClient initialUsers={users || []} />
    </div>
  );
}