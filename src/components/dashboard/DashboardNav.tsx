'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardNav = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex space-x-8">
              <Link
                href="/dashboard"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/dashboard')
                    ? 'text-orange-500 dark:text-orange-400 border-b-2 border-orange-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Home className="w-5 h-5 mr-2" />
                Dashboard
              </Link>

              <Link
                href="/dashboard/settings"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/dashboard/settings')
                    ? 'text-orange-500 dark:text-orange-400 border-b-2 border-orange-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}; 