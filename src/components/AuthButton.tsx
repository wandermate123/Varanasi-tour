'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, LogOut, Settings } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
    );
  }

  if (status === 'authenticated' && session?.user) {
    const user = {
      name: session.user.name || 'User',
      email: session.user.email || '',
      membershipType: (session.user as any).membership?.toLowerCase() || 'basic'
    };
    return (
      <div className="relative group">
        {/* User Avatar */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 bg-white rounded-full px-3 py-2 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-gray-700 font-medium hidden sm:block">
            {user.name.split(' ')[0]}
          </span>
        </motion.button>

        {/* Dropdown Menu */}
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <div className="p-3 border-b border-gray-100">
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <div className="mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                user.membershipType === 'premium' 
                  ? 'bg-orange-100 text-orange-700'
                  : user.membershipType === 'vip'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {user.membershipType.charAt(0).toUpperCase() + user.membershipType.slice(1)} Member
              </span>
            </div>
          </div>
          
          <div className="p-2">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            
            <Link
              href="/dashboard?tab=settings"
              className="flex items-center space-x-2 w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>
            
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center space-x-2 w-full px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <Link
        href="/auth/signin"
        className="group inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white text-gray-900 px-5 py-2.5 text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900/10"
      >
        <span>Sign In</span>
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
      
      {/* Tooltip for clarity */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-xl z-50">
        Sign in
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
      </div>
    </div>
  );
} 