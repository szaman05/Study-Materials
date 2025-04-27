"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

export function ThemeToggleFab() {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State to track the theme

  useEffect(() => {
    setMounted(true);
    // Check the current theme from localStorage or default to light
    const currentTheme = localStorage.getItem("theme") || "light";
    setIsDarkMode(currentTheme === "dark");
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  function toggleTheme() {
    const newTheme = isDarkMode ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setIsDarkMode(!isDarkMode); // Update the state
  }

  if (!mounted) {
    return null; // Prevent rendering during SSR
  }

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-circle btn-primary fixed bottom-6 right-6 z-50 shadow-lg"
      aria-label="Toggle theme"
    >
      {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </button>
  );
}
