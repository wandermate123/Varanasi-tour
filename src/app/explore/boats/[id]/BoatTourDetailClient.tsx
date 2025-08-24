'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaClock, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaWater, FaSun, FaMoon, FaAnchor, FaCheck, FaTimes, FaArrowLeft, FaShare, FaHeart } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { boatService, type BoatTour } from '@/services/boatService';

interface BoatTourDetailClientProps {
  tour: BoatTour;
  relatedTours: BoatTour[];
}

export default function BoatTourDetailClient({ tour, relatedTours }: BoatTourDetailClientProps) {
  const router = useRouter();
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    guests: 2,
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const handleBooking = () => {
    setShowBooking(true);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await boatService.bookTour({
        tourId: tour.id,
        date: bookingData.date,
        guests: bookingData.guests,
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        specialRequests: bookingData.specialRequests
      });

      if (response.success) {
        alert(`Booking confirmed! Booking ID: ${response.bookingId}\nTotal Amount: ₹${response.totalAmount}`);
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
    setShowBooking(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sunrise':
        return <FaSun className="text-orange-400" />;
      case 'sunset':
        return <FaSun className="text-purple-400" />;
      case 'evening':
        return <FaMoon className="text-blue-400" />;
      case 'private':
        return <FaAnchor className="text-yellow-500" />;
      default:
        return <FaWater className="text-blue-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sunrise':
        return 'bg-gradient-to-r from-orange-500 to-yellow-500';
      case 'sunset':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'evening':
        return 'bg-gradient-to-r from-blue-500 to-indigo-500';
      case 'private':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      default:
        return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100">
      {/* Navigation */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/explore/boats')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Tours
            </button>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <FaShare className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                <FaHeart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        {/* Tour Type Badge */}
        <div className="absolute top-8 left-8">
          <div className={`${getTypeColor(tour.type)} text-white px-6 py-3 rounded-full text-lg font-medium flex items-center gap-3 shadow-lg`}>
            {getTypeIcon(tour.type)}
            {tour.type.toUpperCase()}
          </div>
        </div>

        {/* Rating */}
        <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-400 text-lg" />
            <span className="text-white font-semibold text-lg">{tour.rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-16 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-light text-white mb-4">
                {tour.name}
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl leading-relaxed mb-6">
                {tour.description}
              </p>
              
              {/* Quick Info */}
              <div className="flex flex-wrap gap-6 text-white">
                <div className="flex items-center gap-2">
                  <FaClock className="text-blue-300" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-blue-300" />
                  <span>Max {tour.maxGuests} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-300" />
                  <span>{tour.departureTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-300" />
                  <span>Ghats, Varanasi</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Tour Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-light text-gray-800 mb-6 flex items-center gap-3">
                <FaAnchor className="text-blue-500" />
                Tour Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <FaCheck className="text-white text-sm" />
                    </div>
                    <span className="text-gray-700">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-light text-gray-800 mb-6">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-green-700 font-medium mb-4 flex items-center gap-2">
                    <FaCheck className="text-green-500" />
                    Included
                  </h3>
                  <ul className="space-y-3">
                    {tour.included.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-red-700 font-medium mb-4 flex items-center gap-2">
                    <FaTimes className="text-red-500" />
                    Not Included
                  </h3>
                  <ul className="space-y-3">
                    {tour.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Related Tours */}
            {relatedTours.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg"
              >
                <h2 className="text-3xl font-light text-gray-800 mb-6">Related Tours</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedTours.map((relatedTour, index) => (
                    <div key={relatedTour.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="relative h-48">
                        <Image
                          src={relatedTour.image}
                          alt={relatedTour.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-medium text-lg">{relatedTour.name}</h3>
                          <p className="text-gray-200 text-sm">₹{relatedTour.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
              {/* Price */}
              <div className="text-center mb-8">
                <div className="text-4xl font-light text-gray-800 mb-2">₹{tour.price}</div>
                <div className="text-gray-600">per person</div>
                {tour.specialOffers && (
                  <div className="mt-3 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm">
                    {tour.specialOffers.discount}% off - {tour.specialOffers.description}
                  </div>
                )}
              </div>

              {/* Quick Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{tour.duration}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Max Guests</span>
                  <span className="font-medium">{tour.maxGuests}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Departure</span>
                  <span className="font-medium">{tour.departureTime}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Return</span>
                  <span className="font-medium">{tour.returnTime}</span>
                </div>
              </div>

              {/* Booking Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBooking}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-lg"
              >
                Book This Tour
              </motion.button>

              {/* Additional Info */}
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Free cancellation up to 24 hours before</p>
                <p>Instant confirmation</p>
                <p>Mobile tickets accepted</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBooking(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-light text-gray-800 mb-6">Book Your Tour</h2>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={bookingData.date}
                    onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Number of Guests</label>
                  <input
                    type="number"
                    min="1"
                    max={tour.maxGuests}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={bookingData.guests}
                    onChange={(e) => setBookingData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={bookingData.name}
                    onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={bookingData.email}
                    onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Special Requests (Optional)</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    value={bookingData.specialRequests}
                    onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                    placeholder="Any special requirements or requests..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBooking(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 