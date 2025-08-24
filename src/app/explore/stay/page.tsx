'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaStar, FaWifi, FaSwimmingPool, FaSpa, FaUtensils, FaDumbbell, FaConciergeBell, FaBuilding, FaTree } from 'react-icons/fa';
import HotelCard from '@/components/HotelCard';
import Image from 'next/image';
import { hotelService } from '@/services/hotelService';
import type { Hotel, SearchParams, Filters } from '@/services/hotelService';

export default function StayPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: 'Varanasi',
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    guests: 2
  });
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 50000],
    rating: 0,
    amenities: []
  });
  const [bookingStatus, setBookingStatus] = useState<{
    show: boolean;
    success: boolean;
    message: string;
  }>({
    show: false,
    success: false,
    message: ''
  });

  useEffect(() => {
    fetchHotels();
  }, [searchParams]);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await hotelService.searchHotels(searchParams);
      setHotels(data);
    } catch (err) {
      setError('Failed to fetch hotels. Please try again later.');
      console.error('Error fetching hotels:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHotels();
  };

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const filteredHotels = hotels.filter(hotel => {
    if (filters.rating > 0 && hotel.rating < filters.rating) return false;
    if (hotel.price < filters.priceRange[0] || hotel.price > filters.priceRange[1]) return false;
    if (filters.amenities.length > 0) {
      return filters.amenities.every(amenity => hotel.amenities.includes(amenity));
    }
    return true;
  });

  const handleBook = async (hotelId: string, roomType: string) => {
    try {
      const result = await hotelService.bookRoom(hotelId, roomType);
      setBookingStatus({
        show: true,
        success: result.success,
        message: result.success
          ? 'Room booked successfully! Check your email for confirmation.'
          : 'Failed to book room. Please try again.'
      });

      // Hide the booking status after 5 seconds
      setTimeout(() => {
        setBookingStatus(prev => ({ ...prev, show: false }));
      }, 5000);
    } catch (error) {
      setBookingStatus({
        show: true,
        success: false,
        message: 'An error occurred while booking. Please try again.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/images/varanasi-hotel.jpg"
          alt="Varanasi Hotels"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4 text-center"
          >
            Premium Stays in Varanasi
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 text-center max-w-2xl"
          >
            Experience luxury and comfort in the spiritual capital of India
          </motion.p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search hotels in Varanasi..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchParams.location}
                onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <div className="flex gap-4">
              <input
                type="date"
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchParams.checkIn}
                onChange={(e) => setSearchParams(prev => ({ ...prev, checkIn: e.target.value }))}
              />
              <input
                type="date"
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchParams.checkOut}
                onChange={(e) => setSearchParams(prev => ({ ...prev, checkOut: e.target.value }))}
              />
              <input
                type="number"
                placeholder="Guests"
                className="w-24 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchParams.guests}
                onChange={(e) => setSearchParams(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                min="1"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
              type="submit"
            >
              Search Hotels
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-80 flex-shrink-0"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Filters</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-white hover:text-purple-400"
                >
                  <FaFilter />
                </button>
              </div>

              <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
                {/* Price Range */}
                <div>
                  <h3 className="text-white mb-3">Price Range (₹)</h3>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400"
                      value={filters.priceRange[0]}
                      onChange={(e) => handleFilterChange({ priceRange: [parseInt(e.target.value), filters.priceRange[1]] })}
                    />
                    <span className="text-white">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange({ priceRange: [filters.priceRange[0], parseInt(e.target.value)] })}
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="text-white mb-3">Minimum Rating</h3>
                  <div className="flex gap-2">
                    {[0, 3, 4, 4.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleFilterChange({ rating })}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          filters.rating === rating
                            ? 'bg-purple-600 text-white'
                            : 'bg-white/10 text-gray-400 hover:bg-white/20'
                        }`}
                      >
                        {rating === 0 ? 'Any' : `${rating}+`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities Filter */}
                <div>
                  <h3 className="text-white mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Room Service'].map((amenity) => (
                      <button
                        key={amenity}
                        onClick={() => {
                          const newAmenities = filters.amenities.includes(amenity)
                            ? filters.amenities.filter(a => a !== amenity)
                            : [...filters.amenities, amenity];
                          handleFilterChange({ amenities: newAmenities });
                        }}
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                          filters.amenities.includes(amenity)
                            ? 'bg-purple-600 text-white'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hotel List */}
          <div className="flex-1">
            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden mb-4 px-4 py-2 bg-white/10 rounded-xl text-white flex items-center gap-2"
            >
              <FaFilter className="w-4 h-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden animate-pulse"
                  >
                    <div className="h-48 bg-white/10" />
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-white/10 rounded w-3/4" />
                      <div className="h-4 bg-white/10 rounded w-1/2" />
                      <div className="h-4 bg-white/10 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-400 text-lg">{error}</p>
                <button
                  onClick={() => fetchHotels()}
                  className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Results Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredHotels.map((hotel) => (
                    <motion.div
                      key={hotel.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <HotelCard hotel={hotel} onBook={handleBook} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Status Toast */}
      <AnimatePresence>
        {bookingStatus.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-20 md:bottom-4 right-4 px-6 py-3 rounded-xl shadow-lg ${
              bookingStatus.success ? 'bg-green-600' : 'bg-red-600'
            } text-white`}
          >
            {bookingStatus.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 