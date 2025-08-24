'use client';

import { motion } from 'framer-motion';

interface MobileLoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  text?: string;
  className?: string;
}

export default function MobileLoadingSpinner({ 
  size = 'md', 
  color = 'primary', 
  text,
  className = '' 
}: MobileLoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const colorClasses = {
    primary: 'border-blue-600',
    white: 'border-white',
    gray: 'border-gray-400'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-t-transparent rounded-full ${colorClasses[color]} animate-spin`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      {text && (
        <motion.p
          className={`${textSizeClasses[size]} text-gray-600 text-center`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

// Mobile-specific loading states
export function MobileSkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="skeleton h-32 sm:h-40"></div>
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-3/4"></div>
        <div className="skeleton h-3 w-1/2"></div>
        <div className="skeleton h-3 w-2/3"></div>
        <div className="skeleton h-8 w-full rounded-md"></div>
      </div>
    </div>
  );
}

export function MobileSkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="flex items-center space-x-3">
            <div className="skeleton w-12 h-12 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-3/4"></div>
              <div className="skeleton h-3 w-1/2"></div>
            </div>
            <div className="skeleton w-16 h-6 rounded-md"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function MobilePullToRefresh() {
  return (
    <motion.div
      className="flex items-center justify-center py-4 text-gray-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mr-2"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <span className="text-sm">Pull to refresh...</span>
    </motion.div>
  );
}

export function MobileInfiniteScrollLoader() {
  return (
    <motion.div
      className="flex items-center justify-center py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <span className="text-sm text-gray-500">Loading more...</span>
      </div>
    </motion.div>
  );
} 