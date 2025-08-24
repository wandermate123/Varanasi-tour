import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await request.json();

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(sign)
      .digest('hex');

    const isAuthentic = expectedSign === razorpay_signature;

    if (isAuthentic) {
      // Payment verified successfully
      // Here you can update your database, send confirmation emails, etc.
      return NextResponse.json({
        verified: true,
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
      });
    } else {
      return NextResponse.json(
        { verified: false, error: 'Invalid signature' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { verified: false, error: 'Verification failed' },
      { status: 500 }
    );
  }
} 