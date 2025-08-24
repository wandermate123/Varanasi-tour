'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchProducts } from '@/data/products';
import type { Product } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';

interface PremiumSearchBarProps {
  onSearch: (query: string) => void;
}

export default function PremiumSearchBar({ onSearch }: PremiumSearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      const results = searchProducts(query);
      setSuggestions(results.slice(0, 5));
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    onSearch(searchQuery);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for artisan pieces..."
          className="w-full px-6 py-4 pl-12 pr-6 text-neutral-900 bg-white/95 backdrop-blur-sm border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 form-input text-base font-light placeholder-neutral-400"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-white/30 overflow-hidden"
          >
            {suggestions.map((product) => (
              <Link 
                key={product.id}
                href={`/shop/product/${product.id}`}
                className="flex items-center gap-4 p-4 hover:bg-white/50 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-light text-neutral-900 line-clamp-1 mb-1">{product.title}</h4>
                  <p className="text-xs text-neutral-500 font-light mb-1">{product.category}</p>
                  {product.artisan && (
                    <p className="text-xs text-neutral-400 font-light mb-1">by {product.artisan}</p>
                  )}
                  <p className="text-sm font-light text-neutral-900">₹{product.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
            
            {query.length >= 2 && (
              <button
                onClick={() => handleSearch(query)}
                className="w-full p-4 text-sm text-neutral-600 hover:bg-white/50 transition-colors duration-300 text-center font-light border-t border-white/20"
              >
                View all results for "{query}"
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 