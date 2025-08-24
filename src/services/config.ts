export const API_CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  HOTELS_API_URL: process.env.NEXT_PUBLIC_HOTELS_API_URL,
  PHOTOGRAPHY_API_URL: process.env.NEXT_PUBLIC_PHOTOGRAPHY_API_URL,
  MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  MAPS_API_URL: 'https://maps.googleapis.com/maps/api',
  PLACES_API_URL: 'https://maps.googleapis.com/maps/api/place'
}; 