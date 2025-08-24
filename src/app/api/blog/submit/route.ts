import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for blog submission
const blogSubmissionSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(200, 'Title must be less than 200 characters'),
  excerpt: z.string().min(50, 'Excerpt must be at least 50 characters').max(500, 'Excerpt must be less than 500 characters'),
  content: z.string().min(500, 'Content must be at least 500 characters'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required').max(5, 'Maximum 5 tags allowed'),
  authorName: z.string().min(2, 'Author name must be at least 2 characters'),
  authorEmail: z.string().email('Valid email is required'),
  authorBio: z.string().optional(),
  imageUrl: z.string().url('Valid image URL is required').optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = blogSubmissionSchema.parse(body);
    
    // In a real application, you would:
    // 1. Save the submission to your database
    // 2. Send email notifications to the admin team
    // 3. Send confirmation email to the author
    // 4. Store the image file (if uploaded)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a unique submission ID
    const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Log the submission (in production, save to database)
    console.log('Blog submission received:', {
      id: submissionId,
      ...validatedData,
      submittedAt: new Date().toISOString(),
      status: 'pending_review'
    });
    
    // Send email notification to admin team (simulated)
    await sendAdminNotification(validatedData, submissionId);
    
    // Send confirmation email to author (simulated)
    await sendAuthorConfirmation(validatedData, submissionId);
    
    return NextResponse.json({
      success: true,
      message: 'Blog submission received successfully',
      submissionId,
      estimatedReviewTime: '2-3 business days'
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }, { status: 400 });
    }
    
    console.error('Blog submission error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}

// Simulated email functions - replace with actual email service
async function sendAdminNotification(data: any, submissionId: string) {
  // In production, use a service like SendGrid, Resend, or AWS SES
  console.log('Sending admin notification:', {
    to: 'admin@wandermate.com',
    subject: `New Blog Submission: ${data.title}`,
    submissionId,
    author: data.authorName,
    category: data.category
  });
}

async function sendAuthorConfirmation(data: any, submissionId: string) {
  // In production, use a service like SendGrid, Resend, or AWS SES
  console.log('Sending author confirmation:', {
    to: data.authorEmail,
    subject: 'Your blog submission has been received',
    submissionId,
    authorName: data.authorName
  });
}

// GET endpoint to check submission status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const submissionId = searchParams.get('id');
  
  if (!submissionId) {
    return NextResponse.json({
      success: false,
      message: 'Submission ID is required'
    }, { status: 400 });
  }
  
  // In production, fetch from database
  // For now, return a mock response
  const mockStatuses = ['pending_review', 'approved', 'rejected'];
  const randomStatus = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];
  
  return NextResponse.json({
    success: true,
    submissionId,
    status: randomStatus,
    submittedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    reviewedAt: randomStatus !== 'pending_review' ? new Date().toISOString() : null,
    feedback: randomStatus === 'rejected' ? 'Content needs improvement. Please revise and resubmit.' : null
  });
} 