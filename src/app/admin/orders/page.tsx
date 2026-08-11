'use client';

import { useEffect, useState } from 'react';
import { getToken, Order } from '@/lib/api';
import { ShoppingCart } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    const token = getToken();
    if (!token) return;
    const res = await fetch(`${API_URL}/orders`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (data.success) setOrders(data.data);
    setLoading(false);
  };

  useEffect(() => { loadOrders(); }, []);

  const updateStatus = async (orderId: string, status: string) => {
    const token = getToken();
    await fetch(`${API_URL}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status })
    });
    loadOrders();
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-700',
      CONFIRMED: 'bg-blue-100 text-blue-700',
      DELIVERED: 'bg-green-100 text-green-700',
      CANCELLED: 'bg-red-100 text-red-700',
    };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 mt-1">View and manage all customer orders</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Order ID</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Customer</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Phone</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Address</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Amount</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400">Loading...</td></tr>
              ) : orders.length > 0 ? orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-900">#{order.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{order.customerName}</td>
                  <td className="px-6 py-4 text-gray-500">{order.phone}</td>
                  <td className="px-6 py-4 text-gray-500 max-w-50 truncate">{order.address}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">৳{order.totalAmount}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border-0 cursor-pointer ${getStatusBadge(order.status)}`}
                    >
                      <option value="PENDING" className="bg-white text-yellow-700">Pending</option>
                      <option value="CONFIRMED" className="bg-white text-blue-700">Confirmed</option>
                      <option value="DELIVERED" className="bg-white text-green-700">Delivered</option>
                      <option value="CANCELLED" className="bg-white text-red-700">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    <ShoppingCart size={32} className="mx-auto mb-3 opacity-30" />
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
