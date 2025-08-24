'use client';

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

// Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'service' | 'boat' | 'product';
  image?: string;
  description?: string;
  date?: string; // For bookings
  time?: string; // For bookings
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

interface CartContextType {
  state: CartState;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

// Initial state
const initialState: CartState = {
  items: [],
  subtotal: 0,
  tax: 0,
  total: 0,
};

// Constants
const TAX_RATE = 0.18; // 18% GST

// Actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

// Helper function to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  return { subtotal, tax, total };
};

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      const updatedItems = existingItem
        ? state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, action.payload];

      const { subtotal, tax, total } = calculateTotals(updatedItems);
      return {
        ...state,
        items: updatedItems,
        subtotal,
        tax,
        total,
      };
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const { subtotal, tax, total } = calculateTotals(updatedItems);
      return {
        ...state,
        items: updatedItems,
        subtotal,
        tax,
        total,
      };
    }
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const { subtotal, tax, total } = calculateTotals(updatedItems);
      return {
        ...state,
        items: updatedItems,
        subtotal,
        tax,
        total,
      };
    }
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isMounted, setIsMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const { items } = JSON.parse(savedCart);
      dispatch({ type: 'CLEAR_CART' });
      items.forEach((item: CartItem) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
      });
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }, [state, isMounted]);

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{ state, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 