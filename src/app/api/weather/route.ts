import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'Varanasi';

    // Enhanced weather data with 5-day forecast
    const weatherData = {
      current: {
        city,
        temperature: '28°C',
        condition: 'Partly cloudy',
        humidity: '65%',
        windSpeed: '12 km/h',
        visibility: '8 km',
        uvIndex: 6,
        pressure: '1013 hPa',
        feelsLike: '31°C',
        description: 'Perfect weather for exploring ghats and temples',
        icon: 'partly-cloudy',
        lastUpdated: new Date().toISOString()
      },
      forecast: [
        {
          date: new Date().toISOString().split('T')[0],
          day: 'Today',
          high: '32°C',
          low: '24°C',
          condition: 'Partly cloudy',
          icon: 'partly-cloudy',
          precipitation: '10%',
          activities: ['Temple visits', 'Boat rides', 'Walking tours']
        },
        {
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          day: 'Tomorrow',
          high: '30°C',
          low: '22°C',
          condition: 'Sunny',
          icon: 'sunny',
          precipitation: '5%',
          activities: ['Early morning Ganga Aarti', 'Photography', 'Sightseeing']
        },
        {
          date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          day: 'Day 3',
          high: '29°C',
          low: '21°C',
          condition: 'Clear',
          icon: 'clear',
          precipitation: '0%',
          activities: ['Full day temple tour', 'Heritage walks', 'Shopping']
        },
        {
          date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
          day: 'Day 4',
          high: '31°C',
          low: '23°C',
          condition: 'Partly cloudy',
          icon: 'partly-cloudy',
          precipitation: '15%',
          activities: ['Indoor museums', 'Covered markets', 'Cafe visits']
        },
        {
          date: new Date(Date.now() + 345600000).toISOString().split('T')[0],
          day: 'Day 5',
          high: '33°C',
          low: '25°C',
          condition: 'Hot',
          icon: 'hot',
          precipitation: '5%',
          activities: ['Early morning activities', 'Indoor attractions', 'Evening boat rides']
        }
      ],
      recommendations: {
        clothing: ['Light cotton clothes', 'Comfortable walking shoes', 'Sun hat', 'Sunglasses'],
        bestTimes: {
          sightseeing: '6:00 AM - 10:00 AM, 4:00 PM - 7:00 PM',
          photography: '6:30 AM - 8:00 AM (golden hour), 6:00 PM - 7:30 PM',
          boatRides: '5:30 AM - 8:00 AM, 5:30 PM - 7:00 PM',
          templePrayers: '5:00 AM - 8:00 AM, 6:00 PM - 8:00 PM'
        },
        healthTips: [
          'Stay hydrated - drink bottled water regularly',
          'Use sunscreen SPF 30+ during outdoor activities',
          'Take breaks in shade during peak hours (11 AM - 3 PM)',
          'Carry a small towel and hand sanitizer'
        ]
      },
      alerts: [] as any[]
    };

    // Add weather alerts based on conditions
    if (parseInt(weatherData.current.temperature) > 35) {
      weatherData.alerts.push({
        type: 'heat',
        severity: 'moderate',
        message: 'High temperature expected. Plan indoor activities during midday.',
        recommendations: ['Visit air-conditioned museums', 'Take frequent water breaks', 'Avoid outdoor activities 11 AM - 3 PM']
      });
    }

    return NextResponse.json({
      success: true,
      data: weatherData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch weather data',
        fallback: {
          temperature: '28°C',
          condition: 'Pleasant',
          advice: 'Good weather for outdoor activities'
        }
      }, 
      { status: 500 }
    );
  }
} 