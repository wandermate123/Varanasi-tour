import { NextResponse } from 'next/server';

// Mock database for food orders
let foodOrders: any[] = [];
let foodOrderId = 3000;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const userId = searchParams.get('userId');
    const action = searchParams.get('action');
    const location = searchParams.get('location') || 'Varanasi';
    const cuisine = searchParams.get('cuisine');
    const category = searchParams.get('category');

    // Get specific order
    if (orderId) {
      const order = foodOrders.find(o => o.orderId === orderId);
      if (!order) {
        return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
      }
      
      // Simulate real-time order tracking
      if (order.status === 'confirmed' || order.status === 'preparing') {
        order.preparationTime = Math.max(0, order.preparationTime - 2);
        if (order.preparationTime <= 0 && order.status === 'preparing') {
          order.status = 'out_for_delivery';
          order.deliveryTime = 20;
        }
      }
      if (order.status === 'out_for_delivery') {
        order.deliveryTime = Math.max(0, order.deliveryTime - 1);
        order.deliveryLocation = {
          lat: 25.3176 + (Math.random() - 0.5) * 0.01,
          lng: 83.0107 + (Math.random() - 0.5) * 0.01,
          lastUpdated: new Date().toISOString()
        };
      }
      
      return NextResponse.json({ success: true, data: order });
    }

    // Get user orders
    if (userId) {
      const userOrders = foodOrders.filter(o => o.userId === userId);
      return NextResponse.json({ success: true, data: userOrders });
    }

    // Get restaurants and menu
    if (action === 'restaurants') {
      const restaurants = [
        {
          id: 'rest_001',
          name: 'Kachori Gali Famous',
          specialty: 'Street Food',
          cuisine: ['North Indian', 'Street Food'],
          rating: 4.5,
          reviewCount: 2847,
          deliveryTime: '20-30 mins',
          deliveryFee: 30,
          minimumOrder: 150,
          location: {
            address: 'Godowlia Market, Varanasi',
            coordinates: { lat: 25.3176, lng: 83.0107 }
          },
          image: '/images/restaurants/kachori-gali.jpg',
          isOpen: true,
          offers: ['20% off on orders above ₹300', 'Free delivery on orders above ₹500'],
          menu: [
            {
              id: 'item_001',
              name: 'Banarasi Kachori',
              description: 'Traditional spicy kachori with aloo sabzi',
              price: 80,
              image: '/images/food/kachori.jpg',
              category: 'Snacks',
              isVeg: true,
              spiceLevel: 'Medium',
              preparationTime: 15
            },
            {
              id: 'item_002',
              name: 'Aloo Tikki Chaat',
              description: 'Crispy potato patties with chutneys',
              price: 120,
              image: '/images/food/aloo-tikki.jpg',
              category: 'Chaat',
              isVeg: true,
              spiceLevel: 'Mild',
              preparationTime: 10
            },
            {
              id: 'item_003',
              name: 'Tamatar Chaat',
              description: 'Tangy tomato chaat with spices',
              price: 100,
              image: '/images/food/tamatar-chaat.jpg',
              category: 'Chaat',
              isVeg: true,
              spiceLevel: 'Medium',
              preparationTime: 8
            }
          ]
        },
        {
          id: 'rest_002',
          name: 'Blue Lassi Shop',
          specialty: 'Beverages & Sweets',
          cuisine: ['Indian', 'Beverages'],
          rating: 4.7,
          reviewCount: 1632,
          deliveryTime: '15-25 mins',
          deliveryFee: 25,
          minimumOrder: 100,
          location: {
            address: 'Vishwanath Gali, Varanasi',
            coordinates: { lat: 25.3185, lng: 83.0115 }
          },
          image: '/images/restaurants/blue-lassi.jpg',
          isOpen: true,
          offers: ['Buy 2 Get 1 Free on Lassi', '15% off on sweets'],
          menu: [
            {
              id: 'item_004',
              name: 'Banarasi Lassi',
              description: 'Thick creamy lassi with malai',
              price: 80,
              image: '/images/food/lassi.jpg',
              category: 'Beverages',
              isVeg: true,
              preparationTime: 5
            },
            {
              id: 'item_005',
              name: 'Thandai',
              description: 'Traditional cold drink with nuts',
              price: 120,
              image: '/images/food/thandai.jpg',
              category: 'Beverages',
              isVeg: true,
              preparationTime: 8
            },
            {
              id: 'item_006',
              name: 'Malaiyo',
              description: 'Seasonal milk foam dessert',
              price: 150,
              image: '/images/food/malaiyo.jpg',
              category: 'Desserts',
              isVeg: true,
              preparationTime: 12
            }
          ]
        },
        {
          id: 'rest_003',
          name: 'Kashi Thali House',
          specialty: 'Traditional Thali',
          cuisine: ['North Indian', 'Traditional'],
          rating: 4.3,
          reviewCount: 986,
          deliveryTime: '30-40 mins',
          deliveryFee: 40,
          minimumOrder: 200,
          location: {
            address: 'Lanka, Varanasi',
            coordinates: { lat: 25.2677, lng: 82.9913 }
          },
          image: '/images/restaurants/thali-house.jpg',
          isOpen: true,
          offers: ['Special lunch thali ₹199', 'Free dessert with dinner thali'],
          menu: [
            {
              id: 'item_007',
              name: 'Banarasi Thali',
              description: 'Complete meal with dal, sabzi, roti, rice, pickle',
              price: 250,
              image: '/images/food/thali.jpg',
              category: 'Main Course',
              isVeg: true,
              spiceLevel: 'Medium',
              preparationTime: 25
            },
            {
              id: 'item_008',
              name: 'Dal Bati Churma',
              description: 'Traditional Rajasthani dish',
              price: 180,
              image: '/images/food/dal-bati.jpg',
              category: 'Main Course',
              isVeg: true,
              spiceLevel: 'Mild',
              preparationTime: 30
            }
          ]
        },
        {
          id: 'rest_004',
          name: 'Pizzario',
          specialty: 'Italian & Continental',
          cuisine: ['Italian', 'Continental', 'Pizza'],
          rating: 4.2,
          reviewCount: 1247,
          deliveryTime: '25-35 mins',
          deliveryFee: 50,
          minimumOrder: 300,
          location: {
            address: 'Cantonment, Varanasi',
            coordinates: { lat: 25.2854, lng: 82.8604 }
          },
          image: '/images/restaurants/pizzario.jpg',
          isOpen: true,
          offers: ['Buy 1 Get 1 on medium pizzas', '30% off on combo meals'],
          menu: [
            {
              id: 'item_009',
              name: 'Margherita Pizza',
              description: 'Classic pizza with tomato sauce and mozzarella',
              price: 320,
              image: '/images/food/margherita.jpg',
              category: 'Pizza',
              isVeg: true,
              preparationTime: 20
            },
            {
              id: 'item_010',
              name: 'Chicken Tikka Pizza',
              description: 'Pizza topped with chicken tikka and onions',
              price: 450,
              image: '/images/food/chicken-pizza.jpg',
              category: 'Pizza',
              isVeg: false,
              preparationTime: 25
            }
          ]
        }
      ];

      // Filter by cuisine or category if specified
      let filteredRestaurants = restaurants;
      if (cuisine) {
        filteredRestaurants = restaurants.filter(r => 
          r.cuisine.some(c => c.toLowerCase().includes(cuisine.toLowerCase()))
        );
      }

      return NextResponse.json({
        success: true,
        data: {
          restaurants: filteredRestaurants,
          searchCriteria: { location, cuisine, category },
          totalResults: filteredRestaurants.length,
          timestamp: new Date().toISOString()
        }
      });
    }

    return NextResponse.json({ success: true, data: foodOrders });

  } catch (error) {
    console.error('Food Delivery GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch food data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, ...orderData } = body;

    switch (action) {
      case 'order':
        return await placeOrder(orderData);
      case 'cancel':
        return await cancelOrder(orderData.orderId, orderData.reason);
      case 'track':
        return await trackOrder(orderData.orderId);
      case 'rate':
        return await rateOrder(orderData.orderId, orderData.rating, orderData.feedback);
      default:
        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Food Delivery POST error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process food order' }, { status: 500 });
  }
}

async function placeOrder(orderData: any) {
  const totalItemPrice = orderData.items.reduce((sum: number, item: any) => 
    sum + (item.price * item.quantity), 0
  );
  
  const deliveryFee = orderData.deliveryFee || 40;
  const taxes = totalItemPrice * 0.05; // 5% GST
  const platformFee = 10;
  const discount = orderData.discountAmount || 0;
  
  const order = {
    orderId: `FD${foodOrderId++}`,
    userId: orderData.userId,
    restaurant: {
      id: orderData.restaurantId,
      name: orderData.restaurantName,
      address: orderData.restaurantAddress,
      phone: orderData.restaurantPhone
    },
    items: orderData.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      specialInstructions: item.specialInstructions || '',
      customizations: item.customizations || []
    })),
    delivery: {
      address: orderData.deliveryAddress,
      coordinates: orderData.deliveryCoordinates,
      landmark: orderData.deliveryLandmark,
      phone: orderData.deliveryPhone,
      contactPerson: orderData.contactPerson
    },
    pricing: {
      itemTotal: totalItemPrice,
      deliveryFee,
      taxes,
      platformFee,
      discount,
      total: totalItemPrice + deliveryFee + taxes + platformFee - discount,
      currency: 'INR',
      paymentMethod: orderData.paymentMethod
    },
    status: 'confirmed',
    preparationTime: Math.floor(Math.random() * 20) + 15, // 15-35 minutes
    deliveryTime: Math.floor(Math.random() * 15) + 20, // 20-35 minutes
    orderTime: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + (40 * 60 * 1000)).toISOString(), // 40 mins from now
    specialInstructions: orderData.specialInstructions || '',
    contactlessDelivery: orderData.contactlessDelivery || false,
    otp: Math.floor(Math.random() * 9000) + 1000
  };

  foodOrders.push(order);

  // Simulate order status updates
  setTimeout(() => {
    const orderIndex = foodOrders.findIndex(o => o.orderId === order.orderId);
    if (orderIndex !== -1) {
      foodOrders[orderIndex].status = 'preparing';
    }
  }, 30000); // After 30 seconds

  return NextResponse.json({
    success: true,
    message: 'Order placed successfully!',
    data: {
      order,
      instructions: [
        'Your order has been confirmed',
        `Estimated delivery: ${order.preparationTime + 20} minutes`,
        `Order OTP: ${order.otp}`,
        'Track your order in real-time',
        'Restaurant will start preparing your food'
      ]
    }
  });
}

