import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Check if Resend is properly configured
if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not configured. Email functionality will not work.');
}

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
const fromEmail = process.env.FROM_EMAIL || 'noreply@wandermate.com';

export async function POST(request: NextRequest) {
  try {
    const { action, ...emailData } = await request.json();

    // Check if Resend is configured
    if (!resend) {
      return NextResponse.json({
        success: false,
        error: 'Email service is not configured. Please contact support.',
        details: 'RESEND_API_KEY is missing from environment variables.'
      }, { status: 503 });
    }

    switch (action) {
      case 'send_booking_confirmation': {
        const { to, customerName, bookingDetails, paymentDetails } = emailData;

        if (!to || !customerName || !bookingDetails) {
          return NextResponse.json({
            success: false,
            error: 'Recipient email, customer name, and booking details required'
          }, { status: 400 });
        }

        const emailContent = generateBookingConfirmationHTML(customerName, bookingDetails, paymentDetails);

        const emailResponse = await resend.emails.send({
          from: fromEmail,
          to: [to],
          subject: `🎉 Booking Confirmed - ${bookingDetails.type} | WanderMate`,
          html: emailContent,
          tags: [
            { name: 'category', value: 'booking-confirmation' },
            { name: 'service', value: bookingDetails.type }
          ]
        });

        return NextResponse.json({
          success: true,
          data: {
            id: emailResponse.data?.id,
            to,
            subject: `Booking Confirmed - ${bookingDetails.type}`,
            type: 'booking_confirmation'
          }
        });
      }

      case 'send_payment_receipt': {
        const { to, customerName, paymentDetails, bookingDetails } = emailData;

        if (!to || !customerName || !paymentDetails) {
          return NextResponse.json({
            success: false,
            error: 'Recipient email, customer name, and payment details required'
          }, { status: 400 });
        }

        const emailContent = generatePaymentReceiptHTML(customerName, paymentDetails, bookingDetails);

        const emailResponse = await resend.emails.send({
          from: fromEmail,
          to: [to],
          subject: `📧 Payment Receipt - ₹${paymentDetails.amount} | WanderMate`,
          html: emailContent,
          tags: [
            { name: 'category', value: 'payment-receipt' },
            { name: 'amount', value: paymentDetails.amount.toString() }
          ]
        });

        return NextResponse.json({
          success: true,
          data: {
            id: emailResponse.data?.id,
            to,
            subject: `Payment Receipt - ₹${paymentDetails.amount}`,
            type: 'payment_receipt'
          }
        });
      }

      case 'send_travel_itinerary': {
        const { to, customerName, itinerary, tripDetails } = emailData;

        if (!to || !customerName || !itinerary) {
          return NextResponse.json({
            success: false,
            error: 'Recipient email, customer name, and itinerary required'
          }, { status: 400 });
        }

        const emailContent = generateItineraryHTML(customerName, itinerary, tripDetails);

        const emailResponse = await resend.emails.send({
          from: fromEmail,
          to: [to],
          subject: `🗺️ Your Travel Itinerary - ${tripDetails?.destination || 'WanderMate'}`,
          html: emailContent,
          tags: [
            { name: 'category', value: 'itinerary' },
            { name: 'destination', value: tripDetails?.destination || 'unknown' }
          ]
        });

        return NextResponse.json({
          success: true,
          data: {
            id: emailResponse.data?.id,
            to,
            subject: `Travel Itinerary - ${tripDetails?.destination}`,
            type: 'travel_itinerary'
          }
        });
      }

      case 'send_otp_email': {
        const { to, otp, customerName } = emailData;

        if (!to || !otp) {
          return NextResponse.json({
            success: false,
            error: 'Recipient email and OTP required'
          }, { status: 400 });
        }

        const emailContent = generateOTPHTML(customerName || 'Valued Customer', otp);

        const emailResponse = await resend.emails.send({
          from: fromEmail,
          to: [to],
          subject: '🔐 Your WanderMate Verification Code',
          html: emailContent,
          tags: [
            { name: 'category', value: 'otp-verification' }
          ]
        });

        return NextResponse.json({
          success: true,
          data: {
            id: emailResponse.data?.id,
            to,
            subject: 'Verification Code',
            type: 'otp_verification'
          }
        });
      }

      case 'send_custom_email': {
        const { to, subject, content, customerName, templateType = 'general' } = emailData;

        if (!to || !subject || !content) {
          return NextResponse.json({
            success: false,
            error: 'Recipient email, subject, and content required'
          }, { status: 400 });
        }

        const emailContent = generateCustomHTML(customerName || 'Valued Customer', content, templateType);

        const emailResponse = await resend.emails.send({
          from: fromEmail,
          to: Array.isArray(to) ? to : [to],
          subject,
          html: emailContent,
          tags: [
            { name: 'category', value: 'custom' },
            { name: 'template', value: templateType }
          ]
        });

        return NextResponse.json({
          success: true,
          data: {
            id: emailResponse.data?.id,
            to: Array.isArray(to) ? to : [to],
            subject,
            type: 'custom_email'
          }
        });
      }

      case 'send_newsletter': {
        const { recipients, subject, content, unsubscribeUrl } = emailData;

        if (!recipients || !subject || !content) {
          return NextResponse.json({
            success: false,
            error: 'Recipients, subject, and content required'
          }, { status: 400 });
        }

        const emailContent = generateNewsletterHTML(content, unsubscribeUrl);

        const emailResponse = await resend.emails.send({
          from: fromEmail,
          to: recipients,
          subject,
          html: emailContent,
          tags: [
            { name: 'category', value: 'newsletter' }
          ]
        });

        return NextResponse.json({
          success: true,
          data: {
            id: emailResponse.data?.id,
            to: recipients,
            subject,
            type: 'newsletter'
          }
        });
      }

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid email action'
        }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Resend email error:', error);
    return NextResponse.json({
      success: false,
      error: 'Email sending failed',
      details: error.message
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const action = url.searchParams.get('action');
    const emailId = url.searchParams.get('email_id');

    // Check if Resend is configured
    if (!resend) {
      return NextResponse.json({
        success: false,
        error: 'Email service is not configured. Please contact support.',
        details: 'RESEND_API_KEY is missing from environment variables.'
      }, { status: 503 });
    }

    switch (action) {
      case 'get_email_status': {
        if (!emailId) {
          return NextResponse.json({
            success: false,
            error: 'Email ID required'
          }, { status: 400 });
        }

        const email = await resend.emails.get(emailId);

        return NextResponse.json({
          success: true,
          data: {
            id: email.data?.id,
            from: email.data?.from,
            to: email.data?.to,
            subject: email.data?.subject,
            created_at: email.data?.created_at,
            last_event: email.data?.last_event
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
    console.error('Resend API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Email API request failed',
      details: error.message
    }, { status: 500 });
  }
}

// HTML Template Generators
function generateBookingConfirmationHTML(customerName: string, bookingDetails: any, paymentDetails: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 30px; border-radius: 10px 10px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
        .booking-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
        .footer { background: #f8f9fa; text-align: center; padding: 20px; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Booking Confirmed!</h1>
          <p>Your adventure awaits, ${customerName}!</p>
        </div>
        <div class="content">
          <h2>Booking Details</h2>
          <div class="booking-details">
            <div class="detail-row"><strong>Booking ID:</strong> <span>${bookingDetails.id}</span></div>
            <div class="detail-row"><strong>Service:</strong> <span>${bookingDetails.type}</span></div>
            <div class="detail-row"><strong>Date:</strong> <span>${bookingDetails.date}</span></div>
            <div class="detail-row"><strong>Amount:</strong> <span>₹${bookingDetails.amount}</span></div>
            ${bookingDetails.location ? `<div class="detail-row"><strong>Location:</strong> <span>${bookingDetails.location}</span></div>` : ''}
          </div>
          
          ${paymentDetails ? `
            <h3>Payment Information</h3>
            <div class="booking-details">
              <div class="detail-row"><strong>Payment ID:</strong> <span>${paymentDetails.id}</span></div>
              <div class="detail-row"><strong>Method:</strong> <span>${paymentDetails.method}</span></div>
              <div class="detail-row"><strong>Status:</strong> <span>${paymentDetails.status}</span></div>
            </div>
          ` : ''}
          
          <p>Thank you for choosing WanderMate! We're excited to be part of your journey.</p>
          <a href="#" class="btn">View Booking Details</a>
        </div>
        <div class="footer">
          <p>Safe travels! 🌟<br>The WanderMate Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generatePaymentReceiptHTML(customerName: string, paymentDetails: any, bookingDetails: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Receipt</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #28a745; color: white; text-align: center; padding: 30px; border-radius: 10px 10px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
        .receipt-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; border-bottom: 1px solid #eee; padding-bottom: 5px; }
        .total-row { font-weight: bold; font-size: 1.2em; border-top: 2px solid #28a745; padding-top: 10px; }
        .footer { background: #f8f9fa; text-align: center; padding: 20px; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 Payment Receipt</h1>
          <p>Payment successful, ${customerName}!</p>
        </div>
        <div class="content">
          <div class="receipt-details">
            <div class="detail-row"><strong>Transaction ID:</strong> <span>${paymentDetails.id}</span></div>
            <div class="detail-row"><strong>Payment Method:</strong> <span>${paymentDetails.method}</span></div>
            <div class="detail-row"><strong>Date:</strong> <span>${new Date(paymentDetails.date).toLocaleDateString()}</span></div>
            <div class="detail-row"><strong>Status:</strong> <span>${paymentDetails.status}</span></div>
            ${bookingDetails ? `<div class="detail-row"><strong>Service:</strong> <span>${bookingDetails.type}</span></div>` : ''}
            <div class="detail-row total-row"><strong>Total Amount:</strong> <span>₹${paymentDetails.amount}</span></div>
          </div>
          <p>This receipt serves as proof of payment for your WanderMate booking.</p>
        </div>
        <div class="footer">
          <p>Thank you for your payment! 💳<br>The WanderMate Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateItineraryHTML(customerName: string, itinerary: any, tripDetails: any) {
  const itineraryItems = itinerary.map((item: any, index: number) => `
    <div style="margin: 15px 0; padding: 15px; border-left: 3px solid #667eea;">
      <h4>Day ${index + 1}: ${item.title}</h4>
      <p><strong>Time:</strong> ${item.time}</p>
      <p>${item.description}</p>
      ${item.location ? `<p><strong>Location:</strong> ${item.location}</p>` : ''}
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Travel Itinerary</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%); color: white; text-align: center; padding: 30px; border-radius: 10px 10px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
        .itinerary { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { background: #f8f9fa; text-align: center; padding: 20px; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🗺️ Your Travel Itinerary</h1>
          <p>Ready for adventure, ${customerName}?</p>
        </div>
        <div class="content">
          <h2>${tripDetails?.destination || 'Your Journey'}</h2>
          <div class="itinerary">
            ${itineraryItems}
          </div>
          <p>Have an amazing trip! Don't forget to share your experiences with us.</p>
        </div>
        <div class="footer">
          <p>Bon voyage! ✈️<br>The WanderMate Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateOTPHTML(customerName: string, otp: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verification Code</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #6c5ce7; color: white; text-align: center; padding: 30px; border-radius: 10px 10px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
        .otp-box { background: #f8f9fa; border: 2px dashed #6c5ce7; text-align: center; padding: 30px; margin: 20px 0; border-radius: 8px; }
        .otp-code { font-size: 32px; font-weight: bold; color: #6c5ce7; letter-spacing: 5px; }
        .footer { background: #f8f9fa; text-align: center; padding: 20px; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Verification Code</h1>
          <p>Your security is our priority</p>
        </div>
        <div class="content">
          <p>Hi ${customerName},</p>
          <p>Use the following verification code to complete your action:</p>
          <div class="otp-box">
            <div class="otp-code">${otp}</div>
            <p>This code expires in 10 minutes</p>
          </div>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>Stay secure! 🛡️<br>The WanderMate Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateCustomHTML(customerName: string, content: string, templateType: string) {
  const colors: Record<string, string> = {
    general: '#667eea',
    alert: '#e74c3c',
    success: '#27ae60',
    info: '#3498db'
  };

  const color = colors[templateType] || colors.general;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>WanderMate</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: ${color}; color: white; text-align: center; padding: 30px; border-radius: 10px 10px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
        .footer { background: #f8f9fa; text-align: center; padding: 20px; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>WanderMate</h1>
        </div>
        <div class="content">
          <p>Hi ${customerName},</p>
          ${content}
        </div>
        <div class="footer">
          <p>Best regards,<br>The WanderMate Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateNewsletterHTML(content: string, unsubscribeUrl?: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>WanderMate Newsletter</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 30px; border-radius: 10px 10px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
        .footer { background: #f8f9fa; text-align: center; padding: 20px; border-radius: 0 0 10px 10px; font-size: 12px; }
        .unsubscribe { color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📬 WanderMate Newsletter</h1>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>© 2024 WanderMate. All rights reserved.</p>
          ${unsubscribeUrl ? `<p class="unsubscribe"><a href="${unsubscribeUrl}">Unsubscribe</a></p>` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
} 