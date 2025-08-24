import { motion } from 'framer-motion';
import { TrendingUp, Users, Map, Calendar } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
}

const StatCard = ({ title, value, icon, trend }: StatCardProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
  >
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
        {trend && (
          <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
          </p>
        )}
      </div>
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        {icon}
      </div>
    </div>
  </motion.div>
);

export const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Trips',
      value: '24',
      icon: <Map className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      trend: 12
    },
    {
      title: 'Upcoming Trips',
      value: '3',
      icon: <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      trend: 5
    },
    {
      title: 'Travel Buddies',
      value: '156',
      icon: <Users className="w-6 h-6 text-green-600 dark:text-green-400" />,
      trend: 8
    },
    {
      title: 'Travel Score',
      value: '850',
      icon: <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      trend: 15
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}; 