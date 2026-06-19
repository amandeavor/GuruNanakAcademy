'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { LABS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

const labAccents = [
  { top: 'bg-blue-500', icon: 'text-blue-400', bg: 'bg-blue-500/10' },
  { top: 'bg-emerald-500', icon: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { top: 'bg-violet-500', icon: 'text-violet-400', bg: 'bg-violet-500/10' },
  { top: 'bg-amber-500', icon: 'text-amber-400', bg: 'bg-amber-500/10' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function LabCards() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="section-padding relative bg-background"
      aria-labelledby="labs-heading"
    >
      <div className="container-custom">
        {/* Header — editorial split layout */}
        <motion.div
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              State-of-the-Art
            </span>
            <h2
              id="labs-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            >
              Our Laboratories
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground md:text-right md:text-base">
            Hands-on learning with modern instruments and the latest technology.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {LABS.map((lab, i) => {
            const Icon = lab.icon;
            const accent = labAccents[i % labAccents.length];
            return (
              <motion.div
                key={lab.id}
                variants={cardVariants}
              >
                <Link
                  href={`/facilities#${lab.id}`}
                  className={cn(
                    'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card',
                    'transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/20'
                  )}
                >
                  {/* Accent top strip */}
                  <div className={cn('h-0.5 w-full shrink-0', accent.top)} />

                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    {/* Number + icon row */}
                    <div className="mb-5 flex items-start justify-between">
                      <span className="text-xs font-medium tabular-nums text-muted-foreground/40">
                        0{i + 1}
                      </span>
                      <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', accent.bg)}>
                        <Icon className={cn('h-4.5 w-4.5', accent.icon)} aria-hidden="true" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 text-base font-semibold text-foreground md:text-lg">
                      {lab.shortTitle}
                    </h3>

                    {/* Description */}
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {lab.description}
                    </p>

                    {/* Link */}
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                      Explore lab
                      <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
