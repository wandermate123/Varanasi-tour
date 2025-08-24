import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
    const today = now.toISOString().split('T')[0];
    
    // Generate live events based on current time
    const liveEvents = [];
    
    // Morning Events (5 AM - 10 AM)
    if (currentHour >= 5 && currentHour < 10) {
      liveEvents.push({
        id: 'sunrise-boats',
        name: '🌅 Sunrise Boat Rides (LIVE NOW)',
        status: 'happening',
        urgency: 'high',
        location: 'Multiple Ghats',
        startTime: '05:30',
        endTime: '08:00',
        timeLeft: calculateTimeLeft('08:00', currentTime),
        description: 'Peaceful sunrise boat rides showcasing spiritual activities along ghats',
        participants: '20-30 boats currently on water',
        bookingInfo: {
          available: true,
          price: '₹300-500 per boat',
          contact: 'Available at ghat directly',
          instantBooking: false
        },
        tips: [
          'Perfect time for photography',
          'Dress warmly (winter mornings)',
          'Negotiate price at ghat',
          'Best views from center river'
        ],
        crowdLevel: 'moderate',
        weatherImpact: 'none'
      });
      
      liveEvents.push({
        id: 'morning-prayers',
        name: '🙏 Morning Temple Prayers',
        status: 'happening',
        urgency: 'medium',
        location: 'All Major Temples',
        startTime: '05:00',
        endTime: '08:00',
        timeLeft: calculateTimeLeft('08:00', currentTime),
        description: 'Traditional morning prayers and rituals at temples',
        participants: 'Hundreds of devotees',
        tips: [
          'Join morning Aarti ceremonies',
          'Dress modestly for temple visits',
          'Remove shoes before entering',
          'Photography may be restricted'
        ],
        crowdLevel: 'low-moderate',
        weatherImpact: 'none'
      });
    }
    
    // Day Events (10 AM - 5 PM)
    if (currentHour >= 10 && currentHour < 17) {
      liveEvents.push({
        id: 'temple-tours',
        name: '🏛️ Temple Hopping Tours',
        status: 'active',
        urgency: 'low',
        location: 'City Center Temples',
        startTime: '10:00',
        endTime: '17:00',
        timeLeft: calculateTimeLeft('17:00', currentTime),
        description: 'Self-guided or group temple tours',
        participants: 'Multiple tour groups active',
        bookingInfo: {
          available: true,
          price: '₹500-1500 per person',
          contact: 'Hotel concierge or tour operators',
          instantBooking: true
        },
        tips: [
          'Start with Kashi Vishwanath Temple',
          'Hire local guide for insights',
          'Carry water and snacks',
          'Plan 4-5 hours minimum'
        ],
        crowdLevel: 'high',
        weatherImpact: currentHour > 11 && currentHour < 15 ? 'hot' : 'none'
      });
      
      liveEvents.push({
        id: 'silk-shopping',
        name: '🧵 Silk Shopping Tours',
        status: 'active',
        urgency: 'low',
        location: 'Godowlia Market & Surrounding Areas',
        startTime: '10:00',
        endTime: '19:00',
        timeLeft: calculateTimeLeft('19:00', currentTime),
        description: 'Explore famous Banarasi silk shops and workshops',
        participants: 'Shop owners and tourists',
        tips: [
          'Compare prices at multiple shops',
          'Ask for authenticity certificates',
          'Negotiate politely',
          'Check for export quality'
        ],
        crowdLevel: 'moderate-high',
        weatherImpact: 'covered markets'
      });
    }
    
    // Evening Events (5 PM - 8 PM)
    if (currentHour >= 17 && currentHour < 20) {
      const aartiStatus = currentHour < 18 ? 'starting-soon' : (currentHour === 18 && currentMinute < 45) ? 'happening' : 'ending-soon';
      const aartiUrgency = currentHour < 18 ? 'high' : 'critical';
      
      liveEvents.push({
        id: 'ganga-aarti',
        name: '🕯️ Ganga Aarti Ceremony',
        status: aartiStatus,
        urgency: aartiUrgency,
        location: 'Dashashwamedh Ghat (Main) + 5 other ghats',
        startTime: '18:30',
        endTime: '19:15',
        timeLeft: aartiStatus === 'starting-soon' ? calculateTimeLeft('18:30', currentTime) : calculateTimeLeft('19:15', currentTime),
        description: 'Spectacular evening prayer ceremony with oil lamps and chanting',
        participants: 'Thousands of devotees and tourists',
        bookingInfo: {
          available: true,
          price: 'Free viewing, ₹51+ for seating',
          contact: 'Direct at ghat',
          instantBooking: false
        },
        tips: [
          aartiStatus === 'starting-soon' ? 'Arrive NOW for best spots!' : 'Find viewing spots quickly',
          'Best viewed from boats',
          'Avoid flash photography during ceremony',
          'Keep belongings secure in crowds'
        ],
        crowdLevel: 'very-high',
        weatherImpact: 'outdoor-event'
      });
      
      liveEvents.push({
        id: 'evening-boat-rides',
        name: '🚤 Evening Boat Tours',
        status: 'active',
        urgency: 'medium',
        location: 'All Major Ghats',
        startTime: '17:00',
        endTime: '19:30',
        timeLeft: calculateTimeLeft('19:30', currentTime),
        description: 'Boat rides with views of Ganga Aarti from water',
        participants: '50+ boats available',
        bookingInfo: {
          available: true,
          price: '₹500-1000 for Aarti viewing',
          contact: 'Boat operators at ghats',
          instantBooking: true
        },
        tips: [
          'Book early for Aarti viewing',
          'Shared boats cheaper than private',
          'Negotiate total price upfront',
          'Perfect for photography'
        ],
        crowdLevel: 'high',
        weatherImpact: 'outdoor-activity'
      });
    }
    
    // Night Events (8 PM onwards)
    if (currentHour >= 20 || currentHour < 5) {
      liveEvents.push({
        id: 'night-food-tour',
        name: '🍛 Street Food Night Tour',
        status: 'active',
        urgency: 'low',
        location: 'Kachori Gali, Thatheri Bazaar',
        startTime: '20:00',
        endTime: '23:00',
        timeLeft: calculateTimeLeft('23:00', currentTime),
        description: 'Explore vibrant street food scene in narrow lanes',
        participants: 'Food vendors and night visitors',
        tips: [
          'Try famous kachoris and chaat',
          'Eat at busy stalls for freshness',
          'Carry hand sanitizer',
          'Start light and try variety'
        ],
        crowdLevel: 'moderate',
        weatherImpact: 'covered-lanes'
      });
      
      if (currentHour >= 20 && currentHour < 23) {
        liveEvents.push({
          id: 'heritage-walk',
          name: '🚶 Night Heritage Walk',
          status: 'active',
          urgency: 'low',
          location: 'Old City Lanes',
          startTime: '20:00',
          endTime: '22:30',
          timeLeft: calculateTimeLeft('22:30', currentTime),
          description: 'Guided walks through illuminated ancient lanes',
          participants: 'Small groups with local guides',
          bookingInfo: {
            available: true,
            price: '₹300-500 per person',
            contact: 'Hotel concierge or tour operators',
            instantBooking: false
          },
          tips: [
            'Wear comfortable walking shoes',
            'Carry flashlight or phone light',
            'Stay with group for safety',
            'Respect local residents'
          ],
          crowdLevel: 'low',
          weatherImpact: 'pedestrian-activity'
        });
      }
    }
    
    // Special Events (Weekly/Monthly)
    const specialEvents = [];
    
    // Add day-specific events
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    if (dayOfWeek === 1) { // Monday
      specialEvents.push({
        id: 'monday-special',
        name: '🎭 Monday Cultural Program',
        status: 'scheduled',
        urgency: 'low',
        location: 'Cultural Centers',
        startTime: '19:00',
        endTime: '21:00',
        description: 'Traditional music and dance performances',
        frequency: 'weekly',
        nextOccurrence: 'Today 7:00 PM'
      });
    }
    
    if (dayOfWeek === 5) { // Friday
      specialEvents.push({
        id: 'friday-market',
        name: '🛒 Friday Night Market',
        status: 'active',
        urgency: 'medium',
        location: 'Godowlia Market Extended Hours',
        startTime: '18:00',
        endTime: '22:00',
        description: 'Extended market hours with special stalls',
        frequency: 'weekly',
        participants: 'Local vendors and shoppers'
      });
    }
    
    // Seasonal events
    const month = now.getMonth();
    if (month >= 10 || month <= 1) { // Nov-Jan winter season
      specialEvents.push({
        id: 'winter-bonfire',
        name: '🔥 Evening Bonfire Gatherings',
        status: 'seasonal',
        urgency: 'low',
        location: 'Select Ghats',
        startTime: '19:00',
        endTime: '22:00',
        description: 'Community bonfire gatherings during winter evenings',
        frequency: 'seasonal',
        season: 'winter'
      });
    }
    
    // Current crowd levels at popular spots
    const crowdLevels = {
      'Kashi Vishwanath Temple': getCrowdLevel(currentHour, 'temple'),
      'Dashashwamedh Ghat': getCrowdLevel(currentHour, 'main-ghat'),
      'Assi Ghat': getCrowdLevel(currentHour, 'quiet-ghat'),
      'Godowlia Market': getCrowdLevel(currentHour, 'market'),
      'Sarnath': getCrowdLevel(currentHour, 'monument')
    };
    
    // Traffic conditions
    const trafficConditions = {
      'City Center': getTrafficCondition(currentHour, 'center'),
      'Ghats Area': getTrafficCondition(currentHour, 'ghats'),
      'Cantonment': getTrafficCondition(currentHour, 'cantonment'),
      'Airport Road': getTrafficCondition(currentHour, 'airport')
    };
    
    return NextResponse.json({
      success: true,
      data: {
        liveEvents,
        specialEvents,
        currentTime,
        crowdLevels,
        trafficConditions,
        totalActiveEvents: liveEvents.length,
        lastUpdated: now.toISOString()
      },
      timestamp: now.toISOString()
    });
    
  } catch (error) {
    console.error('Live Events API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch live events data'
      }, 
      { status: 500 }
    );
  }
}

