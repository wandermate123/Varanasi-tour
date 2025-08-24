import { DashboardNav } from '@/components/dashboard/DashboardNav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | WanderMate',
  description: 'View your travel statistics, upcoming trips, and recent activities',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardNav />
      {children}
    </>
  );
} 