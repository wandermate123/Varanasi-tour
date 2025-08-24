import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

let client: twilio.Twilio | null = null;

if (accountSid && authToken) {
  client = twilio(accountSid, authToken);
}

// In-memory OTP storage (use Redis in production)
const otpStore = new Map<string, { otp: string; expiresAt: number; attempts: number }>();

export async function POST(request: NextRequest) {
  try {
    const { action, phoneNumber, otp, message, countryCode = '+91' } = await request.json();

    if (!client) {
      return NextResponse.json({
        success: false,
        error: 'Twilio not configured'
      }, { status: 500 });
    }

    const fullPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `${countryCode}${phoneNumber}`;

    switch (action) {
      case 'send_otp': {
        if (!phoneNumber) {
          return NextResponse.json({
            success: false,
            error: 'Phone number required'
          }, { status: 400 });
        }

        // Generate 6-digit OTP
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        // Store OTP
        otpStore.set(fullPhoneNumber, {
          otp: generatedOtp,
          expiresAt,
          attempts: 0
        });

        // Send SMS
        const messageBody = `Your WanderMate verification code is: ${generatedOtp}. Valid for 10 minutes. Do not share this code.`;

        const messageResponse = await client.messages.create({
          body: messageBody,
          from: twilioPhoneNumber,
          to: fullPhoneNumber
        });

        return NextResponse.json({
          success: true,
          data: {
            sid: messageResponse.sid,
            status: messageResponse.status,
            phoneNumber: fullPhoneNumber,
            expiresAt: new Date(expiresAt).toISOString()
          }
        });
      }

      case 'verify_otp': {
        if (!phoneNumber || !otp) {
          return NextResponse.json({
            success: false,
            error: 'Phone number and OTP required'
          }, { status: 400 });
        }

        const storedData = otpStore.get(fullPhoneNumber);

        if (!storedData) {
          return NextResponse.json({
            success: false,
            error: 'OTP not found or expired'
          }, { status: 400 });
        }

        // Check expiration
        if (Date.now() > storedData.expiresAt) {
          otpStore.delete(fullPhoneNumber);
          return NextResponse.json({
            success: false,
            error: 'OTP expired'
          }, { status: 400 });
        }

        // Check attempts
        if (storedData.attempts >= 3) {
          otpStore.delete(fullPhoneNumber);
          return NextResponse.json({
            success: false,
            error: 'Too many failed attempts'
          }, { status: 400 });
        }

        // Verify OTP
        if (storedData.otp === otp) {
          otpStore.delete(fullPhoneNumber);
          return NextResponse.json({
            success: true,
            data: {
              verified: true,
              phoneNumber: fullPhoneNumber
            }
          });
        } else {
          // Increment attempts
          storedData.attempts++;
          otpStore.set(fullPhoneNumber, storedData);

          return NextResponse.json({
            success: false,
            error: 'Invalid OTP',
            data: {
              attemptsRemaining: 3 - storedData.attempts
            }
          }, { status: 400 });
        }
      }

      case 'send_message': {
        if (!phoneNumber || !message) {
          return NextResponse.json({
            success: false,
            error: 'Phone number and message required'
          }, { status: 400 });
        }

        const messageResponse = await client.messages.create({
          body: message,
          from: twilioPhoneNumber,
          to: fullPhoneNumber
        });

        return NextResponse.json({
          success: true,
          data: {
            sid: messageResponse.sid,
            status: messageResponse.status,
            phoneNumber: fullPhoneNumber,
            messageBody: message
          }
        });
      }

      case 'send_booking_confirmation': {
        if (!phoneNumber) {
          return NextResponse.json({
            success: false,
            error: 'Phone number required'
          }, { status: 400 });
        }

        const { bookingId, serviceType, amount, date } = await request.json();
        const confirmationMessage = `🎉 WanderMate Booking Confirmed!\n\nBooking ID: ${bookingId}\nService: ${serviceType}\nAmount: ₹${amount}\nDate: ${date}\n\nEnjoy your journey!`;

        const messageResponse = await client.messages.create({
          body: confirmationMessage,
          from: twilioPhoneNumber,
          to: fullPhoneNumber
        });

        return NextResponse.json({
          success: true,
          data: {
            sid: messageResponse.sid,
            status: messageResponse.status,
            phoneNumber: fullPhoneNumber,
            type: 'booking_confirmation'
          }
        });
      }

      case 'send_travel_alert': {
        if (!phoneNumber) {
          return NextResponse.json({
            success: false,
            error: 'Phone number required'
          }, { status: 400 });
        }

        const { alertType, location, details } = await request.json();
        const alertMessage = `🚨 WanderMate Travel Alert\n\nType: ${alertType}\nLocation: ${location}\nDetails: ${details}\n\nStay safe!`;

        const messageResponse = await client.messages.create({
          body: alertMessage,
          from: twilioPhoneNumber,
          to: fullPhoneNumber
        });

        return NextResponse.json({
          success: true,
          data: {
            sid: messageResponse.sid,
            status: messageResponse.status,
            phoneNumber: fullPhoneNumber,
            type: 'travel_alert'
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
    console.error('Twilio SMS error:', error);
    return NextResponse.json({
      success: false,
      error: 'SMS service failed',
      details: error.message
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!client) {
      return NextResponse.json({
        success: false,
        error: 'Twilio not configured'
      }, { status: 500 });
    }

    const url = new URL(request.url);
    const action = url.searchParams.get('action');
    const messageSid = url.searchParams.get('message_sid');

    switch (action) {
      case 'get_message_status': {
        if (!messageSid) {
          return NextResponse.json({
            success: false,
            error: 'Message SID required'
          }, { status: 400 });
        }

        const message = await client.messages(messageSid).fetch();

        return NextResponse.json({
          success: true,
          data: {
            sid: message.sid,
            status: message.status,
            direction: message.direction,
            from: message.from,
            to: message.to,
            body: message.body,
            numSegments: message.numSegments,
            price: message.price,
            priceUnit: message.priceUnit,
            errorCode: message.errorCode,
            errorMessage: message.errorMessage,
            dateCreated: message.dateCreated,
            dateSent: message.dateSent,
            dateUpdated: message.dateUpdated
          }
        });
      }

      case 'get_account_info': {
        if (!accountSid) {
          return NextResponse.json({
            success: false,
            error: 'Account SID not configured'
          }, { status: 500 });
        }

        const account = await client.api.accounts(accountSid).fetch();

        return NextResponse.json({
          success: true,
          data: {
            sid: account.sid,
            friendlyName: account.friendlyName,
            status: account.status,
            type: account.type,
            dateCreated: account.dateCreated,
            dateUpdated: account.dateUpdated
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
    console.error('Twilio API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Twilio API request failed',
      details: error.message
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { phoneNumber, countryCode = '+91' } = await request.json();
    
    if (!phoneNumber) {
      return NextResponse.json({
        success: false,
        error: 'Phone number required'
      }, { status: 400 });
    }

    const fullPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `${countryCode}${phoneNumber}`;
    
    // Clear OTP from store
    const deleted = otpStore.delete(fullPhoneNumber);

    return NextResponse.json({
      success: true,
      data: {
        phoneNumber: fullPhoneNumber,
        cleared: deleted
      }
    });

  } catch (error: any) {
    console.error('OTP clear error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to clear OTP',
      details: error.message
    }, { status: 500 });
  }
} 