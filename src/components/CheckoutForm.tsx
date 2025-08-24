'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import PaymentButton from './PaymentButton';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutForm() {
  const { state, clearCart } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: 'India',
    zipCode: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentSuccess = (response: any) => {
    console.log('Payment successful:', response);
    clearCart();
    router.push('/payment-success');
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
  };

  if (!mounted) {
    return null;
  }

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2 mb-4">
          {state.items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{item.name} x {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{state.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>GST (18%)</span>
            <span>₹{state.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold border-t pt-2 mt-2">
            <span>Total</span>
            <span>₹{state.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <PaymentButton
          amount={state.total}
          name={`${formData.firstName} ${formData.lastName}`}
          email={formData.email}
          description={`WanderMate Order - ${state.items.length} items`}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          className="w-full py-3 text-lg font-medium"
        />
      </div>
    </form>
  );
} 