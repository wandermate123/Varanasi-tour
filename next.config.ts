import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const config: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'wandermate.vercel.app']
    }
  },
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  poweredByHeader: false,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(config);
