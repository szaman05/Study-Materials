import React from 'react';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
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

// Define column type that matches the Table component
interface Column {
  header: string;
  accessor: keyof Order | ((data: Order) => React.ReactNode);
  className?: string;
}

export default function OrdersPage() {
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
  const columns: Column[] = [
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
      accessor: 'customer' as keyof Order,
    },
    {
      header: 'Date',
      accessor: 'date' as keyof Order,
    },
    {
      header: 'Amount',
      accessor: (order: Order) => formatCurrency(order.amount),
      className: 'text-right',
    },
    {
      header: 'Payment Method',
      accessor: 'paymentMethod' as keyof Order,
    },
    {
      header: 'Status',
      accessor: (order: Order) => <StatusBadge status={order.status} />,
      className: 'text-center',
    },
  ];

  // Sample data for demo purposes
  const orders: Order[] = [
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
    {
      id: '1239',
      customer: 'Sarah Thompson',
      status: 'delivered',
      date: '2024-06-11',
      amount: 189.50,
      paymentMethod: 'Credit Card',
    },
    {
      id: '1240',
      customer: 'David Brown',
      status: 'pending',
      date: '2024-06-10',
      amount: 59.99,
      paymentMethod: 'PayPal',
    },
    {
      id: '1241',
      customer: 'Lisa Anderson',
      status: 'processing',
      date: '2024-06-09',
      amount: 249.99,
      paymentMethod: 'Credit Card',
    },
    {
      id: '1242',
      customer: 'James Wilson',
      status: 'shipped',
      date: '2024-06-08',
      amount: 129.95,
      paymentMethod: 'Debit Card',
    },
    {
      id: '1243',
      customer: 'Jennifer Clark',
      status: 'delivered',
      date: '2024-06-07',
      amount: 85.50,
      paymentMethod: 'PayPal',
    },
  ];

  // Pagination component
  const Pagination = () => (
    <div className="join">
      <button className="join-item btn btn-sm">«</button>
      <button className="join-item btn btn-sm">1</button>
      <button className="join-item btn btn-sm btn-active">2</button>
      <button className="join-item btn btn-sm">3</button>
      <button className="join-item btn btn-sm">4</button>
      <button className="join-item btn btn-sm">»</button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex gap-2">
          <div className="join">
            <div>
              <div>
                <input className="input input-bordered join-item" placeholder="Search orders..."/>
              </div>
            </div>
            <select className="select select-bordered join-item">
              <option disabled selected>Filter</option>
              <option>All</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
            <div className="indicator">
              <button className="btn join-item">Search</button>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <Table
          data={orders}
          columns={columns}
          rowKey="id"
          pagination={<Pagination />}
        />
      </Card>
    </div>
  );
} 