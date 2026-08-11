'use client';

import { useEffect, useState } from 'react';
import { getToken, Order } from '@/lib/api';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    fetch(`${API_URL}/admin/stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { if (data.success) setStats(data.data); });

    fetch(`${API_URL}/admin/recent-orders`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { if (data.success) setRecentOrders(data.data); });
  }, []);

  const statCards = stats ? [
    { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-blue-500', lightBg: 'bg-blue-50', textColor: 'text-blue-600' },
    { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'bg-green-500', lightBg: 'bg-green-50', textColor: 'text-green-600' },
    { label: 'Total Revenue', value: `৳${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'bg-purple-500', lightBg: 'bg-purple-50', textColor: 'text-purple-600' },
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-orange-500', lightBg: 'bg-orange-50', textColor: 'text-orange-600' },
  ] : [];

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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's your store overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.lightBg} rounded-xl flex items-center justify-center ${card.textColor}`}>
                <card.icon size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-1">{card.label}</p>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Order ID</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Customer</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Phone</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Amount</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.length > 0 ? recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-900">#{order.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{order.customerName}</td>
                  <td className="px-6 py-4 text-gray-500">{order.phone}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">৳{order.totalAmount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">No orders yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
