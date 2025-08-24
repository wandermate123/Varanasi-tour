'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaStar, FaWater, FaSun, FaMoon, FaUsers, FaClock, FaMapMarkerAlt, FaCalendarAlt, FaAnchor, FaShip, FaLifeRing, FaUmbrellaBeach } from 'react-icons/fa';
import Image from 'next/image';
import BoatTourCard from '@/components/BoatTourCard';
import { boatService, type BoatTour } from '@/services/boatService';



export default function BoatsPage() {
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    guests: 2,
    time: '',
    name: '',
    email: '',
    phone: ''
  });
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: [0, 5000],
    duration: 'all'
  });
  const [boatTours, setBoatTours] = useState<BoatTour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoatTours();
  }, []);

  const fetchBoatTours = async () => {
    try {
      setLoading(true);
      const tours = await boatService.getAllTours();
      setBoatTours(tours);
    } catch (error) {
      console.error('Error fetching boat tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const boatToursData: BoatTour[] = [
    {
      id: 'sunrise-ghat',
      name: 'Sunrise Ghat Experience',
      description: 'Begin your day with the magical sunrise over the sacred Ganges, witnessing the ancient rituals and spiritual awakening of Varanasi.',
      duration: '2 hours',
      price: 1200,
      rating: 4.8,
      maxGuests: 8,
      image: '/images/WhatsApp Image 2025-06-16 at 20.58.20_15cc56d6.jpg',
      type: 'sunrise',
      highlights: ['Sunrise over Ganges', 'Morning Aarti', 'Photography spots', 'Local guide'],
      departureTime: '5:30 AM',
      returnTime: '7:30 AM',
      included: ['Boat ride', 'Experienced guide', 'Morning tea', 'Photography assistance'],
      notIncluded: ['Hotel pickup', 'Personal expenses', 'Tips']
    },
    {
      id: 'sunset-ghat',
      name: 'Sunset Ghat Serenity',
      description: 'Experience the mystical sunset as the ghats come alive with evening prayers, floating diyas, and the soul-stirring Ganga Aarti.',
      duration: '2.5 hours',
      price: 1500,
      rating: 4.9,
      maxGuests: 10,
      image: '/images/WhatsApp Image 2025-06-17 at 00.51.00_5c3e4ef7.jpg',
      type: 'sunset',
      highlights: ['Sunset views', 'Evening Aarti', 'Floating diyas', 'Cultural insights'],
      departureTime: '5:00 PM',
      returnTime: '7:30 PM',
      included: ['Boat ride', 'Cultural guide', 'Evening snacks', 'Aarti participation'],
      notIncluded: ['Hotel pickup', 'Personal expenses', 'Tips']
    },
    {
      id: 'day-exploration',
      name: 'Day Ghat Discovery',
      description: 'Explore the vibrant ghats during the day, witnessing daily life, rituals, and the bustling energy of Varanasi\'s spiritual heart.',
      duration: '3 hours',
      price: 1800,
      rating: 4.7,
      maxGuests: 12,
      image: '/images/WhatsApp Image 2025-06-17 at 15.19.28_6e14a239.jpg',
      type: 'day',
      highlights: ['Ghat exploration', 'Cultural insights', 'Local interactions', 'Historical context'],
      departureTime: '9:00 AM',
      returnTime: '12:00 PM',
      included: ['Boat ride', 'Expert guide', 'Refreshments', 'Historical commentary'],
      notIncluded: ['Hotel pickup', 'Personal expenses', 'Tips']
    },
    {
      id: 'evening-mystique',
      name: 'Evening Mystique',
      description: 'Float through the mystical evening atmosphere as the city transforms into a magical realm of lights, prayers, and spiritual energy.',
      duration: '2 hours',
      price: 1400,
      rating: 4.6,
      maxGuests: 8,
      image: '/images/WhatsApp Image 2025-06-19 at 00.29.22_e8473b6a.jpg',
      type: 'evening',
      highlights: ['Evening atmosphere', 'Light displays', 'Spiritual energy', 'Peaceful experience'],
      departureTime: '6:30 PM',
      returnTime: '8:30 PM',
      included: ['Boat ride', 'Spiritual guide', 'Evening refreshments', 'Meditation session'],
      notIncluded: ['Hotel pickup', 'Personal expenses', 'Tips']
    },
    {
      id: 'private-luxury',
      name: 'Private Luxury Experience',
      description: 'Exclusive private boat experience with personalized attention, premium amenities, and intimate spiritual journey.',
      duration: '4 hours',
      price: 3500,
      rating: 5.0,
      maxGuests: 4,
      image: '/images/hero3.jpg',
      type: 'private',
      highlights: ['Private boat', 'Personal guide', 'Premium amenities', 'Customized experience'],
      departureTime: 'Flexible',
      returnTime: 'Flexible',
      included: ['Private boat', 'Personal guide', 'Premium refreshments', 'Photography service', 'Hotel pickup'],
      notIncluded: ['Personal expenses', 'Tips']
    }
  ];

  const filteredTours = boatTours.filter(tour => {
    if (filters.type !== 'all' && tour.type !== filters.type) return false;
    if (tour.price < filters.priceRange[0] || tour.price > filters.priceRange[1]) return false;
    return true;
  });

  const handleBooking = (tour: BoatTour) => {
    setSelectedTour(tour.id);
    setBookingData(prev => ({ ...prev, time: tour.departureTime }));
    setShowBooking(true);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await boatService.bookTour({
        tourId: selectedTour!,
        date: bookingData.date,
        guests: bookingData.guests,
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src="/images/WhatsApp Image 2025-06-16 at 20.58.20_15cc56d6.jpg"
          alt="Varanasi Boat Tours"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wide">
              Boat Tours
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl leading-relaxed">
              Experience the sacred Ganges through our premium boat tours
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaWater className="text-blue-200" />
                <span className="text-sm">Sacred Waters</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaSun className="text-yellow-200" />
                <span className="text-sm">Sunrise & Sunset</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaAnchor className="text-white" />
                <span className="text-sm">Cultural Heritage</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-80 flex-shrink-0"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
              <h2 className="text-2xl font-light text-gray-800 mb-6">Filters</h2>
              
              {/* Tour Type Filter */}
              <div className="mb-6">
                <h3 className="text-gray-700 mb-3 font-medium">Tour Type</h3>
                <div className="space-y-2">
                  {['all', 'sunrise', 'sunset', 'day', 'evening', 'private'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilters(prev => ({ ...prev, type }))}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ${
                        filters.type === type
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-gray-700 mb-3 font-medium">Price Range (₹)</h3>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]] 
                    }))}
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: [prev.priceRange[0], parseInt(e.target.value) || 5000] 
                    }))}
                  />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="text-blue-800 font-medium mb-3">Quick Stats</h3>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex justify-between">
                    <span>Available Tours:</span>
                    <span className="font-medium">{filteredTours.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Rating:</span>
                    <span className="font-medium">4.8/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Price:</span>
                    <span className="font-medium">₹{Math.min(...filteredTours.map(t => t.price))}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tours Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg animate-pulse">
                    <div className="h-72 bg-gray-200" />
                    <div className="p-8 space-y-4">
                      <div className="h-8 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-12 bg-gray-200 rounded" />
                        <div className="h-12 bg-gray-200 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {filteredTours.map((tour, index) => (
                  <BoatTourCard
                    key={tour.id}
                    tour={tour}
                    onBook={handleBooking}
                    index={index}
                  />
                ))}
              </motion.div>
            )}
          </div>
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
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
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
                    max="12"
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