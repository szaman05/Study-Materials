"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";

const themes = [
  { name: "light", icon: "lucide:sun" },
  { name: "dark", icon: "lucide:moon" },
  { name: "system", icon: "lucide:laptop" },
] as const;

export const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState<string>("system");

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "system";
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <div className="dropdown dropdown-end">
      <button
        className="btn btn-ghost btn-sm btn-circle"
        aria-label="Theme Toggle"
      >
        <Icon
          icon={
            themes.find((t) => t.name === currentTheme)?.icon || "lucide:sun"
          }
          className="h-5 w-5"
        />
      </button>
      <div className="dropdown-content mt-3 z-[1] bg-base-200 text-base-content rounded-box w-40 p-3 shadow-2xl">
        <div className="grid grid-cols-1 gap-2">
          {themes.map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => handleThemeChange(name)}
              className={`flex items-center gap-2 px-3 py-2 rounded-btn hover:bg-base-300 ${
                currentTheme === name ? "bg-primary text-primary-content" : ""
              }`}
            >
              <Icon icon={icon} className="h-4 w-4" />
              <span className="capitalize">{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
