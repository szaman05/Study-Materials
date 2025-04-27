import { ThemeProvider } from "@/components/providers/theme-provider";
import { DashboardLayoutClient } from "@/components/layout/dashboard/dashboard-layout-client"; // Import the client wrapper
import { UserDropdown } from "@/components/layout/sidebar/user-dropdown";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the current user's role

  const userDropdownElement = <UserDropdown />;

  return (
    <ThemeProvider>
      {/* Hidden element with role data for client components */}

      {/* Wrap the children with the client layout component */}
      <DashboardLayoutClient userDropdown={userDropdownElement}>
        {children}
      </DashboardLayoutClient>
    </ThemeProvider>
  );
}
