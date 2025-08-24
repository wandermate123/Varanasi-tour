import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  events: {
    async createUser({ user }) {
      // Set default values for new OAuth users
      if (user.id) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            membershipType: 'basic',
            isActive: true,
            lastLogin: new Date(),
          }
        });
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified,
          membershipType: 'basic',
        };
      },
    }),
    
    // Email/Password Provider
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password');
        }

        try {
          // Find user in database
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (!user || !user.password) {
            throw new Error('Invalid email or password');
          }

          // Verify password
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          
          if (!isValidPassword) {
            throw new Error('Invalid email or password');
          }

          // Update last login
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            membershipType: user.membershipType
          };
        } catch (error) {
          console.error('Authentication error:', error);
          throw new Error('Authentication failed');
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        return true;
      }
      return false;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

// Types extension for NextAuth
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      membershipType: string;
    };
  }
  
  interface User {
    id: string;
    membershipType: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    membershipType: string;
  }
} 