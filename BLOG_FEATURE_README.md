# WanderMate Blog Feature

A premium, professional, and minimalist blog system for WanderMate with user submission capabilities and editorial review workflow.

## Features

### 🎨 Premium Design
- **Professional Layout**: Clean, modern design with premium typography
- **Minimalist Approach**: Focus on content with elegant spacing and typography
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Premium Badges**: Special indicators for premium content

### 📝 Blog Management
- **Category System**: Organized content by categories (Travel, Food, Photography, etc.)
- **Tag System**: Flexible tagging for better content discovery
- **Search & Filter**: Advanced search and filtering capabilities
- **Pagination**: Efficient content loading with pagination
- **Sorting Options**: Sort by latest, popular, or trending

### 👥 User Interaction
- **Like System**: Users can like posts with real-time updates
- **View Tracking**: Track post views and engagement
- **Share Functionality**: Easy sharing of blog posts
- **Bookmark System**: Save posts for later reading
- **Comments Section**: Interactive commenting system (ready for implementation)

### ✍️ User Submission System
- **Multi-step Form**: Professional 3-step submission process
- **Form Validation**: Comprehensive client and server-side validation
- **File Upload**: Image upload with preview
- **Progress Tracking**: Visual progress indicator
- **Submission Status**: Track submission status and feedback

### 🔍 Editorial Workflow
- **Review Process**: Admin review before publication
- **Status Management**: Draft, pending, published states
- **Email Notifications**: Automated notifications for submissions and decisions
- **Quality Control**: Content guidelines and validation

## File Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx                    # Main blog listing page
│   │   └── [id]/
│   │       └── page.tsx                # Individual blog post page
│   └── api/
│       └── blog/
│           ├── posts/
│           │   └── route.ts            # API for fetching blog posts
│           └── submit/
│               └── route.ts            # API for blog submissions
├── components/
│   └── blog/
│       ├── BlogCard.tsx                # Blog post card component
│       ├── BlogSubmissionModal.tsx     # User submission modal
│       └── BlogFilter.tsx              # Advanced filtering component
└── app/
    └── globals.css                     # Prose styles for blog content
```

## Components

### BlogCard
- **Features**: Premium badges, like system, view tracking, author info
- **Design**: Hover effects, smooth animations, responsive layout
- **Interaction**: Like, share, bookmark functionality

### BlogSubmissionModal
- **Steps**: Basic info → Content → Author details
- **Validation**: Real-time form validation with error handling
- **Upload**: Image upload with preview and validation
- **Progress**: Visual progress indicator

### BlogFilter
- **Categories**: Filter by content categories
- **Search**: Full-text search across titles, excerpts, and tags
- **Sorting**: Latest, popular, trending options
- **Premium**: Filter premium content only

## API Endpoints

### GET `/api/blog/posts`
Fetch blog posts with filtering and pagination

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Posts per page (default: 10)
- `category`: Filter by category
- `search`: Search query
- `sortBy`: Sort order (latest, popular, trending)
- `premiumOnly`: Filter premium content

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalPosts": 50,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### POST `/api/blog/submit`
Submit a new blog post for review

**Request Body:**
```json
{
  "title": "Blog Title",
  "excerpt": "Brief description",
  "content": "Full blog content",
  "category": "Travel",
  "tags": ["Varanasi", "Travel"],
  "authorName": "Author Name",
  "authorEmail": "author@example.com",
  "authorBio": "Author bio",
  "imageUrl": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Blog submission received successfully",
  "submissionId": "sub_1234567890_abc123",
  "estimatedReviewTime": "2-3 business days"
}
```

### GET `/api/blog/submit?id={submissionId}`
Check submission status

**Response:**
```json
{
  "success": true,
  "submissionId": "sub_1234567890_abc123",
  "status": "pending_review",
  "submittedAt": "2024-01-15T10:30:00Z",
  "reviewedAt": null,
  "feedback": null
}
```

## Styling

### Prose Styles
Comprehensive typography styles for blog content:
- **Headings**: Proper hierarchy and spacing
- **Paragraphs**: Optimal line height and margins
- **Lists**: Styled ordered and unordered lists
- **Blockquotes**: Elegant quote styling
- **Code**: Syntax highlighting for code blocks
- **Tables**: Responsive table styling

### Design System
- **Colors**: Purple accent color scheme
- **Typography**: Professional font stack
- **Spacing**: Consistent spacing system
- **Shadows**: Subtle shadow effects
- **Transitions**: Smooth hover and interaction effects

## Usage

### Adding Blog Link to Navigation
The blog is already integrated into the main navigation with dropdown options:
- Travel Stories
- Food & Culture
- Photography
- Spirituality
- Share Your Story

### Customizing Categories
Update the categories array in both the blog page and API:
```typescript
const categories = [
  'Travel', 'Food', 'Photography', 'Culture', 'Wellness', 
  'Adventure', 'History', 'Art', 'Music', 'Spirituality'
];
```

### Modifying Submission Form
The submission form is highly customizable:
- Add/remove form fields
- Modify validation rules
- Customize the submission workflow
- Add custom validation logic

## Future Enhancements

### Planned Features
- **Rich Text Editor**: WYSIWYG editor for content creation
- **Image Gallery**: Multiple image upload and gallery support
- **SEO Optimization**: Meta tags, structured data, sitemap
- **Social Sharing**: Enhanced social media integration
- **Analytics**: Detailed analytics and insights
- **Newsletter Integration**: Email newsletter signup
- **Related Posts**: AI-powered related content suggestions

### Technical Improvements
- **Database Integration**: Replace mock data with real database
- **Image Optimization**: Automatic image optimization and CDN
- **Caching**: Implement caching for better performance
- **Search**: Full-text search with Elasticsearch or similar
- **Comments**: Real-time commenting system
- **Notifications**: Push notifications for new posts

## Dependencies

- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Icon library
- **Zod**: Schema validation for API endpoints
- **Next.js**: React framework with API routes
- **Tailwind CSS**: Utility-first CSS framework

## Setup Instructions

1. **Install Dependencies**: Ensure all required packages are installed
2. **Configure API**: Set up email service for notifications
3. **Database Setup**: Configure database for storing blog posts
4. **Image Storage**: Set up image upload and storage service
5. **Environment Variables**: Configure necessary environment variables

## Contributing

When contributing to the blog feature:
1. Follow the existing code style and patterns
2. Add proper TypeScript types
3. Include error handling
4. Test on multiple devices
5. Update documentation as needed

## Support

For questions or issues with the blog feature:
1. Check the existing documentation
2. Review the code examples
3. Test the API endpoints
4. Check browser console for errors
5. Verify all dependencies are properly installed 