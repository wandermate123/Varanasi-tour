import { Metadata } from 'next';
import Link from 'next/link';
import { XCircleIcon } from '@heroicons/react/24/solid';

export const metadata: Metadata = {
  title: 'Order Cancelled - WanderMate',
  description: 'Your order has been cancelled',
};

export default function CheckoutCancelPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto text-center">
        <XCircleIcon className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Order Cancelled</h1>
        <p className="text-gray-600 mb-8">
          Your order has been cancelled. No charges have been made to your account.
        </p>
        <div className="space-y-4">
          <Link
            href="/cart"
            className="block w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Return to Cart
          </Link>
          <Link
            href="/"
            className="block w-full py-2 px-4 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
} 