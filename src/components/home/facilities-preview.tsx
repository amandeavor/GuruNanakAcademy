'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { FACILITIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

const facilityAccents = [
  'bg-emerald-500/10 text-emerald-400',
  'bg-sky-500/10 text-sky-400',
  'bg-amber-500/10 text-amber-400',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.98 },
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

export function FacilitiesPreview() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [featured, ...rest] = FACILITIES;
  const FeaturedIcon = featured.icon;

  return (
    <section
      ref={ref}
      className="section-padding relative bg-background transition-colors duration-300"
      aria-labelledby="facilities-heading"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            World-Class Amenities
          </span>
          <h2
            id="facilities-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            Our Facilities
          </h2>
        </motion.div>

        {/* Asymmetric grid: 1 featured + 2 smaller */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 lg:grid-cols-5"
        >
          {/* Featured card — spans 3 cols */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-3"
          >
            <Link
              href={featured.href}
              className={cn(
                'group relative flex h-full flex-col rounded-2xl border border-border/60 bg-card p-5 xs:p-6 sm:p-8 md:p-10',
                'transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.02] hover:shadow-xl dark:hover:border-white/20 dark:hover:bg-white/[0.05]'
              )}
            >
              <div className="mb-auto">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                  <FeaturedIcon className="h-6 w-6 text-emerald-400" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
                  {featured.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {featured.description}
                </p>
              </div>
              <ul className="mt-8 space-y-2.5">
                {featured.highlights.slice(0, 4).map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500/80" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Smaller cards — span 2 cols, stacked */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {rest.map((facility, i) => {
              const Icon = facility.icon;
              const accentClass = facilityAccents[(i + 1) % facilityAccents.length];
              return (
                <motion.div
                  key={facility.id}
                  variants={cardVariants}
                  className="flex-1"
                >
                  <Link
                    href={facility.href}
                    className={cn(
                      'group relative flex h-full flex-col rounded-2xl border border-border/60 bg-card p-5 xs:p-6',
                      'transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.02] hover:shadow-lg dark:hover:border-white/20 dark:hover:bg-white/[0.05]'
                    )}
                  >
                    <div className={cn('mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg', accentClass)}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{facility.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{facility.description}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground/60 transition-colors group-hover:text-foreground">
                      View more
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
