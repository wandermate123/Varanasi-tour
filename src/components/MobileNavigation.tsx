'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

export default function MobileNavigation() {
  const pathname = usePathname();
  const { state } = useCart();
  const [activeTab, setActiveTab] = useState('home');

  const navigationItems = [
    {
      id: 'home',
      name: 'Home',
      href: '/',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'explore',
      name: 'Explore',
      href: '/explore',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      id: 'shop',
      name: 'Shop',
      href: '/shop',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      id: 'cart',
      name: 'Cart',
      href: '/cart',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
        </svg>
      ),
      badge: state.items.length
    },
    {
      id: 'blog',
      name: 'Blog',
      href: '/blog',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    }
  ];

  return (
    <nav className="mobile-nav lg:hidden">
      <div className="grid grid-cols-5 gap-1 px-2">
        {navigationItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`mobile-nav-item relative ${
              pathname === item.href ? 'active' : ''
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <div className="relative">
              {item.icon}
              {item.badge && item.badge > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1 shadow-lg border border-white"
                  style={{ fontSize: '10px', lineHeight: '1' }}
                >
                  {item.badge > 99 ? '99+' : item.badge}
                </motion.div>
              )}
            </div>
            <span className="mobile-nav-icon-text">{item.name}</span>
            
            {/* Active indicator */}
            {pathname === item.href && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
} 