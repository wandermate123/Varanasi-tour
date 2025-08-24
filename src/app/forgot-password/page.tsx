'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, MapPin, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AuthService } from '@/lib/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const authService = AuthService.getInstance();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await authService.forgotPassword(email);
      
      if (result.success) {
        setMessage(result.message || 'Password reset link sent!');
        setIsSuccess(true);
      } else {
        setError(result.error || 'Failed to send reset link');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setIsSuccess(false);
    setMessage('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-orange-300/20 to-amber-300/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Reset Password Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl mb-4"
            >
              <MapPin className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isSuccess ? 'Check Your Email' : 'Reset Password'}
            </h1>
            <p className="text-gray-600">
              {isSuccess 
                ? 'We\'ve sent a password reset link to your email address'
                : 'Enter your email address and we\'ll send you a link to reset your password'
              }
            </p>
          </div>

          {/* Success State */}
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full"
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
              </motion.div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-700 font-medium">{message}</p>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleResend}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300"
                >
                  Send Another Email
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2"
                >
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm font-medium text-red-700">{error}</p>
                </motion.div>
              )}

              {/* Reset Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        error ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email address"
                      disabled={isLoading}
                      autoFocus
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </>
          )}

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link 
              href="/login" 
              className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Sign In</span>
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Need help?</p>
              <Link 
                href="/contact" 
                className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                Contact our support team
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 