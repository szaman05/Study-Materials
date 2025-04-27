import { Icon } from "@/components/ui/icon";
import { SidebarMenuItem } from "./sidebar/menu-item";
import Image from "next/image";
import { MenuItem, UserProfile } from "@/types/sidebar";

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: "lucide:monitor-dot",
    children: [
      { title: "Servers", path: "/servers" },
      //{ title: "CRM", path: "/dashboards/crm" },
    ],
  },
  // ...add other menu items following the same structure
];

const userProfile: UserProfile = {
  name: "Denish N",
  username: "@withden",
  avatar: "/images/avatars/1.png",
};

export const Sidebar = () => {
  return (
    <aside className="flex h-screen w-64 flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-base-200">
        <Image
          src="/images/logo/logo-dark.svg"
          alt="Logo"
          width={120}
          height={40}
          className="dark:hidden"
        />
        <Image
          src="/images/logo/logo-light.svg"
          alt="Logo"
          width={120}
          height={40}
          className="hidden dark:block"
        />
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <SidebarMenuItem key={index} item={item} />
          ))}
        </nav>
      </div>

      {/* User Profile */}
      <div className="border-t border-base-200 p-4">
        <div className="dropdown dropdown-top w-full">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-3 rounded-lg bg-base-200 p-3 hover:bg-base-300"
          >
            <div className="avatar">
              <Image
                src={userProfile.avatar}
                alt={userProfile.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{userProfile.name}</p>
              <p className="text-xs text-base-content/60">
                {userProfile.username}
              </p>
            </div>
            <Icon icon="lucide:chevrons-up-down" className="h-4 w-4" />
          </div>

          <ul className="dropdown-content menu rounded-box menu-sm z-50 mt-4 w-48 bg-base-100 p-2 shadow-lg">
            <li>
              <a href="/profile">
                <Icon icon="lucide:user" className="h-4 w-4" />
                Profile
              </a>
            </li>
            <li>
              <a href="/settings">
                <Icon icon="lucide:settings" className="h-4 w-4" />
                Settings
              </a>
            </li>
            <li>
              <a href="/logout">
                <Icon icon="lucide:log-out" className="h-4 w-4" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};
