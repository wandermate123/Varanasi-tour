'use client';

import { motion } from 'framer-motion';
import { FaStar, FaClock, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaWater, FaSun, FaMoon, FaAnchor } from 'react-icons/fa';
import Image from 'next/image';

interface BoatTourCardProps {
  tour: {
    id: string;
    name: string;
    description: string;
    duration: string;
    price: number;
    rating: number;
    maxGuests: number;
    image: string;
    type: 'sunrise' | 'sunset' | 'day' | 'evening' | 'private';
    highlights: string[];
    departureTime: string;
    returnTime: string;
    included: string[];
    notIncluded: string[];
  };
  onBook: (tour: any) => void;
  index: number;
}

export default function BoatTourCard({ tour, onBook, index }: BoatTourCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sunrise':
        return <FaSun className="text-orange-400" />;
      case 'sunset':
        return <FaSun className="text-purple-400" />;
      case 'evening':
        return <FaMoon className="text-blue-400" />;
      case 'private':
        return <FaAnchor className="text-gold-500" />;
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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="group relative bg-white/90 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
      </div>

      {/* Tour Image */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Tour Type Badge */}
        <div className="absolute top-6 left-6">
          <div className={`${getTypeColor(tour.type)} text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg`}>
            {getTypeIcon(tour.type)}
            {tour.type.toUpperCase()}
          </div>
        </div>

        {/* Rating */}
        <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-400 text-lg" />
            <span className="text-white font-semibold">{tour.rating}</span>
          </div>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">₹{tour.price}</div>
            <div className="text-xs text-gray-600">per person</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Title */}
        <h3 className="text-2xl font-light text-gray-800 mb-4 leading-tight">
          {tour.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {tour.description}
        </p>

        {/* Tour Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
              <FaClock className="text-blue-500" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Duration</div>
              <div className="font-medium">{tour.duration}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
              <FaUsers className="text-green-500" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Max Guests</div>
              <div className="font-medium">{tour.maxGuests}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
              <FaCalendarAlt className="text-purple-500" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Departure</div>
              <div className="font-medium">{tour.departureTime}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
              <FaMapMarkerAlt className="text-orange-500" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Location</div>
              <div className="font-medium">Ghats</div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <h4 className="text-gray-700 font-medium mb-3 flex items-center gap-2">
            <FaAnchor className="text-blue-500" />
            Highlights
          </h4>
          <div className="flex flex-wrap gap-2">
            {tour.highlights.slice(0, 4).map((highlight, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm border border-blue-100"
              >
                {highlight}
              </motion.span>
            ))}
            {tour.highlights.length > 4 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                +{tour.highlights.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Included/Not Included */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <h5 className="text-green-700 font-medium mb-2 text-sm">✓ Included</h5>
            <ul className="space-y-1">
              {tour.included.slice(0, 3).map((item, idx) => (
                <li key={idx} className="text-xs text-gray-600">• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-red-700 font-medium mb-2 text-sm">✗ Not Included</h5>
            <ul className="space-y-1">
              {tour.notIncluded.slice(0, 3).map((item, idx) => (
                <li key={idx} className="text-xs text-gray-600">• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Booking Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onBook(tour)}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group-hover:from-blue-700 group-hover:to-purple-700"
        >
          Book This Tour
        </motion.button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-60" />
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-60" />
    </motion.div>
  );
} 