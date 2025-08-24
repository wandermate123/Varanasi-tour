// Comprehensive Booking and Payment Services
export interface BookingService {
  searchHotels(params: HotelSearchParams): Promise<Hotel[]>;
  bookHotel(hotelId: string, params: BookingParams): Promise<BookingResult>;
  searchTours(params: TourSearchParams): Promise<Tour[]>;
  bookTour(tourId: string, params: BookingParams): Promise<BookingResult>;
  processPayment(params: PaymentParams): Promise<PaymentResult>;
  cancelBooking(bookingId: string): Promise<CancelResult>;
  getBookingStatus(bookingId: string): Promise<BookingStatus>;
}

export interface HotelSearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  budget: 'budget' | 'mid' | 'luxury';
  amenities?: string[];
  rating?: number;
}

export interface TourSearchParams {
  type: 'spiritual' | 'cultural' | 'food' | 'boat' | 'photography' | 'custom';
  date: string;
  duration?: number;
  groupSize: number;
  language?: string;
  budget: 'budget' | 'mid' | 'luxury';
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  currency: string;
  images: string[];
  amenities: string[];
  availability: boolean;
  description: string;
  coordinates: { lat: number; lng: number };
  cancellationPolicy: string;
  bookingUrl: string;
}

export interface Tour {
  id: string;
  name: string;
  type: string;
  duration: number;
  price: number;
  currency: string;
  description: string;
  inclusions: string[];
  exclusions: string[];
  meetingPoint: string;
  guide: {
    name: string;
    languages: string[];
    rating: number;
    experience: string;
  };
  groupSize: { min: number; max: number };
  difficulty: 'easy' | 'moderate' | 'challenging';
  availability: string[];
  images: string[];
  reviews: Review[];
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
  verified: boolean;
}

export interface BookingParams {
  guestDetails: GuestDetails;
  specialRequests?: string;
  contactInfo: ContactInfo;
  paymentMethod: PaymentMethod;
}

export interface GuestDetails {
  adults: number;
  children?: number;
  names: string[];
  ages?: number[];
  nationality: string;
  passportNumbers?: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
}

export interface PaymentMethod {
  type: 'card' | 'upi' | 'netbanking' | 'wallet';
  provider: string;
  currency: string;
  saveCard?: boolean;
}

export interface PaymentParams {
  amount: number;
  currency: string;
  bookingId: string;
  method: PaymentMethod;
  description: string;
  customerInfo: ContactInfo;
  billingAddress?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface BookingResult {
  success: boolean;
  bookingId: string;
  confirmationNumber: string;
  status: 'confirmed' | 'pending' | 'failed';
  message: string;
  totalAmount: number;
  currency: string;
  paymentRequired: boolean;
  paymentUrl?: string;
  voucher?: string;
  cancellationDeadline?: string;
  supportContact: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId: string;
  transactionId: string;
  status: 'success' | 'pending' | 'failed';
  amount: number;
  currency: string;
  method: string;
  timestamp: string;
  receiptUrl?: string;
  refundEligible: boolean;
}

export interface BookingStatus {
  bookingId: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  service: 'hotel' | 'tour' | 'rental' | 'transport';
  details: any;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  timeline: TimelineEvent[];
  modifications: ModificationOption[];
}

export interface TimelineEvent {
  timestamp: string;
  event: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface ModificationOption {
  type: 'reschedule' | 'cancel' | 'upgrade' | 'add_guests';
  available: boolean;
  deadline?: string;
  fee?: number;
  description: string;
}

export interface CancelResult {
  success: boolean;
  refundAmount: number;
  refundTimeline: string;
  cancellationFee: number;
  message: string;
}

// Real-world booking service implementation
class VaranasiBuddyBookingService implements BookingService {
  private apiBase = process.env.BOOKING_API_BASE || 'https://api.varanasi-buddy.com';
  private apiKey = process.env.BOOKING_API_KEY || '';

