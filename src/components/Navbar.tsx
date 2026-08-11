'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, User, X, Shield, ShoppingCart } from 'lucide-react';
import { getProfile, User as UserType } from '@/lib/api';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<UserType | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();


  useEffect(() => {
    const loadUser = () => {
      getProfile().then(setUser);
    };
    loadUser();

    // Listen for auth changes (login/logout)
    window.addEventListener('auth-change', loadUser);
    return () => window.removeEventListener('auth-change', loadUser);
  }, []);

  // Don't show navbar on admin pages
  if (pathname.startsWith('/admin')) return null;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop' },
    { href: '/products?category=bags', label: 'Bags' },
    { href: '/products?category=baskets', label: 'Baskets' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-lg border-b border-gray-200/60 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform shadow-sm">
            E
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">EcoJute</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className={`hover:text-primary transition-colors ${pathname === link.href ? 'text-primary font-semibold' : 'text-gray-600'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2">
          {user?.role === 'ADMIN' && (
            <Link
              href="/admin"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold hover:bg-primary/20 transition-colors"
            >
              <Shield size={14} /> Admin
            </Link>
          )}

          {user ? (
            <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Profile">
              <User className="w-5 h-5 text-gray-700" />
            </Link>
          ) : (
            <Link href="/login" className="hidden md:inline-flex items-center px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm">
              Sign In
            </Link>
          )}

          {/* Cart Icon */}
          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            onClick={() => setIsCartOpen(true)}
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="p-2 md:hidden hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {user?.role === 'ADMIN' && (
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="block py-3 px-4 rounded-xl text-primary font-medium hover:bg-primary/5 transition-colors"
            >
              Admin Panel
            </Link>
          )}
          {!user && (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block py-3 px-4 rounded-xl bg-primary text-white text-center font-medium"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
      
      {/* Cart Sidebar */}
      
    </nav>
  );
}
