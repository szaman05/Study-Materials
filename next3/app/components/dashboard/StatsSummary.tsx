import React from 'react';
import StatsCard from '../ui/StatsCard';

interface StatsSummaryProps {
  loading?: boolean;
  stats?: {
    sales?: {
      value: number | string;
      change: number | string;
      trend: 'up' | 'down' | 'neutral';
    };
    orders?: {
      value: number | string;
      change: number | string;
      trend: 'up' | 'down' | 'neutral';
    };
    customers?: {
      value: number | string;
      change: number | string;
      trend: 'up' | 'down' | 'neutral';
    };
    profit?: {
      value: number | string;
      change: number | string;
      trend: 'up' | 'down' | 'neutral';
    };
  };
}

const SalesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const OrdersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const CustomersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const ProfitIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export default function StatsSummary({ loading = false, stats }: StatsSummaryProps) {
  // Default data if none provided
  const defaultStats = {
    sales: { value: "$0", change: "0%", trend: "neutral" as const },
    orders: { value: 0, change: "0%", trend: "neutral" as const },
    customers: { value: 0, change: "0%", trend: "neutral" as const },
    profit: { value: "$0", change: "0%", trend: "neutral" as const },
  };

  const displayStats = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Sales"
        value={displayStats.sales?.value || "$0"}
        icon={<SalesIcon />}
        trend={displayStats.sales ? {
          type: displayStats.sales.trend,
          value: String(displayStats.sales.change),
          label: "vs last period"
        } : undefined}
        loading={loading}
        colorClass="bg-base-100"
      />

      <StatsCard
        title="Orders"
        value={displayStats.orders?.value || 0}
        icon={<OrdersIcon />}
        trend={displayStats.orders ? {
          type: displayStats.orders.trend,
          value: String(displayStats.orders.change),
          label: "vs last period"
        } : undefined}
        loading={loading}
        colorClass="bg-base-100"
      />

      <StatsCard
        title="Customers"
        value={displayStats.customers?.value || 0}
        icon={<CustomersIcon />}
        trend={displayStats.customers ? {
          type: displayStats.customers.trend,
          value: String(displayStats.customers.change),
          label: "vs last period"
        } : undefined}
        loading={loading}
        colorClass="bg-base-100"
      />

      <StatsCard
        title="Profit"
        value={displayStats.profit?.value || "$0"}
        icon={<ProfitIcon />}
        trend={displayStats.profit ? {
          type: displayStats.profit.trend,
          value: String(displayStats.profit.change),
          label: "vs last period"
        } : undefined}
        loading={loading}
        colorClass="bg-base-100"
      />
    </div>
  );
} 