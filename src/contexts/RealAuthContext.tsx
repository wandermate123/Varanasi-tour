'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RealUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin' | 'guide';
  preferences?: {
    language: string;
    currency: string;
    notifications: boolean;
  };
  createdAt: Date;
  lastLogin?: Date;
}

interface RealAuthContextType {
  user: RealUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<RealUser>) => Promise<{ success: boolean; message: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  refreshToken: () => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

const RealAuthContext = createContext<RealAuthContextType | undefined>(undefined);

export function useRealAuth() {
  const context = useContext(RealAuthContext);
  if (context === undefined) {
    throw new Error('useRealAuth must be used within a RealAuthProvider');
  }
  return context;
}

interface RealAuthProviderProps {
  children: ReactNode;
}

export function RealAuthProvider({ children }: RealAuthProviderProps) {
  const [user, setUser] = useState<RealUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing authentication
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      
      // Check for stored token
      const token = localStorage.getItem('varanasi-auth-token');
      if (token) {
        // Validate token with backend
        const isValid = await validateToken(token);
        if (isValid) {
          // Get user data
          const userData = await getUserData(token);
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          }
        } else {
          // Clear invalid token
          localStorage.removeItem('varanasi-auth-token');
        }
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      localStorage.removeItem('varanasi-auth-token');
    } finally {
      setLoading(false);
    }
  };

  const validateToken = async (token: string): Promise<boolean> => {
    try {
      // Mock token validation - replace with real API call
      // const response = await fetch('/api/auth/validate', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // return response.ok;
      
      // For now, return true to simulate valid token
      return true;
    } catch (error) {
      return false;
    }
  };

  const getUserData = async (token: string): Promise<RealUser | null> => {
    try {
      // Mock user data - replace with real API call
      // const response = await fetch('/api/auth/me', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // if (response.ok) return response.json();
      
      // Return mock user data
      return {
        id: '1',
        name: 'Demo User',
        email: 'demo@varanasi-tourism.com',
        role: 'user',
        preferences: {
          language: 'en',
          currency: 'INR',
          notifications: true
        },
        createdAt: new Date(),
        lastLogin: new Date()
      };
    } catch (error) {
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Mock login - replace with real API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser: RealUser = {
        id: '1',
        name: 'Demo User',
        email: email,
        role: 'user',
        preferences: {
          language: 'en',
          currency: 'INR',
          notifications: true
        },
        createdAt: new Date(),
        lastLogin: new Date()
      };
      
      localStorage.setItem('varanasi-auth-token', mockToken);
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return { success: true, message: 'Login successful' };
      
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setLoading(true);
      
      // Mock registration - replace with real API call
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData)
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser: RealUser = {
        id: '1',
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: 'user',
        preferences: {
          language: 'en',
          currency: 'INR',
          notifications: true
        },
        createdAt: new Date(),
        lastLogin: new Date()
      };
      
      localStorage.setItem('varanasi-auth-token', mockToken);
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return { success: true, message: 'Registration successful' };
      
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      // Clear local data
      localStorage.removeItem('varanasi-auth-token');
      setUser(null);
      setIsAuthenticated(false);
      
      // Call logout API if needed
      // await fetch('/api/auth/logout', { method: 'POST' });
      
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<RealUser>) => {
    try {
      if (!user) {
        return { success: false, message: 'User not authenticated' };
      }
      
      // Mock profile update - replace with real API call
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData)
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local user data
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      return { success: true, message: 'Profile updated successfully' };
      
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, message: 'Profile update failed' };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Mock password reset - replace with real API call
      // const response = await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true, message: 'Password reset email sent' };
      
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, message: 'Password reset failed' };
    }
  };

  const refreshToken = async () => {
    try {
      const token = localStorage.getItem('varanasi-auth-token');
      if (token) {
        const isValid = await validateToken(token);
        if (!isValid) {
          await logout();
        }
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      await logout();
    }
  };

  const value: RealAuthContextType = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    resetPassword,
    refreshToken,
  };

  return (
    <RealAuthContext.Provider value={value}>
      {children}
    </RealAuthContext.Provider>
  );
}
