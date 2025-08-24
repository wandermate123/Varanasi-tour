'use client';

import React from 'react';
import { motion } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: Direction;
  className?: string;
  once?: boolean;
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  distance = 24,
  direction = 'up',
  className,
  once = true
}: RevealProps) {
  const initialOffset = (() => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      default:
        return {};
    }
  })();

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay }}
      viewport={{ once, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

