'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaSearch, FaMap, FaCalendar, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navigationItems = [
    { icon: FaHome, label: 'Home', href: '/' },
    { icon: FaSearch, label: 'Explore', href: '/explore' },
    { icon: FaMap, label: 'Services', href: '/services' },
    { icon: FaCalendar, label: 'Bookings', href: '/dashboard' },
    { icon: FaShoppingCart, label: 'Shop', href: '/shop' },
    { icon: FaUser, label: 'Profile', href: '/profile' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
          className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-full shadow-lg transition-colors duration-300"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden"
          >
            {/* Header */}
            <div className="bg-orange-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Varanasi Tourism</h2>
                <button
                  onClick={closeMenu}
                  className="p-2 hover:bg-orange-700 rounded-full transition-colors duration-200"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <p className="text-orange-100 text-sm mt-2">
                Discover the spiritual heart of India
              </p>
            </div>

            {/* Navigation Items */}
            <div className="p-6">
              <nav className="space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <item.icon className="text-orange-600" size={20} />
                      <span className="text-gray-800 font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    Book Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full border border-orange-600 text-orange-600 hover:bg-orange-50 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    Contact Support
                  </motion.button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Info</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📞 +91 98765 43210</p>
                  <p>📧 info@varanasi-tourism.com</p>
                  <p>📍 Varanasi, Uttar Pradesh, India</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