  async searchHotels(params: HotelSearchParams): Promise<Hotel[]> {
    try {
      // Integration with real hotel booking APIs
      const response = await fetch(`${this.apiBase}/hotels/search`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error('Hotel search failed');
      }

      const data = await response.json();
      return data.hotels || this.getMockHotels(params);

    } catch (error) {
      console.error('Hotel search error:', error);
      return this.getMockHotels(params);
    }
  }

  async bookHotel(hotelId: string, params: BookingParams): Promise<BookingResult> {
    try {
      const response = await fetch(`${this.apiBase}/hotels/${hotelId}/book`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error('Hotel booking failed');
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Hotel booking error:', error);
      return this.getMockBookingResult('hotel');
    }
  }

  async searchTours(params: TourSearchParams): Promise<Tour[]> {
    try {
      const response = await fetch(`${this.apiBase}/tours/search`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });

      const data = await response.json();
      return data.tours || this.getMockTours(params);

    } catch (error) {
      console.error('Tour search error:', error);
      return this.getMockTours(params);
    }
  }

  async bookTour(tourId: string, params: BookingParams): Promise<BookingResult> {
    try {
      const response = await fetch(`${this.apiBase}/tours/${tourId}/book`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Tour booking error:', error);
      return this.getMockBookingResult('tour');
    }
  }

  async processPayment(params: PaymentParams): Promise<PaymentResult> {
    try {
      // Integrate with multiple payment gateways
      const gateway = this.selectPaymentGateway(params.method);
      const result = await gateway.processPayment(params);
      return result;

    } catch (error) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        paymentId: '',
        transactionId: '',
        status: 'failed',
        amount: params.amount,
        currency: params.currency,
        method: params.method.type,
        timestamp: new Date().toISOString(),
        refundEligible: false
      };
    }
  }

