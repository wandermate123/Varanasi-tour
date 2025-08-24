import { NextRequest, NextResponse } from 'next/server';
import { verifyWhatsAppSignature } from '@/lib/whatsappUtils';
import { processWhatsAppMessage } from '@/lib/whatsappProcessor';
import { sendWhatsAppMessage } from '@/lib/whatsappSender';

// WhatsApp webhook verification and message processing
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');

    // Verify webhook setup
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
    
    if (mode === 'subscribe' && token === verifyToken) {
      console.log('✅ WhatsApp webhook verified successfully');
      return new NextResponse(challenge, { status: 200 });
    }

    return new NextResponse('Forbidden', { status: 403 });
  } catch (error) {
    console.error('WhatsApp webhook verification error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify WhatsApp signature for security
    const signature = request.headers.get('x-hub-signature-256');
    const body = await request.text();
    
    if (!verifyWhatsAppSignature(body, signature)) {
      console.error('❌ Invalid WhatsApp signature');
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const data = JSON.parse(body);
    console.log('📱 WhatsApp webhook received:', JSON.stringify(data, null, 2));

    // Handle different types of webhook events
    if (data.object === 'whatsapp_business_account') {
      for (const entry of data.entry) {
        for (const change of entry.changes) {
          if (change.value.messages && change.value.messages.length > 0) {
            for (const message of change.value.messages) {
              // Process each incoming message
              await handleIncomingMessage(message, change.value.metadata);
            }
          }
        }
      }
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('WhatsApp webhook processing error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

async function handleIncomingMessage(message: any, metadata: any) {
  try {
    const phoneNumberId = metadata.phone_number_id;
    const fromNumber = message.from;
    const messageType = message.type;
    const timestamp = message.timestamp;

    console.log(`📨 Processing message from ${fromNumber}, type: ${messageType}`);

    let userMessage = '';
    let mediaUrl = '';

    // Extract message content based on type
    switch (messageType) {
      case 'text':
        userMessage = message.text.body;
        break;
      case 'audio':
        // Handle voice messages (will be processed by Whisper)
        mediaUrl = message.audio.id;
        userMessage = '[Voice message received]';
        break;
      case 'image':
        // Handle image messages
        mediaUrl = message.image.id;
        userMessage = '[Image received]';
        break;
      case 'document':
        mediaUrl = message.document.id;
        userMessage = '[Document received]';
        break;
      default:
        userMessage = `[${messageType} message received]`;
    }

    // Process the message through AI
    const aiResponse = await processWhatsAppMessage({
      fromNumber,
      message: userMessage,
      messageType,
      mediaUrl,
      timestamp,
      phoneNumberId
    });

    // Send response back to WhatsApp
    if (aiResponse) {
      await sendWhatsAppMessage({
        to: fromNumber,
        message: aiResponse.text,
        quickReplies: aiResponse.quickReplies,
        buttons: aiResponse.buttons,
        phoneNumberId
      });
    }

  } catch (error) {
    console.error('Error handling incoming WhatsApp message:', error);
    
    // Send fallback response
    try {
      await sendWhatsAppMessage({
        to: message.from,
        message: "I'm having trouble processing your message right now. Please try again in a moment! 🙏",
        phoneNumberId: metadata.phone_number_id
      });
    } catch (sendError) {
      console.error('Error sending fallback message:', sendError);
    }
  }
} 