"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, Users, Menu as MenuIcon, X } from "lucide-react";
import React from "react"; // Import React

// Define props for the Sidebar component
interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
  userDropdown: React.ReactNode; // Accept the UserDropdown element as a prop
}

export function Sidebar({
  collapsed,
  toggleSidebar,
  userDropdown, // Destructure the userDropdown prop
}: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/users", label: "Users", icon: Users },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
    // Add more menu items as needed
  ];

  return (
    <aside
      className={`bg-base-100 h-screen flex flex-col shrink-0 transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64" // Adjust width based on collapsed state
      }`}
      aria-label="Sidebar Navigation"
    >
      {/* Sidebar Header */}
      <div className="flex items-center bg-base-100/80 backdrop-blur shadow-sm h-15 p-3 md:px-6 border-b border-base-300 shrink-0">
        {!collapsed && (
          <Link
            href="/dashboard"
            className="text-xl font-bold text-primary mr-auto"
          >
            ZMN Admin
          </Link>
        )}
        <button
          onClick={toggleSidebar} // Use the passed toggle function
          className="btn btn-ghost btn-square ml-auto"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <MenuIcon size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="menu space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center p-2 rounded-md ${
                  // Apply active styles using daisyUI 'active' class or specific color classes
                  (pathname.startsWith(item.href) &&
                    item.href !== "/dashboard") ||
                  pathname === item.href
                    ? "active bg-primary text-primary-content"
                    : "hover:bg-base-200"
                } ${collapsed ? "justify-center" : ""}`}
                title={collapsed ? item.label : undefined} // Tooltip for collapsed state
              >
                <item.icon size={20} className={!collapsed ? "mr-3" : ""} />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Render the User Dropdown passed via props */}
      <div className={`mt-auto p-4 ${collapsed ? "flex justify-center" : ""}`}>
        {userDropdown} {/* Render the prop here */}
      </div>

      {/* Sidebar Footer (Optional) */}
      {!collapsed && (
        <div className="p-4 border-t border-base-300 shrink-0">
          {" "}
          {/* Removed mt-auto from here */}
          <p className="text-xs text-base-content/60 text-center">
            © 2025 ZMN Admin
          </p>
        </div>
      )}
    </aside>
  );
}
