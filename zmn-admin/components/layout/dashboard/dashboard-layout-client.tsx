"use client";

import { useState, ReactNode, useCallback } from "react"; // Import useCallback
import { Sidebar } from "@/components/layout/sidebar/sidebar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ErrorBoundary } from "@/components/common/error-boundary";
import { usePathname } from "next/navigation";
import { ThemeToggleFab } from "@/components/common/theme-toggle-fab";

interface DashboardLayoutClientProps {
  children: ReactNode;
  userDropdown: ReactNode; // Add userDropdown prop
}

export function DashboardLayoutClient({
  children,
  userDropdown, // Destructure userDropdown
}: DashboardLayoutClientProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // Use useCallback for the toggle function if passed down further or used in effects
  const toggleSidebar = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  // Function to get page title based on pathname
  const getPageTitle = useCallback(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments.length === 1 && pathSegments[0] === "dashboard") {
      return "Dashboard";
    }
    if (pathSegments.length > 1) {
      const lastSegment = pathSegments[pathSegments.length - 1];
      // Capitalize first letter and replace hyphens with spaces
      return (
        lastSegment.charAt(0).toUpperCase() +
        lastSegment.slice(1).replace(/-/g, " ")
      );
    }
    return "Page"; // Default title
  }, [pathname]); // Dependency array includes pathname

  return (
    <div className="flex h-screen overflow-hidden bg-base-200">
      {/* Pass userDropdown prop to Sidebar */}
      <Sidebar
        collapsed={collapsed}
        toggleSidebar={toggleSidebar}
        userDropdown={userDropdown}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Consider extracting Header to a separate component if it grows */}
        <header className="sticky top-0 z-10 bg-base-100/80 backdrop-blur shadow-sm h-15 p-3 md:px-6 border-b border-base-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h1 className="text-xl md:text-2xl font-semibold text-base-content order-2 sm:order-1">
              {getPageTitle()}
            </h1>
            <div className="order-1 sm:order-2">
              <Breadcrumbs />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <ErrorBoundary>
            {/* Removed redundant title/breadcrumbs div, handled in header */}
            <div>{children}</div>
          </ErrorBoundary>
        </main>
      </div>
      <ThemeToggleFab />
    </div>
  );
}
