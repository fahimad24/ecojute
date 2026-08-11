'use client';

import { use } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center text-black">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
          <CheckCircle2 size={40} />
        </div>
        
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-gray-500 mb-6">
          Thank you for your purchase. Your order has been placed successfully and is now being processed.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-8">
          <p className="text-sm text-gray-500 mb-1">Order Tracking ID</p>
          <p className="font-mono font-bold text-lg text-foreground tracking-wider">#{id.slice(0, 8).toUpperCase()}</p>
        </div>

        <div className="flex flex-col gap-3">
          <Link 
            href="/profile"
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl text-white bg-primary hover:bg-primary-dark font-medium transition-colors"
          >
            Track Order
          </Link>
          <Link 
            href="/products"
            className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-primary font-medium hover:bg-gray-50 transition-colors gap-2"
          >
            Continue Shopping <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
