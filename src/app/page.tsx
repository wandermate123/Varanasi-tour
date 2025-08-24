'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LandscapeSection from '@/components/LandscapeSection';
import ExploreSection from '@/components/ExploreSection';
import PremiumShopSection from '@/components/PremiumShopSection';
import PackagesSection from '@/components/PackagesSection';
import Footer from '@/components/Footer';
import WhatsAppSection from '@/components/WhatsAppSection';
import MobileNavigation from '@/components/MobileNavigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="page-layout">
      <Header />
      <main className="pb-20 lg:pb-0">
        <HeroSection />
        
        {/* White blank space */}
        <div className="h-8 sm:h-12 md:h-16 lg:h-20 bg-white"></div>
        
        {/* Must experience packages */}
        <PackagesSection />

        <section className="h-12 sm:h-16 bg-white"></section>

        {/* Premium Shop Section */}
        <PremiumShopSection />

        <LandscapeSection />
        <ExploreSection />
        <WhatsAppSection />
      </main>
      <Footer />
      <MobileNavigation />
    </div>
  );
}
