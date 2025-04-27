"use client";

import { useState } from "react";
import { ServerCard } from "@/components/servers/server-card";
import { MetricsCard } from "@/components/servers/metrics-card";
import { Icon } from "@/components/ui/icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { Server, ServerStatus, ServerType } from "@/types/server";

const mockServers: Server[] = [
  {
    id: "1",
    name: "Web Server 01",
    status: "online",
    type: "web",
    ip: "192.168.1.100",
    location: "US East",
    metrics: {
      cpu: 45,
      memory: 60,
      disk: 72,
      network: { up: 150, down: 200 },
      uptime: 99.9,
    },
  },
  {
    id: "2",
    name: "DB Server 01",
    status: "online",
    type: "database",
    ip: "192.168.1.101",
    location: "US West",
    metrics: {
      cpu: 65,
      memory: 80,
      disk: 45,
      network: { up: 90, down: 120 },
      uptime: 99.95,
    },
  },
  {
    id: "3",
    name: "Cache Server 01",
    status: "maintenance",
    type: "cache",
    ip: "192.168.1.102",
    location: "EU West",
    metrics: {
      cpu: 30,
      memory: 45,
      disk: 25,
      network: { up: 80, down: 100 },
      uptime: 98.5,
    },
  },
];

export default function ServersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ServerType | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<ServerStatus | "all">(
    "all"
  );

  // Filter servers based on search and filters
  const filteredServers = mockServers.filter((server) => {
    const matchesSearch =
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.ip.includes(searchQuery);
    const matchesType = selectedType === "all" || server.type === selectedType;
    const matchesStatus =
      selectedStatus === "all" || server.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const totalServers = filteredServers.length;
  const avgCpu = Math.round(
    filteredServers.reduce((acc, server) => acc + server.metrics.cpu, 0) /
      totalServers
  );
  const avgMemory = Math.round(
    filteredServers.reduce((acc, server) => acc + server.metrics.memory, 0) /
      totalServers
  );
  const avgUptime = Number(
    (
      filteredServers.reduce((acc, server) => acc + server.metrics.uptime, 0) /
      totalServers
    ).toFixed(2)
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value as ServerType | "all");
  };

  const handleStatusFilter = (status: ServerStatus | "all") => {
    setSelectedStatus(status);
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Top Navigation */}
      <div className="border-b border-base-200">
        <div className="container mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Server Management</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="btn btn-primary btn-sm">
              <Icon icon="lucide:plus" className="h-4 w-4" />
              Add Server
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Metrics Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricsCard
            title="Total Servers"
            value={totalServers}
            unit="servers"
            icon="lucide:server"
            trend={{ value: 8, isPositive: true }}
          />
          <MetricsCard
            title="Average CPU"
            value={avgCpu}
            unit="%"
            icon="lucide:cpu"
            trend={{ value: 5, isPositive: avgCpu < 75 }}
          />
          <MetricsCard
            title="Memory Usage"
            value={avgMemory}
            unit="%"
            icon="lucide:memory-stick"
            trend={{ value: 12, isPositive: avgMemory < 80 }}
          />
          <MetricsCard
            title="Uptime"
            value={avgUptime}
            unit="%"
            icon="lucide:activity"
          />
        </div>

        {/* Server Management Section */}
        <div className="mt-8 rounded-lg bg-base-200 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">Server Status</h2>
              <div className="join">
                <button
                  className={`btn btn-sm join-item ${
                    selectedStatus === "all" ? "btn-active" : ""
                  }`}
                  onClick={() => handleStatusFilter("all")}
                >
                  All
                </button>
                <button
                  className={`btn btn-sm join-item ${
                    selectedStatus === "online" ? "btn-active" : ""
                  }`}
                  onClick={() => handleStatusFilter("online")}
                >
                  Online
                </button>
                <button
                  className={`btn btn-sm join-item ${
                    selectedStatus === "maintenance" ? "btn-active" : ""
                  }`}
                  onClick={() => handleStatusFilter("maintenance")}
                >
                  Maintenance
                </button>
                <button
                  className={`btn btn-sm join-item ${
                    selectedStatus === "offline" ? "btn-active" : ""
                  }`}
                  onClick={() => handleStatusFilter("offline")}
                >
                  Offline
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="join">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search servers..."
                  className="input input-bordered input-sm join-item w-full sm:w-64"
                />
                <button className="btn btn-primary btn-sm join-item">
                  <Icon icon="lucide:search" className="h-4 w-4" />
                </button>
              </div>

              <select
                value={selectedType}
                onChange={handleTypeChange}
                className="select select-bordered select-sm w-full sm:w-40"
              >
                <option value="all">All Types</option>
                <option value="web">Web Servers</option>
                <option value="database">Database</option>
                <option value="cache">Cache</option>
                <option value="worker">Workers</option>
              </select>
            </div>
          </div>

          {/* Server Grid */}
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredServers.map((server) => (
              <ServerCard key={server.id} server={server} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
