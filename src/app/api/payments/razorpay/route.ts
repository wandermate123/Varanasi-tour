import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay with error handling
let razorpay: Razorpay | null = null;

try {
  if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error('Razorpay credentials are missing');
  } else {
    razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
} catch (error) {
  console.error('Failed to initialize Razorpay:', error);
}

export async function POST(request: NextRequest) {
  try {
    const { action, amount, currency = 'INR', orderId, paymentId, signature, ...otherData } = await request.json();

    // Check if Razorpay is initialized
    if (!razorpay) {
      console.error('Razorpay not initialized. Environment variables:', {
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ? 'Present' : 'Missing',
        keySecret: process.env.RAZORPAY_KEY_SECRET ? 'Present' : 'Missing'
      });
      return NextResponse.json({
        success: false,
        error: 'Payment service not configured'
      }, { status: 500 });
    }

    switch (action) {
      case 'create_order': {
        // Validate amount
        if (!amount || isNaN(amount) || amount < 100) { // amount should be in paise and minimum 1 INR
          return NextResponse.json({
            success: false,
            error: 'Invalid amount. Amount should be in paise and minimum 1 INR.'
          }, { status: 400 });
        }

        const { customerInfo, serviceDetails, metadata } = otherData;

        try {
          const orderOptions = {
            amount: Math.round(amount), // amount should already be in paise
            currency: currency.toUpperCase(),
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1,
            notes: {
              platform: 'wandermate',
              service_type: serviceDetails?.type || 'general',
              customer_id: customerInfo?.id || 'guest',
              booking_id: serviceDetails?.bookingId || '',
              ...metadata
            }
          };

          console.log('Creating order with options:', orderOptions);
          const order = await razorpay.orders.create(orderOptions);
          console.log('Order created:', order);

          return NextResponse.json({
            success: true,
            data: {
              orderId: order.id,
              amount: order.amount,
              currency: order.currency,
              receipt: order.receipt,
              status: order.status,
              created_at: order.created_at,
              razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
            }
          });
        } catch (orderError: any) {
          console.error('Order creation error:', orderError);
          return NextResponse.json({
            success: false,
            error: 'Failed to create order',
            details: orderError.message
          }, { status: 500 });
        }
      }

      case 'verify_payment': {
        if (!orderId || !paymentId || !signature) {
          return NextResponse.json({
            success: false,
            error: 'Order ID, Payment ID, and Signature required'
          }, { status: 400 });
        }

        try {
          // Verify signature
          const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(`${orderId}|${paymentId}`)
            .digest('hex');

          if (expectedSignature === signature) {
            // Payment is verified
            const payment = await razorpay.payments.fetch(paymentId);
            const order = await razorpay.orders.fetch(orderId);

            return NextResponse.json({
              success: true,
              data: {
                verified: true,
                payment: {
                  id: payment.id,
                  amount: payment.amount,
                  currency: payment.currency,
                  status: payment.status,
                  method: payment.method,
                  bank: payment.bank,
                  wallet: payment.wallet,
                  vpa: payment.vpa,
                  email: payment.email,
                  contact: payment.contact,
                  created_at: payment.created_at,
                  captured: payment.captured
                },
                order: {
                  id: order.id,
                  amount: order.amount,
                  currency: order.currency,
                  receipt: order.receipt,
                  status: order.status,
                  notes: order.notes
                }
              }
            });
          }

          return NextResponse.json({
            success: false,
            error: 'Invalid payment signature'
          }, { status: 400 });
        } catch (verifyError: any) {
          console.error('Payment verification error:', verifyError);
          return NextResponse.json({
            success: false,
            error: 'Payment verification failed',
            details: verifyError.message
          }, { status: 500 });
        }
      }

      case 'capture_payment': {
        if (!paymentId || !amount) {
          return NextResponse.json({
            success: false,
            error: 'Payment ID and amount required'
          }, { status: 400 });
        }

        try {
          const capturedPayment = await razorpay.payments.capture(paymentId, Math.round(amount * 100), currency);

          return NextResponse.json({
            success: true,
            data: {
              id: capturedPayment.id,
              amount: capturedPayment.amount,
              currency: capturedPayment.currency,
              status: capturedPayment.status,
              captured: capturedPayment.captured
            }
          });
        } catch (captureError: any) {
          return NextResponse.json({
            success: false,
            error: 'Payment capture failed',
            details: captureError.message
          }, { status: 500 });
        }
      }

      case 'refund_payment': {
        if (!paymentId) {
          return NextResponse.json({
            success: false,
            error: 'Payment ID required'
          }, { status: 400 });
        }

        const { refundAmount, reason = 'requested_by_customer' } = otherData;

        try {
          const refundOptions: any = {
            payment_id: paymentId,
            notes: {
              reason,
              refund_initiated_by: 'wandermate',
              timestamp: new Date().toISOString()
            }
          };

          if (refundAmount) {
            refundOptions.amount = Math.round(refundAmount * 100);
          }

          const refund = await razorpay.payments.refund(paymentId, refundOptions);

          return NextResponse.json({
            success: true,
            data: {
              id: refund.id,
              payment_id: refund.payment_id,
              amount: refund.amount,
              currency: refund.currency,
              status: refund.status,
              created_at: refund.created_at,
              notes: refund.notes,
              speed_processed: refund.speed_processed,
              speed_requested: refund.speed_requested
            }
          });
        } catch (refundError: any) {
          return NextResponse.json({
            success: false,
            error: 'Refund failed',
            details: refundError.message
          }, { status: 500 });
        }
      }

      case 'create_customer': {
        const { name, email, contact } = otherData;

        if (!name || !email || !contact) {
          return NextResponse.json({
            success: false,
            error: 'Name, email, and contact required'
          }, { status: 400 });
        }

        try {
          const customer = await razorpay.customers.create({
            name,
            email,
            contact,
            notes: {
              platform: 'wandermate',
              created_at: new Date().toISOString()
            }
          });

          return NextResponse.json({
            success: true,
            data: {
              id: customer.id,
              name: customer.name,
              email: customer.email,
              contact: customer.contact,
              created_at: customer.created_at
            }
          });
        } catch (customerError: any) {
          return NextResponse.json({
            success: false,
            error: 'Customer creation failed',
            details: customerError.message
          }, { status: 500 });
        }
      }

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action'
        }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Razorpay API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Payment processing failed',
      details: error.message
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const action = url.searchParams.get('action');
    const id = url.searchParams.get('id');

    // Check if Razorpay is initialized
    if (!razorpay) {
      return NextResponse.json({
        success: false,
        error: 'Payment service not configured'
      }, { status: 500 });
    }

    switch (action) {
      case 'get_payment': {
        if (!id) {
          return NextResponse.json({
            success: false,
            error: 'Payment ID required'
          }, { status: 400 });
        }

        try {
          const payment = await razorpay.payments.fetch(id);

          return NextResponse.json({
            success: true,
            data: {
              id: payment.id,
              amount: payment.amount,
              currency: payment.currency,
              status: payment.status,
              method: payment.method,
              bank: payment.bank,
              wallet: payment.wallet,
              vpa: payment.vpa,
              email: payment.email,
              contact: payment.contact,
              created_at: payment.created_at,
              captured: payment.captured,
              description: payment.description,
              notes: payment.notes
            }
          });
        } catch (fetchError: any) {
          return NextResponse.json({
            success: false,
            error: 'Payment fetch failed',
            details: fetchError.message
          }, { status: 500 });
        }
      }

      case 'get_order': {
        if (!id) {
          return NextResponse.json({
            success: false,
            error: 'Order ID required'
          }, { status: 400 });
        }

        try {
          const order = await razorpay.orders.fetch(id);

          return NextResponse.json({
            success: true,
            data: {
              id: order.id,
              amount: order.amount,
              currency: order.currency,
              receipt: order.receipt,
              status: order.status,
              created_at: order.created_at,
              notes: order.notes,
              amount_paid: order.amount_paid,
              amount_due: order.amount_due,
              attempts: order.attempts
            }
          });
        } catch (fetchError: any) {
          return NextResponse.json({
            success: false,
            error: 'Order fetch failed',
            details: fetchError.message
          }, { status: 500 });
        }
      }

      case 'get_payment_methods': {
        return NextResponse.json({
          success: true,
          data: {
            methods: {
              card: {
                name: 'Credit/Debit Card',
                types: ['credit', 'debit'],
                networks: ['Visa', 'Mastercard', 'Maestro', 'RuPay', 'American Express']
              },
              netbanking: {
                name: 'Net Banking',
                banks: ['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB', 'IDBI', 'BOB', 'Canara']
              },
              upi: {
                name: 'UPI',
                apps: ['Google Pay', 'PhonePe', 'Paytm', 'BHIM', 'Amazon Pay']
              },
              wallet: {
                name: 'Wallets',
                providers: ['Paytm', 'Mobikwik', 'Freecharge', 'Ola Money', 'Amazon Pay']
              },
              emi: {
                name: 'EMI',
                types: ['credit_card', 'debit_card', 'cardless']
              },
              paylater: {
                name: 'Pay Later',
                providers: ['Simpl', 'Lazypay', 'ICICI Paylater']
              }
            }
          }
        });
      }

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action'
        }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Razorpay GET error:', error);
    return NextResponse.json({
      success: false,
      error: 'Request failed',
      details: error.message
    }, { status: 500 });
  }
} 