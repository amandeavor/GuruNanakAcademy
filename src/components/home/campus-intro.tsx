'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: '50+', label: 'Years of Excellence' },
  { value: '13', label: 'Acre Campus' },
  { value: 'N–XII', label: 'All Grades' },
  { value: '4', label: 'School Houses' },
];

export function CampusIntro() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-background py-20 md:py-36 lg:py-44 transition-colors duration-300"
      aria-labelledby="campus-heading"
    >
      {/* Subtle grid overlay */}
      <div className="theme-grid-overlay" aria-hidden="true" />

      {/* Radial glow — centered */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full blur-[120px]"
        style={{ background: 'var(--radial-glow)' }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            Campus Information
          </motion.span>

          <motion.h2
            id="campus-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          >
            A Campus Built for Excellence
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="mt-5 space-y-3 text-sm text-muted-foreground md:text-lg md:space-y-4"
          >
            <p>
              Our school boasts of a state-of-the-art infrastructure, with modern
              facilities that meet the highest standards of education and comfort.
              The design is not only visually appealing but also environment
              friendly, incorporating green spaces and sustainable practices.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.24, ease }}
            className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 md:grid-cols-4"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center bg-card dark:bg-white/[0.04] px-4 py-6 md:px-6 md:py-8"
              >
                <span className="text-2xl font-bold text-foreground md:text-3xl">{stat.value}</span>
                <span className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.32, ease }}
            className="mt-10"
          >
            <Button
              asChild
              size="lg"
              className="group bg-primary text-primary-foreground hover:opacity-90 shadow-md font-medium border-0"
            >
              <Link href="/admission/form">
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
