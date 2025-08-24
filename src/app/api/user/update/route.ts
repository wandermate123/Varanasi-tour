import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { z } from 'zod';
import { auth } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const updateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
});

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to update your profile' },
        { status: 401 }
      );
    }

    // Check if Firebase services are configured
    if (!auth || !db) {
      return NextResponse.json(
        { 
          error: 'User profile service is not configured. Please contact support.',
          details: 'Firebase services are not properly configured.'
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const validatedData = updateSchema.parse(body);

    // Get user document reference
    const userRef = doc(db, 'users', session.user.id);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user data in Firestore
    await updateDoc(userRef, {
      ...validatedData,
      updatedAt: new Date().toISOString()
    });

    // If email is being updated, update it in Firebase Auth
    if (validatedData.email) {
      await auth.updateUser(session.user.id, {
        email: validatedData.email
      });
    }

    // If name is being updated, update it in Firebase Auth
    if (validatedData.name) {
      await auth.updateUser(session.user.id, {
        displayName: validatedData.name
      });
    }

    const updatedUserDoc = await getDoc(userRef);
    const userData = updatedUserDoc.data();

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: session.user.id,
        name: userData?.name || null,
        email: userData?.email,
        membershipType: userData?.membershipType,
        image: userData?.image || null
      }
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
} 