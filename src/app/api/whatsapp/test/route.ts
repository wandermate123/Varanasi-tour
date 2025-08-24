import { NextRequest, NextResponse } from 'next/server';
import { sendWhatsAppMessage } from '@/lib/whatsappSender';

export async function POST(request: NextRequest) {
  try {
    const { to, message, test = false } = await request.json();

    if (!to || !message) {
      return NextResponse.json({
        success: false,
        error: 'Phone number and message are required'
      }, { status: 400 });
    }

    // Validate phone number format
    const cleanNumber = to.replace(/\D/g, '');
    if (cleanNumber.length < 10 || cleanNumber.length > 13) {
      return NextResponse.json({
        success: false,
        error: 'Invalid phone number format'
      }, { status: 400 });
    }

    // Add country code if not present
    const phoneNumber = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;

    // Send the message
    const success = await sendWhatsAppMessage({
      to: phoneNumber,
      message: message,
      quickReplies: test ? ['🗺️ Plan Trip', '🏨 Book Hotel', '🍽️ Find Food'] : undefined
    });

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'WhatsApp message sent successfully',
        data: {
          to: phoneNumber,
          message: message,
          timestamp: new Date().toISOString()
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to send WhatsApp message'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('WhatsApp test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check WhatsApp API configuration
    const isConfigured = !!(process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID);
    
    return NextResponse.json({
      success: true,
      configured: isConfigured,
      message: isConfigured ? 'WhatsApp API is properly configured' : 'WhatsApp API is not configured',
      required: {
        WHATSAPP_ACCESS_TOKEN: !!process.env.WHATSAPP_ACCESS_TOKEN,
        WHATSAPP_PHONE_NUMBER_ID: !!process.env.WHATSAPP_PHONE_NUMBER_ID,
        WHATSAPP_APP_SECRET: !!process.env.WHATSAPP_APP_SECRET,
        WHATSAPP_VERIFY_TOKEN: !!process.env.WHATSAPP_VERIFY_TOKEN
      }
    });

  } catch (error) {
    console.error('WhatsApp test GET error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
} 