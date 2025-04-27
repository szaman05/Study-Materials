// filepath: /Users/sohelzaman/dev/nextjs-leaning/zmn-admin/app/dashboard/page.tsx
import { StatsGrid } from "@/components/common/stats-grid";
import { DollarSign, Package, Users, CreditCard } from "lucide-react"; // Import necessary icons

export default function DashboardPage() {
  // Sample data - replace with actual data fetching
  const statsData = [
    {
      id: 1,
      title: "Revenue",
      value: "$587.54",
      icon: DollarSign,
      change: "+10.8%",
      changeType: "increase" as const, // Use 'as const' for type safety
      description: "vs. $494.16 last period",
    },
    {
      id: 2,
      title: "Sales",
      value: "4500",
      icon: Package,
      change: "+21.2%",
      changeType: "increase" as const,
      description: "vs. 3845 last period",
    },
    {
      id: 3,
      title: "Customers",
      value: "2242",
      icon: Users,
      change: "-6.8%",
      changeType: "decrease" as const,
      description: "vs. 2448 last period",
    },
    {
      id: 4,
      title: "Spending",
      value: "$112.54",
      icon: CreditCard, // Changed icon to CreditCard for variety
      change: "+8.5%",
      changeType: "increase" as const,
      description: "vs. $98.14 last period",
    },
  ];

  return (
    <div>
      {/* Other dashboard content */}
      <StatsGrid stats={statsData} />
      {/* More dashboard content */}
    </div>
  );
}
