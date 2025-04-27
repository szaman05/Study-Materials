'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

// Define prop types
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Mock user data - in a real app, this would come from authentication
  const userInfo = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  };

  return (
    <div className="flex h-screen overflow-hidden bg-base-200/50">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header userInfo={userInfo} />

        {/* Main Content Area with Scrolling */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="footer footer-center p-4 bg-base-100 text-base-content border-t">
          <div>
            <p>Copyright © 2024 - AdminDash</p>
          </div>
        </footer>
      </div>
    </div>
  );
} 