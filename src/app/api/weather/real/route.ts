import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_BASE = 'https://api.openweathermap.org/data/2.5';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');
    const city = url.searchParams.get('city');
    const units = url.searchParams.get('units') || 'metric';
    const lang = url.searchParams.get('lang') || 'en';

    if (!OPENWEATHER_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'OpenWeatherMap API key not configured'
      }, { status: 500 });
    }

    if (!lat && !lon && !city) {
      return NextResponse.json({
        success: false,
        error: 'Either coordinates (lat, lon) or city name required'
      }, { status: 400 });
    }

    // Prepare common parameters
    const commonParams = {
      appid: OPENWEATHER_API_KEY,
      units,
      lang
    };

    // Location parameters
    const locationParams = city
      ? { q: city }
      : { lat: parseFloat(lat!), lon: parseFloat(lon!) };

    // Get current weather
    const currentWeatherResponse = await axios.get(`${OPENWEATHER_BASE}/weather`, {
      params: { ...commonParams, ...locationParams }
    });

    const currentWeather = currentWeatherResponse.data;

    // Get 5-day forecast
    const forecastResponse = await axios.get(`${OPENWEATHER_BASE}/forecast`, {
      params: { ...commonParams, ...locationParams }
    });

    const forecast = forecastResponse.data;

    // Process current weather data
    const weatherData: any = {
      current: {
        location: {
          name: currentWeather.name,
          country: currentWeather.sys.country,
          coordinates: {
            lat: currentWeather.coord.lat,
            lon: currentWeather.coord.lon
          }
        },
        weather: {
          main: currentWeather.weather[0].main,
          description: currentWeather.weather[0].description,
          icon: currentWeather.weather[0].icon,
          iconUrl: `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`
        },
        temperature: {
          current: Math.round(currentWeather.main.temp),
          feelsLike: Math.round(currentWeather.main.feels_like),
          min: Math.round(currentWeather.main.temp_min),
          max: Math.round(currentWeather.main.temp_max)
        },
        humidity: currentWeather.main.humidity,
        pressure: currentWeather.main.pressure,
        visibility: currentWeather.visibility ? Math.round(currentWeather.visibility / 1000) : null,
        wind: {
          speed: currentWeather.wind.speed,
          direction: currentWeather.wind.deg,
          gust: currentWeather.wind.gust || null
        },
        clouds: currentWeather.clouds.all,
        sunrise: new Date(currentWeather.sys.sunrise * 1000).toISOString(),
        sunset: new Date(currentWeather.sys.sunset * 1000).toISOString(),
        timestamp: new Date(currentWeather.dt * 1000).toISOString()
      },
      forecast: {
        daily: [],
        hourly: forecast.list.slice(0, 24).map((item: any) => ({
          time: new Date(item.dt * 1000).toISOString(),
          temperature: Math.round(item.main.temp),
          feelsLike: Math.round(item.main.feels_like),
          weather: {
            main: item.weather[0].main,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
          },
          humidity: item.main.humidity,
          wind: {
            speed: item.wind.speed,
            direction: item.wind.deg
          },
          clouds: item.clouds.all,
          precipitation: item.rain?.['3h'] || item.snow?.['3h'] || 0
        }))
      },
      alerts: [],
      travelAdvice: generateTravelAdvice(currentWeather, forecast.list[0])
    };

    // Process daily forecast (group by day)
    const dailyForecast: Record<string, any> = {};
    forecast.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyForecast[date]) {
        dailyForecast[date] = {
          date: new Date(item.dt * 1000).toISOString(),
          temperatures: [],
          weather: item.weather[0],
          humidity: item.main.humidity,
          wind: item.wind,
          precipitation: item.rain?.['3h'] || item.snow?.['3h'] || 0
        };
      }
      dailyForecast[date].temperatures.push(item.main.temp);
    });

    weatherData.forecast.daily = Object.values(dailyForecast).slice(0, 5).map((day: any) => ({
      date: day.date,
      temperature: {
        min: Math.round(Math.min(...day.temperatures)),
        max: Math.round(Math.max(...day.temperatures))
      },
      weather: {
        main: day.weather.main,
        description: day.weather.description,
        icon: day.weather.icon,
        iconUrl: `https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`
      },
      humidity: day.humidity,
      wind: day.wind,
      precipitation: day.precipitation
    }));

    return NextResponse.json({
      success: true,
      data: weatherData
    });

  } catch (error: any) {
    console.error('OpenWeatherMap API error:', error);
    
    if (error.response?.status === 404) {
      return NextResponse.json({
        success: false,
        error: 'Location not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: false,
      error: 'Weather data retrieval failed',
      details: error.response?.data?.message || error.message
    }, { status: 500 });
  }
}

function generateTravelAdvice(current: any, forecast: any) {
  const advice = [];
  const temp = current.main.temp;
  const weather = current.weather[0].main.toLowerCase();
  const windSpeed = current.wind.speed;
  const humidity = current.main.humidity;

  // Temperature advice
  if (temp < 10) {
    advice.push({
      type: 'clothing',
      message: 'Pack warm clothes - heavy jacket, scarf, and gloves recommended',
      icon: '🧥'
    });
  } else if (temp > 35) {
    advice.push({
      type: 'clothing',
      message: 'Very hot weather - wear light, breathable clothing and stay hydrated',
      icon: '☀️'
    });
  } else if (temp > 25) {
    advice.push({
      type: 'clothing',
      message: 'Warm weather - light clothing and sunscreen recommended',
      icon: '👕'
    });
  }

  // Weather condition advice
  if (weather.includes('rain')) {
    advice.push({
      type: 'weather',
      message: 'Rain expected - carry umbrella and waterproof items',
      icon: '☔'
    });
  } else if (weather.includes('snow')) {
    advice.push({
      type: 'weather',
      message: 'Snow conditions - wear warm boots and be careful of slippery surfaces',
      icon: '❄️'
    });
  } else if (weather.includes('clear')) {
    advice.push({
      type: 'weather',
      message: 'Perfect weather for outdoor activities and sightseeing',
      icon: '☀️'
    });
  }

  // Wind advice
  if (windSpeed > 10) {
    advice.push({
      type: 'wind',
      message: 'Strong winds expected - secure loose items and be cautious outdoors',
      icon: '💨'
    });
  }

  // Humidity advice
  if (humidity > 80) {
    advice.push({
      type: 'comfort',
      message: 'High humidity - expect muggy conditions, stay cool and hydrated',
      icon: '💧'
    });
  }

  return advice;
} 