'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function Cart() {
  const { state, removeFromCart, updateQuantity } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {state.items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 p-4 bg-white rounded-lg shadow"
        >
          {item.image && (
            <div className="relative w-20 h-20">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded"
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
            {item.date && (
              <p className="text-sm text-gray-500">
                Date: {item.date} {item.time}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-1 mt-2 text-red-500 hover:text-red-700"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4 p-4 bg-white rounded-lg shadow">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">₹{state.total.toFixed(2)}</span>
        </div>
        <button
          onClick={() => window.location.href = '/checkout'}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
} 