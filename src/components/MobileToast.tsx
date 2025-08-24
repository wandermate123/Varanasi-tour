'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
}

interface ToastItem extends ToastProps {
  id: string;
}

interface ToastContextType {
  showToast: (props: ToastProps) => void;
  hideToast: (id: string) => void;
}

// Toast context for global toast management
let toastContext: ToastContextType | null = null;

export function setToastContext(context: ToastContextType) {
  toastContext = context;
}

export function showToast(props: ToastProps) {
  if (toastContext) {
    toastContext.showToast(props);
  }
}

export function hideToast(id: string) {
  if (toastContext) {
    toastContext.hideToast(id);
  }
}

export default function MobileToast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: 'text-green-600',
      iconBg: 'bg-green-100'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: 'text-red-600',
      iconBg: 'bg-red-100'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: 'text-yellow-600',
      iconBg: 'bg-yellow-100'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'text-blue-600',
      iconBg: 'bg-blue-100'
    }
  };

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  const styles = typeStyles[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed top-4 left-4 right-4 z-50 max-w-sm mx-auto ${styles.bg} ${styles.border} border rounded-lg shadow-lg p-4 touch-target`}
          onClick={() => setIsVisible(false)}
        >
          <div className="flex items-start space-x-3">
            <div className={`flex-shrink-0 w-8 h-8 ${styles.iconBg} rounded-full flex items-center justify-center ${styles.icon}`}>
              {icons[type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${styles.text}`}>
                {message}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
                onClose?.();
              }}
              className="flex-shrink-0 w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors touch-target"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Toast Container for managing multiple toasts
export function MobileToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [counter, setCounter] = useState(0);

  const showToast = (props: ToastProps) => {
    const id = `toast-${counter}`;
    setCounter(prev => prev + 1);
    const newToast = { ...props, id };
    setToasts(prev => [...prev, newToast]);
  };

  const hideToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  useEffect(() => {
    setIsMounted(true);
    setToastContext({ showToast, hideToast });
  }, []);

  // Don't render anything on the server
  if (!isMounted) {
    return null;
  }

  // Only render portal when document.body is available
  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none p-4 space-y-2">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <MobileToast
            {...toast}
            onClose={() => hideToast(toast.id)}
          />
        </div>
      ))}
    </div>,
    document.body
  );
}

// Quick toast functions
export const toast = {
  success: (message: string, duration?: number) => showToast({ message, type: 'success', duration }),
  error: (message: string, duration?: number) => showToast({ message, type: 'error', duration }),
  warning: (message: string, duration?: number) => showToast({ message, type: 'warning', duration }),
  info: (message: string, duration?: number) => showToast({ message, type: 'info', duration }),
}; 