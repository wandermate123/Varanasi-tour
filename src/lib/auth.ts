// Authentication System for WanderMate
// This provides a complete authentication solution with TypeScript support

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  membershipType: 'basic' | 'premium' | 'vip';
  createdAt: Date;
  lastLogin?: Date;
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    language: 'en' | 'hi';
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
  error?: string;
}

// Mock database for development
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    avatar: '/images/avatars/john.jpg',
    membershipType: 'premium',
    createdAt: new Date('2023-01-15'),
    lastLogin: new Date(),
    preferences: {
      notifications: true,
      newsletter: true,
      language: 'en'
    }
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    avatar: '/images/avatars/jane.jpg',
    membershipType: 'basic',
    createdAt: new Date('2023-06-20'),
    preferences: {
      notifications: false,
      newsletter: true,
      language: 'hi'
    }
  },
  {
    id: '3',
    email: 'test@wandermate.com',
    name: 'Test User',
    membershipType: 'vip',
    createdAt: new Date('2023-12-01'),
    lastLogin: new Date(),
    preferences: {
      notifications: true,
      newsletter: true,
      language: 'en'
    }
  },
  {
    id: '4',
    email: 'demo@example.com',
    name: 'Demo Account',
    membershipType: 'premium',
    createdAt: new Date('2024-01-01'),
    preferences: {
      notifications: true,
      newsletter: false,
      language: 'en'
    }
  }
];

// Local storage keys
const STORAGE_KEYS = {
  USER: 'wandermate_user',
  TOKEN: 'wandermate_token',
  REMEMBER_ME: 'wandermate_remember'
} as const;

// Authentication Service Class
export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private authToken: string | null = null;

  private constructor() {
    this.initializeAuth();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private initializeAuth(): void {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
      
      if (savedUser && savedToken) {
        try {
          this.currentUser = JSON.parse(savedUser);
          this.authToken = savedToken;
        } catch (error) {
          console.error('Failed to parse saved user data:', error);
          this.clearAuthData();
        }
      }
    }
  }

  private clearAuthData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
    }
    this.currentUser = null;
    this.authToken = null;
  }

  private saveAuthData(user: User, token: string, rememberMe: boolean): void {
    if (typeof window !== 'undefined') {
      if (rememberMe) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true');
      } else {
        sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        sessionStorage.setItem(STORAGE_KEYS.TOKEN, token);
      }
    }
  }

  private generateToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Public Methods
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { email, password, rememberMe = false } = credentials;

      if (!this.validateEmail(email)) {
        return {
          success: false,
          error: 'Please enter a valid email address'
        };
      }

      if (!password || password.length < 6) {
        return {
          success: false,
          error: 'Password must be at least 6 characters long'
        };
      }

      // Find user in mock database
      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        return {
          success: false,
          error: 'No account found with this email address'
        };
      }

      // In real implementation, verify password hash
      // For demo, accept any password for existing users
      
      // Update last login
      user.lastLogin = new Date();
      
      // Generate token
      const token = this.generateToken();
      
      // Save auth data
      this.currentUser = user;
      this.authToken = token;
      this.saveAuthData(user, token, rememberMe);

      return {
        success: true,
        user,
        token,
        message: 'Login successful!'
      };

    } catch (error) {
      return {
        success: false,
        error: 'Login failed. Please try again.'
      };
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const { name, email, password, confirmPassword, agreeToTerms } = data;

      // Validation
      if (!name || name.trim().length < 2) {
        return {
          success: false,
          error: 'Name must be at least 2 characters long'
        };
      }

      if (!this.validateEmail(email)) {
        return {
          success: false,
          error: 'Please enter a valid email address'
        };
      }

      const passwordValidation = this.validatePassword(password);
      if (!passwordValidation.isValid) {
        return {
          success: false,
          error: passwordValidation.errors[0]
        };
      }

      if (password !== confirmPassword) {
        return {
          success: false,
          error: 'Passwords do not match'
        };
      }

      if (!agreeToTerms) {
        return {
          success: false,
          error: 'You must agree to the Terms of Service'
        };
      }

      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        return {
          success: false,
          error: 'An account with this email already exists'
        };
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: email.toLowerCase(),
        name: name.trim(),
        membershipType: 'basic',
        createdAt: new Date(),
        preferences: {
          notifications: true,
          newsletter: false,
          language: 'en'
        }
      };

      // Add to mock database
      mockUsers.push(newUser);

      // Generate token
      const token = this.generateToken();

      // Save auth data
      this.currentUser = newUser;
      this.authToken = token;
      this.saveAuthData(newUser, token, true);

      return {
        success: true,
        user: newUser,
        token,
        message: 'Account created successfully!'
      };

    } catch (error) {
      return {
        success: false,
        error: 'Registration failed. Please try again.'
      };
    }
  }

  async logout(): Promise<void> {
    this.clearAuthData();
    
    // In real implementation, invalidate token on server
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null && this.authToken !== null;
  }

  async refreshToken(): Promise<boolean> {
    if (!this.currentUser || !this.authToken) {
      return false;
    }

    try {
      // Simulate token refresh API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newToken = this.generateToken();
      this.authToken = newToken;
      
      const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
      this.saveAuthData(this.currentUser, newToken, rememberMe);
      
      return true;
    } catch (error) {
      this.clearAuthData();
      return false;
    }
  }

  async updateProfile(updates: Partial<User>): Promise<AuthResponse> {
    if (!this.currentUser) {
      return {
        success: false,
        error: 'Not authenticated'
      };
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const updatedUser = { ...this.currentUser, ...updates };
      this.currentUser = updatedUser;

      const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
      this.saveAuthData(updatedUser, this.authToken!, rememberMe);

      return {
        success: true,
        user: updatedUser,
        message: 'Profile updated successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update profile'
      };
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<AuthResponse> {
    if (!this.currentUser) {
      return {
        success: false,
        error: 'Not authenticated'
      };
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const passwordValidation = this.validatePassword(newPassword);
      if (!passwordValidation.isValid) {
        return {
          success: false,
          error: passwordValidation.errors[0]
        };
      }

      // In real implementation, verify current password and update hash
      
      return {
        success: true,
        message: 'Password changed successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to change password'
      };
    }
  }

  async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      if (!this.validateEmail(email)) {
        return {
          success: false,
          error: 'Please enter a valid email address'
        };
      }

      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        // For security, don't reveal if email exists
        return {
          success: true,
          message: 'If an account with this email exists, you will receive a password reset link.'
        };
      }

      return {
        success: true,
        message: 'Password reset link sent to your email address.'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to process request. Please try again.'
      };
    }
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();

// Hook for React components
export function useAuth() {
  const [authState, setAuthState] = React.useState<AuthState>({
    user: authService.getCurrentUser(),
    isAuthenticated: authService.isAuthenticated(),
    isLoading: false,
    error: null
  });

  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const result = await authService.login(credentials);
    
    setAuthState({
      user: result.user || null,
      isAuthenticated: result.success,
      isLoading: false,
      error: result.error || null
    });

    return result;
  };

  const register = async (data: RegisterData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const result = await authService.register(data);
    
    setAuthState({
      user: result.user || null,
      isAuthenticated: result.success,
      isLoading: false,
      error: result.error || null
    });

    return result;
  };

  const logout = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    await authService.logout();
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  };

  return {
    ...authState,
    login,
    register,
    logout,
    authService
  };
}

import React from 'react';