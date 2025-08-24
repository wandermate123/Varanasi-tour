# 🔑 API Keys Setup Guide

## 📋 Required Environment Variables

You need to manually add these to your `.env.local` file:

```env
# Google Maps API (Already added)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyA3fS3H8xL7RvdBr3WpWYB0rnWO4kOAFRg

# OpenAI API (REQUIRED for AI Assistant)
OPENAI_API_KEY=your_openai_api_key_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Database (Optional for now)
DATABASE_URL="your_database_url_here"

# Razorpay Payment Gateway (Optional)
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here

# Redis for Caching (Optional)
UPSTASH_REDIS_REST_URL=your_redis_url_here
UPSTASH_REDIS_REST_TOKEN=your_redis_token_here
```

## 🚀 Step-by-Step Setup

### 1. **OpenAI API Key (MOST IMPORTANT)**

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up/login to your OpenAI account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)
5. Add to `.env.local`: `OPENAI_API_KEY=sk-your_key_here`

**Cost:** $5-20/month depending on usage

### 2. **NextAuth Secret (Required for Authentication)**

1. Generate a random secret: 
   ```bash
   openssl rand -base64 32
   ```
   Or use any random string generator
2. Add to `.env.local`: `NEXTAUTH_SECRET=your_random_secret_here`

### 3. **Google Maps API (Already Done)**

✅ Already configured! But make sure to:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable **Maps JavaScript API**
3. Enable **Places API**
4. Enable billing (required)

### 4. **Database (Optional for now)**

For production, you'll need a PostgreSQL database:
- **Free options:** Supabase, Railway, Vercel Postgres
- **Paid options:** AWS RDS, Google Cloud SQL

### 5. **Razorpay (Optional for payments)**

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Get your Test/Live API keys
3. Add both Key ID and Secret

## 📝 Manual Steps

1. **Open your `.env.local` file** in a text editor
2. **Add these lines** (replace with your actual keys):

```env
OPENAI_API_KEY=sk-your_openai_key_here
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000
```

3. **Save the file**
4. **Restart your development server**:
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

## 🧪 Test Your Setup

1. **For Maps:** Visit `http://localhost:3000/maps-test`
2. **For AI Assistant:** Click the floating AI icon on your homepage
3. **Check console** for any error messages

## 💡 Quick Start (Minimum Required)

To get your AI assistant working immediately, you only need:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyA3fS3H8xL7RvdBr3WpWYB0rnWO4kOAFRg
OPENAI_API_KEY=sk-your_openai_key_here
NEXTAUTH_SECRET=any_random_string_here
NEXTAUTH_URL=http://localhost:3000
```

## 🔒 Security Notes

- **Never commit** `.env.local` to git
- **Use test keys** during development
- **Rotate keys** regularly in production
- **Restrict API keys** by domain/IP in production

## 🆘 Troubleshooting

### Maps not loading?
- Check Google Cloud Console for enabled APIs
- Verify billing is enabled
- Check browser console for errors

### AI Assistant not working?
- Verify OpenAI API key starts with `sk-`
- Check your OpenAI account has credits
- Look at terminal for error messages

### Authentication issues?
- Make sure NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your local URL

## 📞 Need Help?

If you see any errors after adding the keys:
1. Check the terminal output
2. Check browser console (F12)
3. Verify all keys are correctly formatted
4. Restart the development server

---

**Next Step:** Add your OpenAI API key to `.env.local` and restart the server! 