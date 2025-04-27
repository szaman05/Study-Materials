import React from 'react';

type TrendType = 'up' | 'down' | 'neutral';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    type: TrendType;
    value: string;
    label?: string;
  };
  className?: string;
  footer?: React.ReactNode;
  loading?: boolean;
  colorClass?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  trend,
  className = '',
  footer,
  loading = false,
  colorClass = 'bg-base-100',
}: StatsCardProps) {
  // Trend icon component
  const TrendIcon = ({ type }: { type: TrendType }) => {
    if (type === 'up') {
      return (
        <svg className="h-3 w-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      );
    } else if (type === 'down') {
      return (
        <svg className="h-3 w-3 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      );
    }
    return (
      <svg className="h-3 w-3 text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
      </svg>
    );
  };

  return (
    <div className={`card shadow-sm ${colorClass} ${className}`}>
      <div className="card-body p-5">
        {loading ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <div className="h-4 bg-base-300 rounded w-1/3 animate-pulse"></div>
              <div className="h-8 w-8 bg-base-300 rounded-full animate-pulse"></div>
            </div>
            <div className="h-8 bg-base-300 rounded w-1/2 animate-pulse mb-2"></div>
            <div className="h-4 bg-base-300 rounded w-1/4 animate-pulse"></div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-base font-medium opacity-70">{title}</h3>
              {icon && <div className="text-primary">{icon}</div>}
            </div>
            <div className="text-2xl font-bold">{value}</div>
            {trend && (
              <div className="flex items-center gap-1 text-xs mt-1">
                <TrendIcon type={trend.type} />
                <span className={`font-medium ${trend.type === 'up' ? 'text-success' : trend.type === 'down' ? 'text-error' : 'text-base-content/70'}`}>
                  {trend.value}
                </span>
                {trend.label && <span className="opacity-70">{trend.label}</span>}
              </div>
            )}
            {footer && <div className="text-sm mt-2 opacity-70">{footer}</div>}
          </>
        )}
      </div>
    </div>
  );
} 