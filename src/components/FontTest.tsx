'use client';

export default function FontTest() {
  return (
    <div className="fixed top-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-xs">
      <h3 className="text-sm font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
        Luxury Typography Test
      </h3>
      <p className="text-xs text-gray-600 mb-2" style={{ fontFamily: 'var(--font-baskerville), Georgia, serif' }}>
        Libre Baskerville - Classic
      </p>
      <p className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-source), system-ui, sans-serif' }}>
        Source Sans 3 - Professional
      </p>
      <div className="mt-2 text-xs text-gray-400">
        Premium fonts used by luxury brands
      </div>
    </div>
  );
} 