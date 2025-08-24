import type { Metadata, Viewport } from 'next';
import { Inter, Cormorant_Garamond, Libre_Baskerville, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { CartProvider } from '@/contexts/CartContext';
import WhatsAppButton from '@/components/WhatsAppButton';
import AIAssistantButton from '@/components/AIAssistantButton';
import { MobileToastContainer } from '@/components/MobileToast';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const libreBaskerville = Libre_Baskerville({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-baskerville',
  display: 'swap',
});

const sourceSans = Source_Sans_3({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-source',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#3b82f6',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'WanderMate - Your AI Travel Companion in Varanasi',
  description: 'Discover the spiritual heart of India with WanderMate. Book authentic experiences, local guides, and cultural activities in Varanasi with AI-powered recommendations.',
  keywords: 'Varanasi travel, spiritual tourism, Ganges tours, temple visits, cultural experiences, AI travel companion, local guides',
  authors: [{ name: 'WanderMate Team' }],
  creator: 'WanderMate',
  publisher: 'WanderMate',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'WanderMate - Your AI Travel Companion in Varanasi',
    description: 'Discover the spiritual heart of India with AI-powered travel recommendations and authentic local experiences.',
    url: 'https://wandermate.com',
    siteName: 'WanderMate',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Varanasi Ghats at Sunrise',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WanderMate - Your AI Travel Companion in Varanasi',
    description: 'Discover the spiritual heart of India with AI-powered travel recommendations.',
    images: ['/images/hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${cormorantGaramond.variable} ${libreBaskerville.variable} ${sourceSans.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="WanderMate" />
        <meta name="application-name" content="WanderMate" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
      </head>
      <body className={`${sourceSans.className} antialiased page-layout`}>
        <CartProvider>
          <Providers>
            <div className="w-full min-h-screen overflow-x-hidden">
              {children}
            </div>
          </Providers>
        </CartProvider>
        <AIAssistantButton />
        <WhatsAppButton phoneNumber="919214313559" />
        <MobileToastContainer />
      </body>
    </html>
  );
}
