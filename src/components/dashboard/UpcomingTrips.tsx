import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';

interface Trip {
  id: number;
  destination: string;
  date: string;
  image: string;
  companions: number;
  duration: string;
}

const trips: Trip[] = [
  {
    id: 1,
    destination: 'Bali, Indonesia',
    date: 'Aug 15 - Aug 25',
    image: '/images/destinations/bali.jpg',
    companions: 3,
    duration: '10 days'
  },
  {
    id: 2,
    destination: 'Paris, France',
    date: 'Sep 5 - Sep 12',
    image: '/images/destinations/paris.jpg',
    companions: 2,
    duration: '7 days'
  },
  {
    id: 3,
    destination: 'Tokyo, Japan',
    date: 'Oct 1 - Oct 10',
    image: '/images/destinations/tokyo.jpg',
    companions: 4,
    duration: '9 days'
  }
];

export const UpcomingTrips = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Trips</h2>
      <div className="space-y-6">
        {trips.map((trip) => (
          <motion.div
            key={trip.id}
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
          >
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
              <img
                src={trip.image}
                alt={trip.destination}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {trip.destination}
              </h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  {trip.date}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Users className="w-4 h-4 mr-2" />
                  {trip.companions} travel buddies
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  {trip.duration}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 