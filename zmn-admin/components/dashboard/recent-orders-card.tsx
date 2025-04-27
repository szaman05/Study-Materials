import Link from "next/link";
import { Card } from "@/components/ui/card";

export function RecentOrdersCard() {
  // In a real application, this data would come from an API or server action
  const recentOrders = [
    {
      id: "#2315",
      customer: "John Smith",
      status: "Completed",
      total: "$126.00",
    },
    {
      id: "#2314",
      customer: "Jane Cooper",
      status: "Processing",
      total: "$75.50",
    },
    {
      id: "#2313",
      customer: "Mike Anderson",
      status: "Shipped",
      total: "$249.99",
    },
    {
      id: "#2312",
      customer: "Sarah Wilson",
      status: "Cancelled",
      total: "$92.00",
    },
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "badge-success";
      case "processing":
        return "badge-warning";
      case "shipped":
        return "badge-primary";
      case "cancelled":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  return (
    <Card>
      <div className="card-body">
        <h2 className="card-title">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>
                    <span
                      className={`badge badge-sm ${getStatusBadgeClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-actions justify-end mt-2">
          <Link href="/orders" className="btn btn-primary btn-sm">
            View All Orders
          </Link>
        </div>
      </div>
    </Card>
  );
}
