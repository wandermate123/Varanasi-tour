export interface BoatTour {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  rating: number;
  maxGuests: number;
  image: string;
  type: 'sunrise' | 'sunset' | 'day' | 'evening' | 'private';
  highlights: string[];
  departureTime: string;
  returnTime: string;
  included: string[];
  notIncluded: string[];
  availableDates?: string[];
  specialOffers?: {
    discount: number;
    validUntil: string;
    description: string;
  };
}

export interface BookingRequest {
  tourId: string;
  date: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  message: string;
  totalAmount?: number;
}

class BoatService {
  private boatTours: BoatTour[] = [
    {
      id: 'sunrise-ghat',
      name: 'Sunrise Ghat Experience',
      description: 'Begin your day with the magical sunrise over the sacred Ganges, witnessing the ancient rituals and spiritual awakening of Varanasi.',
      duration: '2 hours',
      price: 1200,
      rating: 4.8,
      maxGuests: 8,
      image: '/images/WhatsApp Image 2025-06-16 at 20.58.20_15cc56d6.jpg',
      type: 'sunrise',
      highlights: ['Sunrise over Ganges', 'Morning Aarti', 'Photography spots', 'Local guide'],
      departureTime: '5:30 AM',
      returnTime: '7:30 AM',
      included: ['Boat ride', 'Experienced guide', 'Morning tea', 'Photography assistance'],
      notIncluded: ['Hotel pickup', 'Personal expenses', 'Tips'],
      specialOffers: {
        discount: 15,
        validUntil: '2024-12-31',
        description: 'Early bird discount for sunrise tours'
      }
    },
    {
      id: 'sunset-ghat',
      name: 'Sunset Ghat Serenity',
      description: 'Experience the mystical sunset as the ghats come alive with evening prayers, floating diyas, and the soul-stirring Ganga Aarti.',
      duration: '2.5 hours',
      price: 1500,
      rating: 4.9,
      maxGuests: 10,
      image: '/images/WhatsApp Image 2025-06-17 at 00.51.00_5c3e4ef7.jpg',
      type: 'sunset',
      highlights: ['Sunset views', 'Evening Aarti', 'Floating diyas', 'Cultural insights'],
      departureTime: '5:00 PM',
      returnTime: '7:30 PM',
      included: ['Boat ride', 'Cultural guide', 'Evening snacks', 'Aarti participation'],
      notIncluded: ['Hotel pickup', 'Personal expenses', 'Tips']
    },
    {
      id: 'day-exploration',
      name: 'Day Ghat Discovery',
      description: 'Explore the vibrant ghats during the day, witnessing daily life, rituals, and the bustling energy of Varanasi\'s spiritual heart.',
      duration: '3 hours',
      price: 1800,
      rating: 4.7,
      maxGuests: 12,
      image: '/images/WhatsApp Image 2025-06-17 at 15.19.28_6e14a239.jpg',
      type: 'day',
      highlights: ['Ghat exploration', 'Cultural insights', 'Local interactions', 'Historical context'],
      departureTime: '9:00 AM',
      returnTime: '12:00 PM',
      included: ['Boat ride', 'Expert guide', 'Refreshments', 'Historical commentary'],
      notIncluded: ['Hotel pickup', 'Personal expenses', 'Tips']
    },
    {
      id: 'evening-mystique',
      name: 'Evening Mystique',
      description: 'Float through the mystical evening atmosphere as the city transforms into a magical realm of lights, prayers, and spiritual energy.',
      duration: '2 hours',
      price: 1400,
      rating: 4.6,
      maxGuests: 8,
      image: '/images/WhatsApp Image 2025-06-19 at 00.29.22_e8473b6a.jpg',
      type: 'evening',
      highlights: ['Evening atmosphere', 'Light displays', 'Spiritual energy', 'Peaceful experience'],
      departureTime: '6:30 PM',
      returnTime: '8:30 PM',
      included: ['Boat ride', 'Spiritual guide', 'Evening refreshments', 'Meditation session'],
      notIncluded: ['Hotel pickup', 'Personal expenses', 'Tips']
    },
    {
      id: 'private-luxury',
      name: 'Private Luxury Experience',
      description: 'Exclusive private boat experience with personalized attention, premium amenities, and intimate spiritual journey.',
      duration: '4 hours',
      price: 3500,
      rating: 5.0,
      maxGuests: 4,
      image: '/images/hero3.jpg',
      type: 'private',
      highlights: ['Private boat', 'Personal guide', 'Premium amenities', 'Customized experience'],
      departureTime: 'Flexible',
      returnTime: 'Flexible',
      included: ['Private boat', 'Personal guide', 'Premium refreshments', 'Photography service', 'Hotel pickup'],
      notIncluded: ['Personal expenses', 'Tips']
    },
    {
      id: 'photography-special',
      name: 'Photography Special Tour',
      description: 'Perfect for photographers and enthusiasts, this tour focuses on capturing the most photogenic moments and locations.',
      duration: '3.5 hours',
      price: 2200,
      rating: 4.9,
      maxGuests: 6,
      image: '/images/photography.jpg',
      type: 'sunrise',
      highlights: ['Photography guidance', 'Best photo spots', 'Golden hour timing', 'Professional tips'],
      departureTime: '5:00 AM',
      returnTime: '8:30 AM',
      included: ['Boat ride', 'Photography guide', 'Equipment assistance', 'Photo editing tips'],
      notIncluded: ['Camera equipment', 'Hotel pickup', 'Personal expenses']
    }
  ];

  async getAllTours(): Promise<BoatTour[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.boatTours);
      }, 500);
    });
  }

  async getTourById(id: string): Promise<BoatTour | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tour = this.boatTours.find(t => t.id === id);
        resolve(tour || null);
      }, 300);
    });
  }

  async searchTours(filters: {
    type?: string;
    priceRange?: [number, number];
    duration?: string;
    guests?: number;
  }): Promise<BoatTour[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = this.boatTours;

        if (filters.type && filters.type !== 'all') {
          filtered = filtered.filter(tour => tour.type === filters.type);
        }

        if (filters.priceRange) {
          filtered = filtered.filter(tour => 
            tour.price >= filters.priceRange![0] && tour.price <= filters.priceRange![1]
          );
        }

        if (filters.guests) {
          filtered = filtered.filter(tour => tour.maxGuests >= filters.guests!);
        }

        resolve(filtered);
      }, 400);
    });
  }

  async bookTour(booking: BookingRequest): Promise<BookingResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tour = this.boatTours.find(t => t.id === booking.tourId);
        if (!tour) {
          resolve({
            success: false,
            message: 'Tour not found'
          });
          return;
        }

        const totalAmount = tour.price * booking.guests;
        const bookingId = `BOAT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        resolve({
          success: true,
          bookingId,
          message: 'Booking confirmed successfully!',
          totalAmount
        });
      }, 1000);
    });
  }

  async getPopularTours(): Promise<BoatTour[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const popular = this.boatTours
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        resolve(popular);
      }, 300);
    });
  }

  async getSpecialOffers(): Promise<BoatTour[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const offers = this.boatTours.filter(tour => tour.specialOffers);
        resolve(offers);
      }, 300);
    });
  }
}

export const boatService = new BoatService(); 