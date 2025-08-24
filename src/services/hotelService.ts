// Types for hotel data
export interface Hotel {
  id: string;
  name: string;
  description: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  rating: number;
  reviews: {
    count: number;
    rating: number;
  };
  price: number;
  images: string[];
  amenities: string[];
  availability?: {
    rooms: Room[];
  };
}

export interface Room {
  type: string;
  price: number;
  capacity: number;
  amenities: string[];
}

export interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface Filters {
  priceRange: [number, number];
  rating: number;
  amenities: string[];
}

// API configuration
const API_CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  BASE_URL: 'https://maps.googleapis.com/maps/api/place',
  HOTELS_API_URL: 'https://hotels.googleapis.com/v1'
};

// Mock data for development
const MOCK_HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'BrijRama Palace',
    description: 'A luxury heritage hotel located on the banks of the Ganges River.',
    location: {
      address: 'Dashashwamedh Ghat, Varanasi',
      coordinates: {
        lat: 25.3176,
        lng: 82.9739
      }
    },
    rating: 4.8,
    reviews: {
      count: 1250,
      rating: 4.8
    },
    price: 25000,
    images: [
      '/images/brijrama-palace-1.jpg',
      '/images/brijrama-palace-2.jpg',
      '/images/brijrama-palace-3.jpg'
    ],
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Room Service'],
    availability: {
      rooms: [
        {
          type: 'Deluxe Room',
          price: 25000,
          capacity: 2,
          amenities: ['King Bed', 'Air Conditioning', 'WiFi', 'TV']
        },
        {
          type: 'Suite',
          price: 45000,
          capacity: 4,
          amenities: ['King Bed', 'Air Conditioning', 'WiFi', 'TV', 'Living Room', 'Mini Bar']
        }
      ]
    }
  },
  {
    id: '2',
    name: 'Taj Ganges Varanasi',
    description: 'A 5-star luxury hotel offering stunning views of the Ganges River.',
    location: {
      address: 'Nadesar Palace Grounds, Varanasi',
      coordinates: {
        lat: 25.3176,
        lng: 82.9739
      }
    },
    rating: 4.7,
    reviews: {
      count: 980,
      rating: 4.7
    },
    price: 30000,
    images: [
      '/images/taj-ganges-1.jpg',
      '/images/taj-ganges-2.jpg',
      '/images/taj-ganges-3.jpg'
    ],
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Room Service'],
    availability: {
      rooms: [
        {
          type: 'Deluxe Room',
          price: 30000,
          capacity: 2,
          amenities: ['King Bed', 'Air Conditioning', 'WiFi', 'TV']
        },
        {
          type: 'Suite',
          price: 55000,
          capacity: 4,
          amenities: ['King Bed', 'Air Conditioning', 'WiFi', 'TV', 'Living Room', 'Mini Bar']
        }
      ]
    }
  },
  {
    id: '3',
    name: 'Hotel Surya',
    description: 'A modern hotel with excellent amenities and service.',
    location: {
      address: 'The Mall Road, Varanasi',
      coordinates: {
        lat: 25.3176,
        lng: 82.9739
      }
    },
    rating: 4.5,
    reviews: {
      count: 750,
      rating: 4.5
    },
    price: 15000,
    images: [
      '/images/hotel-surya-1.jpg',
      '/images/hotel-surya-2.jpg',
      '/images/hotel-surya-3.jpg'
    ],
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Gym'],
    availability: {
      rooms: [
        {
          type: 'Deluxe Room',
          price: 15000,
          capacity: 2,
          amenities: ['Queen Bed', 'Air Conditioning', 'WiFi', 'TV']
        },
        {
          type: 'Suite',
          price: 25000,
          capacity: 4,
          amenities: ['King Bed', 'Air Conditioning', 'WiFi', 'TV', 'Living Room']
        }
      ]
    }
  }
];

