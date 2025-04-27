import { Icon } from "@/components/ui/icon";

interface MetricsCardProps {
  title: string;
  value: number;
  unit: string;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const MetricsCard = ({
  title,
  value,
  unit,
  icon,
  trend,
}: MetricsCardProps) => {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="rounded-lg bg-primary/10 p-3">
            <Icon icon={icon} className="h-6 w-6 text-primary" />
          </div>
          {trend && (
            <div
              className={`badge badge-sm ${
                trend.isPositive ? "badge-success" : "badge-error"
              }`}
            >
              <Icon
                icon={`lucide:trending-${trend.isPositive ? "up" : "down"}`}
                className="h-3 w-3"
              />
              {trend.value}%
            </div>
          )}
        </div>
        <div className="mt-3">
          <p className="text-base-content/60">{title}</p>
          <p className="text-2xl font-bold">
            {value}
            <span className="text-base font-normal text-base-content/60">
              {unit}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
