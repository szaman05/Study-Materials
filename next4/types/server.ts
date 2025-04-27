export type ServerStatus = 'online' | 'offline' | 'maintenance';
export type ServerType = 'web' | 'database' | 'cache' | 'worker';

export interface ServerMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: {
    up: number;
    down: number;
  };
  uptime: number;
}

export interface Server {
  id: string;
  name: string;
  status: ServerStatus;
  type: ServerType;
  ip: string;
  location: string;
  metrics: ServerMetrics;
}
