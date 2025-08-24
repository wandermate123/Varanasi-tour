'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CartDrawer from '@/components/shop/CartDrawer';
import MobileNavigation from '@/components/MobileNavigation';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Cart Icon - Mobile Optimized */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsCartOpen(true)}
        className="fixed right-4 sm:right-6 bottom-20 sm:bottom-6 z-50 bg-gray-900 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-lg flex items-center justify-center touch-target"
      >
        <div className="relative">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </div>
      </motion.button>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      {/* Main Content with Mobile Navigation */}
      <div className="pb-20 lg:pb-0">
        {children}
      </div>

      <MobileNavigation />
    </div>
  );
} 