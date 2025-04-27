import React from 'react';
import StatsSummary from '../components/dashboard/StatsSummary';
import RecentOrders from '../components/dashboard/RecentOrders';
import Card from '../components/ui/Card';

export default function DashboardPage() {
  // Sample stats data
  const statsData = {
    sales: { value: "$12,345", change: "12%", trend: "up" as const },
    orders: { value: 156, change: "8%", trend: "up" as const },
    customers: { value: 1234, change: "5%", trend: "up" as const },
    profit: { value: "$5,678", change: "-3%", trend: "down" as const },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Stats Summary Cards */}
        <StatsSummary stats={statsData} />

        {/* Main Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders - Takes 2/3 of the width on large screens */}
          <div className="lg:col-span-2">
            <RecentOrders />
          </div>

          {/* Quick Actions Card */}
          <div>
            <Card title="Quick Actions">
              <div className="space-y-2">
                <button className="btn btn-primary w-full">Add New Product</button>
                <button className="btn btn-outline w-full">Create Invoice</button>
                <button className="btn btn-outline w-full">Manage Inventory</button>
                <button className="btn btn-outline w-full">View Reports</button>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card title="Recent Activity">
            <ul className="timeline timeline-vertical">
              <li>
                <div className="timeline-start">10:00 AM</div>
                <div className="timeline-middle">
                  <div className="badge badge-primary badge-xs"></div>
                </div>
                <div className="timeline-end timeline-box">New customer registered</div>
                <hr />
              </li>
              <li>
                <hr />
                <div className="timeline-start">09:30 AM</div>
                <div className="timeline-middle">
                  <div className="badge badge-success badge-xs"></div>
                </div>
                <div className="timeline-end timeline-box">Order #1237 was marked as shipped</div>
                <hr />
              </li>
              <li>
                <hr />
                <div className="timeline-start">09:00 AM</div>
                <div className="timeline-middle">
                  <div className="badge badge-warning badge-xs"></div>
                </div>
                <div className="timeline-end timeline-box">Low inventory alert for Product XYZ</div>
                <hr />
              </li>
              <li>
                <hr />
                <div className="timeline-start">08:45 AM</div>
                <div className="timeline-middle">
                  <div className="badge badge-info badge-xs"></div>
                </div>
                <div className="timeline-end timeline-box">New order received (#1240)</div>
              </li>
            </ul>
          </Card>

          {/* Popular Products */}
          <Card title="Popular Products">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Sales</th>
                    <th className="text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Premium Headphones</td>
                    <td>45 units</td>
                    <td className="text-right">$4,500</td>
                  </tr>
                  <tr>
                    <td>Wireless Mouse</td>
                    <td>80 units</td>
                    <td className="text-right">$3,200</td>
                  </tr>
                  <tr>
                    <td>Bluetooth Speaker</td>
                    <td>67 units</td>
                    <td className="text-right">$2,680</td>
                  </tr>
                  <tr>
                    <td>Smart Watch</td>
                    <td>32 units</td>
                    <td className="text-right">$6,400</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 