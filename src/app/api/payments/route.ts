import { NextResponse } from 'next/server';

// Mock database for payments
let payments: any[] = [];
let paymentId = 5000;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('transactionId');
    const userId = searchParams.get('userId');
    const action = searchParams.get('action');

    // Get specific payment
    if (transactionId) {
      const payment = payments.find(p => p.transactionId === transactionId);
      if (!payment) {
        return NextResponse.json({ success: false, error: 'Payment not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: payment });
    }

    // Get user payments
    if (userId) {
      const userPayments = payments.filter(p => p.userId === userId);
      return NextResponse.json({ success: true, data: userPayments });
    }

    // Get payment methods
    if (action === 'methods') {
      const paymentMethods = [
        {
          id: 'upi',
          name: 'UPI',
          icon: '/images/payments/upi.png',
          providers: [
            { id: 'gpay', name: 'Google Pay', icon: '/images/payments/gpay.png' },
            { id: 'paytm', name: 'Paytm', icon: '/images/payments/paytm.png' },
            { id: 'phonepe', name: 'PhonePe', icon: '/images/payments/phonepe.png' },
            { id: 'bhim', name: 'BHIM', icon: '/images/payments/bhim.png' }
          ],
          processingFee: 0,
          isActive: true
        },
        {
          id: 'card',
          name: 'Credit/Debit Card',
          icon: '/images/payments/card.png',
          providers: [
            { id: 'visa', name: 'Visa', icon: '/images/payments/visa.png' },
            { id: 'mastercard', name: 'Mastercard', icon: '/images/payments/mastercard.png' },
            { id: 'rupay', name: 'RuPay', icon: '/images/payments/rupay.png' }
          ],
          processingFee: 2.5, // 2.5% fee
          isActive: true
        },
        {
          id: 'netbanking',
          name: 'Net Banking',
          icon: '/images/payments/netbanking.png',
          providers: [
            { id: 'sbi', name: 'State Bank of India', icon: '/images/banks/sbi.png' },
            { id: 'hdfc', name: 'HDFC Bank', icon: '/images/banks/hdfc.png' },
            { id: 'icici', name: 'ICICI Bank', icon: '/images/banks/icici.png' },
            { id: 'axis', name: 'Axis Bank', icon: '/images/banks/axis.png' }
          ],
          processingFee: 1.5, // 1.5% fee
          isActive: true
        },
        {
          id: 'wallet',
          name: 'Digital Wallet',
          icon: '/images/payments/wallet.png',
          providers: [
            { id: 'paytm_wallet', name: 'Paytm Wallet', icon: '/images/payments/paytm.png' },
            { id: 'mobikwik', name: 'MobiKwik', icon: '/images/payments/mobikwik.png' },
            { id: 'freecharge', name: 'FreeCharge', icon: '/images/payments/freecharge.png' }
          ],
          processingFee: 0,
          isActive: true
        },
        {
          id: 'emi',
          name: 'EMI Options',
          icon: '/images/payments/emi.png',
          providers: [
            { id: 'bajaj', name: 'Bajaj Finserv', icon: '/images/payments/bajaj.png', tenure: '3-24 months' },
            { id: 'zestmoney', name: 'ZestMoney', icon: '/images/payments/zest.png', tenure: '3-36 months' },
            { id: 'simpl', name: 'Simpl', icon: '/images/payments/simpl.png', tenure: '1-12 months' }
          ],
          processingFee: 0,
          isActive: true
        }
      ];

      return NextResponse.json({
        success: true,
        data: paymentMethods
      });
    }

    return NextResponse.json({ success: true, data: payments });

  } catch (error) {
    console.error('Payment GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch payment data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, ...paymentData } = body;

    switch (action) {
      case 'initiate':
        return await initiatePayment(paymentData);
      case 'verify':
        return await verifyPayment(paymentData.transactionId, paymentData.otp);
      case 'refund':
        return await processRefund(paymentData.transactionId, paymentData.amount, paymentData.reason);
      case 'status':
        return await getPaymentStatus(paymentData.transactionId);
      default:
        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Payment POST error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process payment' }, { status: 500 });
  }
}

async function initiatePayment(paymentData: any) {
  const processingFee = calculateProcessingFee(paymentData.method, paymentData.amount);
  const totalAmount = paymentData.amount + processingFee;

  const payment = {
    transactionId: `TXN${paymentId++}`,
    userId: paymentData.userId,
    bookingId: paymentData.bookingId,
    bookingType: paymentData.bookingType, // cab, hotel, food, flight
    amount: paymentData.amount,
    processingFee,
    totalAmount,
    currency: 'INR',
    method: {
      type: paymentData.method.type,
      provider: paymentData.method.provider,
      details: paymentData.method.details // card number, UPI ID, etc.
    },
    status: 'initiated',
    gateway: 'WanderMate Pay',
    merchantId: 'WM_MERCHANT_001',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
    securityCode: Math.floor(Math.random() * 900000) + 100000, // 6-digit code
    redirectUrl: paymentData.redirectUrl || null
  };

  payments.push(payment);

  // Simulate payment gateway processing
  setTimeout(() => {
    const paymentIndex = payments.findIndex(p => p.transactionId === payment.transactionId);
    if (paymentIndex !== -1 && payments[paymentIndex].status === 'initiated') {
      // Simulate 90% success rate
      payments[paymentIndex].status = Math.random() > 0.1 ? 'pending_verification' : 'failed';
      payments[paymentIndex].gatewayTransactionId = `GW_${Math.random().toString(36).substr(2, 12).toUpperCase()}`;
      
      if (payments[paymentIndex].status === 'failed') {
        payments[paymentIndex].failureReason = 'Insufficient funds';
      }
    }
  }, 3000); // 3 seconds processing time

  return NextResponse.json({
    success: true,
    message: 'Payment initiated successfully',
    data: {
      transactionId: payment.transactionId,
      amount: payment.totalAmount,
      status: payment.status,
      securityCode: payment.securityCode,
      expiresAt: payment.expiresAt,
      paymentUrl: payment.method.type === 'upi' 
        ? `upi://pay?pa=wandermate@paytm&pn=WanderMate&am=${payment.totalAmount}&cu=INR&tn=${payment.transactionId}`
        : null,
      instructions: getPaymentInstructions(payment.method.type)
    }
  });
}

async function verifyPayment(transactionId: string, otp?: string) {
  const paymentIndex = payments.findIndex(p => p.transactionId === transactionId);
  
  if (paymentIndex === -1) {
    return NextResponse.json({ success: false, error: 'Payment not found' }, { status: 404 });
  }

  const payment = payments[paymentIndex];
  
  if (payment.status === 'failed') {
    return NextResponse.json({
      success: false,
      error: payment.failureReason || 'Payment failed',
      data: { status: 'failed', transactionId }
    }, { status: 400 });
  }

  if (payment.status === 'pending_verification') {
    // Simulate OTP verification for certain payment methods
    if (['card', 'netbanking'].includes(payment.method.type) && !otp) {
      return NextResponse.json({
        success: false,
        error: 'OTP required for verification',
        data: { status: 'otp_required', transactionId }
      }, { status: 400 });
    }

    // Verify OTP (simulate)
    if (otp && otp !== '123456') {
      return NextResponse.json({
        success: false,
        error: 'Invalid OTP',
        data: { status: 'otp_invalid', transactionId }
      }, { status: 400 });
    }

    payments[paymentIndex].status = 'completed';
    payments[paymentIndex].completedAt = new Date().toISOString();
    payments[paymentIndex].receiptNumber = `RCP${Math.random().toString(36).substr(2, 10).toUpperCase()}`;
  }

  return NextResponse.json({
    success: true,
    message: 'Payment verified successfully',
    data: {
      transactionId: payment.transactionId,
      status: payment.status,
      amount: payment.totalAmount,
      receiptNumber: payment.receiptNumber,
      completedAt: payment.completedAt
    }
  });
}

async function processRefund(transactionId: string, refundAmount: number, reason: string) {
  const paymentIndex = payments.findIndex(p => p.transactionId === transactionId);
  
  if (paymentIndex === -1) {
    return NextResponse.json({ success: false, error: 'Payment not found' }, { status: 404 });
  }

  const payment = payments[paymentIndex];
  
  if (payment.status !== 'completed') {
    return NextResponse.json({ 
      success: false, 
      error: 'Cannot refund incomplete payment' 
    }, { status: 400 });
  }

  const refund = {
    refundId: `REF${Math.floor(Math.random() * 1000000)}`,
    transactionId,
    amount: refundAmount,
    reason,
    status: 'initiated',
    initiatedAt: new Date().toISOString(),
    expectedCompletionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
  };

  payments[paymentIndex].refund = refund;

  // Simulate refund processing
  setTimeout(() => {
    const refundIndex = payments.findIndex(p => p.transactionId === transactionId);
    if (refundIndex !== -1 && payments[refundIndex].refund) {
      payments[refundIndex].refund.status = 'completed';
      payments[refundIndex].refund.completedAt = new Date().toISOString();
    }
  }, 5000); // 5 seconds

  return NextResponse.json({
    success: true,
    message: 'Refund initiated successfully',
    data: refund
  });
}

async function getPaymentStatus(transactionId: string) {
  const payment = payments.find(p => p.transactionId === transactionId);
  
  if (!payment) {
    return NextResponse.json({ success: false, error: 'Payment not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: {
      transactionId: payment.transactionId,
      status: payment.status,
      amount: payment.totalAmount,
      method: payment.method,
      createdAt: payment.createdAt,
      completedAt: payment.completedAt,
      refund: payment.refund || null
    }
  });
}

function calculateProcessingFee(method: any, amount: number): number {
  switch (method.type) {
    case 'card':
      return Math.round(amount * 0.025); // 2.5%
    case 'netbanking':
      return Math.round(amount * 0.015); // 1.5%
    case 'upi':
    case 'wallet':
    case 'emi':
    default:
      return 0;
  }
}

function getPaymentInstructions(methodType: string): string[] {
  switch (methodType) {
    case 'upi':
      return [
        'Click on the UPI link or scan QR code',
        'Authorize payment in your UPI app',
        'Payment will be verified automatically'
      ];
    case 'card':
      return [
        'Enter your card details securely',
        'You will receive an OTP on registered mobile',
        'Enter OTP to complete payment'
      ];
    case 'netbanking':
      return [
        'You will be redirected to your bank website',
        'Login with your internet banking credentials',
        'Authorize the payment'
      ];
    case 'wallet':
      return [
        'You will be redirected to wallet app',
        'Login and authorize payment',
        'Return to app after payment'
      ];
    default:
      return ['Follow the instructions on payment gateway'];
  }
} 