async function cancelOrder(orderId: string, reason: string) {
  const orderIndex = foodOrders.findIndex(o => o.orderId === orderId);
  
  if (orderIndex === -1) {
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
  }

  const order = foodOrders[orderIndex];
  const currentTime = new Date();
  const orderTime = new Date(order.orderTime);
  const timeDiff = (currentTime.getTime() - orderTime.getTime()) / (1000 * 60); // minutes

  let refundAmount = order.pricing.total;
  let cancellationFee = 0;

  // Apply cancellation policy
  if (order.status === 'preparing' && timeDiff > 10) {
    cancellationFee = 50; // Flat ₹50 if restaurant started preparing
    refundAmount = order.pricing.total - cancellationFee;
  } else if (order.status === 'out_for_delivery') {
    return NextResponse.json({ 
      success: false, 
      error: 'Cannot cancel order as it is out for delivery' 
    }, { status: 400 });
  }

  foodOrders[orderIndex].status = 'cancelled';
  foodOrders[orderIndex].cancellationReason = reason;
  foodOrders[orderIndex].cancellationTime = currentTime.toISOString();
  foodOrders[orderIndex].refundAmount = refundAmount;

  return NextResponse.json({
    success: true,
    message: 'Order cancelled successfully',
    data: {
      orderId,
      cancellationFee,
      refundAmount,
      refundTime: '2-3 business days'
    }
  });
}

