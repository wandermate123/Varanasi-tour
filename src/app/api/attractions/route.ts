import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');

    const allAttractions = [
      {
        id: 'kashi-vishwanath',
        name: 'Kashi Vishwanath Temple',
        category: 'religious',
        rating: 4.5,
        reviews: 15420,
        vicinity: 'Vishwanath Gali, Varanasi',
        coordinates: { lat: 25.3109, lng: 83.0108 },
        status: 'Open',
        timings: {
          opening: '04:00',
          closing: '23:00',
          breaks: ['12:00-13:00', '19:00-19:30'],
          specialHours: 'Monday closed 12:00-15:00 for cleaning'
        },
        entryFee: {
          indian: 'Free',
          foreign: 'Free',
          specialDarshan: '₹300',
          vipDarshan: '₹500'
        },
        description: 'Most sacred Shiva temple, one of the 12 Jyotirlingas. Golden spire rebuilt multiple times through history.',
        highlights: [
          'Golden spire and dome',
          'Sacred Shiva Lingam',
          'Ancient religious significance',
          'Architecture through ages'
        ],
        tips: [
          'Visit early morning (5-7 AM) to avoid crowds',
          'Photography not allowed inside temple',
          'Dress modestly - cover shoulders and legs',
          'Remove leather items before entering',
          'Security check required - minimal items allowed'
        ],
        facilities: ['Security', 'Shoe keeping', 'Drinking water', 'Rest area'],
        accessibility: 'Limited wheelchair access due to stairs',
        nearbyAttractions: ['Annapurna Temple', 'Kaal Bhairav Temple', 'Dashashwamedh Ghat'],
        estimatedTime: '1-3 hours (depending on crowd)',
        bestTimeToVisit: 'Early morning or late evening',
        crowdLevel: 'Very High',
        images: ['/images/attractions/kashi-vishwanath-1.jpg', '/images/attractions/kashi-vishwanath-2.jpg']
      },
      {
        id: 'dashashwamedh-ghat',
        name: 'Dashashwamedh Ghat',
        category: 'cultural',
        rating: 4.7,
        reviews: 12890,
        vicinity: 'Dashashwamedh Road, Varanasi',
        coordinates: { lat: 25.3068, lng: 83.0107 },
        status: 'Open 24/7',
        timings: {
          opening: '24 hours',
          closing: '24 hours',
          gangeAarti: '18:30-19:15 (varies by season)',
          morningAarti: '06:30-07:00'
        },
        entryFee: {
          indian: 'Free',
          foreign: 'Free',
          aartiSeating: 'From ₹51',
          privateBoat: '₹300-500'
        },
        description: 'Main and most spectacular ghat famous for the grand Ganga Aarti ceremony every evening.',
        highlights: [
          'Grand Ganga Aarti ceremony',
          'Ancient stone steps leading to Ganges',
          'Continuous religious activities',
          'Boat rides and river views',
          'Street food and souvenir shops'
        ],
        tips: [
          'Arrive 30 minutes early for Ganga Aarti',
          'Best viewed from boats for complete experience',
          'Photography allowed but avoid flash during prayers',
          'Be cautious of pickpockets in crowds',
          'Try local street food from nearby stalls'
        ],
        facilities: ['Boat services', 'Food stalls', 'Souvenir shops', 'Police post', 'Toilets'],
        accessibility: 'Stairs to river - limited mobility access',
        nearbyAttractions: ['Kashi Vishwanath Temple', 'Man Mandir Palace', 'Godowlia Market'],
        estimatedTime: '2-3 hours for full experience',
        bestTimeToVisit: 'Evening for Aarti, early morning for peaceful boat rides',
        crowdLevel: 'Very High during Aarti, Moderate otherwise',
        events: [
          {
            name: 'Ganga Aarti',
            time: '18:30 daily',
            duration: '45 minutes',
            description: 'Spectacular evening prayer ceremony'
          }
        ],
        images: ['/images/attractions/dashashwamedh-1.jpg', '/images/attractions/dashashwamedh-2.jpg']
      },
      {
        id: 'sarnath',
        name: 'Sarnath',
        category: 'historical',
        rating: 4.4,
        reviews: 8765,
        vicinity: '10 km from Varanasi city center',
        coordinates: { lat: 25.3820, lng: 83.0280 },
        status: 'Open',
        timings: {
          opening: '06:00',
          closing: '18:00',
          museumHours: '09:00-17:00',
          closed: 'Friday (museum)'
        },
        entryFee: {
          indian: '₹15',
          foreign: '₹200',
          students: '₹10',
          museum: '₹5 additional'
        },
        description: 'Sacred Buddhist site where Buddha delivered his first sermon after attaining enlightenment.',
        highlights: [
          'Dhamek Stupa (ancient Buddhist monument)',
          'Archaeological Museum with Lion Capital',
          'Mulagandha Kuti Vihar temple',
          'Deer Park where Buddha preached',
          'Ashoka Pillar remains'
        ],
        tips: [
          'Visit museum first for historical context',
          'Early morning visits are peaceful',
          'Combine with nearby temples',
          'Audio guides available at museum',
          'Respect Buddhist customs and maintain silence'
        ],
        facilities: ['Museum', 'Audio guides', 'Bookshop', 'Cafeteria', 'Parking', 'Toilets'],
        accessibility: 'Wheelchair accessible pathways',
        nearbyAttractions: ['Thai Temple', 'Japanese Temple', 'Tibetan Temple'],
        estimatedTime: '3-4 hours including museum',
        bestTimeToVisit: 'Morning for peaceful atmosphere',
        crowdLevel: 'Moderate',
        transport: 'Auto-rickshaw ₹200-300, local bus ₹20, taxi ₹400-500',
        images: ['/images/attractions/sarnath-1.jpg', '/images/attractions/sarnath-2.jpg']
      },
      {
        id: 'assi-ghat',
        name: 'Assi Ghat',
        category: 'cultural',
        rating: 4.3,
        reviews: 6543,
        vicinity: 'Assi Road, Varanasi',
        coordinates: { lat: 25.2866, lng: 83.0111 },
        status: 'Open 24/7',
        timings: {
          opening: '24 hours',
          yogaSessions: '06:00-08:00',
          eveningAarti: '18:00-19:00'
        },
        entryFee: {
          indian: 'Free',
          foreign: 'Free',
          yogaClasses: '₹200-500',
          boatRides: '₹300-500'
        },
        description: 'Popular ghat for yoga, meditation, and peaceful boat rides. Less crowded than main ghats.',
        highlights: [
          'Morning yoga and meditation sessions',
          'Peaceful atmosphere',
          'Great for sunrise viewing',
          'Backpacker-friendly cafes nearby',
          'Cultural programs and music'
        ],
        tips: [
          'Best for sunrise photography',
          'Join morning yoga sessions',
          'Explore nearby cafes and restaurants',
          'Less crowded alternative to main ghats',
          'Evening music performances sometimes held'
        ],
        facilities: ['Yoga spaces', 'Cafes', 'Boat services', 'Cultural center'],
        accessibility: 'Easier access than other ghats',
        nearbyAttractions: ['BHU Campus', 'New Vishwanath Temple', 'Tulsi Manas Temple'],
        estimatedTime: '2-3 hours',
        bestTimeToVisit: 'Early morning for yoga and sunrise',
        crowdLevel: 'Low to Moderate',
        images: ['/images/attractions/assi-ghat-1.jpg', '/images/attractions/assi-ghat-2.jpg']
      },
      {
        id: 'ramnagar-fort',
        name: 'Ramnagar Fort',
        category: 'historical',
        rating: 4.0,
        reviews: 3421,
        vicinity: '14 km from Varanasi, across Ganges',
        coordinates: { lat: 25.2924, lng: 83.0617 },
        status: 'Open',
        timings: {
          opening: '09:00',
          closing: '17:00',
          closed: 'Monday'
        },
        entryFee: {
          indian: '₹20',
          foreign: '₹50',
          camera: '₹25',
          guide: '₹100-200'
        },
        description: '18th-century fort palace with vintage car collection and royal artifacts.',
        highlights: [
          'Vintage car collection',
          'Royal artifacts and weapons',
          'Traditional architecture',
          'Ganges river views',
          'Durga Puja museum'
        ],
        tips: [
          'Take ferry ride across Ganges to reach',
          'Best visited in evening for sunset views',
          'Photography allowed with extra fee',
          'Guided tours provide better insights',
          'Combine with boat ride for full experience'
        ],
        facilities: ['Museum', 'Parking', 'Guide services', 'Souvenir shop'],
        accessibility: 'Limited accessibility due to old structure',
        nearbyAttractions: ['Boat jetty', 'Local markets'],
        estimatedTime: '2-3 hours including travel',
        bestTimeToVisit: 'Evening for sunset views',
        crowdLevel: 'Low',
        transport: 'Ferry ₹10-20, then auto-rickshaw ₹50-100',
        images: ['/images/attractions/ramnagar-fort-1.jpg', '/images/attractions/ramnagar-fort-2.jpg']
      },
      {
        id: 'bhu-campus',
        name: 'Banaras Hindu University',
        category: 'educational',
        rating: 4.2,
        reviews: 5672,
        vicinity: 'Lanka, Varanasi',
        coordinates: { lat: 25.2677, lng: 82.9913 },
        status: 'Open to visitors',
        timings: {
          opening: '06:00',
          closing: '20:00',
          newVishwanathTemple: '05:00-22:00'
        },
        entryFee: {
          indian: 'Free',
          foreign: 'Free',
          vehicleEntry: '₹20'
        },
        description: 'One of India\'s largest universities with beautiful campus and New Vishwanath Temple.',
        highlights: [
          'New Vishwanath Temple (replica of original)',
          'Bharat Kala Bhavan museum',
          'Beautiful campus architecture',
          'Cultural and educational heritage',
          'Student life experience'
        ],
        tips: [
          'Visit New Vishwanath Temple early morning',
          'Explore Bharat Kala Bhavan museum',
          'Cycle or walk through campus',
          'Respect university rules and timings',
          'Good alternative when main temple is crowded'
        ],
        facilities: ['Museum', 'Temple', 'Cafeteria', 'Library', 'Sports facilities'],
        accessibility: 'Good wheelchair accessibility',
        nearbyAttractions: ['Assi Ghat', 'Tulsi Manas Temple', 'Sankat Mochan Temple'],
        estimatedTime: '3-4 hours for complete visit',
        bestTimeToVisit: 'Morning hours for peaceful visit',
        crowdLevel: 'Moderate',
        images: ['/images/attractions/bhu-campus-1.jpg', '/images/attractions/bhu-campus-2.jpg']
      }
    ];

    // Filter by category if specified
    let filteredAttractions = allAttractions;
    if (category && category !== 'all') {
      filteredAttractions = allAttractions.filter(attraction => 
        attraction.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply limit
    const attractions = filteredAttractions.slice(0, limit);

    // Add current status based on time
    const currentHour = new Date().getHours();
    const enhancedAttractions = attractions.map(attraction => {
      let currentStatus = 'Open';
      let statusColor = 'green';
      let nextEvent = null;

      // Determine current status
      if (attraction.timings.opening === '24 hours') {
        currentStatus = 'Open 24/7';
      } else if (attraction.timings.opening && attraction.timings.closing) {
        const openTime = parseInt(attraction.timings.opening.split(':')[0]);
        const closeTime = parseInt(attraction.timings.closing.split(':')[0]);
        
        if (currentHour < openTime || currentHour >= closeTime) {
          currentStatus = 'Closed';
          statusColor = 'red';
        } else {
          currentStatus = 'Open';
          statusColor = 'green';
        }
      } else {
        currentStatus = 'Check timings';
        statusColor = 'yellow';
      }

      // Add next event for ghats
      if (attraction.id === 'dashashwamedh-ghat') {
        if (currentHour < 18) {
          nextEvent = {
            name: 'Ganga Aarti',
            time: '18:30',
            description: 'Grand evening ceremony starting soon!'
          };
        }
      }

      return {
        ...attraction,
        currentStatus,
        statusColor,
        nextEvent,
        distance: '2.5 km', // Mock distance from city center
        estimatedCost: calculateEstimatedCost(attraction)
      };
    });

    // Categories for filtering
    const categories = [
      { id: 'all', name: 'All Attractions', count: allAttractions.length },
      { id: 'religious', name: 'Religious Sites', count: allAttractions.filter(a => a.category === 'religious').length },
      { id: 'cultural', name: 'Cultural Sites', count: allAttractions.filter(a => a.category === 'cultural').length },
      { id: 'historical', name: 'Historical Sites', count: allAttractions.filter(a => a.category === 'historical').length },
      { id: 'educational', name: 'Educational', count: allAttractions.filter(a => a.category === 'educational').length }
    ];

    return NextResponse.json({
      success: true,
      data: {
        attractions: enhancedAttractions,
        categories,
        total: filteredAttractions.length,
        showing: enhancedAttractions.length
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Attractions API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch attractions data'
      }, 
      { status: 500 }
    );
  }
}

// Helper function to calculate estimated costs
function calculateEstimatedCost(attraction: any) {
  let cost = 0;
  
  // Entry fee
  if (attraction.entryFee.indian && attraction.entryFee.indian !== 'Free') {
    cost += parseInt(attraction.entryFee.indian.replace('₹', ''));
  }
  
  // Transport (estimated)
  cost += 100; // Average transport cost
  
  // Food/refreshments
  cost += 150; // Average snack/meal cost
  
  return {
    minimum: cost,
    maximum: cost + 200,
    currency: 'INR',
    breakdown: {
      entry: attraction.entryFee.indian,
      transport: '₹50-150',
      refreshments: '₹100-200'
    }
  };
} 