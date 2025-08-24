import { useState } from 'react';

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface FilterGroup {
  title: string;
  options: FilterOption[];
}

interface FilterSidebarProps {
  filters: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupTitle: string, value: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

export default function FilterSidebar({
  filters,
  selectedFilters,
  onFilterChange,
  priceRange,
  onPriceRangeChange,
}: FilterSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(filters.map(group => [group.title, true]))
  );

  return (
    <div className="w-64 flex-shrink-0 pr-8">
      <h2 className="text-2xl font-serif mb-6">Filters</h2>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Min"
            />
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Max"
            />
          </div>
          <input
            type="range"
            min={0}
            max={10000}
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
            className="w-full"
          />
        </div>
      </div>

      {/* Filter Groups */}
      <div className="space-y-6">
        {filters.map((group) => (
          <div key={group.title}>
            <button
              onClick={() => setExpandedGroups(prev => ({
                ...prev,
                [group.title]: !prev[group.title]
              }))}
              className="flex items-center justify-between w-full text-left mb-2"
            >
              <h3 className="text-lg font-medium">{group.title}</h3>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  expandedGroups[group.title] ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedGroups[group.title] && (
              <div className="space-y-2">
                {group.options.map((option) => (
                  <label key={option.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedFilters[group.title]?.includes(option.id)}
                      onChange={() => onFilterChange(group.title, option.id)}
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="text-sm text-gray-600">
                      {option.label} ({option.count})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Clear All Filters */}
      <button
        onClick={() => {
          Object.keys(selectedFilters).forEach(group => {
            selectedFilters[group].forEach(value => onFilterChange(group, value));
          });
          onPriceRangeChange([0, 10000]);
        }}
        className="mt-8 w-full bg-gray-100 text-gray-900 py-2 font-medium hover:bg-gray-200 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
} 