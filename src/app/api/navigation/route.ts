import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { from, to, mode } = await request.json();

    // Fetch route from Google Maps API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${from.latitude},${from.longitude}&destination=${to.latitude},${to.longitude}&mode=${mode}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch route');
    }

    const data = await response.json();

    // Process and format the navigation data
    const route = {
      distance: data.routes[0].legs[0].distance.text,
      duration: data.routes[0].legs[0].duration.text,
      steps: data.routes[0].legs[0].steps.map((step: any) => ({
        instruction: step.html_instructions,
        distance: step.distance.text,
        duration: step.duration.text,
        maneuver: step.maneuver || null
      })),
      polyline: data.routes[0].overview_polyline.points
    };

    return NextResponse.json(route);
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return NextResponse.json({ error: 'Failed to get navigation' }, { status: 500 });
  }
} 