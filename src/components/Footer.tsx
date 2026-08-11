"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const pathname = usePathname();

  // Don't show footer on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t-4 border-primary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-jute-light">EcoJute</h3>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              100% Natural. 100% Sustainable. Handcrafted with love in
              Bangladesh to bring eco-friendly solutions to your everyday life.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white"
              >
                <FaXTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Shop Categories
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/products?category=bags"
                  className="hover:text-primary transition-colors"
                >
                  Jute Bags
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=baskets"
                  className="hover:text-primary transition-colors"
                >
                  Storage Baskets
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=pethouse"
                  className="hover:text-primary transition-colors"
                >
                  Pet Houses
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=paposh"
                  className="hover:text-primary transition-colors"
                >
                  Paposh (Mats)
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Customer Service
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/products"
                  className="hover:text-primary transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-primary transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="hover:text-primary transition-colors"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <span>123 Green Street, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+880 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span>hello@ecojute.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} EcoJute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
