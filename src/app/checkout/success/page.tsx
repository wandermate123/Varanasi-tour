import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export const metadata: Metadata = {
  title: 'Order Successful - WanderMate',
  description: 'Your order has been successfully processed',
};

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto text-center">
        <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-8">
          Your payment has been successfully processed. You will receive a confirmation email shortly.
        </p>
        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="block w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            View Your Dashboard
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