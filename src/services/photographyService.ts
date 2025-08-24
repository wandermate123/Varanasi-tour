import { API_CONFIG } from './config';

export interface PhotographyPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  includes: string[];
  images: string[];
  category: 'wedding' | 'portrait' | 'event' | 'travel';
}

export interface BookingRequest {
  packageId: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  additionalNotes?: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  message: string;
}

// Mock data for development
const mockPackages: PhotographyPackage[] = [
  {
    id: 'wedding-premium',
    name: 'Wedding Premium',
    description: 'Capture your special day with our premium wedding photography package. Includes pre-wedding shoot, full day coverage, and a beautiful album.',
    price: 75000,
    duration: 'Full Day',
    includes: [
      'Pre-wedding shoot',
      'Full day coverage',
      '500+ edited photos',
      'Premium photo album',
      'Online gallery',
      'Express delivery'
    ],
    images: [
      '/images/photography/wedding-1.jpg',
      '/images/photography/wedding-2.jpg',
      '/images/photography/wedding-3.jpg'
    ],
    category: 'wedding'
  },
  {
    id: 'wedding-standard',
    name: 'Wedding Standard',
    description: 'Essential wedding photography coverage for your special day. Perfect for intimate ceremonies.',
    price: 45000,
    duration: '8 Hours',
    includes: [
      'Ceremony coverage',
      '300+ edited photos',
      'Digital delivery',
      'Online gallery',
      'Basic retouching'
    ],
    images: [
      '/images/photography/wedding-4.jpg',
      '/images/photography/wedding-5.jpg',
      '/images/photography/wedding-6.jpg'
    ],
    category: 'wedding'
  },
  {
    id: 'portrait-premium',
    name: 'Portrait Premium',
    description: 'Professional portrait photography session with multiple outfit changes and locations.',
    price: 25000,
    duration: '3 Hours',
    includes: [
      'Multiple locations',
      'Outfit changes',
      '50+ edited photos',
      'Premium retouching',
      'Online gallery',
      'Print package'
    ],
    images: [
      '/images/photography/portrait-1.jpg',
      '/images/photography/portrait-2.jpg',
      '/images/photography/portrait-3.jpg'
    ],
    category: 'portrait'
  },
  {
    id: 'portrait-standard',
    name: 'Portrait Standard',
    description: 'Classic portrait session perfect for individuals, couples, or small families.',
    price: 15000,
    duration: '2 Hours',
    includes: [
      'Single location',
      '30+ edited photos',
      'Basic retouching',
      'Online gallery',
      'Digital delivery'
    ],
    images: [
      '/images/photography/portrait-4.jpg',
      '/images/photography/portrait-5.jpg',
      '/images/photography/portrait-6.jpg'
    ],
    category: 'portrait'
  },
  {
    id: 'event-premium',
    name: 'Event Premium',
    description: 'Comprehensive coverage for corporate events, parties, and special occasions.',
    price: 35000,
    duration: '6 Hours',
    includes: [
      'Full event coverage',
      '200+ edited photos',
      'Online gallery',
      'Express delivery',
      'Event highlights video'
    ],
    images: [
      '/images/photography/event-1.jpg',
      '/images/photography/event-2.jpg',
      '/images/photography/event-3.jpg'
    ],
    category: 'event'
  },
  {
    id: 'travel-premium',
    name: 'Travel Premium',
    description: 'Professional travel photography package for capturing your adventures in Varanasi.',
    price: 20000,
    duration: '4 Hours',
    includes: [
      'Multiple locations',
      '50+ edited photos',
      'Online gallery',
      'Travel guide tips',
      'Digital delivery'
    ],
    images: [
      '/images/photography/travel-1.jpg',
      '/images/photography/travel-2.jpg',
      '/images/photography/travel-3.jpg'
    ],
    category: 'travel'
  }
];

export const photographyService = {
  async getPackages(): Promise<PhotographyPackage[]> {
    if (process.env.NODE_ENV === 'development') {
      return mockPackages;
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/photography/packages`, {
        headers: {
          'Authorization': `Bearer ${API_CONFIG.API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch photography packages');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching photography packages:', error);
      return mockPackages;
    }
  },

  async getPackageById(id: string): Promise<PhotographyPackage | null> {
    if (process.env.NODE_ENV === 'development') {
      return mockPackages.find(pkg => pkg.id === id) || null;
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/photography/packages/${id}`, {
        headers: {
          'Authorization': `Bearer ${API_CONFIG.API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch photography package');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching photography package:', error);
      return mockPackages.find(pkg => pkg.id === id) || null;
    }
  },

  async createBooking(booking: BookingRequest): Promise<BookingResponse> {
    if (process.env.NODE_ENV === 'development') {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        bookingId: `BOOK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        message: 'Booking created successfully'
      };
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/photography/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.API_KEY}`
        },
        body: JSON.stringify(booking)
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating booking:', error);
      return {
        success: false,
        message: 'Failed to create booking. Please try again later.'
      };
    }
  },

  async checkAvailability(packageId: string, date: string): Promise<boolean> {
    if (process.env.NODE_ENV === 'development') {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock availability check - randomly return true/false
      return Math.random() > 0.3;
    }

    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/photography/availability?packageId=${packageId}&date=${date}`,
        {
          headers: {
            'Authorization': `Bearer ${API_CONFIG.API_KEY}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to check availability');
      }

      const data = await response.json();
      return data.available;
    } catch (error) {
      console.error('Error checking availability:', error);
      return false;
    }
  }
}; 