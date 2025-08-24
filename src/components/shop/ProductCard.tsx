'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  category: string;
  artisan?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  onAddToCart?: () => void;
}

export default function ProductCard({ 
  title, 
  price, 
  image, 
  category, 
  artisan,
  isNew,
  isFeatured,
  onAddToCart 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer bg-white"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        
        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        
        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <span className="bg-white/95 text-neutral-900 px-3 py-1 text-xs font-light tracking-wide">
              New Arrival
            </span>
          )}
          {isFeatured && (
            <span className="bg-neutral-900/95 text-white px-3 py-1 text-xs font-light tracking-wide">
              Featured
            </span>
          )}
        </div>

        {/* Category Tag */}
        <div className="absolute top-4 right-4">
          <span className="bg-white/95 text-neutral-900 px-3 py-1 text-xs font-light tracking-wide">
            {category}
          </span>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 border border-white/20 group-hover:border-white/40 transition-colors duration-500" />

        {/* Quick View Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/20 flex items-center justify-center"
        >
          <button className="bg-white/95 text-neutral-900 px-6 py-3 text-sm font-light tracking-wide hover:bg-white transition-colors duration-300">
            Quick View
          </button>
        </motion.div>
      </div>

      <div className="p-6">
        {/* Artisan Info */}
        {artisan && (
          <p className="text-xs text-neutral-500 font-light tracking-wide mb-2">
            by {artisan}
          </p>
        )}

        {/* Product Title */}
        <h3 className="text-lg font-light text-neutral-900 mb-3 leading-tight group-hover:text-neutral-600 transition-colors duration-300 line-clamp-2">
          {title}
        </h3>

        {/* Price */}
        <p className="text-xl font-light text-neutral-900 mb-4">{price}</p>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddToCart}
          className="w-full bg-neutral-900 text-white py-3 text-sm font-light tracking-wide hover:bg-neutral-800 transition-colors duration-300"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
} 