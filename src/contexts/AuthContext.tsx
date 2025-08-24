'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService, User, AuthState, LoginCredentials, RegisterData, AuthResponse } from '@/lib/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (data: RegisterData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<AuthResponse>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  const authService = AuthService.getInstance();

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = authService.getCurrentUser();
        const isAuthenticated = authService.isAuthenticated();
        
        setAuthState({
          user,
          isAuthenticated,
          isLoading: false,
          error: null
        });

        // Refresh token if user is authenticated
        if (isAuthenticated) {
          await authService.refreshToken();
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Failed to initialize authentication'
        });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await authService.login(credentials);
      
      setAuthState({
        user: result.user || null,
        isAuthenticated: result.success,
        isLoading: false,
        error: result.error || null
      });

      return result;
    } catch (error) {
      const errorMessage = 'Login failed. Please try again.';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const register = async (data: RegisterData): Promise<AuthResponse> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await authService.register(data);
      
      setAuthState({
        user: result.user || null,
        isAuthenticated: result.success,
        isLoading: false,
        error: result.error || null
      });

      return result;
    } catch (error) {
      const errorMessage = 'Registration failed. Please try again.';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const logout = async (): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await authService.logout();
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear the local state
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<AuthResponse> => {
    if (!authState.user) {
      return {
        success: false,
        error: 'Not authenticated'
      };
    }

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await authService.updateProfile(updates);
      
      if (result.success && result.user) {
        setAuthState(prev => ({
          ...prev,
          user: result.user!,
          isLoading: false,
          error: null
        }));
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: result.error || 'Failed to update profile'
        }));
      }

      return result;
    } catch (error) {
      const errorMessage = 'Failed to update profile';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const refreshAuth = async (): Promise<void> => {
    try {
      const success = await authService.refreshToken();
      if (!success) {
        // Token refresh failed, logout user
        await logout();
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      await logout();
    }
  };

  const contextValue: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
    refreshAuth
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Higher-order component for protecting routes
export function withAuth<T extends {}>(Component: React.ComponentType<T>) {
  return function AuthenticatedComponent(props: T) {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      );
    }
    
    if (!isAuthenticated) {
      // Redirect to login or show unauthorized message
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return null;
    }
    
    return <Component {...props} />;
  };
} 