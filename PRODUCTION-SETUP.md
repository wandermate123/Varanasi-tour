# 🚀 Production Authentication Setup Guide

## Overview
This guide will help you transition from mock authentication to a real production system with real users, email addresses, and database storage.

## 📋 Prerequisites
- Domain name (for OAuth callbacks)
- Database service (PostgreSQL, MySQL, or SQLite)
- Google OAuth credentials
- Email service (optional: for verification emails)

---

## 1️⃣ **Database Setup**

### Option A: PostgreSQL (Recommended for Production)
```bash
# Install PostgreSQL locally or use cloud service like:
# - Supabase (free tier)
# - PlanetScale
# - Railway
# - Vercel Postgres

# Example connection string:
DATABASE_URL="postgresql://username:password@localhost:5432/wandermate"
```

### Option B: MySQL
```bash
# Use services like PlanetScale, Railway, or local MySQL
DATABASE_URL="mysql://username:password@localhost:3306/wandermate"
```

### Option C: SQLite (Development/Small Scale)
```bash
# Already configured - just needs Prisma generation
DATABASE_URL="file:./dev.db"
```

---

## 2️⃣ **Google OAuth Setup**

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable Google+ API

### Step 2: Create OAuth Credentials
1. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
2. Application type: **Web application**
3. Authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google  (development)
   https://yourdomain.com/api/auth/callback/google  (production)
   ```

### Step 3: Get Credentials
- Copy **Client ID** and **Client Secret**

---

## 3️⃣ **Environment Variables**

### Update `.env.local`:
```env
# Database
DATABASE_URL="your-database-connection-string"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"  # Change to your domain in production
NEXTAUTH_SECRET="your-super-secret-key-minimum-32-characters"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Optional: Email service (for verification)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@yourdomain.com"
```

---

## 4️⃣ **Database Schema Setup**

### Step 1: Install Prisma CLI
```bash
npm install prisma @prisma/client
npx prisma init
```

### Step 2: Update Prisma Schema
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"  // or "mysql" or "sqlite"
  url      = env("DATABASE_URL")
}

// NextAuth required tables
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  membership    String    @default("basic")
  joinDate      DateTime  @default(now())
  accounts      Account[]
  sessions      Session[]
  bookings      Booking[]
  favorites     Favorite[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// WanderMate specific tables
model Booking {
  id       String @id @default(cuid())
  userId   String
  type     String
  details  Json
  status   String @default("pending")
  created  DateTime @default(now())
  user     User   @relation(fields: [userId], references: [id])
}

model Favorite {
  id     String @id @default(cuid())
  userId String
  type   String
  itemId String
  user   User   @relation(fields: [userId], references: [id])
  
  @@unique([userId, type, itemId])
}
```

### Step 3: Generate Database
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 5️⃣ **Update Authentication Configuration**

### Real Auth Config (`src/lib/auth-config.ts`):
```typescript
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    
    // Email/Password
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          membership: user.membership
        };
      }
    })
  ],
  
  session: { strategy: 'jwt' },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.membership = user.membership;
        token.joinDate = user.joinDate;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.membership = token.membership;
        session.user.joinDate = token.joinDate;
      }
      return session;
    }
  },
  
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error'
  }
};
```

---

## 6️⃣ **User Registration API**

### Real Registration (`src/app/api/auth/register/route.ts`):
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const prisma = new PrismaClient();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = registerSchema.parse(body);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        membership: 'basic'
      }
    });

    return NextResponse.json({ 
      message: 'User created successfully',
      user: { id: user.id, email: user.email, name: user.name }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 7️⃣ **Deployment Steps**

### Step 1: Environment Setup
1. Set all environment variables in your hosting platform
2. Use strong, unique `NEXTAUTH_SECRET`
3. Update `NEXTAUTH_URL` to your domain

### Step 2: Database Migration
```bash
# Production database setup
npx prisma migrate deploy
npx prisma generate
```

### Step 3: Domain Configuration
- Update Google OAuth redirect URIs
- Configure DNS settings
- Set up SSL certificate

---

## 8️⃣ **Testing Real Authentication**

### Step 1: Remove Mock Data
1. Remove mock users from auth config
2. Test Google OAuth signin
3. Test email/password registration

### Step 2: Verify Database
```bash
# Check database contents
npx prisma studio
```

---

## 🔒 **Security Considerations**

1. **Environment Variables**: Never commit secrets to git
2. **Password Hashing**: Always use bcrypt or similar
3. **Rate Limiting**: Implement login attempt limits
4. **Email Verification**: Add email verification for new accounts
5. **HTTPS**: Always use HTTPS in production
6. **Database Security**: Use connection pooling and read replicas

---

## 📧 **Optional: Email Verification**

Add email verification for new user registrations:

```typescript
// Add to registration process
import nodemailer from 'nodemailer';

// Send verification email
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD
  }
});

await transporter.sendMail({
  from: process.env.EMAIL_FROM,
  to: email,
  subject: 'Verify your WanderMate account',
  html: `Click <a href="${verificationUrl}">here</a> to verify your account`
});
```

---

## ✅ **Quick Start Checklist**

- [ ] Set up production database
- [ ] Configure Google OAuth credentials  
- [ ] Update environment variables
- [ ] Run database migrations
- [ ] Remove mock authentication code
- [ ] Test user registration
- [ ] Test Google OAuth signin
- [ ] Test email/password signin
- [ ] Deploy to production
- [ ] Configure domain and SSL

---

## 🆘 **Troubleshooting**

### Common Issues:
1. **OAuth Redirect Mismatch**: Check redirect URIs in Google Console
2. **Database Connection**: Verify DATABASE_URL format
3. **NEXTAUTH_SECRET**: Must be at least 32 characters
4. **Environment Variables**: Check spelling and values

### Debug Mode:
```env
NEXTAUTH_DEBUG=true
```

---

## 📚 **Additional Resources**

- [NextAuth.js Documentation](https://next-auth.js.org)
- [Prisma Documentation](https://prisma.io/docs)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
- [Deployment Guides](https://nextjs.org/docs/deployment) 