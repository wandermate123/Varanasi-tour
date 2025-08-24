# 🗺️ Google Maps API Setup & Troubleshooting Guide

## Quick Fix Commands

```bash
# 1. Run the automated setup
node setup-env.js

# 2. Or manually add your API key to .env.local
echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here" >> .env.local

# 3. Restart development server
npm run dev

# 4. Test your setup
# Visit: http://localhost:3000/maps-test
```

## Step-by-Step Setup

### 1. Get Google Maps API Key

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create or select a project**
3. **Enable required APIs**:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. **Create API Key**:
   - Go to "Credentials" → "Create Credentials" → "API Key"
   - Copy the key (starts with `AIzaSy...`)

### 2. Configure API Key

Add to your `.env.local` file:
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

⚠️ **Important**: The prefix `NEXT_PUBLIC_` is required for client-side usage!

### 3. Enable Billing (Required!)

Google Maps requires billing to be enabled, even for free usage:
- Go to "Billing" in Google Cloud Console
- Add a payment method
- You get $200 free credit monthly

## Common Issues & Solutions

### ❌ "Google is not defined" Error

**Cause**: API key not loaded or incorrect format
**Solutions**:
1. Check API key starts with `AIzaSy`
2. Restart development server: `npm run dev`
3. Visit test page: http://localhost:3000/maps-test

### ❌ "This API project is not authorized"

**Cause**: Maps JavaScript API not enabled
**Solution**:
1. Go to Google Cloud Console
2. Navigate to "APIs & Services" → "Library"
3. Search for "Maps JavaScript API"
4. Click "Enable"

### ❌ "RefererNotAllowedMapError"

**Cause**: HTTP referrer restrictions
**Solutions**:
1. Go to Google Cloud Console → Credentials
2. Edit your API key
3. Under "Website restrictions", add:
   - `localhost:3000/*`
   - `127.0.0.1:3000/*`
4. Or remove restrictions for testing

### ❌ Map loads but is grayed out

**Cause**: Billing not enabled
**Solution**:
1. Enable billing in Google Cloud Console
2. Add payment method
3. Maps will work within free tier limits

### ❌ "Quota exceeded" Error

**Cause**: Too many API calls
**Solutions**:
1. Check usage in Google Cloud Console
2. Increase quotas if needed
3. Optimize API calls in your code

## Testing Your Setup

Visit the test page: http://localhost:3000/maps-test

This page will show:
- ✅ API key status
- ✅ API key format validation
- ✅ Maps loading status
- ❌ Any error messages

## API Key Security

### For Development:
```bash
# .env.local (never commit this file)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
```

### For Production:
1. Set up HTTP referrer restrictions
2. Limit API key to specific APIs
3. Monitor usage regularly
4. Set up billing alerts

## Required APIs to Enable

| API | Purpose | Required |
|-----|---------|----------|
| Maps JavaScript API | Display maps | ✅ Yes |
| Places API | Search places, POI | ✅ Yes |
| Geocoding API | Address conversion | ✅ Yes |
| Directions API | Route planning | Optional |
| Distance Matrix API | Travel time/distance | Optional |

## Pricing Information

- **Free tier**: $200 credit monthly
- **Maps loads**: $7 per 1,000 loads (after free tier)
- **Places searches**: $17 per 1,000 requests
- **Geocoding**: $5 per 1,000 requests

Most development and small apps stay within free limits.

## Automated Setup

Run our setup script for guided configuration:

```bash
node setup-env.js
```

This will:
1. Check existing configuration
2. Prompt for API keys
3. Validate key formats
4. Create `.env.local` file
5. Provide next steps

## Need Help?

1. **Test Page**: Visit http://localhost:3000/maps-test
2. **Console Errors**: Check browser console (F12)
3. **Google Cloud**: Check quotas and billing
4. **Restart**: Always restart dev server after env changes

## Environment Variables Summary

```bash
# Required for maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Optional but recommended
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENWEATHER_API_KEY=your_weather_key_here
```

Remember: Always restart your development server after adding environment variables! 