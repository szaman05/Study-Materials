import React from 'react';
import Card from '../ui/Card';
import Table from '../ui/Table';
import Link from 'next/link';

// Define Order type
interface Order {
  id: string;
  customer: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  amount: number;
  paymentMethod: string;
}

interface RecentOrdersProps {
  orders?: Order[];
  loading?: boolean;
  limit?: number;
}

export default function RecentOrders({
  orders = [],
  loading = false,
  limit = 5,
}: RecentOrdersProps) {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: Order['status'] }) => {
    const statusStyles: Record<Order['status'], string> = {
      pending: 'badge-warning',
      processing: 'badge-info',
      shipped: 'badge-primary',
      delivered: 'badge-success',
      cancelled: 'badge-error',
    };

    return (
      <span className={`badge ${statusStyles[status]} badge-sm`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Define table columns
  const columns = [
    {
      header: 'Order ID',
      accessor: (order: Order) => (
        <Link href={`/dashboard/orders/${order.id}`} className="font-medium text-primary hover:underline">
          #{order.id}
        </Link>
      ),
    },
    {
      header: 'Customer',
      accessor: 'customer',
    },
    {
      header: 'Date',
      accessor: 'date',
    },
    {
      header: 'Amount',
      accessor: (order: Order) => formatCurrency(order.amount),
      className: 'text-right',
    },
    {
      header: 'Status',
      accessor: (order: Order) => <StatusBadge status={order.status} />,
      className: 'text-center',
    },
  ];

  // Sample data for demo purposes
  const sampleOrders: Order[] = [
    {
      id: '1234',
      customer: 'John Doe',
      status: 'delivered',
      date: '2024-06-15',
      amount: 125.99,
      paymentMethod: 'Credit Card',
    },
    {
      id: '1235',
      customer: 'Jane Smith',
      status: 'processing',
      date: '2024-06-14',
      amount: 75.50,
      paymentMethod: 'PayPal',
    },
    {
      id: '1236',
      customer: 'Robert Johnson',
      status: 'pending',
      date: '2024-06-14',
      amount: 249.99,
      paymentMethod: 'Credit Card',
    },
    {
      id: '1237',
      customer: 'Emily Davis',
      status: 'shipped',
      date: '2024-06-13',
      amount: 149.00,
      paymentMethod: 'Credit Card',
    },
    {
      id: '1238',
      customer: 'Michael Wilson',
      status: 'cancelled',
      date: '2024-06-12',
      amount: 99.95,
      paymentMethod: 'Debit Card',
    },
  ];

  // Use sample data if no orders provided
  const displayOrders = orders.length > 0 ? orders : sampleOrders;
  const limitedOrders = displayOrders.slice(0, limit);

  return (
    <Card
      title="Recent Orders"
      actions={
        <Link href="/dashboard/orders" className="btn btn-ghost btn-sm">
          View All
        </Link>
      }
    >
      <Table
        data={limitedOrders}
        columns={columns}
        isLoading={loading}
        rowKey="id"
        onRowClick={(order) => console.log(`Clicked on order ${order.id}`)}
      />
    </Card>
  );
}