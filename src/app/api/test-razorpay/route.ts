'use server';

import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function GET() {
  try {
    // Log environment variables (without exposing secrets)
    console.log('Environment variables check:');
    console.log('NEXT_PUBLIC_RAZORPAY_KEY_ID:', process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ? 'Present' : 'Missing');
    console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? 'Present' : 'Missing');

    // Try to initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    // Try to create a test order
    const order = await razorpay.orders.create({
      amount: 100, // Rs. 1
      currency: 'INR',
      receipt: 'test_receipt',
      notes: {
        test: 'true'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Razorpay is properly configured',
      orderCreated: true,
      orderId: order.id
    });

  } catch (error: any) {
    console.error('Razorpay test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      details: {
        keyIdPresent: Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID),
        keySecretPresent: Boolean(process.env.RAZORPAY_KEY_SECRET)
      }
    }, { status: 500 });
  }
} 