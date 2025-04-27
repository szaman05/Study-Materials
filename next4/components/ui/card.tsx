import { Icon } from "./icon";

interface CardProps {
  title: string;
  value: string | number;
  icon: string;
  percentage: number;
  lastValue: string | number;
}

export const Card = ({
  title,
  value,
  icon,
  percentage,
  lastValue,
}: CardProps) => {
  const isPositive = percentage > 0;

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body gap-2">
        <div className="flex items-start justify-between gap-2 text-sm">
          <div>
            <p className="text-base-content/80 font-medium">{title}</p>
            <div className="mt-3 flex items-center gap-2">
              <p className="text-2xl font-semibold">{value}</p>
              <div
                className={`badge badge-soft ${
                  isPositive ? "badge-success" : "badge-error"
                } badge-sm gap-0.5 px-1 font-medium`}
              >
                <Icon
                  icon={`lucide:arrow-${isPositive ? "up" : "down"}`}
                  className="size-3.5"
                />
                {Math.abs(percentage)}%
              </div>
            </div>
          </div>
          <div className="bg-base-200 rounded-box flex items-center p-2">
            <Icon icon={icon} className="size-5" />
          </div>
        </div>
        <p className="text-base-content/60 text-sm">
          vs.<span className="mx-1">{lastValue}</span>last period
        </p>
      </div>
    </div>
  );
};
