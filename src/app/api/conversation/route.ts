import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({ 
      success: true, 
      message: "Conversation API endpoint created", 
      data: body 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: "Failed to process request" 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: "Conversation API", 
    endpoints: ["start", "message", "context", "history"] 
  });
}
