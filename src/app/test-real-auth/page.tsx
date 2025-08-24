'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface UserData {
  id: string;
  name: string;
  email: string;
  membershipType: string;
  createdAt: string;
  lastLogin: string;
  stats: {
    totalBookings: number;
    totalFavorites: number;
  };
}

export default function TestRealAuthPage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  // Fetch detailed user data when authenticated
  useEffect(() => {
    if (session?.user) {
      fetchUserData();
    }
  }, [session]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/user');
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
        addTestResult('✅ Successfully fetched user data from database');
      } else {
        addTestResult('❌ Failed to fetch user data');
      }
    } catch (error) {
      addTestResult('❌ Error fetching user data');
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const testRegistration = async () => {
    const testUser = {
      name: 'Test User',
      email: `test-${Date.now()}@wandermate.com`,
      password: 'TestPassword123!'
    };

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testUser)
      });

      if (response.ok) {
        addTestResult(`✅ Registration successful for ${testUser.email}`);
      } else {
        const error = await response.json();
        addTestResult(`❌ Registration failed: ${error.error}`);
      }
    } catch (error) {
      addTestResult('❌ Registration error');
    }
  };

  const testLogin = async () => {
    const result = await signIn('credentials', {
      email: 'test@wandermate.com',
      password: 'TestPassword123!',
      redirect: false
    });

    if (result?.ok) {
      addTestResult('✅ Login successful');
    } else {
      addTestResult(`❌ Login failed: ${result?.error}`);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-6">
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
            Real Authentication Test
          </h1>
          <p className="text-xl text-gray-600">
            Testing the real authentication system with database integration
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Authentication Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Authentication Status
            </h2>
            
            {session ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-medium">Authenticated</span>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Session Data:</h3>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>ID:</strong> {session.user.id}</p>
                    <p><strong>Name:</strong> {session.user.name}</p>
                    <p><strong>Email:</strong> {session.user.email}</p>
                    <p><strong>Membership:</strong> {session.user.membershipType}</p>
                  </div>
                </div>

                {userData && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Database Data:</h3>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p><strong>Created:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
                      <p><strong>Last Login:</strong> {userData.lastLogin ? new Date(userData.lastLogin).toLocaleString() : 'Never'}</p>
                      <p><strong>Bookings:</strong> {userData.stats.totalBookings}</p>
                      <p><strong>Favorites:</strong> {userData.stats.totalFavorites}</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => signOut()}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-700 font-medium">Not Authenticated</span>
                </div>
                
                <div className="space-y-2">
                  <Link
                    href="/auth/signup"
                    className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/auth/signin"
                    className="block w-full bg-gray-600 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            )}
          </motion.div>

          {/* Test Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Test Controls
            </h2>
            
            <div className="space-y-4">
              <button
                onClick={testRegistration}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Test Registration API
              </button>
              
              <button
                onClick={testLogin}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Test Login (demo user)
              </button>
              
              <button
                onClick={fetchUserData}
                disabled={!session}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Refresh User Data
              </button>
              
              <button
                onClick={() => setTestResults([])}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Clear Test Results
              </button>
            </div>
          </motion.div>
        </div>

        {/* Test Results */}
        {testResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Test Results
            </h2>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 max-h-64 overflow-y-auto">
              {testResults.map((result, index) => (
                <div key={index} className="mb-1">{result}</div>
              ))}
            </div>
          </motion.div>
        )}

        {/* System Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            System Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span>Real database storage with Prisma</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span>Secure password hashing with bcrypt</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span>NextAuth.js session management</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span>User registration and login</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-blue-500">🔧</span>
                <span>Google OAuth (when configured)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span>User profile management</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span>Membership tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span>Session persistence</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 