'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitcher from '../ui/ThemeSwitcher';

// Interface for user info
interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
}

export default function Header({ userInfo }: { userInfo?: UserInfo }) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Demo notifications
  const notifications = [
    { id: 1, message: 'New order received', time: '2 min ago', read: false },
    { id: 2, message: 'Product out of stock', time: '1 hour ago', read: false },
    { id: 3, message: 'Customer review received', time: '3 hours ago', read: true },
  ];

  // Get current page title
  const getPageTitle = () => {
    const path = pathname.split('/').filter(Boolean);
    if (path.length === 0) return 'Dashboard';
    
    // Get the last segment and format it
    const lastSegment = path[path.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  return (
    <div className="navbar bg-base-100 border-b">
      <div className="flex-1">
        <div className="text-xl font-semibold">{getPageTitle()}</div>
      </div>
      <div className="flex-none gap-2">
        {/* Search */}
        <div className="form-control hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        
        {/* Theme Switcher */}
        <ThemeSwitcher />
        
        {/* Notifications */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item">{notifications.filter(n => !n.read).length}</span>
            </div>
          </div>
          {showNotifications && (
            <div
              tabIndex={0}
              className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-base-100 text-base-content"
            >
              <div className="card-body">
                <h3 className="card-title text-sm font-bold">Notifications</h3>
                <div className="divider my-0"></div>
                <ul className="menu p-0 [&_li>*]:rounded-md">
                  {notifications.map((notification) => (
                    <li key={notification.id}>
                      <a className={`${notification.read ? 'opacity-60' : 'font-semibold'}`}>
                        <div>
                          <div className="text-sm">{notification.message}</div>
                          <div className="text-xs opacity-60">{notification.time}</div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="divider my-0"></div>
                <Link href="/dashboard/notifications" className="btn btn-ghost btn-sm btn-block justify-center">
                  View All
                </Link>
              </div>
            </div>
          )}
        </div>
        
        {/* User profile dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="w-10 rounded-full">
              <img alt="User avatar" src={userInfo?.avatar || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
            </div>
          </div>
          {showUserMenu && (
            <ul tabIndex={0} className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge badge-sm">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 