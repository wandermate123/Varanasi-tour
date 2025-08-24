'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function DemoPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [demoUser, setDemoUser] = useState<'test' | 'demo' | 'john' | 'jane'>('test');

  const demoCredentials = {
    test: { email: 'test@wandermate.com', password: 'TestPassword123!' },
    demo: { email: 'demo@example.com', password: 'DemoPassword123!' },
    john: { email: 'john.doe@example.com', password: 'JohnPassword123!' },
    jane: { email: 'jane.smith@example.com', password: 'JanePassword123!' }
  };

  const features = [
    {
      title: 'User Registration',
      description: 'Complete sign-up flow with validation',
      link: '/signup',
      icon: '📝'
    },
    {
      title: 'User Login',
      description: 'Secure sign-in with remember me option',
      link: '/login',
      icon: '🔑'
    },
    {
      title: 'Password Reset',
      description: 'Forgot password with email recovery',
      link: '/forgot-password',
      icon: '🔐'
    },
    {
      title: 'User Dashboard',
      description: 'Personalized dashboard with tabs',
      link: '/dashboard',
      icon: '📊'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24">
      <div className="container max-w-6xl mx-auto px-6 py-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            WanderMate Authentication Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our complete authentication system with real features and beautiful UI
          </p>
        </motion.div>

        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Current Status</h2>
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <p className="text-lg text-green-600 font-semibold">✅ Authenticated</p>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-gray-600">{user.email}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                      user.membershipType === 'vip' ? 'bg-purple-100 text-purple-800' :
                      user.membershipType === 'premium' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.membershipType?.toUpperCase()} Member
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-lg text-gray-600">🔒 Not authenticated</p>
              )}
            </div>
            
            {/* Quick Auth Actions */}
            <div className="flex gap-3">
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/login"
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <Link
                  href="/dashboard"
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Test Credentials</h2>
          <p className="text-gray-600 mb-6">Use these pre-configured accounts to test the authentication system:</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(demoCredentials).map(([key, creds]) => (
              <div key={key} className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2 capitalize">{key} Account</h3>
                <div className="space-y-1 text-sm font-mono">
                  <p className="text-gray-600">Email: <span className="text-blue-600">{creds.email}</span></p>
                  <p className="text-gray-600">Password: <span className="text-green-600">{creds.password}</span></p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${creds.email}\n${creds.password}`);
                  }}
                  className="mt-2 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Copy Credentials
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {features.map((feature, index) => (
            <Link key={feature.title} href={feature.link}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className="mt-4 text-blue-600 font-semibold flex items-center">
                  Try it out
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Password strength validation
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Secure token management
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Route protection with HOC
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Session persistence
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Experience</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Smooth animations with Framer Motion
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Real-time form validation
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Loading states and error handling
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Responsive design
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </motion.div>

      </div>
    </div>
  );
} 