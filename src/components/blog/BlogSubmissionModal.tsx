'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, AlertCircle, CheckCircle, Clock, FileText, Image as ImageIcon } from 'lucide-react';

interface BlogSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BlogSubmission {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: File | null;
  authorName: string;
  authorEmail: string;
  authorBio: string;
}

export default function BlogSubmissionModal({ isOpen, onClose }: BlogSubmissionModalProps) {
  const [formData, setFormData] = useState<BlogSubmission>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    image: null,
    authorName: '',
    authorEmail: '',
    authorBio: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'Travel', 'Food', 'Photography', 'Culture', 'Wellness', 
    'Adventure', 'History', 'Art', 'Music', 'Spirituality'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (formData.tags.length === 0) newErrors.tags = 'At least one tag is required';
    if (!formData.authorName.trim()) newErrors.authorName = 'Author name is required';
    if (!formData.authorEmail.trim()) newErrors.authorEmail = 'Author email is required';
    if (!formData.image) newErrors.image = 'Featured image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Prepare submission data
      const submissionData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: formData.tags,
        authorName: formData.authorName,
        authorEmail: formData.authorEmail,
        authorBio: formData.authorBio,
        imageUrl: formData.image ? URL.createObjectURL(formData.image) : undefined
      };

      const response = await fetch('/api/blog/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        // Handle validation errors
        const newErrors: Record<string, string> = {};
        if (result.errors) {
          result.errors.forEach((error: any) => {
            newErrors[error.field] = error.message;
          });
        }
        setErrors(newErrors);
      }
    } catch (error) {
      console.error('Error submitting blog post:', error);
      setErrors({ submit: 'Failed to submit blog post. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (!formData.tags.includes(newTag) && formData.tags.length < 5) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
        e.currentTarget.value = '';
        setErrors(prev => ({ ...prev, tags: '' }));
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: [],
      image: null,
      authorName: '',
      authorEmail: '',
      authorBio: ''
    });
    setCurrentStep(1);
    setSubmitted(false);
    setErrors({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Share Your Story</h2>
                  <p className="text-gray-600 mt-1">Submit your blog post for review</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="px-6 py-4 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Step {currentStep} of 3
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round((currentStep / 3) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Submission Successful!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for sharing your story. Our team will review your submission and get back to you within 2-3 business days.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900 mb-1">What happens next?</h4>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Our editorial team will review your content</li>
                            <li>• We'll check for quality, originality, and relevance</li>
                            <li>• You'll receive an email with the decision</li>
                            <li>• If approved, your post will be published within 24 hours</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={resetForm}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Submit Another Post
                      </button>
                      <button
                        onClick={onClose}
                        className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Blog Title *
                          </label>
                          <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => {
                              setFormData(prev => ({ ...prev, title: e.target.value }));
                              setErrors(prev => ({ ...prev, title: '' }));
                            }}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                              errors.title ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Enter your blog title..."
                          />
                          {errors.title && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.title}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Excerpt *
                          </label>
                          <textarea
                            value={formData.excerpt}
                            onChange={(e) => {
                              setFormData(prev => ({ ...prev, excerpt: e.target.value }));
                              setErrors(prev => ({ ...prev, excerpt: '' }));
                            }}
                            rows={3}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                              errors.excerpt ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Brief description of your blog post..."
                          />
                          {errors.excerpt && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.excerpt}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category *
                          </label>
                          <select
                            value={formData.category}
                            onChange={(e) => {
                              setFormData(prev => ({ ...prev, category: e.target.value }));
                              setErrors(prev => ({ ...prev, category: '' }));
                            }}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                              errors.category ? 'border-red-300' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                          {errors.category && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.category}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags * (Press Enter to add, max 5)
                          </label>
                          <input
                            type="text"
                            onKeyDown={handleTagInput}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                              errors.tags ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Add tags (e.g., Varanasi, Travel, Culture)..."
                          />
                          {formData.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {formData.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                                >
                                  {tag}
                                  <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="hover:text-purple-900"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                          {errors.tags && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.tags}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Content */}
                    {currentStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Blog Content *
                          </label>
                          <textarea
                            value={formData.content}
                            onChange={(e) => {
                              setFormData(prev => ({ ...prev, content: e.target.value }));
                              setErrors(prev => ({ ...prev, content: '' }));
                            }}
                            rows={12}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                              errors.content ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Write your blog content here... (Minimum 500 words)"
                          />
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-gray-500">
                              {formData.content.length} characters
                            </p>
                            {formData.content.length < 500 && (
                              <p className="text-sm text-orange-600">
                                Minimum 500 characters required
                              </p>
                            )}
                          </div>
                          {errors.content && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.content}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Featured Image *
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="image-upload"
                            />
                            <label htmlFor="image-upload" className="cursor-pointer">
                              {formData.image ? (
                                <div className="space-y-2">
                                  <ImageIcon className="w-8 h-8 text-green-500 mx-auto" />
                                  <p className="text-sm text-gray-600">{formData.image.name}</p>
                                  <p className="text-xs text-gray-500">Click to change</p>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                                  <p className="text-sm text-gray-600">
                                    Click to upload or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    PNG, JPG, GIF up to 10MB
                                  </p>
                                </div>
                              )}
                            </label>
                          </div>
                          {errors.image && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.image}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Author Information */}
                    {currentStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Author Name *
                          </label>
                          <input
                            type="text"
                            value={formData.authorName}
                            onChange={(e) => {
                              setFormData(prev => ({ ...prev, authorName: e.target.value }));
                              setErrors(prev => ({ ...prev, authorName: '' }));
                            }}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                              errors.authorName ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Your full name"
                          />
                          {errors.authorName && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.authorName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={formData.authorEmail}
                            onChange={(e) => {
                              setFormData(prev => ({ ...prev, authorEmail: e.target.value }));
                              setErrors(prev => ({ ...prev, authorEmail: '' }));
                            }}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                              errors.authorEmail ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="your.email@example.com"
                          />
                          {errors.authorEmail && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.authorEmail}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Author Bio
                          </label>
                          <textarea
                            value={formData.authorBio}
                            onChange={(e) => setFormData(prev => ({ ...prev, authorBio: e.target.value }))}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Tell us a bit about yourself..."
                          />
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-blue-900 mb-1">Submission Guidelines</h4>
                              <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Content must be original and not published elsewhere</li>
                                <li>• Minimum 500 words required</li>
                                <li>• Include high-quality images (optional but recommended)</li>
                                <li>• Follow our community guidelines</li>
                                <li>• We'll review and respond within 2-3 business days</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </form>
                )}
              </div>

              {/* Footer */}
              {!submitted && (
                <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Previous
                  </button>

                  <div className="flex gap-3">
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(currentStep + 1)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Submitting...
                          </>
                        ) : (
                          'Submit for Review'
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
} 