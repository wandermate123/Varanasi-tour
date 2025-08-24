# 🚀 Deployment Troubleshooting Guide

## 🚨 **Your Development Server Works, But Deployment Fails**

This is a common issue with Next.js applications. Here's how to fix it:

---

## **1. Environment Variables (MOST COMMON ISSUE)**

### **Problem:** Missing environment variables in production
### **Solution:** Set up environment variables in your deployment platform

#### **For Vercel:**
1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these **REQUIRED** variables:

```env
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-super-secret-key-minimum-32-characters
DATABASE_URL=your-production-database-url
```

#### **For Netlify:**
1. Go to **Site settings** → **Environment variables**
2. Add the same variables as above

#### **For Railway:**
1. Go to your project dashboard
2. Click **Variables** tab
3. Add the required environment variables

---

## **2. Database Issues**

### **Problem:** SQLite database doesn't work in production
### **Solution:** Use a production database

#### **Option A: Vercel Postgres (Recommended)**
```bash
# In Vercel dashboard, add this environment variable:
DATABASE_URL=postgresql://username:password@host:port/database
```

#### **Option B: Supabase (Free)**
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings → Database
4. Add to environment variables

#### **Option C: Railway Postgres**
1. Create new Postgres database in Railway
2. Copy connection string
3. Add to environment variables

---

## **3. Build Errors**

### **Problem:** Build fails in production
### **Solution:** Check build logs and fix issues

#### **Common Build Issues:**

1. **Prisma Generate Error:**
```bash
# Add this to package.json scripts:
"build": "prisma generate && next build"
```

2. **Missing Dependencies:**
```bash
# Check if all dependencies are in package.json
npm install
```

3. **TypeScript Errors:**
```bash
# Run type check locally
npm run typecheck
```

---

## **4. API Routes Not Working**

### **Problem:** API routes return 404 or 500 errors
### **Solution:** Check API route configuration

#### **Common Issues:**

1. **Missing API Keys:**
```env
# Add these to environment variables:
OPENAI_API_KEY=your_openai_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

2. **CORS Issues:**
```typescript
// In next.config.ts, add:
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
      ],
    },
  ]
}
```

---

## **5. Static Assets Not Loading**

### **Problem:** Images, icons, or other assets return 404
### **Solution:** Check file paths and configuration

#### **Fix Image Issues:**
```typescript
// In next.config.ts, ensure proper image configuration:
images: {
  domains: ['images.unsplash.com', 'your-domain.com'],
  formats: ['image/avif', 'image/webp'],
},
```

---

## **6. Authentication Issues**

### **Problem:** Login/signup not working in production
### **Solution:** Configure NextAuth properly

#### **Required Environment Variables:**
```env
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=your-database-url
```

#### **For Google OAuth:**
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## **7. Performance Issues**

### **Problem:** Slow loading or timeouts
### **Solution:** Optimize for production

#### **Optimizations:**
1. **Enable compression:**
```typescript
// In next.config.ts:
compress: true,
```

2. **Optimize images:**
```typescript
// Use Next.js Image component with proper sizing
```

3. **Enable caching:**
```typescript
// Add cache headers in next.config.ts
```

---

## **8. Debugging Steps**

### **Step 1: Check Build Logs**
1. Go to your deployment platform dashboard
2. Check the build logs for errors
3. Look for specific error messages

### **Step 2: Test Locally**
```bash
# Test production build locally:
npm run build
npm start
```

### **Step 3: Check Environment Variables**
```bash
# Verify all required variables are set
echo $NEXTAUTH_URL
echo $DATABASE_URL
```

### **Step 4: Check Database Connection**
```bash
# Test database connection:
npx prisma db push
npx prisma generate
```

---

## **9. Quick Fix Checklist**

- [ ] Set `NEXTAUTH_URL` to your production domain
- [ ] Set `NEXTAUTH_SECRET` (32+ characters)
- [ ] Set `DATABASE_URL` to production database
- [ ] Add all required API keys
- [ ] Check build logs for errors
- [ ] Test production build locally
- [ ] Verify all static assets exist
- [ ] Check API route functionality

---

## **10. Common Error Messages & Solutions**

| Error | Solution |
|-------|----------|
| `NEXTAUTH_URL not set` | Set to your production domain |
| `Database connection failed` | Use production database URL |
| `API key not found` | Add missing API keys |
| `Build failed` | Check build logs and fix errors |
| `404 on static assets` | Check file paths and configuration |

---

## **🚀 Need Help?**

1. **Check your deployment platform's logs**
2. **Compare development vs production environment**
3. **Test with minimal configuration first**
4. **Add features gradually**

**Most deployment issues are environment-related. Start with the basic environment variables and add more as needed!**



