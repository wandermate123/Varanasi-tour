import { NextResponse } from 'next/server';

// Mock database for users
let users: any[] = [];
let userId = 1000;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userIdParam = searchParams.get('userId');
    const action = searchParams.get('action');
    const email = searchParams.get('email');

    // Get specific user
    if (userIdParam) {
      const user = users.find(u => u.userId === userIdParam);
      if (!user) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
      }
      
      // Remove sensitive data before sending
      const { password, ...safeUser } = user;
      return NextResponse.json({ success: true, data: safeUser });
    }

    // Get user by email
    if (email) {
      const user = users.find(u => u.email === email);
      if (!user) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
      }
      
      const { password, ...safeUser } = user;
      return NextResponse.json({ success: true, data: safeUser });
    }

    // Get user statistics
    if (action === 'stats' && userIdParam) {
      const user = users.find(u => u.userId === userIdParam);
      if (!user) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
      }

      const stats = {
        totalBookings: user.bookingHistory?.length || 0,
        totalSpent: user.bookingHistory?.reduce((sum: number, booking: any) => sum + booking.amount, 0) || 0,
        loyaltyPoints: user.loyaltyProgram?.currentPoints || 0,
        memberSince: user.createdAt,
        favoriteDestination: 'Varanasi',
        completedTrips: user.bookingHistory?.filter((b: any) => b.status === 'completed').length || 0
      };

      return NextResponse.json({ success: true, data: stats });
    }

    return NextResponse.json({ success: true, data: { totalUsers: users.length } });

  } catch (error) {
    console.error('User Management GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch user data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, ...userData } = body;

    switch (action) {
      case 'register':
        return await registerUser(userData);
      case 'login':
        return await loginUser(userData.email, userData.password);
      case 'update':
        return await updateUser(userData.userId, userData);
      case 'add-booking':
        return await addBookingToHistory(userData.userId, userData.booking);
      case 'loyalty-redeem':
        return await redeemLoyaltyPoints(userData.userId, userData.points, userData.rewardId);
      default:
        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('User Management POST error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process user request' }, { status: 500 });
  }
}

async function registerUser(userData: any) {
  // Check if user already exists
  const existingUser = users.find(u => u.email === userData.email);
  if (existingUser) {
    return NextResponse.json({ 
      success: false, 
      error: 'User already exists with this email' 
    }, { status: 400 });
  }

  const newUser = {
    userId: `WM${userId++}`,
    email: userData.email,
    password: userData.password, // In real app, this should be hashed
    profile: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      dateOfBirth: userData.dateOfBirth,
      gender: userData.gender,
      nationality: userData.nationality,
      profilePicture: userData.profilePicture || null,
      address: {
        street: userData.address?.street || '',
        city: userData.address?.city || '',
        state: userData.address?.state || '',
        country: userData.address?.country || '',
        zipCode: userData.address?.zipCode || ''
      }
    },
    preferences: {
      language: userData.preferences?.language || 'en',
      currency: userData.preferences?.currency || 'INR',
      notifications: {
        email: userData.preferences?.notifications?.email ?? true,
        sms: userData.preferences?.notifications?.sms ?? true,
        push: userData.preferences?.notifications?.push ?? true
      },
      travel: {
        budget: userData.preferences?.travel?.budget || 'moderate',
        accommodation: userData.preferences?.travel?.accommodation || 'any',
        transportation: userData.preferences?.travel?.transportation || 'any',
        interests: userData.preferences?.travel?.interests || []
      }
    },
    loyaltyProgram: {
      tier: 'Bronze',
      currentPoints: 100, // Welcome bonus
      totalPointsEarned: 100,
      pointsRedeemed: 0,
      benefits: ['5% cashback on bookings', 'Priority customer support'],
      nextTierPoints: 900 // 1000 points for Silver
    },
    security: {
      twoFactorEnabled: false,
      lastLogin: null,
      loginHistory: [],
      trustedDevices: []
    },
    bookingHistory: [],
    wishlist: [],
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
    isEmailVerified: false,
    isPhoneVerified: false
  };

  users.push(newUser);

  // Remove password before sending response
  const { password, ...safeUser } = newUser;

  return NextResponse.json({
    success: true,
    message: 'User registered successfully!',
    data: {
      user: safeUser,
      authToken: `JWT_TOKEN_${newUser.userId}`, // In real app, generate proper JWT
      instructions: [
        'Welcome to WanderMate!',
        'Please verify your email address',
        'You have received 100 welcome points',
        'Complete your profile to earn more points'
      ]
    }
  });
}

async function loginUser(email: string, password: string) {
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return NextResponse.json({ 
      success: false, 
      error: 'Invalid email or password' 
    }, { status: 401 });
  }

  if (!user.isActive) {
    return NextResponse.json({ 
      success: false, 
      error: 'Account is deactivated' 
    }, { status: 401 });
  }

  // Update login history
  user.security.lastLogin = new Date().toISOString();
  user.security.loginHistory.unshift({
    timestamp: new Date().toISOString(),
    device: 'Web Browser',
    location: 'Varanasi, India' // In real app, detect from IP
  });

  // Keep only last 10 login records
  if (user.security.loginHistory.length > 10) {
    user.security.loginHistory = user.security.loginHistory.slice(0, 10);
  }

  const { password: pwd, ...safeUser } = user;

  return NextResponse.json({
    success: true,
    message: 'Login successful',
    data: {
      user: safeUser,
      authToken: `JWT_TOKEN_${user.userId}`,
      sessionId: `SESSION_${Math.random().toString(36).substr(2, 12)}`
    }
  });
}

