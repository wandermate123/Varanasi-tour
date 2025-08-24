'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type ParikramaSegment = {
  id: string;
  label: 'Dawn' | 'Midday' | 'Dusk' | 'Night';
  templeName: string;
  headline: string;
  mythBite: string;
  quest: string;
  proTip: string;
  image: string;
  overlayFrom: string; // tailwind gradient start color class
  overlayTo: string; // tailwind gradient end color class
};

export default function TemplesPage() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAmbientOn, setIsAmbientOn] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);

  const segments: ParikramaSegment[] = useMemo(
    () => [
      {
        id: 'dawn',
        label: 'Dawn',
        templeName: 'Kashi Vishwanath',
        headline: 'Parikrama Story',
        mythBite: 'When the first conch splits the sky, the city wakes to Shiva’s breath.',
        quest: 'Stand still for 30 seconds at first light—listen for the bell before you see it.',
        proTip: 'Arrive before Mangala Aarti for the softest light and thinnest crowds.',
        image: '/images/hero2.jpg',
        overlayFrom: 'from-amber-900/70',
        overlayTo: 'to-amber-600/20'
      },
      {
        id: 'midday',
        label: 'Midday',
        templeName: 'Annapurna Devi',
        headline: 'The City Feeds the City',
        mythBite: 'Her blessing is grain; her grace is enough for all who arrive hungry.',
        quest: 'Offer a silent gratitude before your meal; share water with a passerby.',
        proTip: 'Keep offerings simple. Respect the sanctity of food.',
        image: '/images/temples.jpg',
        overlayFrom: 'from-amber-800/70',
        overlayTo: 'to-yellow-500/20'
      },
      {
        id: 'dusk',
        label: 'Dusk',
        templeName: 'Durga (Shakti) Temple',
        headline: 'Red Walls, Living Pulse',
        mythBite: 'Where Shakti hums, prayers don’t travel—they tremble.',
        quest: 'Trace your thumb along your wrist—feel your pulse; match it to aarti rhythm.',
        proTip: 'Do not feed monkeys. Keep distance and calm body language.',
        image: '/images/hero4.jpg',
        overlayFrom: 'from-rose-900/70',
        overlayTo: 'to-orange-500/20'
      },
      {
        id: 'night',
        label: 'Night',
        templeName: 'Kaal Bhairav',
        headline: 'The City’s Keeper',
        mythBite: 'None leaves Kashi without his leave—so the elders say.',
        quest: 'Before you end the day, release one worry to the river or the wind.',
        proTip: 'Observe first. Some rituals restrict photography and proximity.',
        image: '/images/hero5.jpg',
        overlayFrom: 'from-slate-950/80',
        overlayTo: 'to-indigo-700/20'
      }
    ],
    []
  );

  // Section visibility tracking
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el, idx) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setActiveIndex(idx);
              if (isAmbientOn) {
                playSoftBell();
              }
            }
          });
        },
        { threshold: [0.5] }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isAmbientOn]);

  // Minimal bell using WebAudio for ambience (no external assets)
  const playSoftBell = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = ctx.currentTime;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.05, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      gain.connect(ctx.destination);

      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(520, now);
      osc1.connect(gain);
      osc1.start(now);
      osc1.stop(now + 1.25);

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(780, now + 0.03);
      osc2.connect(gain);
      osc2.start(now + 0.03);
      osc2.stop(now + 0.9);
    } catch {
      // ignore if AudioContext blocked
    }
  };

  const scrollToIndex = (idx: number) => {
    const el = sectionRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Extended catalog for non-list immersive browsing
  type CatalogTemple = {
    id: string;
    name: string;
    deity: string;
    bestMoment: 'Sunrise' | 'Midday' | 'Golden Hour' | 'Night';
    vibe: string[];
    image: string;
  };

  const catalog: CatalogTemple[] = useMemo(
    () => [
      { id: 'kashi', name: 'Kashi Vishwanath', deity: 'Shiva', bestMoment: 'Sunrise', vibe: ['Ancient', 'Intense'], image: '/images/hero2.jpg' },
      { id: 'annapurna', name: 'Annapurna Devi', deity: 'Shakti', bestMoment: 'Midday', vibe: ['Grace', 'Nourish'], image: '/images/temples.jpg' },
      { id: 'durga', name: 'Durga Temple', deity: 'Shakti', bestMoment: 'Golden Hour', vibe: ['Fierce', 'Vibrant'], image: '/images/hero4.jpg' },
      { id: 'bhairav', name: 'Kaal Bhairav', deity: 'Shiva', bestMoment: 'Night', vibe: ['Guardian', 'Fierce'], image: '/images/hero5.jpg' },
      { id: 'sankat', name: 'Sankat Mochan', deity: 'Hanuman', bestMoment: 'Sunrise', vibe: ['Devotion', 'Protection'], image: '/images/hero1.jpg' },
      { id: 'tulsi', name: 'Tulsi Manas', deity: 'Shiva', bestMoment: 'Golden Hour', vibe: ['Literary', 'Calm'], image: '/images/hero3.jpg' },
      { id: 'bharat-mata', name: 'Bharat Mata', deity: 'Bharat Mata', bestMoment: 'Midday', vibe: ['Unique', 'Patriotic'], image: '/images/hero.jpg' },
      { id: 'nepal', name: 'Nepali Temple', deity: 'Shiva', bestMoment: 'Golden Hour', vibe: ['Woodcraft', 'Quiet'], image: '/images/hero2.jpg' },
      { id: 'mrityunjay', name: 'Mrityunjay Mahadev', deity: 'Shiva', bestMoment: 'Night', vibe: ['Healing', 'Chant'], image: '/images/hero5.jpg' },
      { id: 'bindu', name: 'Bindu Madhav', deity: 'Vishnu', bestMoment: 'Sunrise', vibe: ['Serene', 'Ancient'], image: '/images/hero2.jpg' },
      { id: 'annapurna-swarup', name: 'Vishalakshi', deity: 'Shakti', bestMoment: 'Midday', vibe: ['Shakti Peeth', 'Blessing'], image: '/images/temples.jpg' },
      { id: 'tilt', name: 'Ratneshwar (Tilting)', deity: 'Shiva', bestMoment: 'Night', vibe: ['Iconic', 'Mystery'], image: '/images/hero5.jpg' }
    ],
    []
  );

  const groupOrder: Array<CatalogTemple['bestMoment']> = ['Sunrise', 'Midday', 'Golden Hour', 'Night'];
  const groupLabel: Record<CatalogTemple['bestMoment'], string> = {
    Sunrise: 'Sunrise Sanctums',
    Midday: 'Midday Grace',
    'Golden Hour': 'Golden Hour Radiance',
    Night: 'Midnight Guardians'
  };

  const bestMomentToSegmentIndex: Record<CatalogTemple['bestMoment'], number> = {
    Sunrise: 0,
    Midday: 1,
    'Golden Hour': 2,
    Night: 3
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-black text-white">
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 z-40 origin-left bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500"
        style={{ scaleX: progress }}
      />

      {/* Navigation + Controls */}
      <div className="fixed top-4 left-0 right-0 z-40">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between rounded-2xl backdrop-blur-md bg-white/10 border border-white/10 px-4 py-2">
            <nav className="hidden md:flex items-center space-x-2 text-sm text-white/80">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/50">/</span>
              <Link href="/#explore" className="hover:text-white transition-colors">Explore</Link>
              <span className="text-white/50">/</span>
              <span className="text-white font-medium">Parikrama Story</span>
        </nav>
            <div className="flex items-center gap-3">
              <button
                aria-label="Ambient sound toggle"
                onClick={() => setIsAmbientOn((v) => !v)}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors border border-white/20 ${
                  isAmbientOn ? 'bg-amber-500/30' : 'bg-white/10'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${
                    isAmbientOn ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
                <span className="absolute left-2 text-[10px] uppercase tracking-wider text-white/70">Off</span>
                <span className="absolute right-2 text-[10px] uppercase tracking-wider text-amber-200">On</span>
              </button>
              <button
                onClick={() => setIsBrowseOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-sm"
              >
                Browse All Shrines
              </button>
              <button
                onClick={() => scrollToIndex(0)}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-sm"
              >
                Start Parikrama
              </button>
            </div>
      </div>
        </div>
        </div>

      {/* Scrollytale Sections */}
      <main className="w-full">
        {segments.map((seg, idx) => (
          <section
            key={seg.id}
            ref={(el) => (sectionRefs.current[idx] = el)}
            className="relative min-h-screen flex items-end"
          >
            {/* Background image */}
            <div className="absolute inset-0 -z-10">
              <Image
                src={seg.image}
                alt={`${seg.label} backdrop`}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-b ${seg.overlayFrom} ${seg.overlayTo}`} />
              <div className="absolute inset-0 bg-black/30" />
        </div>

            {/* Content */}
            <div className="container max-w-7xl mx-auto px-6 pb-20 pt-40 w-full">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
                className="max-w-3xl"
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/15 backdrop-blur-md">
                    {seg.label}
                  </span>
                  <span className="text-white/70 text-sm">{seg.templeName}</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black leading-tight drop-shadow-[0_3px_10px_rgba(0,0,0,0.35)]">
                  {seg.headline}
                </h1>
                <p className="mt-4 text-lg md:text-xl text-white/85">
                  {seg.mythBite}
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl p-4 bg-white/10 border border-white/15 backdrop-blur-md">
                    <div className="text-amber-200 text-sm mb-1">Quest</div>
                    <div className="text-white/90 text-sm md:text-base">{seg.quest}</div>
                </div>
                  <div className="rounded-2xl p-4 bg-white/10 border border-white/15 backdrop-blur-md">
                    <div className="text-amber-200 text-sm mb-1">Pro tip</div>
                    <div className="text-white/90 text-sm md:text-base">{seg.proTip}</div>
                  </div>
                  <div className="rounded-2xl p-4 bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-between">
                    <div className="text-white/80 text-sm">Continue the parikrama</div>
                    {idx < segments.length - 1 ? (
                      <button
                        onClick={() => scrollToIndex(idx + 1)}
                        className="px-3 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-300/30 text-amber-100 text-sm"
                      >
                        Next →
                      </button>
                    ) : (
                      <Link
                        href="/explore/temples"
                        className="px-3 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-300/30 text-emerald-100 text-sm"
                      >
                        Restart
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
                </div>

            {/* Floating time-of-day badge */}
            <div className="absolute top-24 right-6 sm:right-10">
                  <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="px-4 py-2 rounded-full bg-black/30 border border-white/15 backdrop-blur-md text-sm"
              >
                {seg.label}
              </motion.div>
            </div>
          </section>
        ))}
      </main>

      {/* Bottom segment indicators */}
      <div className="fixed bottom-6 left-0 right-0 z-40">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {segments.map((s, i) => (
              <button
                key={s.id}
                onClick={() => scrollToIndex(i)}
                className={`h-3 w-3 rounded-full transition-all border ${
                  i === activeIndex
                    ? 'w-10 bg-amber-400 border-amber-300'
                    : 'bg-white/20 border-white/30 hover:bg-white/30'
                }`}
                aria-label={`Jump to ${s.label}`}
              />
            ))}
          </div>
        </div>
                      </div>
                      
      {/* Fullscreen Browse Overlay */}
      {isBrowseOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsBrowseOpen(false)} />
          <div className="relative h-full w-full flex flex-col">
            <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-white/10 bg-gradient-to-b from-black/60 to-black/30">
                      <div>
                <div className="text-xs text-white/60 tracking-wider uppercase">Catalog</div>
                <h3 className="text-xl font-semibold">Browse Shrines by Moment</h3>
              </div>
              <button
                onClick={() => setIsBrowseOpen(false)}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-sm"
                aria-label="Close browse"
              >
                Close
              </button>
                      </div>
                      
            <div className="flex-1 overflow-y-auto">
              {groupOrder.map((moment) => {
                const items = catalog.filter((t) => t.bestMoment === moment);
                return (
                  <section key={moment} className="py-8">
                    <div className="container max-w-7xl mx-auto px-6">
                      <div className="flex items-end justify-between mb-4">
                      <div>
                          <h4 className="text-lg font-semibold">{groupLabel[moment]}</h4>
                          <p className="text-xs text-white/60">Best at {moment} · {items.length} shrines</p>
                        </div>
                      </div>
                      <div className="relative -mx-2">
                        <div className="flex gap-4 overflow-x-auto px-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/20">
                          {items.map((t) => (
                            <div key={t.id} className="snap-start shrink-0 w-64">
                              <div className="relative h-40 rounded-2xl overflow-hidden border border-white/15">
                                <Image src={t.image} alt={t.name} fill sizes="256px" className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
                                <div className="absolute bottom-3 left-3 right-3">
                                  <div className="text-xs text-white/70">{t.deity}</div>
                                  <div className="font-semibold">{t.name}</div>
                                  <div className="mt-1 flex flex-wrap gap-1">
                                    {t.vibe.slice(0, 3).map((v) => (
                                      <span key={v} className="px-2 py-0.5 rounded-full text-[10px] bg-white/10 border border-white/15">{v}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2 flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setIsBrowseOpen(false);
                                    scrollToIndex(bestMomentToSegmentIndex[moment]);
                                  }}
                                  className="flex-1 px-3 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-300/30 text-amber-100 text-sm"
                                >
                                  Jump to Story
                                </button>
                                <button
                                  disabled
                                  title="Coming soon"
                                  className="px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white/70 text-sm cursor-not-allowed"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 