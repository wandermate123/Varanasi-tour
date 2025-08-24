'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RecentActivities } from '@/components/dashboard/RecentActivities';
import { UpcomingTrips } from '@/components/dashboard/UpcomingTrips';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we're not loading and the user isn't authenticated
    if (status === 'unauthenticated') {
      console.log('Not authenticated, redirecting to sign in...');
      router.replace('/auth/signin');
    }
  }, [status, router]);

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // If not loading and not authenticated, return null (useEffect will handle redirect)
  if (status === 'unauthenticated' || !session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {session.user.name?.split(' ')[0]}!
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Here's what's happening with your travel plans
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <section className="mb-8">
          <DashboardStats />
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Trips Section - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <UpcomingTrips />
          </div>

          {/* Recent Activities Section */}
          <div className="lg:col-span-1">
            <RecentActivities />
          </div>
        </div>
      </div>
    </div>
  );
} 