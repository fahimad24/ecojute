"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShoppingBag } from "lucide-react";
import { createOrder, getProfile, User } from "@/lib/api";
import { useCart } from "@/context/CartContext";

function CheckoutContent() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const delivery = 60;
  const total = totalPrice + delivery;

  useEffect(() => {
    getProfile().then((profile) => {
      if (profile) {
        setUser(profile);
        setFormData((prev) => ({
          ...prev,
          name: profile.name,
          phone: prev.phone,
          address: prev.address,
        }));
      }
    });
  }, []);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);

    const orderData = {
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      totalAmount: total,
      userId: user?.id || null,
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
    };

    const res = await createOrder(orderData);
    if (res.success) {
      clearCart();
      router.push(`/order-success/${res.data.id}`);
    } else {
      alert("Failed to place order. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Checkout</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Order Form */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-black">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Delivery Information
              </h2>

              <form onSubmit={handleOrder} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full text-black bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full text-black bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                    placeholder="01XXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Delivery Address
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full text-black bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow resize-none"
                    placeholder="House, Road, Area, City"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading || items.length === 0}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 disabled:opacity-50"
                  >
                    <CheckCircle2 size={24} />
                    {loading ? "Processing..." : "Place Order"}
                  </button>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Cash on delivery available. Pay when you receive the
                    product.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-112.5">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sticky top-24 text-black">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {items.length > 0 ? (
                <>
                  <div className="space-y-4 pb-6 border-b border-gray-100 max-h-100 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden relative shrink-0">
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
                        <div className="flex-1 flex flex-col justify-center">
                          <h3 className="font-bold text-foreground line-clamp-1 leading-tight">
                            {item.product.name}
                          </h3>
                          <div className="flex justify-between mt-1">
                            <p className="text-gray-500 text-sm">
                              Qty: {item.quantity}
                            </p>
                            <p className="text-primary font-bold text-sm">
                              ৳{item.product.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="py-6 space-y-4 border-b border-gray-100">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium text-foreground">
                        ৳{totalPrice}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Charge</span>
                      <span className="font-medium text-foreground">
                        ৳{delivery}
                      </span>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-between items-end">
                    <span className="text-lg font-bold text-foreground">
                      Total
                    </span>
                    <span className="text-3xl font-extrabold text-primary">
                      ৳{total}
                    </span>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center text-gray-400">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                  Your cart is empty.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
