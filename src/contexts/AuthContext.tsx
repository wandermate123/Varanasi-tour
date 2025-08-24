'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check localStorage for user data
      const userData = localStorage.getItem('varanasi-user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Mock authentication - replace with real API call
      const mockUser: User = {
        id: '1',
        name: 'Demo User',
        email: email,
        role: 'user'
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUser(mockUser);
      localStorage.setItem('varanasi-user', JSON.stringify(mockUser));
      
      // You can add real authentication logic here
      // const response = await fetch('/api/auth/signin', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();
      // setUser(data.user);
      
    } catch (error) {
      console.error('Sign in error:', error);
      throw new Error('Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      
      // Mock registration - replace with real API call
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
        role: 'user'
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUser(mockUser);
      localStorage.setItem('varanasi-user', JSON.stringify(mockUser));
      
      // You can add real registration logic here
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password })
      // });
      // const data = await response.json();
      // setUser(data.user);
      
    } catch (error) {
      console.error('Sign up error:', error);
      throw new Error('Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      // Clear user data
      setUser(null);
      localStorage.removeItem('varanasi-user');
      
      // You can add real sign out logic here
      // await fetch('/api/auth/signout', { method: 'POST' });
      
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (user) {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem('varanasi-user', JSON.stringify(updatedUser));
        
        // You can add real update logic here
        // await fetch(`/api/user/update`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(userData)
        // });
      }
    } catch (error) {
      console.error('Update user error:', error);
      throw new Error('Failed to update user');
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
