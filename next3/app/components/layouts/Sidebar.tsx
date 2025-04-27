'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Define navigation menu type
type MenuItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  submenu?: MenuItem[];
};

// Dashboard icons (you can replace with actual icons)
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ProductsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const OrdersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const CustomersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// Define the navigation items
const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    title: 'Products',
    path: '/dashboard/products',
    icon: <ProductsIcon />,
    submenu: [
      {
        title: 'All Products',
        path: '/dashboard/products',
        icon: <></>,
      },
      {
        title: 'Add Product',
        path: '/dashboard/products/add',
        icon: <></>,
      },
      {
        title: 'Categories',
        path: '/dashboard/products/categories',
        icon: <></>,
      },
    ],
  },
  {
    title: 'Orders',
    path: '/dashboard/orders',
    icon: <OrdersIcon />,
  },
  {
    title: 'Customers',
    path: '/dashboard/customers',
    icon: <CustomersIcon />,
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: <SettingsIcon />,
  },
];

export default function Sidebar({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    // Find if current path matches any submenu and open it
    for (const item of menuItems) {
      if (item.submenu && item.submenu.some(subItem => pathname === subItem.path)) {
        setOpenSubmenu(item.title);
        break;
      }
    }
  }, [pathname]);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`h-screen bg-base-200 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex h-16 items-center justify-between px-4">
        {!isCollapsed && (
          <div className="text-xl font-bold text-primary">AdminDash</div>
        )}
        <button onClick={toggleCollapse} className="btn btn-ghost btn-sm">
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      <ul className="menu menu-sm px-3 py-4 min-h-full">
        {menuItems.map((item) => (
          <li key={item.title}>
            {item.submenu ? (
              <>
                <div
                  className={`flex items-center ${pathname.startsWith(item.path) ? 'active font-medium' : ''}`}
                  onClick={() => toggleSubmenu(item.title)}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {!isCollapsed && <span>{item.title}</span>}
                  </span>
                  {!isCollapsed && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-transform ${openSubmenu === item.title ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
                {openSubmenu === item.title && !isCollapsed && (
                  <ul className="pl-4">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.path}>
                        <Link
                          href={subItem.path}
                          className={pathname === subItem.path ? 'active font-medium' : ''}
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link
                href={item.path}
                className={`flex items-center ${pathname === item.path ? 'active font-medium' : ''}`}
              >
                {item.icon}
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
} 