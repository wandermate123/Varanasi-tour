import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const PLACES_API_BASE = 'https://maps.googleapis.com/maps/api/place';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const action = url.searchParams.get('action');
    const query = url.searchParams.get('query');
    const location = url.searchParams.get('location');
    const radius = url.searchParams.get('radius') || '5000';
    const type = url.searchParams.get('type');
    const placeId = url.searchParams.get('place_id');

    if (!GOOGLE_PLACES_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'Google Maps API key not configured'
      }, { status: 500 });
    }

    switch (action) {
      case 'search': {
        if (!query) {
          return NextResponse.json({
            success: false,
            error: 'Search query required'
          }, { status: 400 });
        }

        const searchResponse = await axios.get(`${PLACES_API_BASE}/textsearch/json`, {
          params: {
            query,
            location,
            radius,
            type,
            key: GOOGLE_PLACES_API_KEY
          }
        });

        const places = searchResponse.data.results.map((place: any) => ({
          placeId: place.place_id,
          name: place.name,
          address: place.formatted_address,
          location: place.geometry.location,
          rating: place.rating || 0,
          priceLevel: place.price_level,
          types: place.types,
          photos: place.photos?.map((photo: any) => ({
            reference: photo.photo_reference,
            url: `${PLACES_API_BASE}/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
          })) || [],
          openNow: place.opening_hours?.open_now,
          businessStatus: place.business_status
        }));

        return NextResponse.json({
          success: true,
          data: {
            places,
            nextPageToken: searchResponse.data.next_page_token
          }
        });
      }

      case 'details': {
        if (!placeId) {
          return NextResponse.json({
            success: false,
            error: 'Place ID required'
          }, { status: 400 });
        }

        const detailsResponse = await axios.get(`${PLACES_API_BASE}/details/json`, {
          params: {
            place_id: placeId,
            fields: 'name,formatted_address,geometry,rating,price_level,opening_hours,photos,reviews,formatted_phone_number,website,types,vicinity',
            key: GOOGLE_PLACES_API_KEY
          }
        });

        const place = detailsResponse.data.result;
        const placeDetails = {
          placeId: place.place_id,
          name: place.name,
          address: place.formatted_address,
          vicinity: place.vicinity,
          location: place.geometry.location,
          rating: place.rating || 0,
          priceLevel: place.price_level,
          phone: place.formatted_phone_number,
          website: place.website,
          types: place.types,
          photos: place.photos?.slice(0, 10).map((photo: any) => ({
            reference: photo.photo_reference,
            url: `${PLACES_API_BASE}/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
          })) || [],
          openingHours: place.opening_hours ? {
            openNow: place.opening_hours.open_now,
            weekdayText: place.opening_hours.weekday_text || [],
            periods: place.opening_hours.periods || []
          } : null,
          reviews: place.reviews?.slice(0, 5).map((review: any) => ({
            authorName: review.author_name,
            rating: review.rating,
            text: review.text,
            time: review.time,
            profilePhotoUrl: review.profile_photo_url
          })) || []
        };

        return NextResponse.json({
          success: true,
          data: placeDetails
        });
      }

      case 'nearby': {
        if (!location) {
          return NextResponse.json({
            success: false,
            error: 'Location required (lat,lng format)'
          }, { status: 400 });
        }

        const nearbyResponse = await axios.get(`${PLACES_API_BASE}/nearbysearch/json`, {
          params: {
            location,
            radius,
            type: type || 'tourist_attraction',
            key: GOOGLE_PLACES_API_KEY
          }
        });

        const places = nearbyResponse.data.results.map((place: any) => ({
          placeId: place.place_id,
          name: place.name,
          vicinity: place.vicinity,
          location: place.geometry.location,
          rating: place.rating || 0,
          priceLevel: place.price_level,
          types: place.types,
          photos: place.photos?.slice(0, 3).map((photo: any) => ({
            reference: photo.photo_reference,
            url: `${PLACES_API_BASE}/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
          })) || [],
          openNow: place.opening_hours?.open_now,
          businessStatus: place.business_status
        }));

        return NextResponse.json({
          success: true,
          data: {
            places,
            nextPageToken: nearbyResponse.data.next_page_token
          }
        });
      }

      case 'autocomplete': {
        if (!query) {
          return NextResponse.json({
            success: false,
            error: 'Query required for autocomplete'
          }, { status: 400 });
        }

        const autocompleteResponse = await axios.get(`${PLACES_API_BASE}/autocomplete/json`, {
          params: {
            input: query,
            location,
            radius,
            types: type || 'establishment',
            key: GOOGLE_PLACES_API_KEY
          }
        });

        const predictions = autocompleteResponse.data.predictions.map((prediction: any) => ({
          placeId: prediction.place_id,
          description: prediction.description,
          mainText: prediction.structured_formatting.main_text,
          secondaryText: prediction.structured_formatting.secondary_text,
          types: prediction.types
        }));

        return NextResponse.json({
          success: true,
          data: predictions
        });
      }

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action. Use: search, details, nearby, or autocomplete'
        }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Google Places API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Places API request failed',
      details: error.response?.data || error.message
    }, { status: 500 });
  }
} 