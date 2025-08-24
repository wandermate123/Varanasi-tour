import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Compile essential offline data
    const offlineData = {
      emergencyContacts: [
        { name: 'Police', number: '100' },
        { name: 'Ambulance', number: '108' },
        { name: 'Tourist Police', number: '1363' },
        { name: 'Fire', number: '101' },
        { name: 'Women Helpline', number: '1090' }
      ],
      basicPhrases: {
        hindi: [
          { phrase: 'Hello', translation: 'Namaste', pronunciation: 'num-us-they' },
          { phrase: 'Thank you', translation: 'Dhanyavaad', pronunciation: 'dhun-yuh-vaad' },
          { phrase: 'Yes', translation: 'Haan', pronunciation: 'haan' },
          { phrase: 'No', translation: 'Nahi', pronunciation: 'nuh-hee' },
          { phrase: 'Please', translation: 'Kripya', pronunciation: 'krip-yaa' },
          { phrase: 'Excuse me', translation: 'Suniye', pronunciation: 'sun-ee-ay' },
          { phrase: 'Where is?', translation: 'Kahan hai?', pronunciation: 'kuh-haan hai' }
        ]
      },
      localInfo: {
        timezone: 'Asia/Kolkata',
        currency: 'INR',
        emergencyProtocols: [
          'Stay calm and assess the situation',
          'Contact local authorities if needed',
          'Keep emergency numbers handy',
          'Know your location',
          'Have identification ready'
        ],
        culturalGuidelines: [
          'Remove shoes before entering temples',
          'Dress modestly',
          'Use right hand for eating',
          'Ask permission before taking photos',
          'Respect religious customs'
        ]
      },
      essentialLocations: [
        {
          name: 'Varanasi Police Station',
          address: 'Dashaswamedh Road, Varanasi',
          coordinates: { lat: 25.3176, lng: 83.0107 }
        },
        {
          name: 'District Hospital',
          address: 'Kabir Chaura, Varanasi',
          coordinates: { lat: 25.3197, lng: 83.0064 }
        },
        {
          name: 'Tourist Information Center',
          address: 'Varanasi Cantt Railway Station',
          coordinates: { lat: 25.3284, lng: 82.9739 }
        }
      ],
      offlineMaps: {
        mainAreas: [
          {
            name: 'Dashaswamedh Ghat',
            bounds: {
              north: 25.3176,
              south: 25.3074,
              east: 83.0107,
              west: 83.0064
            }
          },
          {
            name: 'Assi Ghat',
            bounds: {
              north: 25.2854,
              south: 25.2815,
              east: 83.0086,
              west: 83.0043
            }
          }
        ],
        landmarks: [
          {
            name: 'Kashi Vishwanath Temple',
            location: { lat: 25.3109, lng: 83.0107 },
            description: 'One of the most famous Hindu temples dedicated to Lord Shiva'
          },
          {
            name: 'Sankat Mochan Hanuman Temple',
            location: { lat: 25.2866, lng: 82.9988 },
            description: 'Ancient temple dedicated to Lord Hanuman'
          }
        ]
      }
    };

    return NextResponse.json(offlineData);
  } catch (error) {
    console.error('Error fetching offline data:', error);
    return NextResponse.json({ error: 'Failed to fetch offline data' }, { status: 500 });
  }
} 