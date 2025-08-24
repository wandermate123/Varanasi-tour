'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Clock, Star, Phone, Globe } from 'lucide-react';

interface Place {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  address: string;
  rating?: number;
  types: string[];
  photos?: string[];
  openNow?: boolean;
  phone?: string;
  website?: string;
  priceLevel?: number;
}

interface EnhancedMapsProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  onPlaceSelect?: (place: Place) => void;
  searchQuery?: string;
  userLocation?: { lat: number; lng: number };
}

declare global {
  interface Window {
    google: any;
    initEnhancedMap: () => void;
  }
}

export default function EnhancedMapsComponent({
  center = { lat: 25.3176, lng: 82.9739 }, // Varanasi default
  zoom = 13,
  onPlaceSelect,
  searchQuery,
  userLocation
}: EnhancedMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchRadius, setSearchRadius] = useState(5000); // 5km default

  // Famous Varanasi places
  const defaultPlaces: Place[] = [
    {
      id: '1',
      name: 'Kashi Vishwanath Temple',
      location: { lat: 25.3109, lng: 83.0107 },
      address: 'Lahori Tola, Varanasi, Uttar Pradesh 221001',
      rating: 4.5,
      types: ['hindu_temple', 'place_of_worship', 'tourist_attraction'],
      openNow: true
    },
    {
      id: '2',
      name: 'Dashashwamedh Ghat',
      location: { lat: 25.3069, lng: 82.9739 },
      address: 'Dashashwamedh Ghat Rd, Ghasi Tola, Varanasi, Uttar Pradesh',
      rating: 4.7,
      types: ['tourist_attraction', 'historical_landmark'],
      openNow: true
    },
    {
      id: '3',
      name: 'Sarnath',
      location: { lat: 25.2677, lng: 82.9913 },
      address: 'Sarnath, Varanasi, Uttar Pradesh 221007',
      rating: 4.4,
      types: ['buddhist_temple', 'historical_landmark', 'museum'],
      openNow: true
    },
    {
      id: '4',
      name: 'Assi Ghat',
      location: { lat: 25.2820, lng: 82.9591 },
      address: 'Assi Ghat, Varanasi, Uttar Pradesh',
      rating: 4.3,
      types: ['tourist_attraction', 'historical_landmark'],
      openNow: true
    },
    {
      id: '5',
      name: 'Ramnagar Fort',
      location: { lat: 25.3580, lng: 83.0037 },
      address: 'Ramnagar, Varanasi, Uttar Pradesh 221008',
      rating: 4.0,
      types: ['historical_landmark', 'museum', 'tourist_attraction'],
      openNow: false
    }
  ];

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      setError('Google Maps API key not configured');
      setIsLoading(false);
      return;
    }

    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initEnhancedMap`;
    script.async = true;
    script.defer = true;

    window.initEnhancedMap = () => {
      initializeMap();
    };

    script.onerror = () => {
      setError('Failed to load Google Maps');
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      delete (window as any).initEnhancedMap;
    };
  }, []);

  useEffect(() => {
    if (map && searchQuery) {
      searchPlaces(searchQuery);
    }
  }, [map, searchQuery]);

  const initializeMap = () => {
    try {
      if (!mapRef.current || !window.google?.maps) {
        setError('Map container or Google Maps API not available');
        setIsLoading(false);
        return;
      }

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        mapTypeId: 'roadmap',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          },
          {
            featureType: 'transit',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          }
        ],
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true
      });

      setMap(mapInstance);
      setPlaces(defaultPlaces);
      addMarkersToMap(mapInstance, defaultPlaces);
      
      // Add user location marker if available
      if (userLocation) {
        addUserLocationMarker(mapInstance, userLocation);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Map initialization error:', error);
      setError('Failed to initialize map');
      setIsLoading(false);
    }
  };

  const addMarkersToMap = (mapInstance: any, placesToAdd: Place[]) => {
    placesToAdd.forEach((place) => {
      const marker = new window.google.maps.Marker({
        position: place.location,
        map: mapInstance,
        title: place.name,
        icon: {
          url: getMarkerIcon(place.types[0]),
          scaledSize: new window.google.maps.Size(40, 40)
        },
        animation: window.google.maps.Animation.DROP
      });

      const infoWindowContent = createInfoWindowContent(place);
      const infoWindow = new window.google.maps.InfoWindow({
        content: infoWindowContent
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstance, marker);
        setSelectedPlace(place);
        onPlaceSelect?.(place);
      });
    });
  };

  const addUserLocationMarker = (mapInstance: any, location: { lat: number; lng: number }) => {
    new window.google.maps.Marker({
      position: location,
      map: mapInstance,
      title: 'Your Location',
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: new window.google.maps.Size(50, 50)
      }
    });
  };

  const createInfoWindowContent = (place: Place): string => {
    const stars = '⭐'.repeat(Math.floor(place.rating || 0));
    const priceSymbols = '₹'.repeat(place.priceLevel || 1);
    
    return `
      <div style="max-width: 300px; padding: 12px;">
        <h3 style="margin: 0 0 8px 0; color: #d97706; font-size: 16px; font-weight: bold;">
          ${place.name}
        </h3>
        <div style="margin-bottom: 8px;">
          <span style="color: #059669; font-weight: bold;">${stars}</span>
          <span style="margin-left: 8px; color: #6b7280;">${place.rating?.toFixed(1) || 'N/A'}</span>
          ${place.priceLevel ? `<span style="margin-left: 8px; color: #f59e0b;">${priceSymbols}</span>` : ''}
        </div>
        <p style="margin: 0 0 8px 0; font-size: 14px; color: #4b5563;">
          ${place.address}
        </p>
        <div style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">
          ${place.types.slice(0, 3).join(' • ')}
        </div>
        ${place.openNow !== undefined ? `
          <div style="font-size: 12px; margin-bottom: 8px;">
            <span style="color: ${place.openNow ? '#059669' : '#dc2626'};">
              ${place.openNow ? '🟢 Open Now' : '🔴 Closed'}
            </span>
          </div>
        ` : ''}
        <div style="display: flex; gap: 8px; margin-top: 8px;">
          <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${place.location.lat},${place.location.lng}', '_blank')" 
                  style="background: #3b82f6; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 12px; cursor: pointer;">
            🧭 Directions
          </button>
          ${place.phone ? `
            <button onclick="window.open('tel:${place.phone}', '_blank')" 
                    style="background: #059669; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 12px; cursor: pointer;">
              📞 Call
            </button>
          ` : ''}
          ${place.website ? `
            <button onclick="window.open('${place.website}', '_blank')" 
                    style="background: #7c3aed; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 12px; cursor: pointer;">
              🌐 Website
            </button>
          ` : ''}
        </div>
      </div>
    `;
  };

  const searchPlaces = async (query: string) => {
    if (!map || !window.google?.maps?.places) return;

    setIsLoading(true);
    try {
      const service = new window.google.maps.places.PlacesService(map);
      
      const request = {
        location: center,
        radius: searchRadius,
        query: query,
        type: 'tourist_attraction'
      };

      service.textSearch(request, (results: any[], status: any) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          const newPlaces: Place[] = results.slice(0, 10).map((result, index) => ({
            id: `search_${index}`,
            name: result.name,
            location: {
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng()
            },
            address: result.formatted_address || result.vicinity || '',
            rating: result.rating,
            types: result.types || [],
            photos: result.photos?.slice(0, 3).map((photo: any) => 
              photo.getUrl({ maxWidth: 400, maxHeight: 300 })
            ) || [],
            openNow: result.opening_hours?.open_now,
            priceLevel: result.price_level
          }));

          setPlaces(newPlaces);
          
          // Clear existing markers and add new ones
          map.setCenter(center);
          addMarkersToMap(map, newPlaces);
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Places search error:', error);
      setIsLoading(false);
    }
  };

  const getMarkerIcon = (type: string): string => {
    const iconMap: { [key: string]: string } = {
      'hindu_temple': 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      'buddhist_temple': 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      'tourist_attraction': 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      'historical_landmark': 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
      'museum': 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      'restaurant': 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png',
      'lodging': 'https://maps.google.com/mapfiles/ms/icons/pink-dot.png'
    };
    
    return iconMap[type] || 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
  };

  const centerOnPlace = (place: Place) => {
    if (map) {
      map.setCenter(place.location);
      map.setZoom(16);
      setSelectedPlace(place);
      onPlaceSelect?.(place);
    }
  };

  if (error) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg font-semibold mb-2">⚠️ Map Error</div>
          <div className="text-gray-600">{error}</div>
          <div className="text-sm text-gray-500 mt-2">
            Please check your Google Maps API configuration
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Map Controls */}
      <div className="bg-white rounded-t-lg p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-800">Interactive Map</h3>
            <span className="text-sm text-gray-500">
              {places.length} places found
            </span>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={searchRadius}
              onChange={(e) => setSearchRadius(Number(e.target.value))}
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option value={1000}>1 km</option>
              <option value={2500}>2.5 km</option>
              <option value={5000}>5 km</option>
              <option value={10000}>10 km</option>
              <option value={25000}>25 km</option>
            </select>
            {isLoading && (
              <div className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
            )}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div 
          ref={mapRef}
          className="w-full h-96 bg-gray-200 relative"
        >
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                <div className="text-gray-600">Loading enhanced map...</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Places List */}
      {places.length > 0 && (
        <div className="bg-white rounded-b-lg border-t">
          <div className="p-4">
            <h4 className="text-md font-semibold text-gray-800 mb-3">Places Near You</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
              {places.slice(0, 6).map((place) => (
                <div
                  key={place.id}
                  onClick={() => centerOnPlace(place)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedPlace?.id === place.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="text-orange-500 mt-1 flex-shrink-0" size={16} />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-gray-800 truncate">{place.name}</h5>
                      <div className="flex items-center gap-2 mt-1">
                        {place.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-500" size={12} />
                            <span className="text-sm text-gray-600">{place.rating.toFixed(1)}</span>
                          </div>
                        )}
                        {place.openNow !== undefined && (
                          <span className={`text-xs px-2 py-1 rounded ${
                            place.openNow ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {place.openNow ? 'Open' : 'Closed'}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate mt-1">{place.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
