import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Check if Razorpay is properly configured
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.warn('RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not configured. Payment processing will not work.');
}

// Initialize Razorpay
const razorpay = (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    })
  : null;

export async function POST(request: Request) {
  try {
    // Check if Razorpay is configured
    if (!razorpay) {
      return NextResponse.json(
        { 
          error: 'Payment processing is not configured. Please contact support.',
          details: 'RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing from environment variables.'
        },
        { status: 503 }
      );
    }

    const { type, details } = await request.json();

    let booking;
    switch (type) {
      case 'hotel':
        // Integrate with Booking.com API
        booking = await bookHotel(details);
        break;
      case 'transport':
        // Integrate with transport providers
        booking = await bookTransport(details);
        break;
      case 'activity':
        // Book local activities
        booking = await bookActivity(details);
        break;
      default:
        throw new Error('Invalid booking type');
    }

    // Create payment order
    const order = await razorpay.orders.create({
      amount: booking.amount * 100, // Convert to paise
      currency: 'INR',
      receipt: booking.id,
      payment_capture: true
    });

    return NextResponse.json({
      ...booking,
      paymentOrder: order
    });
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}

// Helper functions for different booking types
async function bookHotel(details: any) {
  // Implement hotel booking logic
  return {
    id: 'HOTEL' + Date.now(),
    type: 'hotel',
    provider: 'Booking.com',
    confirmationCode: 'BDC' + Math.random().toString(36).substr(2, 9),
    amount: details.price,
    dateTime: new Date(),
    status: 'pending' as const
  };
}

async function bookTransport(details: any) {
  // Implement transport booking logic
  return {
    id: 'TRANS' + Date.now(),
    type: 'transport',
    provider: details.provider,
    confirmationCode: 'TRP' + Math.random().toString(36).substr(2, 9),
    amount: details.price,
    dateTime: new Date(),
    status: 'pending' as const
  };
}

async function bookActivity(details: any) {
  // Implement activity booking logic
  return {
    id: 'ACT' + Date.now(),
    type: 'activity',
    provider: 'Local Tour',
    confirmationCode: 'ACT' + Math.random().toString(36).substr(2, 9),
    amount: details.price,
    dateTime: new Date(),
    status: 'pending' as const
  };
} 