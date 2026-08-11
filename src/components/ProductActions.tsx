'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function ProductActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  const handleIncrease = () => {
    setQuantity(q => q + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleOrderNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, quantity, true);
    router.push('/checkout');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
      {/* Quantity Selector */}
      <div className="flex items-center border-2 border-gray-200 rounded-full w-max overflow-hidden bg-white">
        <button 
          onClick={handleDecrease}
          className="w-12 h-14 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-foreground text-xl font-medium transition-colors"
        >
          -
        </button>
        <input
          type="text"
          value={quantity}
          readOnly
          className="w-12 text-center font-bold text-lg focus:outline-none"
        />
        <button 
          onClick={handleIncrease}
          className="w-12 h-14 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-foreground text-xl font-medium transition-colors"
        >
          +
        </button>
      </div>

      <button
        onClick={handleOrderNow}
        className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/30 transition-all hover:-translate-y-1"
      >
        Order Now
      </button>

      <button
        onClick={handleAddToCart}
        className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-foreground w-14 h-14 rounded-full transition-colors tooltip relative group"
        title="Add to Cart"
      >
        <ShoppingCart size={24} />
      </button>
    </div>
  );
}
