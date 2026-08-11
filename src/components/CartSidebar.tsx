"use client";

import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartSidebar() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalPrice,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-100 bg-white z-101 shadow-2xl flex flex-col transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag size={24} className="text-primary" />
            Your Cart
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
              <ShoppingBag size={64} className="opacity-20" />
              <p>Your cart is empty</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-2 bg-primary/10 text-primary font-medium rounded-full hover:bg-primary/20 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
                    <Image
                      src={
                        item.product.images?.[0] ||
                        "https://images.unsplash.com/photo-1622560480654-d96214fdc887"
                      }
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 line-clamp-1">
                        {item.product.name}
                      </h3>
                      <p className="text-primary font-bold">
                        ৳{item.product.price}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="px-3 py-1 text-gray-500 hover:bg-gray-50 rounded-l-lg"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-medium text-sm border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="px-3 py-1 text-gray-500 hover:bg-gray-50 rounded-r-lg"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">
                ৳{totalPrice}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 transition-all hover:-translate-y-1"
            >
              Proceed to Checkout <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
