import { NextResponse } from 'next/server';

// Mock database for cab bookings
let cabBookings: any[] = [];
let cabBookingId = 1000;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');
    const userId = searchParams.get('userId');
    const action = searchParams.get('action');

    // Get specific booking
    if (bookingId) {
      const booking = cabBookings.find(b => b.bookingId === bookingId);
      if (!booking) {
        return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
      }
      
      // Simulate real-time driver tracking
      if (booking.status === 'confirmed' || booking.status === 'driver_assigned') {
        booking.driverLocation = {
          lat: 25.3176 + (Math.random() - 0.5) * 0.01,
          lng: 83.0107 + (Math.random() - 0.5) * 0.01,
          lastUpdated: new Date().toISOString()
        };
        booking.estimatedArrival = Math.max(1, booking.estimatedArrival - 1);
      }
      
      return NextResponse.json({ success: true, data: booking });
    }

    // Get user bookings
    if (userId) {
      const userBookings = cabBookings.filter(b => b.userId === userId);
      return NextResponse.json({ success: true, data: userBookings });
    }

    // Get available cabs
    if (action === 'available') {
      const pickup = searchParams.get('pickup');
      const destination = searchParams.get('destination');
      
      const availableCabs = [
        {
          id: 'cab_001',
          type: 'Auto Rickshaw',
          driverName: 'Rajesh Kumar',
          rating: 4.5,
          vehicleNumber: 'UP 65 AT 1234',
          estimatedArrival: '3-5 mins',
          fare: {
            base: 50,
            estimated: 120,
            currency: 'INR'
          },
          driverPhoto: '/images/drivers/driver1.jpg',
          vehiclePhoto: '/images/vehicles/auto1.jpg',
          amenities: ['GPS Tracking', 'Digital Payment'],
          location: { lat: 25.3176, lng: 83.0107 }
        },
        {
          id: 'cab_002',
          type: 'Sedan (AC)',
          driverName: 'Mohammad Ali',
          rating: 4.7,
          vehicleNumber: 'UP 65 AB 5678',
          estimatedArrival: '2-4 mins',
          fare: {
            base: 80,
            estimated: 200,
            currency: 'INR'
          },
          driverPhoto: '/images/drivers/driver2.jpg',
          vehiclePhoto: '/images/vehicles/sedan1.jpg',
          amenities: ['AC', 'Music System', 'Phone Charger', 'Water Bottle'],
          location: { lat: 25.3180, lng: 83.0110 }
        },
        {
          id: 'cab_003',
          type: 'Bike Taxi',
          driverName: 'Amit Singh',
          rating: 4.3,
          vehicleNumber: 'UP 65 BK 9012',
          estimatedArrival: '1-2 mins',
          fare: {
            base: 30,
            estimated: 80,
            currency: 'INR'
          },
          driverPhoto: '/images/drivers/driver3.jpg',
          vehiclePhoto: '/images/vehicles/bike1.jpg',
          amenities: ['Helmet Provided', 'Quick Route'],
          location: { lat: 25.3170, lng: 83.0105 }
        },
        {
          id: 'cab_004',
          type: 'SUV',
          driverName: 'Deepak Sharma',
          rating: 4.8,
          vehicleNumber: 'UP 65 SU 3456',
          estimatedArrival: '5-7 mins',
          fare: {
            base: 120,
            estimated: 300,
            currency: 'INR'
          },
          driverPhoto: '/images/drivers/driver4.jpg',
          vehiclePhoto: '/images/vehicles/suv1.jpg',
          amenities: ['Premium AC', 'Leather Seats', 'WiFi', 'Snacks'],
          location: { lat: 25.3185, lng: 83.0115 }
        }
      ];

      return NextResponse.json({ 
        success: true, 
        data: {
          cabs: availableCabs,
          searchLocation: { pickup, destination },
          timestamp: new Date().toISOString()
        }
      });
    }

    return NextResponse.json({ success: true, data: cabBookings });

  } catch (error) {
    console.error('Cab Booking GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch cab data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, ...bookingData } = body;

    switch (action) {
      case 'book':
        return await bookCab(bookingData);
      case 'cancel':
        return await cancelBooking(bookingData.bookingId, bookingData.reason);
      case 'track':
        return await trackCab(bookingData.bookingId);
      case 'rate':
        return await rateCab(bookingData.bookingId, bookingData.rating, bookingData.feedback);
      default:
        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Cab Booking POST error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process cab booking' }, { status: 500 });
  }
}

async function bookCab(bookingData: any) {
  const booking = {
    bookingId: `WM${cabBookingId++}`,
    userId: bookingData.userId,
    cabId: bookingData.cabId,
    pickup: {
      address: bookingData.pickup.address,
      coordinates: bookingData.pickup.coordinates,
      landmark: bookingData.pickup.landmark
    },
    destination: {
      address: bookingData.destination.address,
      coordinates: bookingData.destination.coordinates,
      landmark: bookingData.destination.landmark
    },
    passenger: {
      name: bookingData.passenger.name,
      phone: bookingData.passenger.phone,
      count: bookingData.passenger.count || 1
    },
    fare: {
      estimated: bookingData.fare.estimated,
      final: null,
      paymentMethod: bookingData.paymentMethod,
      currency: 'INR'
    },
    driver: {
      id: `driver_${Math.floor(Math.random() * 1000)}`,
      name: bookingData.driverName,
      phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      rating: bookingData.driverRating,
      vehicleNumber: bookingData.vehicleNumber
    },
    status: 'confirmed',
    estimatedArrival: Math.floor(Math.random() * 5) + 2, // 2-6 minutes
    scheduledTime: bookingData.scheduledTime || null,
    specialRequests: bookingData.specialRequests || [],
    bookingTime: new Date().toISOString(),
    otp: Math.floor(Math.random() * 9000) + 1000,
    tracking: {
      enabled: true,
      driverLocation: null,
      route: []
    }
  };

  cabBookings.push(booking);

  // Simulate driver assignment after 10 seconds
  setTimeout(() => {
    const bookingIndex = cabBookings.findIndex(b => b.bookingId === booking.bookingId);
    if (bookingIndex !== -1) {
      cabBookings[bookingIndex].status = 'driver_assigned';
      cabBookings[bookingIndex].estimatedArrival = Math.floor(Math.random() * 3) + 1;
    }
  }, 10000);

  return NextResponse.json({
    success: true,
    message: 'Cab booked successfully!',
    data: {
      booking,
      instructions: [
        'Your cab has been confirmed',
        `Driver will arrive in ${booking.estimatedArrival} minutes`,
        `OTP for ride: ${booking.otp}`,
        'Track your cab in real-time',
        'Driver will call you upon arrival'
      ]
    }
  });
}

async function cancelBooking(bookingId: string, reason: string) {
  const bookingIndex = cabBookings.findIndex(b => b.bookingId === bookingId);
  
  if (bookingIndex === -1) {
    return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
  }

  const booking = cabBookings[bookingIndex];
  const currentTime = new Date();
  const bookingTime = new Date(booking.bookingTime);
  const timeDiff = (currentTime.getTime() - bookingTime.getTime()) / (1000 * 60); // minutes

  let cancellationFee = 0;
  if (timeDiff > 5 && booking.status !== 'completed') {
    cancellationFee = Math.min(50, booking.fare.estimated * 0.1); // 10% or ₹50 max
  }

  cabBookings[bookingIndex].status = 'cancelled';
  cabBookings[bookingIndex].cancellationReason = reason;
  cabBookings[bookingIndex].cancellationTime = currentTime.toISOString();
  cabBookings[bookingIndex].cancellationFee = cancellationFee;

  return NextResponse.json({
    success: true,
    message: 'Booking cancelled successfully',
    data: {
      bookingId,
      cancellationFee,
      refundAmount: booking.fare.estimated - cancellationFee,
      refundTime: '2-3 business days'
    }
  });
}

async function trackCab(bookingId: string) {
  const booking = cabBookings.find(b => b.bookingId === bookingId);
  
  if (!booking) {
    return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
  }

  // Simulate real-time tracking data
  const trackingData = {
    driverLocation: {
      lat: 25.3176 + (Math.random() - 0.5) * 0.02,
      lng: 83.0107 + (Math.random() - 0.5) * 0.02,
      heading: Math.floor(Math.random() * 360),
      speed: Math.floor(Math.random() * 40) + 10 // 10-50 km/h
    },
    distance: `${(Math.random() * 2 + 0.5).toFixed(1)} km away`,
    estimatedArrival: `${Math.floor(Math.random() * 5) + 1} mins`,
    route: generateRoute(),
    status: booking.status,
    lastUpdated: new Date().toISOString()
  };

  return NextResponse.json({
    success: true,
    data: trackingData
  });
}

async function rateCab(bookingId: string, rating: number, feedback: string) {
  const bookingIndex = cabBookings.findIndex(b => b.bookingId === bookingId);
  
  if (bookingIndex === -1) {
    return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
  }

  cabBookings[bookingIndex].rating = {
    stars: rating,
    feedback,
    timestamp: new Date().toISOString()
  };
  cabBookings[bookingIndex].status = 'rated';

  return NextResponse.json({
    success: true,
    message: 'Thank you for your feedback!',
    data: {
      rating,
      feedback,
      loyaltyPoints: rating >= 4 ? 10 : 5
    }
  });
}

function generateRoute() {
  // Generate mock route points
  const route = [];
  for (let i = 0; i < 5; i++) {
    route.push({
      lat: 25.3176 + (Math.random() - 0.5) * 0.01,
      lng: 83.0107 + (Math.random() - 0.5) * 0.01
    });
  }
  return route;
} 