// Service functions
export const hotelService = {
  // Search hotels based on parameters
  async searchHotels(params: SearchParams): Promise<Hotel[]> {
    try {
      // In development mode, return mock data
      if (process.env.NODE_ENV === 'development') {
        return MOCK_HOTELS;
      }

      // Make API request to Google Places API
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/textsearch/json?query=hotels in ${params.location}&key=${API_CONFIG.API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }

      const data = await response.json();
      return data.results.map((place: any) => ({
        id: place.place_id,
        name: place.name,
        description: place.editorial_summary?.overview || '',
        location: {
          address: place.formatted_address,
          coordinates: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng
          }
        },
        rating: place.rating || 0,
        reviews: {
          count: place.user_ratings_total || 0,
          rating: place.rating || 0
        },
        price: Math.floor(Math.random() * 50000) + 5000, // Mock price
        images: place.photos?.map((photo: any) => 
          `${API_CONFIG.BASE_URL}/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${API_CONFIG.API_KEY}`
        ) || [],
        amenities: place.types || [],
        availability: {
          rooms: [
            {
              type: 'Deluxe Room',
              price: Math.floor(Math.random() * 20000) + 5000,
              capacity: 2,
              amenities: ['King Bed', 'Air Conditioning', 'WiFi', 'TV']
            },
            {
              type: 'Suite',
              price: Math.floor(Math.random() * 30000) + 10000,
              capacity: 4,
              amenities: ['King Bed', 'Air Conditioning', 'WiFi', 'TV', 'Living Room', 'Mini Bar']
            }
          ]
        }
      }));
    } catch (error) {
      console.error('Error fetching hotels:', error);
      // Return mock data in case of error
      return MOCK_HOTELS;
    }
  },

  // Get hotel details
  async getHotelDetails(hotelId: string): Promise<Hotel> {
    try {
      // In development mode, return mock data
      if (process.env.NODE_ENV === 'development') {
        return MOCK_HOTELS.find(hotel => hotel.id === hotelId) || MOCK_HOTELS[0];
      }

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/details/json?place_id=${hotelId}&fields=name,formatted_address,geometry,rating,user_ratings_total,editorial_summary,photos,types&key=${API_CONFIG.API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch hotel details');
      }

      const data = await response.json();
      const place = data.result;

      return {
        id: place.place_id,
        name: place.name,
        description: place.editorial_summary?.overview || '',
        location: {
          address: place.formatted_address,
          coordinates: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng
          }
        },
        rating: place.rating || 0,
        reviews: {
          count: place.user_ratings_total || 0,
          rating: place.rating || 0
        },
        price: Math.floor(Math.random() * 50000) + 5000, // Mock price
        images: place.photos?.map((photo: any) => 
          `${API_CONFIG.BASE_URL}/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${API_CONFIG.API_KEY}`
        ) || [],
        amenities: place.types || [],
        availability: {
          rooms: [
            {
              type: 'Deluxe Room',
              price: Math.floor(Math.random() * 20000) + 5000,
              capacity: 2,
              amenities: ['King Bed', 'Air Conditioning', 'WiFi', 'TV']
            },
            {
              type: 'Suite',
              price: Math.floor(Math.random() * 30000) + 10000,
              capacity: 4,
              amenities: ['King Bed', 'Air Conditioning', 'WiFi', 'TV', 'Living Room', 'Mini Bar']
            }
          ]
        }
      };
    } catch (error) {
      console.error('Error fetching hotel details:', error);
      // Return mock data in case of error
      return MOCK_HOTELS.find(hotel => hotel.id === hotelId) || MOCK_HOTELS[0];
    }
  },

  // Get available amenities
  async getAvailableAmenities(): Promise<string[]> {
    try {
      // For development, return mock amenities
      if (process.env.NODE_ENV === 'development') {
        return ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Room Service', 'Business Center', 'Garden'];
      }

      // Google Places API doesn't have a dedicated amenities endpoint
      // We'll return a curated list of common hotel amenities
      return [
        'lodging',
        'restaurant',
        'bar',
        'gym',
        'spa',
        'pool',
        'parking',
        'wifi',
        'room_service',
        'business_center',
        'conference_room',
        'garden',
        'terrace',
        'air_conditioning',
        'elevator'
      ];
    } catch (error) {
      console.error('Error fetching amenities:', error);
      // Return mock amenities if API fails
      return ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Room Service', 'Business Center', 'Garden'];
    }
  },

  // Get hotel availability
  async getHotelAvailability(hotelId: string, checkIn: Date, checkOut: Date, guests: number): Promise<any> {
    try {
      const queryParams = new URLSearchParams({
        hotel_id: hotelId,
        checkin_date: checkIn.toISOString().split('T')[0],
        checkout_date: checkOut.toISOString().split('T')[0],
        adults_number: guests.toString(),
        units: 'metric',
        room_number: '1',
        children_number: '0',
        children_ages: '5,0',
        categories_filter_ids: 'class::2,class::4,free_cancellation::1',
        page_number: '0',
        include_adjacency: 'true',
      });

      const response = await fetch(`${API_CONFIG.BASE_URL}/hotels/room-list?${queryParams}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_CONFIG.API_KEY || '',
          'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST || '',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch hotel availability');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching hotel availability:', error);
      throw error;
    }
  },

  // Check room availability
  async checkAvailability(hotelId: string, checkIn: Date, checkOut: Date, guests: number): Promise<Room[]> {
    try {
      // In a real implementation, this would call a booking API
      // For now, we'll return mock data
      const hotel = await this.getHotelDetails(hotelId);
      return hotel.availability?.rooms.filter(room => room.capacity >= guests) || [];
    } catch (error) {
      console.error('Error checking availability:', error);
      throw error;
    }
  },

  // Book a room
  async bookRoom(hotelId: string, roomType: string): Promise<{ success: boolean; bookingId?: string }> {
    try {
      // In development mode, simulate successful booking
      if (process.env.NODE_ENV === 'development') {
        return {
          success: true,
          bookingId: `MOCK-${Math.random().toString(36).substr(2, 9)}`
        };
      }

      // Make API request to book room
      const response = await fetch(`${API_CONFIG.HOTELS_API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.API_KEY}`
        },
        body: JSON.stringify({
          hotelId,
          roomType
        })
      });

      if (!response.ok) {
        throw new Error('Failed to book room');
      }

      const data = await response.json();
      return {
        success: true,
        bookingId: data.bookingId
      };
    } catch (error) {
      console.error('Error booking room:', error);
      return {
        success: false
      };
    }
  }
}; 