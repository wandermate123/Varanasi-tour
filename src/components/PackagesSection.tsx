'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type PackageItem = {
  id: string;
  title: string;
  days: number;
  nights: number;
  price: number;
  image: string;
  link: string;
};

const packages: PackageItem[] = [
  {
    id: 'ganga-expedition',
    title: 'Ganga Aarti Expedition',
    days: 7,
    nights: 6,
    price: 799,
    image: '/images/hero.jpg',
    link: '/explore/events'
  },
  {
    id: 'roma-analog',
    title: 'Roma City Adventure',
    days: 5,
    nights: 4,
    price: 799,
    image: '/images/hero2.jpg',
    link: '/explore/ghats'
  },
  {
    id: 'mediterranean',
    title: 'Historic Mediterranean Voyage',
    days: 5,
    nights: 4,
    price: 1899,
    image: '/images/hero3.jpg',
    link: '/explore/events'
  },
  {
    id: 'wildlife-safari',
    title: 'Wildlife Safari Expedition',
    days: 7,
    nights: 6,
    price: 1899,
    image: '/images/stays.jpg',
    link: '/explore/stay'
  }
];

export default function PackagesSection() {
  return (
    <section className="bg-white py-14 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-end mb-10 md:mb-14">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] text-gray-900">
              <span>Must </span>
              <span className="font-serif italic font-normal">experience</span>
              <br />
              <span>packages</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 md:gap-5">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-lg">
              Indulge in our carefully crafted packages to immerse you in the most captivating and transformative travel adventures.
            </p>
            <div>
              <Link href="/services" className="text-gray-900 font-semibold underline underline-offset-4 hover:opacity-80">
                See All Packages
              </Link>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative rounded-3xl overflow-hidden shadow-xl bg-gray-100"
            >
              <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[4/5]">
                <Image src={pkg.image} alt={pkg.title} fill className="object-cover" priority={index === 0} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-white text-lg sm:text-xl md:text-2xl font-semibold drop-shadow">
                        {pkg.title}
                      </div>
                      <div className="text-white/90 text-sm sm:text-base mt-1">
                        {pkg.days} days, {pkg.nights} nights
                      </div>
                    </div>
                    <div className="text-white text-base sm:text-lg md:text-xl font-semibold bg-black/30 backdrop-blur px-3 py-1.5 rounded-full">
                      ${' '}{pkg.price}
                    </div>
                  </div>
                </div>
                <Link href={pkg.link} className="absolute inset-0" aria-label={pkg.title} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

