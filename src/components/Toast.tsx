'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, duration = 2000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
    >
      {message}
    </motion.div>
  );
}

interface ToastContextProps {
  showToast: (message: string) => void;
}

export function useToast() {
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);

  const showToast = (message: string) => {
    setToast({ message, id: Date.now() });
  };

  return {
    Toast: (
      <AnimatePresence>
        {toast && (
          <Toast
            key={toast.id}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    ),
    showToast,
  };
} 