import { NextRequest, NextResponse } from 'next/server';
import { boatService } from '@/services/boatService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const guests = searchParams.get('guests');

    const filters: any = {};
    
    if (type && type !== 'all') {
      filters.type = type;
    }
    
    if (minPrice && maxPrice) {
      filters.priceRange = [parseInt(minPrice), parseInt(maxPrice)];
    }
    
    if (guests) {
      filters.guests = parseInt(guests);
    }

    const tours = await boatService.searchTours(filters);
    
    return NextResponse.json({
      success: true,
      data: tours,
      count: tours.length
    });
  } catch (error) {
    console.error('Error fetching boat tours:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch boat tours' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tourId, date, guests, name, email, phone, specialRequests } = body;

    // Validate required fields
    if (!tourId || !date || !guests || !name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const response = await boatService.bookTour({
      tourId,
      date,
      guests,
      name,
      email,
      phone,
      specialRequests
    });

    if (response.success) {
      return NextResponse.json({
        success: true,
        data: response,
        message: 'Booking created successfully'
      });
    } else {
      return NextResponse.json(
        { success: false, message: response.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create booking' },
      { status: 500 }
    );
  }
} 