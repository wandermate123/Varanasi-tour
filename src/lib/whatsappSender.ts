import { WhatsAppResponse, formatWhatsAppMessage, createQuickReplies, createInteractiveButtons } from './whatsappUtils';

// WhatsApp Business API configuration
const WHATSAPP_API_VERSION = 'v18.0';
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

// Send message to WhatsApp user
export async function sendWhatsAppMessage(params: {
  to: string;
  message: string;
  quickReplies?: string[];
  buttons?: Array<{ type: 'reply' | 'url'; title: string; payload?: string; url?: string }>;
  phoneNumberId?: string;
}): Promise<boolean> {
  try {
    const { to, message, quickReplies, buttons, phoneNumberId } = params;
    
    if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
      console.error('WhatsApp API not configured');
      return false;
    }

    const targetPhoneNumberId = phoneNumberId || WHATSAPP_PHONE_NUMBER_ID;
    const formattedMessage = formatWhatsAppMessage(message);

    // Prepare the message payload
    let payload: any = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to,
      type: 'text',
      text: {
        body: formattedMessage
      }
    };

    // Add quick replies if provided
    if (quickReplies && quickReplies.length > 0) {
      payload.type = 'interactive';
      payload.interactive = {
        type: 'button',
        body: {
          text: formattedMessage
        },
        action: {
          buttons: createQuickReplies(quickReplies)
        }
      };
    }

    // Add interactive buttons if provided
    if (buttons && buttons.length > 0) {
      payload.type = 'interactive';
      payload.interactive = {
        type: 'button',
        body: {
          text: formattedMessage
        },
        action: {
          buttons: createInteractiveButtons(buttons)
        }
      };
    }

    // Send the message
    const response = await fetch(
      `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${targetPhoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('WhatsApp API Error:', errorData);
      return false;
    }

    const result = await response.json();
    console.log('✅ WhatsApp message sent successfully:', result);
    return true;

  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return false;
  }
}

// Send template message (for first-time users)
export async function sendTemplateMessage(to: string, templateName: string, language: string = 'en'): Promise<boolean> {
  try {
    if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
      console.error('WhatsApp API not configured');
      return false;
    }

    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: language
        }
      }
    };

    const response = await fetch(
      `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('WhatsApp Template API Error:', errorData);
      return false;
    }

    const result = await response.json();
    console.log('✅ WhatsApp template message sent successfully:', result);
    return true;

  } catch (error) {
    console.error('Error sending WhatsApp template message:', error);
    return false;
  }
}

// Send media message (images, documents, etc.)
export async function sendMediaMessage(params: {
  to: string;
  mediaType: 'image' | 'audio' | 'document';
  mediaUrl: string;
  caption?: string;
  phoneNumberId?: string;
}): Promise<boolean> {
  try {
    const { to, mediaType, mediaUrl, caption, phoneNumberId } = params;
    
    if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
      console.error('WhatsApp API not configured');
      return false;
    }

    const targetPhoneNumberId = phoneNumberId || WHATSAPP_PHONE_NUMBER_ID;

    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to,
      type: mediaType,
      [mediaType]: {
        link: mediaUrl,
        ...(caption && { caption: caption })
      }
    };

    const response = await fetch(
      `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${targetPhoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('WhatsApp Media API Error:', errorData);
      return false;
    }

    const result = await response.json();
    console.log('✅ WhatsApp media message sent successfully:', result);
    return true;

  } catch (error) {
    console.error('Error sending WhatsApp media message:', error);
    return false;
  }
}

// Send location message
export async function sendLocationMessage(params: {
  to: string;
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
  phoneNumberId?: string;
}): Promise<boolean> {
  try {
    const { to, latitude, longitude, name, address, phoneNumberId } = params;
    
    if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
      console.error('WhatsApp API not configured');
      return false;
    }

    const targetPhoneNumberId = phoneNumberId || WHATSAPP_PHONE_NUMBER_ID;

    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to,
      type: 'location',
      location: {
        latitude: latitude,
        longitude: longitude,
        ...(name && { name: name }),
        ...(address && { address: address })
      }
    };

    const response = await fetch(
      `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${targetPhoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('WhatsApp Location API Error:', errorData);
      return false;
    }

    const result = await response.json();
    console.log('✅ WhatsApp location message sent successfully:', result);
    return true;

  } catch (error) {
    console.error('Error sending WhatsApp location message:', error);
    return false;
  }
}

// Send contact message
export async function sendContactMessage(params: {
  to: string;
  name: string;
  phoneNumber: string;
  organization?: string;
  phoneNumberId?: string;
}): Promise<boolean> {
  try {
    const { to, name, phoneNumber, organization, phoneNumberId } = params;
    
    if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
      console.error('WhatsApp API not configured');
      return false;
    }

    const targetPhoneNumberId = phoneNumberId || WHATSAPP_PHONE_NUMBER_ID;

    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to,
      type: 'contacts',
      contacts: [
        {
          name: {
            formatted_name: name,
            ...(organization && { organization: organization })
          },
          phones: [
            {
              phone: phoneNumber,
              type: 'CELL'
            }
          ]
        }
      ]
    };

    const response = await fetch(
      `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${targetPhoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('WhatsApp Contact API Error:', errorData);
      return false;
    }

    const result = await response.json();
    console.log('✅ WhatsApp contact message sent successfully:', result);
    return true;

  } catch (error) {
    console.error('Error sending WhatsApp contact message:', error);
    return false;
  }
}

// Send typing indicator
export async function sendTypingIndicator(to: string, isTyping: boolean = true): Promise<boolean> {
  try {
    if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
      console.error('WhatsApp API not configured');
      return false;
    }

    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to,
      type: 'reaction',
      reaction: {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        type: isTyping ? 'typing' : 'read'
      }
    };

    const response = await fetch(
      `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }
    );

    return response.ok;

  } catch (error) {
    console.error('Error sending typing indicator:', error);
    return false;
  }
}

// Mark message as read
export async function markMessageAsRead(messageId: string): Promise<boolean> {
  try {
    if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
      console.error('WhatsApp API not configured');
      return false;
    }

    const payload = {
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: messageId
    };

    const response = await fetch(
      `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }
    );

    return response.ok;

  } catch (error) {
    console.error('Error marking message as read:', error);
    return false;
  }
} 