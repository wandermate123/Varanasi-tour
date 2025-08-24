import { motion } from 'framer-motion';
import { MapPin, User, Star, Plane } from 'lucide-react';

interface Activity {
  id: number;
  type: 'review' | 'trip' | 'friend' | 'achievement';
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
}

const activities: Activity[] = [
  {
    id: 1,
    type: 'trip',
    title: 'New Trip Planned',
    description: 'Booked a trip to Bali for next month',
    time: '2 hours ago',
    icon: <Plane className="w-5 h-5 text-blue-500" />
  },
  {
    id: 2,
    type: 'review',
    title: 'Wrote a Review',
    description: 'Reviewed Sunset Beach Resort',
    time: '5 hours ago',
    icon: <Star className="w-5 h-5 text-yellow-500" />
  },
  {
    id: 3,
    type: 'friend',
    title: 'New Travel Buddy',
    description: 'Connected with Sarah from Paris',
    time: '1 day ago',
    icon: <User className="w-5 h-5 text-green-500" />
  },
  {
    id: 4,
    type: 'achievement',
    title: 'New Achievement',
    description: 'Visited 10 countries!',
    time: '2 days ago',
    icon: <MapPin className="w-5 h-5 text-purple-500" />
  }
];

export const RecentActivities = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activities</h2>
      <div className="space-y-6">
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start space-x-4"
          >
            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              {activity.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {activity.description}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {activity.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 