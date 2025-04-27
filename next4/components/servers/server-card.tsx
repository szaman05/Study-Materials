import { Server } from "@/types/server";
import { Icon } from "@/components/ui/icon";

export const ServerCard = ({ server }: { server: Server }) => {
  const statusColors = {
    online: "text-success",
    offline: "text-error",
    maintenance: "text-warning",
  };

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon
              icon={`lucide:${server.type}`}
              className="h-8 w-8 text-primary"
            />
            <div>
              <h3 className="font-semibold">{server.name}</h3>
              <p className="text-sm text-base-content/60">{server.ip}</p>
            </div>
          </div>
          <div
            className={`flex items-center gap-2 ${statusColors[server.status]}`}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            <span className="text-sm capitalize">{server.status}</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-base-content/60">CPU Usage</p>
            <progress
              className="progress progress-primary w-full"
              value={server.metrics.cpu}
              max="100"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-base-content/60">Memory Usage</p>
            <progress
              className="progress progress-secondary w-full"
              value={server.metrics.memory}
              max="100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