async function updateUser(userIdParam: string, updateData: any) {
  const userIndex = users.findIndex(u => u.userId === userIdParam);
  
  if (userIndex === -1) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
  }

  // Update user data
  if (updateData.profile) {
    users[userIndex].profile = { ...users[userIndex].profile, ...updateData.profile };
  }
  
  if (updateData.preferences) {
    users[userIndex].preferences = { ...users[userIndex].preferences, ...updateData.preferences };
  }

  if (updateData.security) {
    users[userIndex].security = { ...users[userIndex].security, ...updateData.security };
  }

  users[userIndex].updatedAt = new Date().toISOString();

  const { password, ...safeUser } = users[userIndex];

  return NextResponse.json({
    success: true,
    message: 'Profile updated successfully',
    data: safeUser
  });
}

async function addBookingToHistory(userIdParam: string, bookingData: any) {
  const userIndex = users.findIndex(u => u.userId === userIdParam);
  
  if (userIndex === -1) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
  }

  const booking = {
    bookingId: bookingData.bookingId,
    type: bookingData.type, // cab, hotel, food, flight, service
    amount: bookingData.amount,
    date: bookingData.date,
    status: bookingData.status,
    details: bookingData.details
  };

  users[userIndex].bookingHistory.unshift(booking);

  // Award loyalty points (1 point per ₹100 spent)
  const pointsEarned = Math.floor(booking.amount / 100);
  users[userIndex].loyaltyProgram.currentPoints += pointsEarned;
  users[userIndex].loyaltyProgram.totalPointsEarned += pointsEarned;

  // Check for tier upgrade
  const currentPoints = users[userIndex].loyaltyProgram.currentPoints;
  if (currentPoints >= 5000 && users[userIndex].loyaltyProgram.tier === 'Gold') {
    users[userIndex].loyaltyProgram.tier = 'Platinum';
    users[userIndex].loyaltyProgram.benefits = [
      '15% cashback on bookings',
      'Priority customer support',
      'Free cancellations',
      'Concierge services',
      'Airport lounge access'
    ];
  } else if (currentPoints >= 2500 && users[userIndex].loyaltyProgram.tier === 'Silver') {
    users[userIndex].loyaltyProgram.tier = 'Gold';
    users[userIndex].loyaltyProgram.benefits = [
      '10% cashback on bookings',
      'Priority customer support',
      'Free cancellations',
      'Room upgrades'
    ];
  } else if (currentPoints >= 1000 && users[userIndex].loyaltyProgram.tier === 'Bronze') {
    users[userIndex].loyaltyProgram.tier = 'Silver';
    users[userIndex].loyaltyProgram.benefits = [
      '7% cashback on bookings',
      'Priority customer support',
      'Free modifications'
    ];
  }

  return NextResponse.json({
    success: true,
    message: 'Booking added to history',
    data: {
      pointsEarned,
      currentPoints: users[userIndex].loyaltyProgram.currentPoints,
      tier: users[userIndex].loyaltyProgram.tier
    }
  });
}

async function redeemLoyaltyPoints(userIdParam: string, pointsToRedeem: number, rewardId: string) {
  const userIndex = users.findIndex(u => u.userId === userIdParam);
  
  if (userIndex === -1) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
  }

  const user = users[userIndex];
  
  if (user.loyaltyProgram.currentPoints < pointsToRedeem) {
    return NextResponse.json({ 
      success: false, 
      error: 'Insufficient loyalty points' 
    }, { status: 400 });
  }

  const rewards = {
    'discount_100': { points: 500, value: 100, type: 'discount', description: '₹100 off on next booking' },
    'discount_250': { points: 1000, value: 250, type: 'discount', description: '₹250 off on next booking' },
    'discount_500': { points: 2000, value: 500, type: 'discount', description: '₹500 off on next booking' },
    'free_guide': { points: 1500, value: 0, type: 'service', description: 'Free 2-hour guide service' },
    'room_upgrade': { points: 800, value: 0, type: 'upgrade', description: 'Free room upgrade at partner hotels' }
  };

  const reward = rewards[rewardId as keyof typeof rewards];
  if (!reward) {
    return NextResponse.json({ success: false, error: 'Invalid reward' }, { status: 400 });
  }

  if (pointsToRedeem !== reward.points) {
    return NextResponse.json({ success: false, error: 'Incorrect points amount' }, { status: 400 });
  }

  users[userIndex].loyaltyProgram.currentPoints -= pointsToRedeem;
  users[userIndex].loyaltyProgram.pointsRedeemed += pointsToRedeem;

  const redemption = {
    redemptionId: `RED${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
    rewardId,
    pointsUsed: pointsToRedeem,
    reward: reward.description,
    value: reward.value,
    redeemedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
    isUsed: false
  };

  if (!users[userIndex].loyaltyProgram.redemptions) {
    users[userIndex].loyaltyProgram.redemptions = [];
  }
  users[userIndex].loyaltyProgram.redemptions.unshift(redemption);

  return NextResponse.json({
    success: true,
    message: 'Loyalty points redeemed successfully',
    data: {
      redemption,
      remainingPoints: users[userIndex].loyaltyProgram.currentPoints
    }
  });
} 