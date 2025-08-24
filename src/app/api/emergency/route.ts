import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { type, location, details } = await request.json();

    // Simulate emergency response system
    const emergencyResponse = {
      emergencyId: `EMG${Date.now()}`,
      type,
      location,
      details,
      timestamp: new Date().toISOString(),
      status: 'received',
      priority: getPriority(type),
      estimatedResponse: getResponseTime(type),
      dispatchedUnits: getDispatchedUnits(type),
      contacts: getEmergencyContacts(location),
      instructions: getEmergencyInstructions(type),
      tracking: {
        reportedAt: new Date().toISOString(),
        acknowledged: true,
        respondersDispatched: true,
        estimatedArrival: new Date(Date.now() + getResponseTimeMs(type)).toISOString()
      }
    };

    // Log emergency for monitoring
    console.log('Emergency Report:', emergencyResponse);

    return NextResponse.json({
      success: true,
      emergency: emergencyResponse,
      message: 'Emergency reported successfully. Help is on the way.'
    });
    
  } catch (error) {
    console.error('Emergency API Error:', error);
    return NextResponse.json(
      { error: 'Emergency reporting failed' },
      { status: 500 }
    );
  }
}

function getPriority(type: string): 'critical' | 'high' | 'medium' {
  const criticalTypes = ['medical', 'fire', 'accident', 'assault'];
  const highTypes = ['theft', 'harassment', 'lost'];
  
  if (criticalTypes.some(t => type.toLowerCase().includes(t))) return 'critical';
  if (highTypes.some(t => type.toLowerCase().includes(t))) return 'high';
  return 'medium';
}

function getResponseTime(type: string): string {
  switch (getPriority(type)) {
    case 'critical': return '3-5 minutes';
    case 'high': return '8-12 minutes';
    default: return '15-20 minutes';
  }
}

function getResponseTimeMs(type: string): number {
  switch (getPriority(type)) {
    case 'critical': return 4 * 60 * 1000; // 4 minutes
    case 'high': return 10 * 60 * 1000; // 10 minutes
    default: return 18 * 60 * 1000; // 18 minutes
  }
}

function getDispatchedUnits(type: string) {
  const lowerType = type.toLowerCase();
  
  if (lowerType.includes('medical')) {
    return ['Ambulance Unit 108', 'Local Hospital Alert', 'Trauma Team Standby'];
  }
  if (lowerType.includes('fire')) {
    return ['Fire Brigade Unit 101', 'Emergency Response Team', 'Traffic Control'];
  }
  if (lowerType.includes('police') || lowerType.includes('theft') || lowerType.includes('assault')) {
    return ['Police Patrol Unit', 'Quick Response Team', 'Tourist Police'];
  }
  
  return ['Emergency Response Team', 'Tourist Helpline', 'Local Coordinator'];
}

function getEmergencyContacts(location: string) {
  return {
    police: {
      number: '100',
      whatsapp: '+91-9454400100',
      name: 'Police Control Room Varanasi',
      available: '24/7'
    },
    ambulance: {
      number: '108',
      whatsapp: '+91-9454400108',
      name: 'Emergency Medical Services',
      available: '24/7'
    },
    fire: {
      number: '101',
      name: 'Fire Department Varanasi',
      available: '24/7'
    },
    tourist: {
      number: '+91-542-2501204',
      whatsapp: '+91-9450500504',
      name: 'Tourist Helpline Varanasi',
      available: '24/7',
      languages: ['English', 'Hindi', 'Spanish', 'French']
    },
    hospital: {
      number: '+91-542-2307777',
      name: 'Sir Sunderlal Hospital',
      address: 'BHU Campus, Lanka, Varanasi',
      available: '24/7'
    },
    embassy: {
      us: '+91-11-2419-8000',
      uk: '+91-11-2419-2100',
      canada: '+91-11-4178-2000',
      australia: '+91-11-4139-9900'
    }
  };
}

function getEmergencyInstructions(type: string) {
  const lowerType = type.toLowerCase();
  
  if (lowerType.includes('medical')) {
    return [
      'Stay calm and keep the patient comfortable',
      'Do not move the patient unless necessary',
      'If conscious, keep them talking',
      'Note any symptoms and time of onset',
      'Have identification documents ready'
    ];
  }
  
  if (lowerType.includes('fire')) {
    return [
      'Evacuate immediately if safe to do so',
      'Alert others in the vicinity',
      'Do not use elevators',
      'Cover nose and mouth with cloth',
      'Meet at designated safe area'
    ];
  }
  
  if (lowerType.includes('theft') || lowerType.includes('lost')) {
    return [
      'Note exact time and location of incident',
      'List all missing items with details',
      'Inform your embassy if passport stolen',
      'Block all cards and digital payments',
      'File FIR at nearest police station'
    ];
  }
  
  return [
    'Stay in a safe location',
    'Keep your phone charged',
    'Share your location with trusted contacts',
    'Do not provide personal details to strangers',
    'Wait for official assistance'
  ];
} 