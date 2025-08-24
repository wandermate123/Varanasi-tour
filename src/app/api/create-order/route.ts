import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Validate environment variables
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

// Add detailed environment variable logging
console.log('Environment Check:');
console.log('RAZORPAY_KEY_ID:', RAZORPAY_KEY_ID ? 'Present' : 'Missing');
console.log('RAZORPAY_KEY_SECRET:', RAZORPAY_KEY_SECRET ? 'Present' : 'Missing');

// Initialize Razorpay with error handling
let razorpay: Razorpay | null = null;

try {
  // Validate credentials before initialization
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials are missing. Check your .env.local file.');
  }

  // Initialize Razorpay instance
  razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });

  // Verify initialization
  if (!razorpay) {
    throw new Error('Failed to initialize Razorpay instance');
  }

  console.log('Razorpay initialized successfully');
} catch (error) {
  console.error('Razorpay initialization error:', error);
  razorpay = null;
}

export async function POST(request: Request) {
  console.log('POST request received at /api/create-order');
  
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Handle OPTIONS request for CORS
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { headers });
  }

  try {
    // Check Razorpay initialization
    if (!razorpay) {
      console.error('Razorpay is not initialized. Environment variables:', {
        keyId: RAZORPAY_KEY_ID ? 'Present' : 'Missing',
        keySecret: RAZORPAY_KEY_SECRET ? 'Present' : 'Missing'
      });
      throw new Error('Payment service is not properly initialized. Check environment variables.');
    }

    // Parse and validate request body
    let body;
    try {
      const rawBody = await request.text();
      console.log('Raw request body:', rawBody);
      body = JSON.parse(rawBody);
      console.log('Parsed request body:', body);
    } catch (error) {
      console.error('Failed to parse request body:', error);
      throw new Error('Invalid JSON in request body');
    }

    // Validate amount
    if (!body.amount || isNaN(body.amount) || body.amount <= 0) {
      console.error('Invalid amount:', body.amount);
      throw new Error(`Invalid amount provided: ${body.amount}`);
    }

    // Prepare order options
    const options = {
      amount: Math.round(Number(body.amount)), // amount in smallest currency unit (paise)
      currency: body.currency || 'INR',
      receipt: body.receipt || `receipt_${Date.now()}`,
    };

    console.log('Creating order with options:', options);

    // Create order
    const order = await razorpay.orders.create(options);
    console.log('Order created successfully:', order);

    // Return success response
    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    }, { headers });

  } catch (error) {
    console.error('Error in create-order route:', error);

    // Determine error details
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorDetails = error instanceof Error ? error.stack : 'No stack trace available';

    // Set appropriate status code
    let statusCode = 500;
    if (errorMessage.includes('initialized') || errorMessage.includes('credentials')) {
      statusCode = 503;
    } else if (errorMessage.includes('Invalid amount') || errorMessage.includes('JSON')) {
      statusCode = 400;
    }

    // Return error response
    return NextResponse.json({
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
      details: errorDetails,
    }, { status: statusCode, headers });
  }
} 