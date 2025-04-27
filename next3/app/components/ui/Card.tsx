import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
  variant?: 'default' | 'compact' | 'bordered' | 'glass';
}

export default function Card({
  title,
  subtitle,
  children,
  className = '',
  actions,
  variant = 'default',
}: CardProps) {
  // Define base classes
  const baseClasses = 'card overflow-hidden shadow-sm';
  
  // Define variant-specific classes
  const variantClasses = {
    default: 'bg-base-100',
    compact: 'card-compact bg-base-100',
    bordered: 'bg-base-100 border border-base-300',
    glass: 'glass',
  };
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {(title || subtitle) && (
        <div className="card-title p-4 pb-0 gap-2">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {subtitle && <p className="text-sm opacity-60">{subtitle}</p>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {actions && (
        <div className="card-actions p-4 pt-0 justify-end">
          {actions}
        </div>
      )}
    </div>
  );
} 