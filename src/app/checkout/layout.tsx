import Header from '@/components/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout - WanderMate',
  description: 'Complete your purchase on WanderMate',
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gray-50">
        {children}
      </main>
    </>
  );
} 