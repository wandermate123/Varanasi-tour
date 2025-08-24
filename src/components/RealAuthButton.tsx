'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function RealAuthButton() {
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  if (status === 'loading') {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center space-x-3">
        <Link
          href="/auth/signin"
          className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/auth/signup"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  const user = session.user;
  const membershipType = (user as any).membership?.toLowerCase() || 'basic';
  const membershipColor = 
    membershipType === 'vip' ? 'from-purple-500 to-purple-600' :
    membershipType === 'premium' ? 'from-blue-500 to-blue-600' :
    'from-gray-400 to-gray-500';

  return (
    <div className="relative">
      <motion.button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || 'User avatar'}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
            />
          ) : (
            <div className={`w-10 h-10 bg-gradient-to-br ${membershipColor} rounded-full flex items-center justify-center text-white font-semibold shadow-md`}>
              {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          )}
          
          {/* Membership Badge */}
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br ${membershipColor} rounded-full border-2 border-white flex items-center justify-center`}>
            <span className="text-white text-xs font-bold">
              {membershipType === 'vip' ? '👑' : 
               membershipType === 'premium' ? '⭐' : '🔹'}
            </span>
          </div>
        </div>

        <div className="hidden sm:block text-left">
          <p className="text-sm font-semibold text-gray-900 truncate max-w-24">
            {user.name || 'User'}
          </p>
          <p className="text-xs text-gray-500 capitalize">
            {membershipType} Member
          </p>
        </div>

        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {showDropdown && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setShowDropdown(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
            >
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || 'User avatar'}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className={`w-12 h-12 bg-gradient-to-br ${membershipColor} rounded-full flex items-center justify-center text-white font-semibold text-lg`}>
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {user.name || 'User'}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {user.email}
                    </p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                      membershipType === 'vip' ? 'bg-purple-100 text-purple-800' :
                      membershipType === 'premium' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {membershipType?.toUpperCase()} Member
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <Link
                  href="/dashboard"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z" />
                  </svg>
                  Dashboard
                </Link>

                <Link
                  href="/profile"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>

                <Link
                  href="/bookings"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  My Bookings
                </Link>

                <Link
                  href="/settings"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </Link>
              </div>

              {/* Sign Out */}
              <div className="border-t border-gray-100 pt-2">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 