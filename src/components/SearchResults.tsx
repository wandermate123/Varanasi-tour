'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchResult } from '@/lib/searchService';
import Image from 'next/image';
import Link from 'next/link';
import { getTypeIcon } from '@/lib/searchService';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  onClose: () => void;
}

export default function SearchResults({ results, query, onClose }: SearchResultsProps) {
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>(results);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'price' | 'name'>('relevance');

  useEffect(() => {
    setFilteredResults(results);
  }, [results]);

  const filterResults = (type: string) => {
    setSelectedType(type);
    if (type === 'all') {
      setFilteredResults(results);
    } else {
      setFilteredResults(results.filter(result => result.type === type));
    }
  };

  const sortResults = (sortType: 'relevance' | 'price' | 'name') => {
    setSortBy(sortType);
    const sorted = [...filteredResults].sort((a, b) => {
      switch (sortType) {
        case 'relevance':
          return b.relevance - a.relevance;
        case 'price':
          const priceA = a.price ? parseInt(a.price.replace(/[^\d]/g, '')) : 0;
          const priceB = b.price ? parseInt(b.price.replace(/[^\d]/g, '')) : 0;
          return priceA - priceB;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    setFilteredResults(sorted);
  };

  const getTypeCount = (type: string) => {
    return results.filter(result => result.type === type).length;
  };

  const typeFilters = [
    { type: 'all', label: 'All', count: results.length, icon: '🔍' },
    { type: 'product', label: 'Products', count: getTypeCount('product'), icon: '🛍️' },
    { type: 'service', label: 'Services', count: getTypeCount('service'), icon: '🎯' },
    { type: 'event', label: 'Events', count: getTypeCount('event'), icon: '🎭' },
    { type: 'temple', label: 'Temples', count: getTypeCount('temple'), icon: '🛕' },
    { type: 'food', label: 'Food', count: getTypeCount('food'), icon: '🍜' },
    { type: 'location', label: 'Locations', count: getTypeCount('location'), icon: '📍' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Search Results for "{query}"
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <p className="text-gray-600">
            Found {results.length} results
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          {/* Type Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {typeFilters.map((filter) => (
              <button
                key={filter.type}
                onClick={() => filterResults(filter.type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  selectedType === filter.type
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
                <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => sortResults(e.target.value as 'relevance' | 'price' | 'name')}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="relevance">Relevance</option>
              <option value="price">Price (Low to High)</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-[60vh]">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or browse our categories
              </p>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid gap-4">
                {filteredResults.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
                  >
                    <Link href={result.link} className="block">
                      <div className="flex gap-4">
                        {/* Image */}
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                          {result.image ? (
                            <Image
                              src={result.image}
                              alt={result.title}
                              fill
                              className="object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-2xl">{getTypeIcon(result.type)}</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{getTypeIcon(result.type)}</span>
                              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                                {result.title}
                              </h3>
                            </div>
                            {result.price && (
                              <span className="text-lg font-bold text-blue-600 flex-shrink-0">
                                {result.price}
                              </span>
                            )}
                          </div>

                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {result.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="bg-gray-100 px-2 py-1 rounded-full">
                                {result.category}
                              </span>
                              {result.location && (
                                <span className="flex items-center gap-1">
                                  📍 {result.location}
                                </span>
                              )}
                              {result.time && (
                                <span className="flex items-center gap-1">
                                  ⏰ {result.time}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400">
                                Relevance: {result.relevance}%
                              </span>
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredResults.length} of {results.length} results
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 