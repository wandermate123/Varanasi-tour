'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Calendar, Star, TrendingUp } from 'lucide-react';

interface BlogFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onToggle: () => void;
}

interface FilterOptions {
  sortBy: 'latest' | 'popular' | 'trending';
  dateRange: 'all' | 'week' | 'month' | 'year';
  premiumOnly: boolean;
  categories: string[];
}

export default function BlogFilter({ onFilterChange, isOpen, onToggle }: BlogFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'latest',
    dateRange: 'all',
    premiumOnly: false,
    categories: []
  });

  const categories = [
    'Travel', 'Food', 'Photography', 'Culture', 'Wellness', 
    'Adventure', 'History', 'Art', 'Music', 'Spirituality'
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    handleFilterChange('categories', newCategories);
  };

  const clearFilters = () => {
    const defaultFilters: FilterOptions = {
      sortBy: 'latest',
      dateRange: 'all',
      premiumOnly: false,
      categories: []
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <>
      {/* Filter Toggle Button */}
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">Filters</span>
        {Object.values(filters).some(value => 
          Array.isArray(value) ? value.length > 0 : value !== 'latest' && value !== 'all' && value !== false
        ) && (
          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
        )}
      </button>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filter Posts</h3>
                <button
                  onClick={onToggle}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Sort By
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'latest', label: 'Latest', icon: Calendar },
                      { value: 'popular', label: 'Most Popular', icon: Star },
                      { value: 'trending', label: 'Trending', icon: TrendingUp }
                    ].map((option) => {
                      const Icon = option.icon;
                      return (
                        <label
                          key={option.value}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                        >
                          <input
                            type="radio"
                            name="sortBy"
                            value={option.value}
                            checked={filters.sortBy === option.value}
                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                            className="text-purple-600 focus:ring-purple-500"
                          />
                          <Icon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{option.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Date Range
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Time' },
                      { value: 'week', label: 'This Week' },
                      { value: 'month', label: 'This Month' },
                      { value: 'year', label: 'This Year' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                      >
                        <input
                          type="radio"
                          name="dateRange"
                          value={option.value}
                          checked={filters.dateRange === option.value}
                          onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Premium Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Content Type
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={filters.premiumOnly}
                        onChange={(e) => handleFilterChange('premiumOnly', e.target.checked)}
                        className="text-purple-600 focus:ring-purple-500 rounded"
                      />
                      <Star className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-gray-700">Premium Only</span>
                    </label>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Categories
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category)}
                          onChange={() => handleCategoryToggle(category)}
                          className="text-purple-600 focus:ring-purple-500 rounded"
                        />
                        <span className="text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear All Filters
                </button>
                <button
                  onClick={onToggle}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 