'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { SessionProvider, useSession, signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

interface AuthContextType {
  user: Session['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: typeof signIn;
  signOut: typeof signOut;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  membershipType?: 'basic' | 'premium' | 'vip';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthContextProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  
  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Registration failed' };
      }

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  };

  const contextValue: AuthContextType = {
    user: session?.user || null,
    isAuthenticated: !!session?.user,
    isLoading: status === 'loading',
    signIn,
    signOut,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function RealAuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </SessionProvider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// HOC for protecting routes
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      // Redirect to sign in
      signIn();
      return null;
    }

    return <Component {...props} />;
  };
} 