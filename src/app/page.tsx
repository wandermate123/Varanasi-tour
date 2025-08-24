'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ExploreSection from '@/components/ExploreSection';
import PremiumShopSection from '@/components/PremiumShopSection';
import PackagesSection from '@/components/PackagesSection';
import Footer from '@/components/Footer';
import TestimonialsSection from '@/components/TestimonialsSection';

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

        <section className="h-12 sm:h-16 bg-white"></section>

        {/* Explore Section */}
        <ExploreSection />

        <section className="h-12 sm:h-16 bg-white"></section>

        {/* Testimonials Section */}
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
