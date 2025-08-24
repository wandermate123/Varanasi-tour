'use client';

import { useState } from 'react';
import Script from 'next/script';

interface PaymentButtonProps {
  amount: number;
  currency?: string;
  description?: string;
  name?: string;
  email?: string;
  contact?: string;
  className?: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentButton({
  amount,
  currency = 'INR',
  description = 'WanderMate Services',
  name = '',
  email = '',
  contact = '',
  className = '',
  onSuccess,
  onError
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      // Convert amount to paise (Razorpay expects amount in smallest currency unit)
      const amountInPaise = Math.round(amount * 100);

      // Create order
      const orderResponse = await fetch('/api/payments/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create_order',
          amount: amountInPaise,
          currency,
          customerInfo: { name, email, contact },
          metadata: {
            description
          }
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const orderData = await orderResponse.json();
      
      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        name: 'WanderMate',
        description: description,
        order_id: orderData.data.orderId,
        prefill: {
          name: name || undefined,
          email: email || undefined,
          contact: contact || undefined,
        },
        theme: {
          color: '#2563eb',
        },
        handler: async function(response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/payments/razorpay', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                action: 'verify_payment',
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed');
            }

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              onSuccess?.(verifyData.data);
            } else {
              throw new Error(verifyData.error || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            onError?.(error);
            setError(error instanceof Error ? error.message : 'Payment verification failed');
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function(response: any) {
        const error = response.error || {};
        setError(`Payment failed: ${error.description || 'Unknown error'}`);
        onError?.(error);
      });
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      setError(error instanceof Error ? error.message : 'Payment failed');
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <button
        onClick={handlePayment}
        disabled={loading}
        className={`relative px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 ${className}`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Processing...
          </div>
        ) : (
          'Pay Now'
        )}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </>
  );
} 