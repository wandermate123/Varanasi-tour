import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Globe, Shield, CreditCard, User, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const Settings = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    notifications: user?.preferences?.notifications || false,
    newsletter: user?.preferences?.newsletter || false,
    language: user?.preferences?.language || 'en'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const result = await updateProfile({
        ...user,
        name: formData.name,
        preferences: {
          notifications: formData.notifications,
          newsletter: formData.newsletter,
          language: formData.language as 'en' | 'hi'
        }
      });

      if (result.success) {
        setMessage('Settings updated successfully!');
      } else {
        setMessage(result.error || 'Failed to update settings');
      }
    } catch (error) {
      setMessage('An error occurred while updating settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('success') 
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Notifications</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Receive travel updates and alerts</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Newsletter</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Receive travel tips and guides</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
              </label>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Globe className="w-5 h-5 text-gray-400" />
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Language
                </label>
              </div>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Security
          </h3>
          <div className="space-y-4">
            <button
              type="button"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
            >
              <Shield className="w-5 h-5" />
              <span>Change Password</span>
            </button>
            <button
              type="button"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
            >
              <CreditCard className="w-5 h-5" />
              <span>Manage Payment Methods</span>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 bg-orange-500 text-white rounded-lg font-medium ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
            }`}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </motion.button>
        </div>
      </form>
    </div>
  );
}; 