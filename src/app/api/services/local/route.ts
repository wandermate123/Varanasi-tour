import { NextResponse } from 'next/server';

// Mock database for service bookings
let serviceBookings: any[] = [];
let serviceBookingId = 6000;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');
    const userId = searchParams.get('userId');
    const action = searchParams.get('action');
    const category = searchParams.get('category');
    const location = searchParams.get('location') || 'Varanasi';

    // Get specific booking
    if (bookingId) {
      const booking = serviceBookings.find(b => b.bookingId === bookingId);
      if (!booking) {
        return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: booking });
    }

    // Get user bookings
    if (userId) {
      const userBookings = serviceBookings.filter(b => b.userId === userId);
      return NextResponse.json({ success: true, data: userBookings });
    }

    // Get available services
    if (action === 'available') {
      const localServices = [
        // Tour Guides
        {
          id: 'guide_001',
          category: 'tour_guide',
          name: 'Pandit Ramesh Kumar',
          title: 'Expert Heritage Guide',
          specialization: ['Temples', 'History', 'Spiritual Tours'],
          languages: ['Hindi', 'English', 'Sanskrit'],
          experience: '15 years',
          rating: 4.8,
          reviewCount: 342,
          location: {
            area: 'Dashashwamedh Ghat',
            coordinates: { lat: 25.3176, lng: 83.0107 }
          },
          image: '/images/guides/guide1.jpg',
          pricing: {
            halfDay: 1500, // 4 hours
            fullDay: 2500, // 8 hours
            customTour: 400, // per hour
            currency: 'INR'
          },
          availability: {
            today: true,
            timeSlots: ['6:00 AM', '9:00 AM', '2:00 PM', '5:00 PM']
          },
          services: [
            'Temple explanations',
            'Historical insights',
            'Photography assistance',
            'Shopping guidance',
            'Cultural experiences'
          ],
          reviews: [
            {
              rating: 5,
              comment: 'Excellent knowledge of temples and history',
              user: 'John D.'
            }
          ]
        },
        {
          id: 'guide_002',
          category: 'tour_guide',
          name: 'Sita Devi',
          title: 'Local Culture Expert',
          specialization: ['Food Tours', 'Local Markets', 'Women-only Tours'],
          languages: ['Hindi', 'English', 'Bhojpuri'],
          experience: '8 years',
          rating: 4.6,
          reviewCount: 156,
          location: {
            area: 'Godowlia Market',
            coordinates: { lat: 25.3185, lng: 83.0115 }
          },
          image: '/images/guides/guide2.jpg',
          pricing: {
            halfDay: 1200,
            fullDay: 2000,
            customTour: 350,
            currency: 'INR'
          },
          availability: {
            today: true,
            timeSlots: ['7:00 AM', '10:00 AM', '3:00 PM']
          },
          services: [
            'Street food tours',
            'Market navigation',
            'Safe women tours',
            'Local customs',
            'Handicraft shopping'
          ]
        },

        // Spa & Wellness
        {
          id: 'spa_001',
          category: 'spa_wellness',
          name: 'Ganga Ayurvedic Spa',
          title: 'Traditional Ayurvedic Treatments',
          specialization: ['Ayurvedic Massage', 'Panchakarma', 'Meditation'],
          location: {
            address: 'Assi Ghat Road, Varanasi',
            coordinates: { lat: 25.2921, lng: 83.0042 }
          },
          rating: 4.7,
          reviewCount: 289,
          image: '/images/services/spa1.jpg',
          pricing: {
            abhyanga: 2500, // 60 mins full body massage
            shirobasti: 1800, // 45 mins head treatment
            panchakarma: 8000, // 3-day package
            meditation: 500, // 30 mins session
            currency: 'INR'
          },
          availability: {
            today: true,
            timeSlots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM']
          },
          services: [
            'Traditional Abhyanga massage',
            'Herbal steam therapy',
            'Meditation sessions',
            'Yoga classes',
            'Consultation with Ayurvedic doctor'
          ],
          amenities: [
            'Peaceful environment',
            'Certified therapists',
            'Organic oils',
            'Steam rooms',
            'Relaxation area'
          ]
        },

        // Transportation
        {
          id: 'transport_001',
          category: 'transportation',
          name: 'Ganga Boat Rides',
          title: 'Sacred River Experience',
          specialization: ['Sunrise Tours', 'Evening Aarti', 'Private Boats'],
          location: {
            address: 'Dashashwamedh Ghat',
            coordinates: { lat: 25.3176, lng: 83.0107 }
          },
          rating: 4.5,
          reviewCount: 567,
          image: '/images/services/boat1.jpg',
          pricing: {
            sunrise: 300, // per person (2 hours)
            sunset: 350, // per person (2 hours)
            aarti: 400, // per person (1.5 hours)
            private: 2000, // whole boat (up to 8 people)
            currency: 'INR'
          },
          availability: {
            today: true,
            timeSlots: ['5:30 AM', '6:00 AM', '5:30 PM', '6:00 PM', '6:30 PM']
          },
          services: [
            'Sunrise boat rides',
            'Evening Ganga Aarti viewing',
            'Photography from river',
            'Temple visits by boat',
            'Rowing lessons'
          ]
        },

        // Photography
        {
          id: 'photo_001',
          category: 'photography',
          name: 'Kashi Clicks Photography',
          title: 'Professional Travel Photography',
          specialization: ['Portrait', 'Wedding', 'Travel', 'Street Photography'],
          location: {
            area: 'Citywide Service',
            coordinates: { lat: 25.3176, lng: 83.0107 }
          },
          rating: 4.9,
          reviewCount: 123,
          image: '/images/services/photo1.jpg',
          pricing: {
            portrait: 2500, // 1 hour session (50 edited photos)
            travel: 4000, // 3 hour tour photography
            event: 8000, // full day event coverage
            prewedding: 15000, // 4 hour session
            currency: 'INR'
          },
          availability: {
            today: true,
            timeSlots: ['6:00 AM', '9:00 AM', '4:00 PM', '5:00 PM']
          },
          services: [
            'Professional photo shoots',
            'Edited high-resolution photos',
            'Drone photography (permitted areas)',
            'Video shoots',
            'Same-day delivery'
          ],
          equipment: [
            'DSLR cameras',
            'Professional lighting',
            'Drone (DJI)',
            'Editing software',
            'Backup equipment'
          ]
        },

        // Personal Services
        {
          id: 'personal_001',
          category: 'personal_care',
          name: 'Kashi Salon & Spa',
          title: 'Complete Grooming Services',
          specialization: ['Hair Care', 'Skin Care', 'Grooming'],
          location: {
            address: 'Cantonment Area, Varanasi',
            coordinates: { lat: 25.2854, lng: 82.8604 }
          },
          rating: 4.4,
          reviewCount: 234,
          image: '/images/services/salon1.jpg',
          pricing: {
            haircut: 300,
            facial: 800,
            massage: 1200,
            manicure: 500,
            pedicure: 600,
            currency: 'INR'
          },
          availability: {
            today: true,
            timeSlots: ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM']
          },
          services: [
            'Hair cut and styling',
            'Facial treatments',
            'Body massage',
            'Manicure & pedicure',
            'Bridal makeup'
          ]
        },

        // Language Services
        {
          id: 'language_001',
          category: 'language_services',
          name: 'Universal Translators',
          title: 'Professional Translation Services',
          specialization: ['Real-time Translation', 'Document Translation'],
          languages: ['Hindi', 'English', 'Japanese', 'French', 'German', 'Spanish'],
          location: {
            area: 'City-wide Service',
            coordinates: { lat: 25.3176, lng: 83.0107 }
          },
          rating: 4.6,
          reviewCount: 89,
          image: '/images/services/translator1.jpg',
          pricing: {
            hourly: 800, // per hour
            halfDay: 3000,
            fullDay: 5000,
            document: 50, // per page
            currency: 'INR'
          },
          availability: {
            today: true,
            timeSlots: ['Available on demand']
          },
          services: [
            'Real-time interpretation',
            'Document translation',
            'Tour assistance',
            'Business meetings',
            'Medical translation'
          ]
        }
      ];

      // Filter by category if specified
      let filteredServices = localServices;
      if (category) {
        filteredServices = localServices.filter(s => s.category === category);
      }

      return NextResponse.json({
        success: true,
        data: {
          services: filteredServices,
          categories: [
            { id: 'tour_guide', name: 'Tour Guides', icon: '🗺️' },
            { id: 'spa_wellness', name: 'Spa & Wellness', icon: '💆' },
            { id: 'transportation', name: 'Transportation', icon: '🚤' },
            { id: 'photography', name: 'Photography', icon: '📸' },
            { id: 'personal_care', name: 'Personal Care', icon: '💇' },
            { id: 'language_services', name: 'Translation', icon: '🌐' }
          ],
          searchCriteria: { category, location },
          totalResults: filteredServices.length,
          timestamp: new Date().toISOString()
        }
      });
    }

    return NextResponse.json({ success: true, data: serviceBookings });

  } catch (error) {
    console.error('Local Services GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch services data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, ...bookingData } = body;

    switch (action) {
      case 'book':
        return await bookService(bookingData);
      case 'cancel':
        return await cancelBooking(bookingData.bookingId, bookingData.reason);
      case 'reschedule':
        return await rescheduleService(bookingData);
      case 'rate':
        return await rateService(bookingData.bookingId, bookingData.rating, bookingData.feedback);
      default:
        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Local Services POST error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process service booking' }, { status: 500 });
  }
}

async function bookService(bookingData: any) {
  const booking = {
    bookingId: `SV${serviceBookingId++}`,
    userId: bookingData.userId,
    service: {
      id: bookingData.serviceId,
      name: bookingData.serviceName,
      category: bookingData.category,
      provider: bookingData.providerName
    },
    serviceDetails: {
      type: bookingData.serviceType,
      duration: bookingData.duration,
      participants: bookingData.participants || 1,
      specialRequests: bookingData.specialRequests || []
    },
    schedule: {
      date: bookingData.date,
      time: bookingData.time,
      meetingPoint: bookingData.meetingPoint,
      endTime: bookingData.endTime
    },
    customer: {
      name: bookingData.customer.name,
      phone: bookingData.customer.phone,
      email: bookingData.customer.email,
      preferences: bookingData.customer.preferences || []
    },
    pricing: {
      basePrice: bookingData.pricing.basePrice,
      additionalCharges: bookingData.pricing.additionalCharges || 0,
      discount: bookingData.pricing.discount || 0,
      total: bookingData.pricing.total,
      currency: 'INR',
      paymentMethod: bookingData.paymentMethod
    },
    status: 'confirmed',
    bookingTime: new Date().toISOString(),
    confirmationCode: `WM${Math.random().toString(36).substr(2, 8).toUpperCase()}`
  };

  serviceBookings.push(booking);

  return NextResponse.json({
    success: true,
    message: 'Service booked successfully!',
    data: {
      booking,
      instructions: [
        'Your service booking is confirmed',
        `Confirmation Code: ${booking.confirmationCode}`,
        `Meeting Point: ${booking.schedule.meetingPoint}`,
        `Date & Time: ${booking.schedule.date} at ${booking.schedule.time}`,
        'Service provider will contact you 1 hour before',
        'Please be at the meeting point 10 minutes early'
      ]
    }
  });
}

async function cancelBooking(bookingId: string, reason: string) {
  const bookingIndex = serviceBookings.findIndex(b => b.bookingId === bookingId);
  
  if (bookingIndex === -1) {
    return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
  }

  const booking = serviceBookings[bookingIndex];
  const serviceDate = new Date(booking.schedule.date + 'T' + booking.schedule.time);
  const currentTime = new Date();
  const hoursUntilService = (serviceDate.getTime() - currentTime.getTime()) / (1000 * 60 * 60);

  let cancellationFee = 0;
  let refundPercentage = 100;

  if (hoursUntilService < 2) {
    cancellationFee = booking.pricing.total; // 100% fee
    refundPercentage = 0;
  } else if (hoursUntilService < 24) {
    cancellationFee = booking.pricing.total * 0.5; // 50% fee
    refundPercentage = 50;
  } else {
    cancellationFee = booking.pricing.total * 0.1; // 10% fee
    refundPercentage = 90;
  }

  serviceBookings[bookingIndex].status = 'cancelled';
  serviceBookings[bookingIndex].cancellationReason = reason;
  serviceBookings[bookingIndex].cancellationTime = currentTime.toISOString();
  serviceBookings[bookingIndex].refundAmount = booking.pricing.total - cancellationFee;

  return NextResponse.json({
    success: true,
    message: 'Service cancelled successfully',
    data: {
      bookingId,
      cancellationFee,
      refundAmount: booking.pricing.total - cancellationFee,
      refundPercentage,
      refundTime: '3-5 business days'
    }
  });
}

async function rescheduleService(rescheduleData: any) {
  const bookingIndex = serviceBookings.findIndex(b => b.bookingId === rescheduleData.bookingId);
  
  if (bookingIndex === -1) {
    return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
  }

  const booking = serviceBookings[bookingIndex];
  const rescheduleFee = 200; // Flat reschedule fee

  booking.schedule.date = rescheduleData.newDate;
  booking.schedule.time = rescheduleData.newTime;
  booking.rescheduleFee = rescheduleFee;
  booking.rescheduleTime = new Date().toISOString();

  return NextResponse.json({
    success: true,
    message: 'Service rescheduled successfully',
    data: {
      booking,
      rescheduleFee,
      newTotal: booking.pricing.total + rescheduleFee
    }
  });
}

async function rateService(bookingId: string, rating: number, feedback: string) {
  const bookingIndex = serviceBookings.findIndex(b => b.bookingId === bookingId);
  
  if (bookingIndex === -1) {
    return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
  }

  serviceBookings[bookingIndex].rating = {
    overall: rating,
    feedback,
    categories: {
      service: Math.floor(Math.random() * 2) + rating - 1,
      punctuality: Math.floor(Math.random() * 2) + rating - 1,
      knowledge: Math.floor(Math.random() * 2) + rating - 1,
      friendliness: Math.floor(Math.random() * 2) + rating - 1
    },
    timestamp: new Date().toISOString()
  };

  return NextResponse.json({
    success: true,
    message: 'Thank you for your feedback!',
    data: {
      rating,
      feedback,
      loyaltyPoints: rating >= 4 ? 30 : 15,
      discount: rating >= 4 ? '15% off on next service' : '10% off on next service'
    }
  });
} 