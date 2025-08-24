'use client';

import { useCart } from '@/contexts/CartContext';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { state, removeFromCart, updateQuantity } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            href="/"
            className="inline-block py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white rounded-lg shadow"
              >
                {item.image && (
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
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
                  <p className="font-semibold text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 mt-2 text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Taxes</span>
                <span>₹{(state.total * 0.18).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{(state.total * 1.18).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link
              href="/checkout"
              className="block w-full py-2 px-4 bg-blue-600 text-white text-center rounded hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 