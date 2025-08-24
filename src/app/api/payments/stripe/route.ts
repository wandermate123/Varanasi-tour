import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Check if Stripe is properly configured
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY is not configured. Stripe payments will not work.');
}

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-05-28.basil',
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Payment processing is not configured. Please contact support.',
          details: 'STRIPE_SECRET_KEY is missing from environment variables.'
        },
        { status: 503 }
      );
    }

    const { amount, currency = 'inr', metadata = {} } = await request.json();

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to paisa/cents
      currency: currency.toLowerCase(),
      metadata: {
        ...metadata,
        platform: 'wandermate',
        timestamp: new Date().toISOString()
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status
      }
    });

  } catch (error: any) {
    console.error('Stripe payment error:', error);
    return NextResponse.json({
      success: false,
      error: 'Payment processing failed',
      details: error.message
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Payment processing is not configured. Please contact support.',
          details: 'STRIPE_SECRET_KEY is missing from environment variables.'
        },
        { status: 503 }
      );
    }

    const url = new URL(request.url);
    const paymentIntentId = url.searchParams.get('payment_intent_id');

    if (!paymentIntentId) {
      return NextResponse.json({
        success: false,
        error: 'Payment intent ID required'
      }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return NextResponse.json({
      success: true,
      data: {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        created: paymentIntent.created,
        metadata: paymentIntent.metadata
      }
    });

  } catch (error: any) {
    console.error('Payment retrieval error:', error);
    return NextResponse.json({
      success: false,
      error: 'Payment retrieval failed',
      details: error.message
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Payment processing is not configured. Please contact support.',
          details: 'STRIPE_SECRET_KEY is missing from environment variables.'
        },
        { status: 503 }
      );
    }

    const { paymentIntentId, amount, metadata } = await request.json();

    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      amount: amount ? Math.round(amount * 100) : undefined,
      metadata: metadata ? { ...metadata } : undefined
    });

    return NextResponse.json({
      success: true,
      data: {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status
      }
    });

  } catch (error: any) {
    console.error('Payment update error:', error);
    return NextResponse.json({
      success: false,
      error: 'Payment update failed',
      details: error.message
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Payment processing is not configured. Please contact support.',
          details: 'STRIPE_SECRET_KEY is missing from environment variables.'
        },
        { status: 503 }
      );
    }

    const { paymentIntentId } = await request.json();

    const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);

    return NextResponse.json({
      success: true,
      data: {
        id: paymentIntent.id,
        status: paymentIntent.status,
        canceledAt: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('Payment cancellation error:', error);
    return NextResponse.json({
      success: false,
      error: 'Payment cancellation failed',
      details: error.message
    }, { status: 500 });
  }
} 