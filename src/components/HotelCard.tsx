import { motion } from 'framer-motion';
import { Hotel, Room } from '@/services/hotelService';
import Image from 'next/image';
import { FaStar, FaMapMarkerAlt, FaWifi, FaSwimmingPool, FaSpa, FaUtensils, FaDumbbell, FaConciergeBell, FaBuilding, FaTree, FaBed, FaUsers, FaCheck } from 'react-icons/fa';
import { useState } from 'react';

interface HotelCardProps {
  hotel: Hotel;
  onBook?: (hotelId: string, roomType: string) => void;
}

const amenityIcons: { [key: string]: any } = {
  'WiFi': FaWifi,
  'Pool': FaSwimmingPool,
  'Spa': FaSpa,
  'Restaurant': FaUtensils,
  'Gym': FaDumbbell,
  'Room Service': FaConciergeBell,
  'Business Center': FaBuilding,
  'Garden': FaTree
};

export default function HotelCard({ hotel, onBook }: HotelCardProps) {
  const [showRooms, setShowRooms] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleBook = (room: Room) => {
    setSelectedRoom(room);
    if (onBook) {
      onBook(hotel.id, room.type);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden group">
        <Image
          src={hotel.images[0] || '/images/placeholder-hotel.jpg'}
          alt={hotel.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <FaStar className="text-yellow-400 w-4 h-4" />
          <span className="text-white font-semibold">{hotel.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Hotel Name and Location */}
        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">{hotel.name}</h3>
        <div className="flex items-start gap-2 text-gray-400 mb-4">
          <FaMapMarkerAlt className="w-4 h-4 mt-1 flex-shrink-0" />
          <p className="text-sm line-clamp-2">{hotel.location.address}</p>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity) => {
            const Icon = amenityIcons[amenity] || FaBuilding;
            return (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 px-2 py-1 bg-white/10 rounded-lg text-sm text-gray-300"
              >
                <Icon className="w-3 h-3" />
                {amenity}
              </span>
            );
          })}
          {hotel.amenities.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 bg-white/10 rounded-lg text-sm text-gray-300">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Price and Reviews */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-2xl font-bold text-white">₹{hotel.price.toLocaleString()}</p>
            <p className="text-sm text-gray-400">per night</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">{hotel.reviews.count} reviews</p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(hotel.reviews.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* View Rooms Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowRooms(!showRooms)}
          className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
        >
          {showRooms ? 'Hide Rooms' : 'View Rooms'}
        </motion.button>

        {/* Room List */}
        {showRooms && hotel.availability && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-4"
          >
            {hotel.availability.rooms.map((room) => (
              <div
                key={room.type}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-white font-semibold">{room.type}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaUsers className="w-3 h-3" />
                        {room.capacity} guests
                      </span>
                      <span className="flex items-center gap-1">
                        <FaBed className="w-3 h-3" />
                        {room.amenities.includes('King Bed') ? 'King Bed' : 'Queen Bed'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">₹{room.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">per night</p>
                  </div>
                </div>

                {/* Room Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300"
                    >
                      <FaCheck className="w-2 h-2" />
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Book Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBook(room)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300"
                >
                  Book Now
                </motion.button>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
} 