import { Card } from "@/components/ui/card";

export function RecentActivitiesCard() {
  // In a real application, this data would come from an API or server action
  const activities = [
    {
      time: "09:30 AM",
      description: "New user registration",
      status: "success",
    },
    {
      time: "10:15 AM",
      description: "Product #45672 updated",
      status: "primary",
    },
    {
      time: "11:45 AM",
      description: "Inventory alert: Low stock",
      status: "warning",
    },
    {
      time: "01:20 PM",
      description: "Payment failed: Order #2311",
      status: "error",
    },
  ];

  return (
    <Card>
      <div className="card-body">
        <h2 className="card-title">Recent Activities</h2>
        <ul className="timeline timeline-vertical">
          {activities.map((activity, index) => (
            <li key={index}>
              <div className="timeline-start">{activity.time}</div>
              <div className="timeline-middle">
                <div className={`status status-${activity.status}`}></div>
              </div>
              <div className="timeline-end">{activity.description}</div>
            </li>
          ))}
        </ul>
        <div className="card-actions justify-end mt-2">
          <button className="btn btn-ghost btn-sm">View All Activities</button>
        </div>
      </div>
    </Card>
  );
}