async function trackOrder(orderId: string) {
  const order = foodOrders.find(o => o.orderId === orderId);
  
  if (!order) {
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
  }

  const trackingData = {
    status: order.status,
    preparationTime: order.preparationTime || 0,
    deliveryTime: order.deliveryTime || 0,
    deliveryLocation: order.deliveryLocation || null,
    timeline: [
      {
        status: 'confirmed',
        time: order.orderTime,
        message: 'Order confirmed by restaurant'
      },
      {
        status: 'preparing',
        time: order.status === 'preparing' || order.status === 'out_for_delivery' || order.status === 'delivered' 
          ? new Date(Date.now() - 10 * 60 * 1000).toISOString() 
          : null,
        message: 'Restaurant is preparing your food'
      },
      {
        status: 'out_for_delivery',
        time: order.status === 'out_for_delivery' || order.status === 'delivered'
          ? new Date(Date.now() - 5 * 60 * 1000).toISOString() 
          : null,
        message: 'Order is out for delivery'
      },
      {
        status: 'delivered',
        time: order.status === 'delivered' ? new Date().toISOString() : null,
        message: 'Order delivered successfully'
      }
    ].filter(t => t.time !== null),
    lastUpdated: new Date().toISOString()
  };

  return NextResponse.json({
    success: true,
    data: trackingData
  });
}

async function rateOrder(orderId: string, rating: number, feedback: string) {
  const orderIndex = foodOrders.findIndex(o => o.orderId === orderId);
  
  if (orderIndex === -1) {
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
  }

  foodOrders[orderIndex].rating = {
    overall: rating,
    feedback,
    categories: {
      food: Math.floor(Math.random() * 2) + rating - 1,
      delivery: Math.floor(Math.random() * 2) + rating - 1,
      packaging: Math.floor(Math.random() * 2) + rating - 1
    },
    timestamp: new Date().toISOString()
  };

  return NextResponse.json({
    success: true,
    message: 'Thank you for your feedback!',
    data: {
      rating,
      feedback,
      loyaltyPoints: rating >= 4 ? 20 : 10,
      discount: rating >= 4 ? '₹50 off on next order' : '₹25 off on next order'
    }
  });
} 