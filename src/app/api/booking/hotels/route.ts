import { NextResponse } from 'next/server';

// Mock database for hotel bookings
let hotelBookings: any[] = [];
let hotelBookingId = 2000;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');
    const userId = searchParams.get('userId');
    const action = searchParams.get('action');
    const location = searchParams.get('location') || 'Varanasi';
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const guests = parseInt(searchParams.get('guests') || '2');
    const rooms = parseInt(searchParams.get('rooms') || '1');

    // Get specific booking
    if (bookingId) {
      const booking = hotelBookings.find(b => b.bookingId === bookingId);
      if (!booking) {
        return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: booking });
    }

    // Get user bookings
    if (userId) {
      const userBookings = hotelBookings.filter(b => b.userId === userId);
      return NextResponse.json({ success: true, data: userBookings });
    }

    // Search available hotels
    if (action === 'search') {
      const availableHotels = [
        {
          id: 'hotel_001',
          name: 'BrijRama Palace',
          category: 'Heritage Hotel',
          starRating: 5,
          location: {
            address: 'Darbanga Ghat, Varanasi',
            landmark: 'Near Dashashwamedh Ghat',
            coordinates: { lat: 25.3176, lng: 83.0107 }
          },
          images: [
            '/images/hotels/brijrama-1.jpg',
            '/images/hotels/brijrama-2.jpg',
            '/images/hotels/brijrama-3.jpg'
          ],
          description: 'A heritage palace hotel overlooking the sacred Ganges',
          amenities: [
            'River View', 'Spa', 'Restaurant', 'WiFi', 'AC',
            'Room Service', 'Laundry', 'Parking', 'Airport Transfer'
          ],
          rooms: [
            {
              id: 'deluxe_river',
              type: 'Deluxe River View',
              price: 8500,
              maxGuests: 2,
              size: '350 sq ft',
              amenities: ['King Bed', 'River View', 'Balcony', 'Mini Bar'],
              available: true
            },
            {
              id: 'suite_palace',
              type: 'Palace Suite',
              price: 15000,
              maxGuests: 4,
              size: '600 sq ft',
              amenities: ['King Bed', 'Living Room', 'River View', 'Jacuzzi'],
              available: true
            }
          ],
          rating: 4.7,
          reviewCount: 1247,
          policies: {
            checkIn: '2:00 PM',
            checkOut: '12:00 PM',
            cancellation: 'Free cancellation up to 24 hours',
            petPolicy: 'Pets not allowed'
          }
        },
        {
          id: 'hotel_002',
          name: 'Ganges View Hotel',
          category: 'Budget Hotel',
          starRating: 3,
          location: {
            address: 'Meer Ghat, Varanasi',
            landmark: 'Near Assi Ghat',
            coordinates: { lat: 25.3098, lng: 83.0055 }
          },
          images: [
            '/images/hotels/ganges-view-1.jpg',
            '/images/hotels/ganges-view-2.jpg'
          ],
          description: 'Clean and comfortable budget accommodation with Ganges view',
          amenities: [
            'River View', 'Restaurant', 'WiFi', 'AC',
            'Room Service', 'Terrace'
          ],
          rooms: [
            {
              id: 'standard_ac',
              type: 'Standard AC Room',
              price: 2500,
              maxGuests: 2,
              size: '200 sq ft',
              amenities: ['Double Bed', 'AC', 'TV', 'Attached Bathroom'],
              available: true
            },
            {
              id: 'deluxe_view',
              type: 'Deluxe River View',
              price: 3500,
              maxGuests: 2,
              size: '250 sq ft',
              amenities: ['Double Bed', 'River View', 'AC', 'Mini Fridge'],
              available: true
            }
          ],
          rating: 4.2,
          reviewCount: 586,
          policies: {
            checkIn: '1:00 PM',
            checkOut: '11:00 AM',
            cancellation: 'Free cancellation up to 6 hours',
            petPolicy: 'Pets allowed with prior notice'
          }
        },
        {
          id: 'hotel_003',
          name: 'Zostel Varanasi',
          category: 'Hostel',
          starRating: 3,
          location: {
            address: 'Shivala Ghat Road, Varanasi',
            landmark: 'Near BHU',
            coordinates: { lat: 25.2677, lng: 82.9913 }
          },
          images: [
            '/images/hotels/zostel-1.jpg',
            '/images/hotels/zostel-2.jpg'
          ],
          description: 'Modern hostel with vibrant community and affordable stays',
          amenities: [
            'Common Room', 'Cafe', 'WiFi', 'AC',
            'Laundry', 'Lockers', 'Events'
          ],
          rooms: [
            {
              id: 'dorm_mixed',
              type: 'Mixed Dormitory',
              price: 800,
              maxGuests: 1,
              size: 'Shared',
              amenities: ['Bunk Bed', 'Locker', 'Shared Bathroom', 'AC'],
              available: true
            },
            {
              id: 'private_room',
              type: 'Private Room',
              price: 2000,
              maxGuests: 2,
              size: '150 sq ft',
              amenities: ['Double Bed', 'Private Bathroom', 'AC', 'Desk'],
              available: true
            }
          ],
          rating: 4.4,
          reviewCount: 892,
          policies: {
            checkIn: '12:00 PM',
            checkOut: '10:00 AM',
            cancellation: 'Free cancellation up to 12 hours',
            petPolicy: 'Pets not allowed'
          }
        },
        {
          id: 'hotel_004',
          name: 'Radisson Hotel Varanasi',
          category: 'Luxury Hotel',
          starRating: 4,
          location: {
            address: 'The Mall, Cantonment, Varanasi',
            landmark: 'Near Airport',
            coordinates: { lat: 25.2854, lng: 82.8604 }
          },
          images: [
            '/images/hotels/radisson-1.jpg',
            '/images/hotels/radisson-2.jpg',
            '/images/hotels/radisson-3.jpg'
          ],
          description: 'International luxury hotel with modern amenities',
          amenities: [
            'Swimming Pool', 'Spa', 'Gym', 'Multiple Restaurants',
            'Bar', 'Business Center', 'Conference Rooms', 'Airport Transfer'
          ],
          rooms: [
            {
              id: 'business_class',
              type: 'Business Class Room',
              price: 6500,
              maxGuests: 2,
              size: '300 sq ft',
              amenities: ['King Bed', 'Work Desk', 'City View', 'Mini Bar'],
              available: true
            },
            {
              id: 'business_suite',
              type: 'Business Suite',
              price: 12000,
              maxGuests: 4,
              size: '500 sq ft',
              amenities: ['King Bed', 'Living Room', 'City View', 'Kitchenette'],
              available: true
            }
          ],
          rating: 4.5,
          reviewCount: 1683,
          policies: {
            checkIn: '3:00 PM',
            checkOut: '12:00 PM',
            cancellation: 'Free cancellation up to 48 hours',
            petPolicy: 'Pets allowed with additional charges'
          }
        }
      ];

      // Filter hotels based on search criteria
      const filteredHotels = availableHotels.map(hotel => ({
        ...hotel,
        rooms: hotel.rooms.filter(room => 
          room.maxGuests >= Math.ceil(guests / rooms) && room.available
        )
      })).filter(hotel => hotel.rooms.length > 0);

      return NextResponse.json({
        success: true,
        data: {
          hotels: filteredHotels,
          searchCriteria: { location, checkIn, checkOut, guests, rooms },
          totalResults: filteredHotels.length,
          timestamp: new Date().toISOString()
        }
      });
    }

    return NextResponse.json({ success: true, data: hotelBookings });

  } catch (error) {
    console.error('Hotel Booking GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch hotel data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, ...bookingData } = body;

    switch (action) {
      case 'book':
        return await bookHotel(bookingData);
      case 'cancel':
        return await cancelBooking(bookingData.bookingId, bookingData.reason);
      case 'modify':
        return await modifyBooking(bookingData);
      case 'rate':
        return await rateHotel(bookingData.bookingId, bookingData.rating, bookingData.feedback);
      default:
        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Hotel Booking POST error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process hotel booking' }, { status: 500 });
  }
}

async function bookHotel(bookingData: any) {
  const checkInDate = new Date(bookingData.checkIn);
  const checkOutDate = new Date(bookingData.checkOut);
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

  const booking = {
    bookingId: `HT${hotelBookingId++}`,
    userId: bookingData.userId,
    hotel: {
      id: bookingData.hotelId,
      name: bookingData.hotelName,
      address: bookingData.hotelAddress,
      starRating: bookingData.starRating
    },
    room: {
      id: bookingData.roomId,
      type: bookingData.roomType,
      count: bookingData.roomCount || 1
    },
    guest: {
      primary: {
        name: bookingData.guest.name,
        email: bookingData.guest.email,
        phone: bookingData.guest.phone
      },
      count: bookingData.guestCount,
      details: bookingData.guestDetails || []
    },
    stay: {
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      nights: nights,
      specialRequests: bookingData.specialRequests || []
    },
    pricing: {
      roomRate: bookingData.roomRate,
      totalRoomCharges: bookingData.roomRate * nights * bookingData.roomCount,
      taxes: bookingData.roomRate * nights * bookingData.roomCount * 0.12, // 12% tax
      serviceFee: 200,
      total: 0,
      currency: 'INR',
      paymentMethod: bookingData.paymentMethod
    },
    status: 'confirmed',
    confirmationNumber: `WM${Math.floor(Math.random() * 1000000)}`,
    bookingTime: new Date().toISOString(),
    policies: {
      cancellation: bookingData.cancellationPolicy,
      checkInTime: bookingData.checkInTime,
      checkOutTime: bookingData.checkOutTime
    }
  };

  // Calculate total
  booking.pricing.total = booking.pricing.totalRoomCharges + booking.pricing.taxes + booking.pricing.serviceFee;

  hotelBookings.push(booking);

  return NextResponse.json({
    success: true,
    message: 'Hotel booked successfully!',
    data: {
      booking,
      instructions: [
        'Your hotel booking is confirmed',
        `Check-in: ${booking.stay.checkIn} at ${booking.policies.checkInTime}`,
        `Check-out: ${booking.stay.checkOut} at ${booking.policies.checkOutTime}`,
        `Confirmation Number: ${booking.confirmationNumber}`,
        'Please carry a valid ID for check-in',
        'Contact hotel directly for special arrangements'
      ],
      voucher: {
        bookingId: booking.bookingId,
        confirmationNumber: booking.confirmationNumber,
        qrCode: `data:image/svg+xml;base64,${generateQRCode(booking.bookingId)}`,
        downloadLink: `/api/booking/hotels/voucher?id=${booking.bookingId}`
      }
    }
  });
}

async function cancelBooking(bookingId: string, reason: string) {
  const bookingIndex = hotelBookings.findIndex(b => b.bookingId === bookingId);
  
  if (bookingIndex === -1) {
    return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
  }

  const booking = hotelBookings[bookingIndex];
  const currentTime = new Date();
  const checkInTime = new Date(booking.stay.checkIn);
  const hoursUntilCheckIn = (checkInTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60);

  let cancellationFee = 0;
  let refundPercentage = 100;

  if (hoursUntilCheckIn < 24) {
    cancellationFee = booking.pricing.total * 0.5; // 50% fee
    refundPercentage = 50;
  } else if (hoursUntilCheckIn < 48) {
    cancellationFee = booking.pricing.total * 0.25; // 25% fee
    refundPercentage = 75;
  }

  hotelBookings[bookingIndex].status = 'cancelled';
  hotelBookings[bookingIndex].cancellationReason = reason;
  hotelBookings[bookingIndex].cancellationTime = currentTime.toISOString();
  hotelBookings[bookingIndex].cancellationFee = cancellationFee;

  return NextResponse.json({
    success: true,
    message: 'Booking cancelled successfully',
    data: {
      bookingId,
      cancellationFee,
      refundAmount: booking.pricing.total - cancellationFee,
      refundPercentage,
      refundTime: '5-7 business days'
    }
  });
}

async function modifyBooking(modificationData: any) {
  const bookingIndex = hotelBookings.findIndex(b => b.bookingId === modificationData.bookingId);
  
  if (bookingIndex === -1) {
    return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
  }

  const booking = hotelBookings[bookingIndex];
  const modificationFee = 500; // Flat modification fee

  // Update booking details
  if (modificationData.newCheckIn) {
    booking.stay.checkIn = modificationData.newCheckIn;
  }
  if (modificationData.newCheckOut) {
    booking.stay.checkOut = modificationData.newCheckOut;
  }
  if (modificationData.newGuestCount) {
    booking.guest.count = modificationData.newGuestCount;
  }

  booking.modificationFee = modificationFee;
  booking.modificationTime = new Date().toISOString();

  return NextResponse.json({
    success: true,
    message: 'Booking modified successfully',
    data: {
      booking,
      modificationFee,
      newTotal: booking.pricing.total + modificationFee
    }
  });
}

async function rateHotel(bookingId: string, rating: number, feedback: string) {
  const bookingIndex = hotelBookings.findIndex(b => b.bookingId === bookingId);
  
  if (bookingIndex === -1) {
    return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
  }

  hotelBookings[bookingIndex].rating = {
    overall: rating,
    feedback,
    categories: {
      cleanliness: Math.floor(Math.random() * 2) + rating - 1,
      service: Math.floor(Math.random() * 2) + rating - 1,
      location: Math.floor(Math.random() * 2) + rating - 1,
      value: Math.floor(Math.random() * 2) + rating - 1
    },
    timestamp: new Date().toISOString()
  };

  return NextResponse.json({
    success: true,
    message: 'Thank you for your feedback!',
    data: {
      rating,
      feedback,
      loyaltyPoints: rating >= 4 ? 50 : 25,
      discount: rating >= 4 ? '10% on next booking' : '5% on next booking'
    }
  });
}

function generateQRCode(bookingId: string): string {
  // Simple base64 encoded SVG QR code placeholder
  const qrSvg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="white"/>
    <rect x="20" y="20" width="160" height="160" fill="black"/>
    <rect x="40" y="40" width="120" height="120" fill="white"/>
    <text x="100" y="105" text-anchor="middle" font-size="12" fill="black">${bookingId}</text>
  </svg>`;
  return Buffer.from(qrSvg).toString('base64');
} 