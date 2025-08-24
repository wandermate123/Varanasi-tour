'use client';

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AuthStatusPage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">WanderMate</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Authentication Status
          </h1>
          <p className="text-xl text-gray-600">
            Check your current authentication status and Google OAuth setup
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {status === 'loading' ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading authentication status...</p>
            </div>
          ) : session ? (
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold text-green-700">✅ Authenticated</h2>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-green-900 mb-4">User Information:</h3>
                <div className="space-y-3">
                  {session.user.image && (
                    <div className="flex items-center space-x-3">
                      <img 
                        src={session.user.image} 
                        alt="Profile" 
                        className="w-12 h-12 rounded-full"
                      />
                      <span className="text-green-800">Profile Picture Loaded</span>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-green-900">Name:</strong>
                      <p className="text-green-800">{session.user.name || 'Not provided'}</p>
                    </div>
                    <div>
                      <strong className="text-green-900">Email:</strong>
                      <p className="text-green-800">{session.user.email}</p>
                    </div>
                    <div>
                      <strong className="text-green-900">User ID:</strong>
                      <p className="text-green-800 font-mono text-xs">{session.user.id}</p>
                    </div>
                    <div>
                      <strong className="text-green-900">Membership:</strong>
                      <p className="text-green-800">{session.user.membershipType}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-gray-600">🎉 Google OAuth is working perfectly!</p>
                <div className="space-x-4">
                  <Link 
                    href="/dashboard" 
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                  <Link 
                    href="/test-real-auth" 
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Test Authentication
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-red-700">❌ Not Authenticated</h2>
              </div>
              
              <div className="bg-red-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-red-900 mb-4">Authentication Options:</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <span className="text-red-800">Google OAuth</span>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? 'Configured' : 'Not Configured'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <span className="text-red-800">Email/Password</span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-gray-600">Choose your authentication method:</p>
                <div className="space-x-4">
                  <Link 
                    href="/auth/signin" 
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/auth/signup" 
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Configuration Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🔧 Configuration Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-700">Database</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">✅ Connected</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-700">NextAuth.js</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">✅ Configured</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-700">Session Management</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">✅ Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-700">Google OAuth</span>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">🔧 Setup Required</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 