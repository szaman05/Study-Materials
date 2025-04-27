"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter((path) => path);

    // Filter out the 'dashboard' segment if it's the first one
    const relevantPaths = paths[0] === "dashboard" ? paths.slice(1) : paths;

    // Generate breadcrumbs based on the remaining segments
    const basePath = "/dashboard"; // Base path for dashboard links
    return relevantPaths.map((path, index) => {
      // Construct the href by joining the relevant segments after 'dashboard'
      const currentPath = relevantPaths.slice(0, index + 1).join("/");
      return {
        href: `${basePath}/${currentPath}`, // Prepend /dashboard/
        // Capitalize and replace hyphens for the label
        label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " "),
        isLast: index === relevantPaths.length - 1,
      };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {/* Base Dashboard Link */}
        <li>
          <Link
            href="/dashboard"
            className="link link-hover flex items-center gap-1"
          >
            {" "}
            {/* Added link classes and gap */}
            <Home size={16} />
            Dashboard
          </Link>
        </li>
        {/* Dynamically generated breadcrumbs */}
        {breadcrumbs.map((breadcrumb) => (
          <li key={breadcrumb.href}>
            {breadcrumb.isLast ? (
              // Use span for the last item (current page)
              <span className="text-base-content/80">{breadcrumb.label}</span>
            ) : (
              // Use Link for intermediate items
              <Link href={breadcrumb.href} className="link link-hover">
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
