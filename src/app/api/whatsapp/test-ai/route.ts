import { NextRequest, NextResponse } from 'next/server';
import { processWhatsAppMessage } from '@/lib/whatsappProcessor';
import { sendWhatsAppMessage } from '@/lib/whatsappSender';

export async function POST(request: NextRequest) {
  try {
    const { message, phoneNumber, test = false } = await request.json();

    if (!message || !phoneNumber) {
      return NextResponse.json({
        success: false,
        error: 'Message and phone number are required'
      }, { status: 400 });
    }

    // Validate phone number format
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    if (cleanNumber.length < 10 || cleanNumber.length > 13) {
      return NextResponse.json({
        success: false,
        error: 'Invalid phone number format'
      }, { status: 400 });
    }

    // Add country code if not present
    const formattedPhoneNumber = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;

    // Process message through AI
    const aiResponse = await processWhatsAppMessage({
      fromNumber: formattedPhoneNumber,
      message: message,
      messageType: 'text',
      timestamp: Date.now(),
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || ''
    });

    if (!aiResponse) {
      return NextResponse.json({
        success: false,
        error: 'Failed to process message through AI'
      }, { status: 500 });
    }

    // If this is a test, don't actually send the message
    if (test) {
      return NextResponse.json({
        success: true,
        message: 'AI response generated successfully (test mode)',
        data: {
          userMessage: message,
          aiResponse: aiResponse.text,
          quickReplies: aiResponse.quickReplies,
          buttons: aiResponse.buttons,
          timestamp: new Date().toISOString()
        }
      });
    }

    // Send the AI response via WhatsApp
    const messageSent = await sendWhatsAppMessage({
      to: formattedPhoneNumber,
      message: aiResponse.text,
      quickReplies: aiResponse.quickReplies,
      buttons: aiResponse.buttons
    });

    if (messageSent) {
      return NextResponse.json({
        success: true,
        message: 'AI response sent via WhatsApp successfully',
        data: {
          userMessage: message,
          aiResponse: aiResponse.text,
          quickReplies: aiResponse.quickReplies,
          buttons: aiResponse.buttons,
          timestamp: new Date().toISOString()
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to send AI response via WhatsApp'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('WhatsApp AI test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Test AI processing without sending message
    const testMessage = "I want to visit Kashi Vishwanath Temple";
    const testPhoneNumber = "919876543210";

    const aiResponse = await processWhatsAppMessage({
      fromNumber: testPhoneNumber,
      message: testMessage,
      messageType: 'text',
      timestamp: Date.now(),
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || ''
    });

    return NextResponse.json({
      success: true,
      message: 'AI processing test completed',
      data: {
        testMessage,
        aiResponse: aiResponse?.text || 'No response generated',
        quickReplies: aiResponse?.quickReplies || [],
        buttons: aiResponse?.buttons || [],
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('WhatsApp AI test GET error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 