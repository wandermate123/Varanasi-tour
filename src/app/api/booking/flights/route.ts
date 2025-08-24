import { NextResponse } from 'next/server';

// Mock database for flight bookings
let flightBookings: any[] = [];
let flightBookingId = 4000;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');
    const userId = searchParams.get('userId');
    const action = searchParams.get('action');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const departDate = searchParams.get('departDate');
    const returnDate = searchParams.get('returnDate');
    const passengers = parseInt(searchParams.get('passengers') || '1');
    const class_ = searchParams.get('class') || 'economy';

    // Get specific booking
    if (bookingId) {
      const booking = flightBookings.find(b => b.bookingId === bookingId);
      if (!booking) {
        return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: booking });
    }

    // Get user bookings
    if (userId) {
      const userBookings = flightBookings.filter(b => b.userId === userId);
      return NextResponse.json({ success: true, data: userBookings });
    }

    // Search flights
    if (action === 'search') {
      const availableFlights = [
        {
          id: 'flight_001',
          airline: {
            code: '6E',
            name: 'IndiGo',
            logo: '/images/airlines/indigo.png'
          },
          flightNumber: '6E-2142',
          aircraft: 'Airbus A320',
          route: {
            from: {
              code: 'VNS',
              city: 'Varanasi',
              airport: 'Lal Bahadur Shastri Airport',
              terminal: 'Terminal 1'
            },
            to: {
              code: 'DEL',
              city: 'Delhi',
              airport: 'Indira Gandhi International Airport',
              terminal: 'Terminal 1'
            }
          },
          schedule: {
            departure: {
              time: '06:30',
              date: departDate || '2024-02-15'
            },
            arrival: {
              time: '08:00',
              date: departDate || '2024-02-15'
            },
            duration: '1h 30m',
            stops: 0
          },
          pricing: {
            economy: {
              base: 4500,
              taxes: 890,
              total: 5390,
              baggage: '15kg included',
              available: true,
              seatsLeft: 12
            },
            business: {
              base: 12000,
              taxes: 2100,
              total: 14100,
              baggage: '30kg included',
              available: true,
              seatsLeft: 4
            }
          },
          amenities: ['WiFi Available', 'In-flight Snacks', 'On-time Performance: 85%'],
          policies: {
            cancellation: 'Cancellation fee applies',
            reschedule: 'Reschedule fee: ₹2500',
            refund: 'Partially refundable'
          }
        },
        {
          id: 'flight_002',
          airline: {
            code: 'AI',
            name: 'Air India',
            logo: '/images/airlines/airindia.png'
          },
          flightNumber: 'AI-1234',
          aircraft: 'Boeing 737',
          route: {
            from: {
              code: 'VNS',
              city: 'Varanasi',
              airport: 'Lal Bahadur Shastri Airport',
              terminal: 'Terminal 1'
            },
            to: {
              code: 'DEL',
              city: 'Delhi',
              airport: 'Indira Gandhi International Airport',
              terminal: 'Terminal 3'
            }
          },
          schedule: {
            departure: {
              time: '14:15',
              date: departDate || '2024-02-15'
            },
            arrival: {
              time: '15:50',
              date: departDate || '2024-02-15'
            },
            duration: '1h 35m',
            stops: 0
          },
          pricing: {
            economy: {
              base: 5200,
              taxes: 980,
              total: 6180,
              baggage: '20kg included',
              available: true,
              seatsLeft: 8
            },
            business: {
              base: 15000,
              taxes: 2800,
              total: 17800,
              baggage: '40kg included',
              available: true,
              seatsLeft: 2
            }
          },
          amenities: ['In-flight Entertainment', 'Complimentary Meal', 'Priority Boarding'],
          policies: {
            cancellation: 'Free cancellation up to 24 hours',
            reschedule: 'Free reschedule once',
            refund: 'Fully refundable'
          }
        },
        {
          id: 'flight_003',
          airline: {
            code: 'SG',
            name: 'SpiceJet',
            logo: '/images/airlines/spicejet.png'
          },
          flightNumber: 'SG-8765',
          aircraft: 'Boeing 737 MAX',
          route: {
            from: {
              code: 'VNS',
              city: 'Varanasi',
              airport: 'Lal Bahadur Shastri Airport',
              terminal: 'Terminal 1'
            },
            to: {
              code: 'BOM',
              city: 'Mumbai',
              airport: 'Chhatrapati Shivaji International Airport',
              terminal: 'Terminal 1'
            }
          },
          schedule: {
            departure: {
              time: '10:45',
              date: departDate || '2024-02-15'
            },
            arrival: {
              time: '12:55',
              date: departDate || '2024-02-15'
            },
            duration: '2h 10m',
            stops: 0
          },
          pricing: {
            economy: {
              base: 6800,
              taxes: 1200,
              total: 8000,
              baggage: '15kg included',
              available: true,
              seatsLeft: 15
            },
            business: {
              base: 18000,
              taxes: 3200,
              total: 21200,
              baggage: '30kg included',
              available: false,
              seatsLeft: 0
            }
          },
          amenities: ['SpiceMax Seats', 'Buy on Board', 'Mobile Check-in'],
          policies: {
            cancellation: 'Cancellation fee: ₹3000',
            reschedule: 'Reschedule fee: ₹3500',
            refund: 'Non-refundable'
          }
        }
      ];

      // Filter flights based on search criteria
      let filteredFlights = availableFlights;
      if (from) {
        filteredFlights = filteredFlights.filter(f => 
          f.route.from.code.toLowerCase() === from.toLowerCase() ||
          f.route.from.city.toLowerCase().includes(from.toLowerCase())
        );
      }
      if (to) {
        filteredFlights = filteredFlights.filter(f => 
          f.route.to.code.toLowerCase() === to.toLowerCase() ||
          f.route.to.city.toLowerCase().includes(to.toLowerCase())
        );
      }

      return NextResponse.json({
        success: true,
        data: {
          flights: filteredFlights,
          searchCriteria: { from, to, departDate, returnDate, passengers, class: class_ },
          totalResults: filteredFlights.length,
          timestamp: new Date().toISOString()
        }
      });
    }

    // Get popular destinations
    if (action === 'popular-destinations') {
      const popularDestinations = [
        {
          code: 'DEL',
          city: 'Delhi',
          country: 'India',
          image: '/images/destinations/delhi.jpg',
          startingPrice: 4500,
          flightsPerDay: 8
        },
        {
          code: 'BOM',
          city: 'Mumbai',
          country: 'India',
          image: '/images/destinations/mumbai.jpg',
          startingPrice: 6800,
          flightsPerDay: 5
        },
        {
          code: 'BLR',
          city: 'Bangalore',
          country: 'India',
          image: '/images/destinations/bangalore.jpg',
          startingPrice: 7200,
          flightsPerDay: 3
        },
        {
          code: 'KTM',
          city: 'Kathmandu',
          country: 'Nepal',
          image: '/images/destinations/kathmandu.jpg',
          startingPrice: 12000,
          flightsPerDay: 2
        }
      ];

      return NextResponse.json({
        success: true,
        data: popularDestinations
      });
    }

    return NextResponse.json({ success: true, data: flightBookings });

  } catch (error) {
    console.error('Flight Booking GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch flight data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, ...bookingData } = body;

    switch (action) {
      case 'book':
        return await bookFlight(bookingData);
      case 'cancel':
        return await cancelBooking(bookingData.bookingId, bookingData.reason);
      case 'reschedule':
        return await rescheduleFlight(bookingData);
      case 'web-checkin':
        return await webCheckIn(bookingData.bookingId);
      case 'seat-select':
        return await selectSeat(bookingData.bookingId, bookingData.seatNumber);
      default:
        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Flight Booking POST error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process flight booking' }, { status: 500 });
  }
}

async function bookFlight(bookingData: any) {
  const booking = {
    bookingId: `FL${flightBookingId++}`,
    pnr: `WM${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    userId: bookingData.userId,
    flight: {
      id: bookingData.flightId,
      airline: bookingData.airline,
      flightNumber: bookingData.flightNumber,
      route: bookingData.route,
      schedule: bookingData.schedule
    },
    passengers: bookingData.passengers.map((passenger: any, index: number) => ({
      id: `pass_${index + 1}`,
      type: passenger.type, // adult, child, infant
      title: passenger.title,
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      dateOfBirth: passenger.dateOfBirth,
      gender: passenger.gender,
      nationality: passenger.nationality,
      passportNumber: passenger.passportNumber,
      seatNumber: null,
      mealPreference: passenger.mealPreference,
      specialRequests: passenger.specialRequests || []
    })),
    contact: {
      email: bookingData.contact.email,
      phone: bookingData.contact.phone,
      emergencyContact: bookingData.contact.emergencyContact
    },
    pricing: {
      basePrice: bookingData.pricing.basePrice,
      taxes: bookingData.pricing.taxes,
      baggage: bookingData.pricing.baggage || 0,
      seats: bookingData.pricing.seats || 0,
      meals: bookingData.pricing.meals || 0,
      total: bookingData.pricing.total,
      currency: 'INR',
      paymentMethod: bookingData.paymentMethod
    },
    status: 'confirmed',
    bookingTime: new Date().toISOString(),
    checkInStatus: 'not_available',
    eTicket: {
      ticketNumber: `WM${Math.random().toString(36).substr(2, 10).toUpperCase()}`,
      downloadLink: `/api/booking/flights/ticket?id=${bookingData.flightId}`,
      qrCode: generateFlightQR(`FL${flightBookingId}`)
    }
  };

  flightBookings.push(booking);

  return NextResponse.json({
    success: true,
    message: 'Flight booked successfully!',
    data: {
      booking,
      instructions: [
        'Your flight is confirmed',
        `PNR: ${booking.pnr}`,
        'Web check-in opens 48 hours before departure',
        'Arrive at airport 2 hours before domestic flights',
        'Download your e-ticket from the app'
      ]
    }
  });
}

async function cancelBooking(bookingId: string, reason: string) {
  const bookingIndex = flightBookings.findIndex(b => b.bookingId === bookingId);
  
  if (bookingIndex === -1) {
    return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
  }

  const booking = flightBookings[bookingIndex];
  const departureTime = new Date(booking.flight.schedule.departure.date + 'T' + booking.flight.schedule.departure.time);
  const currentTime = new Date();
  const hoursUntilDeparture = (departureTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60);

  let cancellationFee = 0;
  let refundPercentage = 0;

  if (hoursUntilDeparture > 24) {
    cancellationFee = booking.pricing.total * 0.1; // 10% fee
    refundPercentage = 90;
  } else if (hoursUntilDeparture > 2) {
    cancellationFee = booking.pricing.total * 0.25; // 25% fee
    refundPercentage = 75;
  } else {
    cancellationFee = booking.pricing.total; // 100% fee
    refundPercentage = 0;
  }

  flightBookings[bookingIndex].status = 'cancelled';
  flightBookings[bookingIndex].cancellationReason = reason;
  flightBookings[bookingIndex].cancellationTime = currentTime.toISOString();
  flightBookings[bookingIndex].refundAmount = booking.pricing.total - cancellationFee;

  return NextResponse.json({
    success: true,
    message: 'Flight cancelled successfully',
    data: {
      bookingId,
      cancellationFee,
      refundAmount: booking.pricing.total - cancellationFee,
      refundPercentage,
      refundTime: '7-10 business days'
    }
  });
}

async function rescheduleFlight(rescheduleData: any) {
  const bookingIndex = flightBookings.findIndex(b => b.bookingId === rescheduleData.bookingId);
  
  if (bookingIndex === -1) {
    return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
  }

  const booking = flightBookings[bookingIndex];
  const rescheduleFee = 2500; // Flat reschedule fee
  const priceDifference = rescheduleData.newFlightPrice - booking.pricing.total;

  booking.flight.schedule = rescheduleData.newSchedule;
  booking.rescheduleFee = rescheduleFee;
  booking.priceDifference = priceDifference;
  booking.rescheduleTime = new Date().toISOString();

  return NextResponse.json({
    success: true,
    message: 'Flight rescheduled successfully',
    data: {
      booking,
      totalAdditionalCost: rescheduleFee + Math.max(0, priceDifference),
      refund: priceDifference < 0 ? Math.abs(priceDifference) : 0
    }
  });
}

async function webCheckIn(bookingId: string) {
  const bookingIndex = flightBookings.findIndex(b => b.bookingId === bookingId);
  
  if (bookingIndex === -1) {
    return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
  }

  const booking = flightBookings[bookingIndex];
  const departureTime = new Date(booking.flight.schedule.departure.date + 'T' + booking.flight.schedule.departure.time);
  const currentTime = new Date();
  const hoursUntilDeparture = (departureTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60);

  if (hoursUntilDeparture > 48) {
    return NextResponse.json({ 
      success: false, 
      error: 'Check-in not available yet. Opens 48 hours before departure.' 
    }, { status: 400 });
  }

  if (hoursUntilDeparture < 1) {
    return NextResponse.json({ 
      success: false, 
      error: 'Check-in closed. Please check-in at the airport.' 
    }, { status: 400 });
  }

  flightBookings[bookingIndex].checkInStatus = 'completed';
  flightBookings[bookingIndex].checkInTime = currentTime.toISOString();
  flightBookings[bookingIndex].boardingPass = {
    gate: `A${Math.floor(Math.random() * 20) + 1}`,
    seat: booking.passengers.map((p: any) => p.seatNumber || `${Math.floor(Math.random() * 30) + 1}A`),
    boardingTime: new Date(departureTime.getTime() - 30 * 60 * 1000).toISOString(), // 30 mins before
    groupNumber: Math.floor(Math.random() * 4) + 1
  };

  return NextResponse.json({
    success: true,
    message: 'Check-in completed successfully',
    data: {
      checkInStatus: 'completed',
      boardingPass: flightBookings[bookingIndex].boardingPass,
      instructions: [
        'Check-in completed successfully',
        `Gate: ${flightBookings[bookingIndex].boardingPass.gate}`,
        'Boarding starts 30 minutes before departure',
        'Please reach the gate 20 minutes before departure'
      ]
    }
  });
}

async function selectSeat(bookingId: string, seatSelections: any[]) {
  const bookingIndex = flightBookings.findIndex(b => b.bookingId === bookingId);
  
  if (bookingIndex === -1) {
    return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
  }

  seatSelections.forEach((selection: any) => {
    const passengerIndex = flightBookings[bookingIndex].passengers.findIndex(
      (p: any) => p.id === selection.passengerId
    );
    if (passengerIndex !== -1) {
      flightBookings[bookingIndex].passengers[passengerIndex].seatNumber = selection.seatNumber;
    }
  });

  const seatFee = seatSelections.length * 500; // ₹500 per seat selection

  return NextResponse.json({
    success: true,
    message: 'Seats selected successfully',
    data: {
      selectedSeats: seatSelections,
      seatFee,
      totalCost: flightBookings[bookingIndex].pricing.total + seatFee
    }
  });
}

function generateFlightQR(bookingId: string): string {
  const qrSvg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="white"/>
    <rect x="20" y="20" width="160" height="160" fill="black"/>
    <rect x="40" y="40" width="120" height="120" fill="white"/>
    <text x="100" y="105" text-anchor="middle" font-size="10" fill="black">${bookingId}</text>
  </svg>`;
  return Buffer.from(qrSvg).toString('base64');
} 