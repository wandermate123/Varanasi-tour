'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SetupPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const envVariables = `# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email Configuration (Optional)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@wandermate.com"`;

  const setupSteps = [
    {
      title: 'Environment Variables',
      description: 'Copy this to your .env.local file in the root directory',
      content: envVariables,
      id: 'env'
    },
    {
      title: 'Google OAuth Setup',
      description: 'Follow these steps to set up Google authentication',
      content: `1. Go to Google Cloud Console (https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set Application Type to "Web application"
6. Add these URLs:
   - Authorized JavaScript origins: http://localhost:3000
   - Authorized redirect URIs: http://localhost:3000/api/auth/callback/google
7. Copy Client ID and Client Secret to .env.local`,
      id: 'google'
    },
    {
      title: 'Database Setup',
      description: 'Initialize your database',
      content: `npx prisma generate
npx prisma db push`,
      id: 'database'
    },
    {
      title: 'Create Test User',
      description: 'Add a test user manually (optional)',
      content: `npx prisma studio

Then navigate to http://localhost:5555 and add a user record`,
      id: 'testuser'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">WanderMate</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Real Authentication Setup
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Follow these steps to set up NextAuth.js with Google OAuth and database integration
          </p>
        </motion.div>

        {/* Features Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Get</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Google OAuth Login</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Email/Password Registration</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Secure Session Management</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Real Database Integration</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-700">User Profiles & Preferences</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-700">Membership Tiers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-700">Bookings & Favorites</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-700">Production Ready</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Setup Steps */}
        <div className="space-y-8">
          {setupSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
                    <code>{step.content}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(step.content, step.id)}
                    className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    {copiedSection === step.id ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mt-8"
        >
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Important Notes</h4>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• Never commit your .env.local file to version control</li>
                <li>• Change NEXTAUTH_SECRET in production to a secure random string</li>
                <li>• For production, use a proper database (PostgreSQL, MySQL)</li>
                <li>• Configure proper email service for password reset functionality</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-center mt-12"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">After Setup</h3>
          <div className="flex justify-center space-x-4">
            <Link
              href="/auth/signin"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              Test Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold"
            >
              Test Sign Up
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-semibold"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
} 