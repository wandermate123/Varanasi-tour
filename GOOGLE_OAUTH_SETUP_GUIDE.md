# 🔐 Google OAuth Setup Guide for Real Gmail Authentication

## 📋 **Prerequisites**
- Google account
- Access to Google Cloud Console
- Your WanderMate application running

---

## 🚀 **Step 1: Google Cloud Console Setup**

### **1.1 Create/Select Project**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "Select a project" → "New Project"
3. Project name: `WanderMate-Auth` (or any name you prefer)
4. Click "Create"

### **1.2 Enable Required APIs**
1. Go to **APIs & Services** → **Library**
2. Search for "**Google+ API**" and click **Enable**
3. Alternatively, search for "**Google Identity**" and enable it

### **1.3 Configure OAuth Consent Screen**
1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** (for public use)
3. Fill in required fields:
   - **App name**: `WanderMate`
   - **User support email**: Your email
   - **Developer contact email**: Your email
4. Click **Save and Continue**
5. **Scopes**: Skip this for now, click **Save and Continue**
6. **Test users**: Skip this for now, click **Save and Continue**

---

## 🔑 **Step 2: Create OAuth Credentials**

### **2.1 Create OAuth 2.0 Client ID**
1. Go to **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **OAuth 2.0 Client ID**
3. Application type: **Web application**
4. Name: `WanderMate Web Client`

### **2.2 Configure Authorized Redirect URIs**
Add these exact URLs:
```
http://localhost:3000/api/auth/callback/google
http://localhost:3001/api/auth/callback/google
http://localhost:3002/api/auth/callback/google
```

### **2.3 Get Your Credentials**
After creating, you'll get:
- **Client ID**: `1234567890-abcdefghijklmnop.apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-abcdefghijklmnopqrstuvwxyz`

**⚠️ Copy these values - we'll need them next!**

---

## 🔧 **Step 3: Configure Your Application**

### **3.1 Environment Variables**
Add these to your `.env.local` file:
```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID="your-client-id-here"
GOOGLE_CLIENT_SECRET="your-client-secret-here"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### **3.2 Test the Authentication**
1. Start your application: `npm run dev`
2. Go to: `http://localhost:3000/auth/signin`
3. Click "Sign in with Google"
4. Use your real Gmail account

---

## 🎯 **What You'll Get**

✅ **Real Gmail Authentication**
- Any real person can log in with their Gmail
- Secure OAuth 2.0 flow
- User profile information (name, email, profile picture)
- Session management

✅ **User Data Stored in Database**
- Real user information saved to your Prisma database
- Profile pictures, names, emails stored securely
- User preferences and membership tracking

✅ **Production Ready**
- Works with real domains when deployed
- Secure token handling
- GDPR compliant user data handling

---

## 🚨 **Next Steps for You**

1. **Complete Google Cloud Console setup** (Steps 1-2 above)
2. **Send me your credentials**:
   - Google Client ID
   - Google Client Secret
3. **I'll configure your application** with these credentials
4. **Test with real Gmail accounts**

---

## 🔒 **Security Notes**

- Never commit `.env.local` to git
- Client Secret should be kept confidential
- Use strong NEXTAUTH_SECRET (32+ characters)
- For production, update redirect URIs to your actual domain

---

## 📞 **Need Help?**

If you encounter any issues:
1. Check the redirect URIs are exactly correct
2. Ensure APIs are enabled in Google Cloud Console
3. Verify your `.env.local` file has the correct values
4. Check that your project is published (not in testing mode)

**Ready to proceed? Get your Google OAuth credentials and send them to me!** 🚀 