import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CartItem } from '@/contexts/CartContext';

// Check if Stripe is properly configured
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY is not configured. Stripe checkout will not work.');
}

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-05-28.basil',
    })
  : null;

export async function POST(request: Request) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { 
          error: 'Payment processing is not configured. Please contact support.',
          details: 'STRIPE_SECRET_KEY is missing from environment variables.'
        },
        { status: 503 }
      );
    }

    const { items, customerInfo } = await request.json();

    // Create line items for Stripe
    const lineItems = items.map((item: CartItem) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.description,
          images: item.image ? [item.image] : [],
          metadata: {
            type: item.type,
            ...(item.date && { date: item.date }),
            ...(item.time && { time: item.time }),
          },
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/cancel`,
      customer_email: customerInfo.email,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB'], // Add more countries as needed
      },
      metadata: {
        orderId: `order_${Date.now()}`,
        customerName: customerInfo.name,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Something went wrong with the checkout process' },
      { status: 500 }
    );
  }
} 