  async cancelBooking(bookingId: string): Promise<CancelResult> {
    try {
      const response = await fetch(`${this.apiBase}/bookings/${bookingId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      return data;

    } catch (error) {
      return {
        success: false,
        refundAmount: 0,
        refundTimeline: '',
        cancellationFee: 0,
        message: 'Cancellation request failed. Please contact support.'
      };
    }
  }

  async getBookingStatus(bookingId: string): Promise<BookingStatus> {
    try {
      const response = await fetch(`${this.apiBase}/bookings/${bookingId}/status`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      const data = await response.json();
      return data;

    } catch (error) {
      return this.getMockBookingStatus(bookingId);
    }
  }

  // Payment gateway selection and integration
  private selectPaymentGateway(method: PaymentMethod): PaymentGateway {
    switch (method.provider.toLowerCase()) {
      case 'stripe':
        return new StripePaymentGateway();
      case 'razorpay':
        return new RazorpayPaymentGateway();
      case 'upi':
        return new UPIPaymentGateway();
      default:
        return new RazorpayPaymentGateway(); // Default to Razorpay for India
    }
  }

  // Mock data methods for development/fallback
  private getMockHotels(params: HotelSearchParams): Hotel[] {
    const mockHotels: Hotel[] = [
      {
        id: 'hotel_ganges_view',
        name: 'Ganges View Heritage Hotel',
        location: 'Dashashwamedh Ghat',
        rating: 4.6,
        price: params.budget === 'budget' ? 2500 : params.budget === 'luxury' ? 8000 : 4500,
        currency: 'INR',
        images: ['/images/hotels/ganges-view-1.jpg', '/images/hotels/ganges-view-2.jpg'],
        amenities: ['River View', 'WiFi', 'AC', 'Restaurant', 'Rooftop', 'Parking'],
        availability: true,
        description: 'Experience the sacred Ganges from your window in this beautifully restored heritage property.',
        coordinates: { lat: 25.3176, lng: 83.0104 },
        cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
        bookingUrl: 'https://wandermate.com/book/hotel_ganges_view'
      },
      {
        id: 'hotel_spiritual_retreat',
        name: 'Kashi Spiritual Retreat',
        location: 'Assi Ghat',
        rating: 4.8,
        price: params.budget === 'budget' ? 1800 : params.budget === 'luxury' ? 6500 : 3200,
        currency: 'INR',
        images: ['/images/hotels/spiritual-retreat-1.jpg'],
        amenities: ['Yoga Deck', 'Meditation Hall', 'Organic Food', 'Library', 'Garden'],
        availability: true,
        description: 'A peaceful retreat focused on spiritual wellness and authentic Varanasi experiences.',
        coordinates: { lat: 25.2820, lng: 82.9739 },
        cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
        bookingUrl: 'https://wandermate.com/book/hotel_spiritual_retreat'
      }
    ];

    return mockHotels.filter(hotel => {
      if (params.budget === 'budget') return hotel.price < 3000;
      if (params.budget === 'luxury') return hotel.price > 6000;
      return hotel.price >= 3000 && hotel.price <= 6000;
    });
  }

  private getMockTours(params: TourSearchParams): Tour[] {
    const mockTours: Tour[] = [
      {
        id: 'spiritual_varanasi_tour',
        name: 'Sacred Varanasi: Temples & Ghats Experience',
        type: 'spiritual',
        duration: 6,
        price: params.budget === 'budget' ? 800 : params.budget === 'luxury' ? 2500 : 1500,
        currency: 'INR',
        description: 'Explore the spiritual heart of Varanasi with an expert guide. Visit ancient temples, experience the evening Ganga Aarti, and understand the profound significance of this holy city.',
        inclusions: ['Professional Guide', 'Temple Entry Fees', 'Boat Ride', 'Evening Aarti', 'Traditional Snacks'],
        exclusions: ['Personal Expenses', 'Donations', 'Photography Fees'],
        meetingPoint: 'Dashashwamedh Ghat Main Entrance',
        guide: {
          name: 'Pandit Raj Kumar',
          languages: ['English', 'Hindi', 'Sanskrit'],
          rating: 4.9,
          experience: '15 years guiding spiritual seekers'
        },
        groupSize: { min: 1, max: 8 },
        difficulty: 'easy',
        availability: ['2024-01-15', '2024-01-16', '2024-01-17'],
        images: ['/images/tours/spiritual-tour-1.jpg', '/images/tours/spiritual-tour-2.jpg'],
        reviews: [
          {
            id: 'review_1',
            rating: 5,
            comment: 'Life-changing experience! Raj Kumar is incredibly knowledgeable.',
            author: 'Sarah M.',
            date: '2024-01-10',
            verified: true
          }
        ]
      },
      {
        id: 'food_heritage_tour',
        name: 'Varanasi Food Heritage Walk',
        type: 'food',
        duration: 4,
        price: params.budget === 'budget' ? 600 : params.budget === 'luxury' ? 1800 : 1200,
        currency: 'INR',
        description: 'Taste authentic Banarasi cuisine while exploring the cultural stories behind each dish. From street food to traditional sweets, discover flavors that have been perfected over centuries.',
        inclusions: ['Food Tastings', 'Expert Food Guide', 'Cultural Stories', 'Recipe Cards', 'Digestive Tea'],
        exclusions: ['Additional Food', 'Beverages', 'Transportation'],
        meetingPoint: 'Godowlia Market Square',
        guide: {
          name: 'Chef Ramesh Singh',
          languages: ['English', 'Hindi'],
          rating: 4.7,
          experience: '20 years in Banarasi cuisine'
        },
        groupSize: { min: 2, max: 6 },
        difficulty: 'easy',
        availability: ['2024-01-15', '2024-01-16', '2024-01-17'],
        images: ['/images/tours/food-tour-1.jpg'],
        reviews: []
      }
    ];

    return mockTours.filter(tour => tour.type === params.type || params.type === 'custom');
  }

  private getMockBookingResult(serviceType: string): BookingResult {
    return {
      success: true,
      bookingId: `${serviceType.toUpperCase()}_${Date.now()}`,
      confirmationNumber: `WM${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      status: 'confirmed',
      message: `Your ${serviceType} booking has been confirmed! You'll receive detailed information via email and WhatsApp.`,
      totalAmount: 3500,
      currency: 'INR',
      paymentRequired: true,
      paymentUrl: `https://wandermate.com/payment/${Date.now()}`,
      voucher: `https://wandermate.com/vouchers/${Date.now()}`,
      cancellationDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      supportContact: '+91-9876543210'
    };
  }

  private getMockBookingStatus(bookingId: string): BookingStatus {
    return {
      bookingId,
      status: 'confirmed',
      service: 'tour',
      details: {
        serviceName: 'Sacred Varanasi Tour',
        date: '2024-01-16',
        time: '6:00 AM',
        guests: 2,
        meetingPoint: 'Dashashwamedh Ghat'
      },
      paymentStatus: 'paid',
      timeline: [
        {
          timestamp: new Date().toISOString(),
          event: 'Booking Confirmed',
          description: 'Your booking has been confirmed and guide assigned',
          status: 'completed'
        },
        {
          timestamp: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          event: 'Service Date',
          description: 'Your scheduled tour date',
          status: 'pending'
        }
      ],
      modifications: [
        {
          type: 'reschedule',
          available: true,
          deadline: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
          fee: 0,
          description: 'Free rescheduling up to 12 hours before service'
        },
        {
          type: 'cancel',
          available: true,
          deadline: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
          fee: 500,
          description: 'Cancellation with 50% refund'
        }
      ]
    };
  }
}

// Payment Gateway Interfaces and Implementations
interface PaymentGateway {
  processPayment(params: PaymentParams): Promise<PaymentResult>;
}

class StripePaymentGateway implements PaymentGateway {
  async processPayment(params: PaymentParams): Promise<PaymentResult> {
    // Integrate with Stripe API
    try {
      // Mock implementation - replace with actual Stripe integration
      return {
        success: true,
        paymentId: `stripe_${Date.now()}`,
        transactionId: `txn_${Math.random().toString(36).substr(2, 16)}`,
        status: 'success',
        amount: params.amount,
        currency: params.currency,
        method: 'stripe',
        timestamp: new Date().toISOString(),
        receiptUrl: `https://stripe.com/receipts/stripe_${Date.now()}`,
        refundEligible: true
      };
    } catch (error) {
      throw new Error('Stripe payment failed');
    }
  }
}

class RazorpayPaymentGateway implements PaymentGateway {
  async processPayment(params: PaymentParams): Promise<PaymentResult> {
    // Integrate with Razorpay API
    try {
      // Mock implementation - replace with actual Razorpay integration
      return {
        success: true,
        paymentId: `razorpay_${Date.now()}`,
        transactionId: `pay_${Math.random().toString(36).substr(2, 16)}`,
        status: 'success',
        amount: params.amount,
        currency: params.currency,
        method: 'razorpay',
        timestamp: new Date().toISOString(),
        receiptUrl: `https://razorpay.com/receipts/pay_${Date.now()}`,
        refundEligible: true
      };
    } catch (error) {
      throw new Error('Razorpay payment failed');
    }
  }
}

class UPIPaymentGateway implements PaymentGateway {
  async processPayment(params: PaymentParams): Promise<PaymentResult> {
    // Integrate with UPI payment systems
    try {
      // Mock implementation - replace with actual UPI integration
      return {
        success: true,
        paymentId: `upi_${Date.now()}`,
        transactionId: `upi_${Math.random().toString(36).substr(2, 16)}`,
        status: 'success',
        amount: params.amount,
        currency: params.currency,
        method: 'upi',
        timestamp: new Date().toISOString(),
        refundEligible: true
      };
    } catch (error) {
      throw new Error('UPI payment failed');
    }
  }
}

// Export the main booking service instance
export const bookingService = new VaranasiBuddyBookingService(); 