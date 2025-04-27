// filepath: /Users/sohelzaman/dev/nextjs-leaning/zmn-admin/components/common/stats-grid.tsx
import { ArrowUp, ArrowDown } from "lucide-react";
import type { LucideIcon } from "lucide-react"; // Import the type

// Define the type for a single stat item
interface StatItem {
  id: string | number; // Unique key for mapping
  title: string;
  value: string;
  icon: LucideIcon; // Use the LucideIcon type
  change: string; // e.g., "+10.8%" or "-6.8%"
  changeType: "increase" | "decrease";
  description: string;
}

// Define the props for the StatsGrid component
interface StatsGridProps {
  stats: StatItem[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.id} className="card bg-base-100 shadow">
          {" "}
          {/* Use card for individual stats */}
          <div className="card-body p-4">
            {" "}
            {/* Adjust padding as needed */}
            {/* Top section: Title and Icon */}
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm font-medium text-base-content/80">
                {stat.title}
              </div>
              <div className="bg-base-200 p-2 rounded-md">
                {" "}
                {/* Icon background */}
                <stat.icon className="w-5 h-5 text-base-content/80" />
              </div>
            </div>
            {/* Middle section: Value and Change */}
            <div className="flex items-end gap-2 mb-1">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div
                className={`badge badge-sm ${
                  stat.changeType === "increase"
                    ? "badge-success"
                    : "badge-error"
                } gap-1`}
              >
                {stat.changeType === "increase" ? (
                  <ArrowUp size={12} />
                ) : (
                  <ArrowDown size={12} />
                )}
                {stat.change.replace(/[-+]/, "")} {/* Remove +/- sign */}
              </div>
            </div>
            {/* Bottom section: Description */}
            <div className="text-xs text-base-content/60">
              {stat.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
