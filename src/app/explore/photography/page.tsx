'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaCamera, FaVideo, FaUsers, FaMapMarkerAlt, FaClock, FaStar, FaCheck, FaRupeeSign } from 'react-icons/fa';
import { photographyService, PhotographyPackage, BookingRequest } from '@/services/photographyService';

const categories = [
  { id: 'all', name: 'All Packages', icon: FaCamera },
  { id: 'wedding', name: 'Wedding', icon: FaUsers },
  { id: 'portrait', name: 'Portrait', icon: FaCamera },
  { id: 'event', name: 'Event', icon: FaVideo },
  { id: 'travel', name: 'Travel', icon: FaMapMarkerAlt }
];

export default function PhotographyPage() {
  const [packages, setPackages] = useState<PhotographyPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState<PhotographyPackage | null>(null);
  const [bookingStatus, setBookingStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formData, setFormData] = useState<BookingRequest>({
    packageId: '',
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    additionalNotes: ''
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const data = await photographyService.getPackages();
      setPackages(data);
      setError(null);
    } catch (err) {
      setError('Failed to load photography packages. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredPackages = selectedCategory === 'all'
    ? packages
    : packages.filter(pkg => pkg.category === selectedCategory);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) return;

    try {
      const bookingData: BookingRequest = {
        ...formData,
        packageId: selectedPackage.id
      };

      const response = await photographyService.createBooking(bookingData);

      if (response.success) {
        setBookingStatus({
          type: 'success',
          message: `Booking confirmed! Your booking ID is ${response.bookingId}`
        });
        setSelectedPackage(null);
        setFormData({
          packageId: '',
          name: '',
          email: '',
          phone: '',
          preferredDate: '',
          additionalNotes: ''
        });
      } else {
        setBookingStatus({
          type: 'error',
          message: response.message
        });
      }
    } catch (err) {
      setBookingStatus({
        type: 'error',
        message: 'Failed to create booking. Please try again later.'
      });
    }

    setTimeout(() => {
      setBookingStatus(null);
    }, 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl font-medium">Loading photography packages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-xl font-medium">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        <Image
          src="/images/photography/hero.jpg"
          alt="Photography Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3)',
                letterSpacing: '-0.02em'
              }}
            >
              Premium Photography Services
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-100 max-w-2xl mx-auto"
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                lineHeight: '1.6'
              }}
            >
              Capture your precious moments with our professional photography services in Varanasi
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(({ id, name, icon: Icon }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-100 hover:bg-white/20'
              }`}
            >
              <Icon className="w-5 h-5" />
              {name}
            </motion.button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredPackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 shadow-xl"
              >
                {/* Image Gallery */}
                <div className="relative h-64 w-full">
                  <Image
                    src={pkg.images[0]}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                      {pkg.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-200">
                      <FaClock className="w-4 h-4" />
                      <span className="text-sm font-medium">{pkg.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Package Details */}
                <div className="p-6">
                  <p className="text-gray-200 mb-6 leading-relaxed" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    {pkg.description}
                  </p>
                  
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2">
                      <FaRupeeSign className="w-5 h-5 text-purple-400" />
                      <p className="text-3xl font-bold text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                        {pkg.price.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">per session</p>
                  </div>

                  {/* Includes */}
                  <div className="space-y-3 mb-8">
                    {pkg.includes.map((item) => (
                      <div key={item} className="flex items-center gap-3 text-gray-200">
                        <FaCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm font-medium" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Book Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPackage(pkg)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPackage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-lg w-full border border-white/10 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-6" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                Book {selectedPackage.name}
              </h2>
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <textarea
                    name="additionalNotes"
                    placeholder="Additional Notes (Optional)"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none h-32"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                  Confirm Booking
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Status Toast */}
      <AnimatePresence>
        {bookingStatus && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-20 md:bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg ${
              bookingStatus.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white font-medium`}
          >
            {bookingStatus.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 