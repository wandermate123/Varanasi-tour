'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchProducts } from '@/data/products';
import type { Product } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
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
          placeholder="Search products..."
          className="w-full px-3 sm:px-4 py-2 sm:py-3 pl-8 sm:pl-10 pr-4 text-gray-900 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent form-input text-sm sm:text-base"
        />
        <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
          >
            {suggestions.map((product) => (
              <Link 
                key={product.id}
                href={`/shop/product/${product.id}`}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 transition-colors touch-target"
                onClick={() => setIsOpen(false)}
              >
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-1">{product.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500">{product.category}</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">₹{product.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
            
            {query.length >= 2 && (
              <button
                onClick={() => handleSearch(query)}
                className="w-full p-2 sm:p-3 text-xs sm:text-sm text-gray-500 hover:bg-gray-50 transition-colors text-center touch-target"
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