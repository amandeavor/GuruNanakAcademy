'use client';

import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SCHOOL_INFO } from '@/lib/constants';
import { useEffect, useRef, useState } from 'react';
import { VideoFrameSequence } from '@/components/home/video-frame-sequence';

// Animated counter — clean, no bounce
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const numericValue = parseInt(value.replace(/\D/g, ''));
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += numericValue / steps;
      if (current >= numericValue) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current).toString());
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

const premiumEase = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const scrollContainerRef = useRef<HTMLElement>(null);

  // Fade out content as user scrolls deeper into the frame sequence
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
    layoutEffect: false,
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65], [1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.35, 0.65], [0, 0, -60]);

  const textVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay: 0.2 + i * 0.12,
        ease: premiumEase,
      },
    }),
  };

  const statVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.8 + i * 0.08,
        ease: premiumEase,
      },
    }),
  };

  return (
    <section
      ref={scrollContainerRef}
      className="relative h-[200vh] md:h-[280vh]"
      aria-label="Hero section"
    >
      {/* Sticky viewport — this is what the user sees */}
      <div className="sticky top-0 h-screen min-h-[100svh] overflow-hidden bg-black">

        {/* Canvas frame sequence background */}
        <VideoFrameSequence scrollContainerRef={scrollContainerRef} />

        {/* Cinematic overlays for text readability */}
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
          aria-hidden="true"
        />

        {/* Content overlay */}
        <motion.div
          className="absolute inset-0 z-10 flex items-end"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="container-custom w-full pb-8 xs:pb-12 md:pb-20 lg:pb-24">
            <div className="max-w-3xl">

              {/* Admissions pill — understated, refined */}
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider xs:tracking-widest text-white/80 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/60" aria-hidden="true" />
                  Admissions Open 2026–27
                </span>
              </motion.div>

              {/* Main heading — large, weighted, white */}
              <motion.h1
                custom={1}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="mt-4 text-balance text-2xl font-semibold tracking-tight text-white xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.08]"
              >
                {SCHOOL_INFO.name}
              </motion.h1>

              {/* Tagline — muted, elegant */}
              <motion.p
                custom={2}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 xs:text-base md:text-lg"
              >
                {SCHOOL_INFO.tagline}. Nurturing minds and building character
                since {SCHOOL_INFO.founded} on our {SCHOOL_INFO.campusSize}{' '}
                campus in Dehradun.
              </motion.p>

              {/* CTA Buttons — clean, no glow effects */}
              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <Button
                  asChild
                  size="xl"
                  className="group bg-white text-black hover:bg-white/90 border-0 font-medium w-full h-12 text-base px-6 sm:h-14 sm:text-lg sm:px-8 sm:w-auto"
                >
                  <Link href="/admission/form">
                    Apply for Admission
                    <ArrowRight
                      className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="xl"
                  className="group border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm w-full h-12 text-base px-6 sm:h-14 sm:text-lg sm:px-8 sm:w-auto"
                >
                  <Link href="/pay-fee">
                    <CreditCard
                      className="mr-2 h-4 w-4 opacity-70"
                      aria-hidden="true"
                    />
                    Pay Fee
                  </Link>
                </Button>
              </motion.div>

              {/* Stats strip — minimal, separated by subtle dividers */}
              <motion.div
                custom={4}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="mt-6 grid grid-cols-2 gap-y-4 gap-x-6 xs:flex xs:flex-wrap xs:items-center xs:gap-6 md:gap-8"
              >
                {[
                  { value: '13', suffix: ' Acres', label: 'Campus' },
                  { value: '1972', suffix: '', label: 'Established' },
                  { value: 'N-XII', suffix: '', label: 'Classes' },
                  { value: 'CISCE', suffix: '', label: 'Affiliated' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={statVariants}
                    className="flex items-baseline gap-2"
                  >
                    <span className="text-xl font-semibold tabular-nums text-white md:text-3xl">
                      {stat.value.match(/^\d+$/) ? (
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      ) : (
                        stat.value + stat.suffix
                      )}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-white/50">
                      {stat.label}
                    </span>
                    {i < 3 && (
                      <span className="ml-4 hidden h-5 w-px bg-white/15 xs:block" aria-hidden="true" />
                    )}
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        </motion.div>

        {/* Scroll indicator — subtle, bottom-center */}
        <motion.div
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          aria-hidden="true"
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              Scroll
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
