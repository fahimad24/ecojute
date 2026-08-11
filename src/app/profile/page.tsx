'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProfile, getMyOrders, User, Order } from '@/lib/api';
import { Package, User as UserIcon, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getProfile();
      if (!profileData) {
        router.push('/login');
        return;
      }
      setUser(profileData);
      
      const ordersData = await getMyOrders();
      setOrders(ordersData);
      setLoading(false);
    };
    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('auth-change'));
    router.push('/login');
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-black">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                <UserIcon size={40} />
              </div>
              <h2 className="text-xl font-bold text-center text-gray-900">{user?.name}</h2>
              <p className="text-center text-gray-500 text-sm mb-6">{user?.email}</p>
              
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 font-medium text-primary flex items-center gap-3">
                  <Package size={18} /> My Orders
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors flex items-center gap-3"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Orders Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-black">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order History</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Package size={48} className="mx-auto mb-4 opacity-20" />
                  <p>You haven't placed any orders yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Order ID: #{order.id.slice(0, 8).toUpperCase()}</p>
                          <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-end pt-4 border-t border-gray-50">
                        <div>
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="font-bold text-gray-900">৳{order.totalAmount}</p>
                        </div>
                        <button 
                          onClick={() => router.push(`/order-success/${order.id}`)}
                          className="text-primary text-sm font-medium hover:underline"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
