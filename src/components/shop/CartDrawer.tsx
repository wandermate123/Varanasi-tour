'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Drawer - Mobile Optimized */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-white shadow-xl z-50"
          >
            {/* Header - Mobile Optimized */}
            <div className="flex justify-between items-center p-4 sm:p-6 border-b">
              <h2 className="text-xl sm:text-2xl font-serif">Shopping Cart</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 touch-target">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items - Mobile Optimized */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {items.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <p className="text-sm sm:text-base text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 sm:gap-4">
                      <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base md:text-lg font-medium line-clamp-2">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">₹{item.price.toLocaleString()}</p>
                        <div className="flex items-center gap-2 mt-2 sm:mt-3">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="text-gray-500 hover:text-gray-700 touch-target w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
                          >
                            -
                          </button>
                          <span className="w-6 sm:w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-gray-700 touch-target w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
                          >
                            +
                          </button>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="ml-auto text-red-500 hover:text-red-700 touch-target text-xs sm:text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Mobile Optimized */}
            <div className="border-t p-4 sm:p-6">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <span className="text-base sm:text-lg font-medium">Total</span>
                <span className="text-lg sm:text-xl font-bold">₹{total.toLocaleString()}</span>
              </div>
              <button
                onClick={() => {/* Implement checkout */}}
                disabled={items.length === 0}
                className="w-full bg-gray-900 text-white py-3 sm:py-4 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed touch-target text-sm sm:text-base"
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 