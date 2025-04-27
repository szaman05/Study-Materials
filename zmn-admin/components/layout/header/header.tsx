"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-base-100 shadow-md p-4">
      <div className="flex justify-between items-center">
        <div>{/* Header content */}</div>

        <label className="swap swap-rotate btn btn-ghost btn-circle">
          <input
            type="checkbox"
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            checked={theme === "dark"}
          />
          {theme === "dark" ? (
            <Sun className="w-5 h-5 swap-on" />
          ) : (
            <Moon className="w-5 h-5 swap-off" />
          )}
        </label>
      </div>
    </header>
  );
}
