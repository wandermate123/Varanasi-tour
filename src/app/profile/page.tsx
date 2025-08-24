'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      await update(data); // Update session data
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
            <p className="text-gray-600 mt-2">Manage your account settings</p>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-4xl text-gray-500">
                    {session.user?.name?.[0]?.toUpperCase() || '?'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Membership Badge */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              {session.user.membershipType || 'Basic'} Member
            </span>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div className="flex justify-center space-x-4">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 