// Helper Functions
function calculateTimeLeft(endTime: string, currentTime: string): string {
  const [endHour, endMin] = endTime.split(':').map(Number);
  const [currentHour, currentMin] = currentTime.split(':').map(Number);
  
  let totalEndMinutes = endHour * 60 + endMin;
  let totalCurrentMinutes = currentHour * 60 + currentMin;
  
  // Handle next day scenarios
  if (totalEndMinutes < totalCurrentMinutes) {
    totalEndMinutes += 24 * 60;
  }
  
  const diffMinutes = totalEndMinutes - totalCurrentMinutes;
  
  if (diffMinutes <= 0) return 'Ending soon';
  
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m left`;
  } else {
    return `${minutes}m left`;
  }
}

function getCrowdLevel(hour: number, locationType: string): { level: string; color: string; description: string } {
  switch (locationType) {
    case 'temple':
      if (hour >= 5 && hour < 8) return { level: 'High', color: 'orange', description: 'Morning prayer time' };
      if (hour >= 8 && hour < 12) return { level: 'Very High', color: 'red', description: 'Peak visiting hours' };
      if (hour >= 18 && hour < 20) return { level: 'Very High', color: 'red', description: 'Evening prayers' };
      return { level: 'Moderate', color: 'yellow', description: 'Normal flow' };
      
    case 'main-ghat':
      if (hour >= 17 && hour < 20) return { level: 'Extremely High', color: 'darkred', description: 'Ganga Aarti time' };
      if (hour >= 5 && hour < 8) return { level: 'High', color: 'orange', description: 'Sunrise boat rides' };
      return { level: 'Moderate', color: 'yellow', description: 'Regular activities' };
      
    case 'quiet-ghat':
      if (hour >= 6 && hour < 8) return { level: 'Moderate', color: 'yellow', description: 'Yoga sessions' };
      return { level: 'Low', color: 'green', description: 'Peaceful' };
      
    case 'market':
      if (hour >= 10 && hour < 12) return { level: 'High', color: 'orange', description: 'Morning shopping' };
      if (hour >= 17 && hour < 20) return { level: 'Very High', color: 'red', description: 'Evening rush' };
      return { level: 'Moderate', color: 'yellow', description: 'Normal business' };
      
    case 'monument':
      if (hour >= 9 && hour < 12) return { level: 'High', color: 'orange', description: 'Tour group time' };
      return { level: 'Low', color: 'green', description: 'Calm visits' };
      
    default:
      return { level: 'Unknown', color: 'gray', description: 'Data unavailable' };
  }
}

function getTrafficCondition(hour: number, area: string): { condition: string; color: string; delay: string } {
  const rushHours = (hour >= 8 && hour < 11) || (hour >= 17 && hour < 20);
  
  switch (area) {
    case 'center':
      if (rushHours) return { condition: 'Heavy', color: 'red', delay: '+15-25 min' };
      return { condition: 'Moderate', color: 'yellow', delay: '+5-10 min' };
      
    case 'ghats':
      if (hour >= 17 && hour < 20) return { condition: 'Very Heavy', color: 'darkred', delay: '+20-35 min' };
      if (rushHours) return { condition: 'Heavy', color: 'red', delay: '+10-20 min' };
      return { condition: 'Light', color: 'green', delay: 'Normal' };
      
    case 'cantonment':
      if (rushHours) return { condition: 'Moderate', color: 'yellow', delay: '+5-15 min' };
      return { condition: 'Light', color: 'green', delay: 'Normal' };
      
    case 'airport':
      return { condition: 'Light', color: 'green', delay: 'Normal' };
      
    default:
      return { condition: 'Unknown', color: 'gray', delay: 'Check locally' };
  }
} 