'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, InfoWindow, Circle } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Zap, Clock, AlertTriangle, Camera, Heart, Star, Loader } from 'lucide-react';

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ["places", "geometry"];

interface IntelligentMapProps {
  onLocationSelect?: (location: any) => void;
  userLocation?: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
  showNavigation?: boolean;
  aiSuggestions?: any[];
}

const IntelligentMap: React.FC<IntelligentMapProps> = ({
  onLocationSelect,
  userLocation,
  destination,
  showNavigation,
  aiSuggestions
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [trafficLayer, setTrafficLayer] = useState<google.maps.TrafficLayer | null>(null);
  const [isRealTimeActive, setIsRealTimeActive] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [userPreferences, setUserPreferences] = useState({
    showTraffic: true,
    showPOI: true,
    showWeather: true,
    autoSuggest: true
  });

  const mapRef = useRef<HTMLDivElement>(null);
  const directionsService = useRef<google.maps.DirectionsService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  const mapContainerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '16px'
  };

  const center = userLocation || { lat: 25.3176, lng: 83.0107 }; // Default to Varanasi

  // Check if Google Maps API key is available
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    setIsGoogleMapsLoaded(true);
    setLoadingError(null);
    
    // Only initialize Google Maps services after the API is loaded
    try {
      if (typeof window !== 'undefined' && window.google && window.google.maps) {
        directionsService.current = new window.google.maps.DirectionsService();
        placesService.current = new window.google.maps.places.PlacesService(map);
        
        // Initialize traffic layer
        const traffic = new window.google.maps.TrafficLayer();
        setTrafficLayer(traffic);
        
        if (userPreferences.showTraffic) {
          traffic.setMap(map);
        }

        // Enable real-time features
        enableRealTimeFeatures(map);
      }
    } catch (error) {
      console.error('Error initializing Google Maps services:', error);
      setLoadingError('Failed to initialize maps services');
    }
  }, [userPreferences.showTraffic]);

  const onLoadError = useCallback((error: Error) => {
    console.error('Google Maps failed to load:', error);
    setLoadingError('Failed to load Google Maps. Please check your API key.');
  }, []);

  const enableRealTimeFeatures = (map: google.maps.Map) => {
    setIsRealTimeActive(true);
    
    // Real-time location updates
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          // Update user location and nearby suggestions
          updateNearbyPlaces(newPos);
          suggestRelevantLocations(newPos);
        },
        (error) => console.error('Geolocation error:', error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  };

  const updateNearbyPlaces = async (location: { lat: number; lng: number }) => {
    if (!placesService.current || !isGoogleMapsLoaded) return;
    if (typeof window === 'undefined' || !window.google || !window.google.maps) return;

    try {
      const request = {
        location: new window.google.maps.LatLng(location.lat, location.lng),
        radius: 1000,
        type: 'tourist_attraction'
      };

      placesService.current.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          const enhancedPlaces = results.map(place => ({
            ...place,
            aiRating: Math.random() * 5, // This would come from AI analysis
            crowdLevel: Math.floor(Math.random() * 3), // 0-2 (low, medium, high)
            waitTime: Math.floor(Math.random() * 30), // minutes
            weatherSuitability: Math.random() > 0.3 // boolean
          }));
          setNearbyPlaces(enhancedPlaces);
        }
      });
    } catch (error) {
      console.error('Error updating nearby places:', error);
    }
  };

  const suggestRelevantLocations = async (location: { lat: number; lng: number }) => {
    // This would integrate with your AI service
    try {
      const response = await fetch('/api/ai/location-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location,
          userPreferences,
          currentTime: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        const suggestions = await response.json();
        // Handle AI-generated location suggestions
      }
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
    }
  };

  const calculateRoute = useCallback(() => {
    if (!directionsService.current || !userLocation || !destination || !isGoogleMapsLoaded) return;
    if (typeof window === 'undefined' || !window.google || !window.google.maps) return;

    try {
      directionsService.current.route(
        {
          origin: userLocation,
          destination: destination,
          travelMode: window.google.maps.TravelMode.WALKING,
          provideRouteAlternatives: true,
          avoidHighways: false,
          avoidTolls: false
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
            
            // Analyze route with AI
            analyzeRouteWithAI(result);
          }
        }
      );
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  }, [userLocation, destination, isGoogleMapsLoaded]);

  const analyzeRouteWithAI = async (route: google.maps.DirectionsResult) => {
    try {
      const response = await fetch('/api/ai/route-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          route: {
            distance: route.routes[0].legs[0].distance?.text,
            duration: route.routes[0].legs[0].duration?.text,
            steps: route.routes[0].legs[0].steps.length
          },
          currentWeather: await getCurrentWeather(),
          timeOfDay: new Date().getHours()
        })
      });
      
      if (response.ok) {
        const analysis = await response.json();
        // Display AI insights about the route
      }
    } catch (error) {
      console.error('Error analyzing route:', error);
    }
  };

  const getCurrentWeather = async () => {
    try {
      const response = await fetch('/api/weather/current');
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error getting weather:', error);
    }
    return null;
  };

  useEffect(() => {
    if (showNavigation && userLocation && destination && isGoogleMapsLoaded) {
      calculateRoute();
    }
  }, [showNavigation, userLocation, destination, isGoogleMapsLoaded, calculateRoute]);

  const getPlaceIcon = (place: any) => {
    if (place.types?.includes('restaurant')) return '🍽️';
    if (place.types?.includes('tourist_attraction')) return '🏛️';
    if (place.types?.includes('lodging')) return '🏨';
    if (place.types?.includes('hospital')) return '🏥';
    return '📍';
  };

  const getCrowdLevelColor = (level: number) => {
    switch (level) {
      case 0: return '#10B981'; // Green - Low crowd
      case 1: return '#F59E0B'; // Yellow - Medium crowd
      case 2: return '#EF4444'; // Red - High crowd
      default: return '#6B7280';
    }
  };

  // Show error message if Google Maps API key is missing
  if (!googleMapsApiKey) {
    return (
      <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Maps Not Available</h3>
          <p className="text-gray-600 mb-4">
            To enable maps functionality, please add your Google Maps API key to the environment variables.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left">
            <p className="text-sm text-amber-800">
              <strong>Setup Instructions:</strong><br />
              1. Get API key from <a href="https://console.cloud.google.com/" target="_blank" className="text-amber-600 underline">Google Cloud Console</a><br />
              2. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file<br />
              3. Restart your development server
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error message if loading failed
  if (loadingError) {
    return (
      <div className="relative w-full h-[500px] bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Maps Loading Error</h3>
          <p className="text-gray-600 mb-4">{loadingError}</p>
          <button
            onClick={() => {
              setLoadingError(null);
              window.location.reload();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 bg-white rounded-xl shadow-lg p-3">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setUserPreferences(prev => ({ ...prev, showTraffic: !prev.showTraffic }))}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              userPreferences.showTraffic 
                ? 'bg-amber-100 text-amber-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span className="text-sm">Traffic</span>
          </button>
          
          <button
            onClick={() => setUserPreferences(prev => ({ ...prev, showPOI: !prev.showPOI }))}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              userPreferences.showPOI 
                ? 'bg-amber-100 text-amber-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm">POI</span>
          </button>
          
          <button
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isRealTimeActive 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span className="text-sm">Live</span>
          </button>
        </div>
      </div>

      {/* AI Suggestions Panel */}
      <AnimatePresence>
        {aiSuggestions && aiSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-4 right-4 z-10 bg-white rounded-xl shadow-lg p-4 w-80"
          >
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              AI Suggestions
            </h3>
            <div className="space-y-2">
              {aiSuggestions.slice(0, 3).map((suggestion, index) => (
                <div key={index} className="p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm text-gray-700">{suggestion.text}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    <span className="text-xs text-gray-600">{suggestion.confidence}% match</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {!isGoogleMapsLoaded && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-20 rounded-2xl">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-gray-600">Loading Google Maps...</p>
          </div>
        </div>
      )}

      {/* Map Component */}
      <LoadScript
        googleMapsApiKey={googleMapsApiKey}
        libraries={libraries}
        onLoad={() => setIsGoogleMapsLoaded(true)}
        onError={onLoadError}
        loadingElement={<div>Loading...</div>}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          options={{
            styles: [
              // Custom map styling for better visibility
              {
                featureType: "poi.business",
                stylers: [{ visibility: userPreferences.showPOI ? "on" : "off" }]
              }
            ],
            zoomControl: true,
            streetViewControl: true,
            fullscreenControl: true
          }}
        >
          {/* User Location Marker */}
          {userLocation && isGoogleMapsLoaded && window.google && window.google.maps && (
            <Marker
              position={userLocation}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#4F46E5',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 3
              }}
            />
          )}

          {/* Destination Marker */}
          {destination && isGoogleMapsLoaded && window.google && window.google.maps && (
            <Marker
              position={destination}
              icon={{
                url: '/icons/destination-pin.png',
                scaledSize: new window.google.maps.Size(40, 40)
              }}
            />
          )}

          {/* Nearby Places */}
          {userPreferences.showPOI && isGoogleMapsLoaded && window.google && window.google.maps && nearbyPlaces.map((place, index) => (
            <React.Fragment key={index}>
              <Marker
                position={{
                  lat: place.geometry?.location?.lat() || 0,
                  lng: place.geometry?.location?.lng() || 0
                }}
                onClick={() => setSelectedPlace(place)}
                icon={{
                  url: `/icons/${place.types?.[0] || 'default'}-icon.png`,
                  scaledSize: new window.google.maps.Size(32, 32)
                }}
              />
              
              {/* Crowd Level Indicator */}
              <Circle
                center={{
                  lat: place.geometry?.location?.lat() || 0,
                  lng: place.geometry?.location?.lng() || 0
                }}
                radius={50}
                options={{
                  fillColor: getCrowdLevelColor(place.crowdLevel),
                  fillOpacity: 0.2,
                  strokeColor: getCrowdLevelColor(place.crowdLevel),
                  strokeOpacity: 0.8,
                  strokeWeight: 2
                }}
              />
            </React.Fragment>
          ))}

          {/* Navigation Directions */}
          {directions && showNavigation && isGoogleMapsLoaded && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: '#F59E0B',
                  strokeWeight: 4,
                  strokeOpacity: 0.8
                }
              }}
            />
          )}

          {/* Info Window for Selected Place */}
          {selectedPlace && isGoogleMapsLoaded && (
            <InfoWindow
              position={{
                lat: selectedPlace.geometry?.location?.lat() || 0,
                lng: selectedPlace.geometry?.location?.lng() || 0
              }}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div className="p-3 max-w-xs">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <span>{getPlaceIcon(selectedPlace)}</span>
                  {selectedPlace.name}
                </h3>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{selectedPlace.rating || 'N/A'} ({selectedPlace.user_ratings_total || 0} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>Wait: ~{selectedPlace.waitTime} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className={`w-4 h-4 ${getCrowdLevelColor(selectedPlace.crowdLevel) === '#10B981' ? 'text-green-500' : getCrowdLevelColor(selectedPlace.crowdLevel) === '#F59E0B' ? 'text-yellow-500' : 'text-red-500'}`} />
                    <span>Crowd: {['Low', 'Medium', 'High'][selectedPlace.crowdLevel]}</span>
                  </div>
                </div>
                <button
                  onClick={() => onLocationSelect?.(selectedPlace)}
                  className="mt-3 w-full bg-amber-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-amber-600 transition-colors"
                >
                  Get AI Recommendations
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      {/* Real-time Status Bar */}
      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${isRealTimeActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600">
              {isRealTimeActive ? 'Real-time active' : 'Real-time inactive'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Places: {nearbyPlaces.length}</span>
            {directions && (
              <span>ETA: {directions.routes[0].legs[0].duration?.text}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligentMap; 