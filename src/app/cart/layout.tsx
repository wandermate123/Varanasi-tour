import Header from '@/components/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart - WanderMate',
  description: 'View and manage your selected tours, activities, and services.',
};

export default function CartLayout({
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