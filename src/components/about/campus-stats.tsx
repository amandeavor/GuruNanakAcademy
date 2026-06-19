'use client';

import { motion, useInView } from 'framer-motion';
import { CAMPUS_STATS } from '@/lib/constants';
import { useRef } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

export function CampusStats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="bg-background py-16 md:py-24 transition-colors duration-300">
      <div className="container-custom">
        {/* Editorial rule + label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="mb-12 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
            By the Numbers
          </span>
          <div className="h-px flex-1 bg-border" />
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 divide-x divide-border md:grid-cols-4">
          {CAMPUS_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="flex flex-col items-center px-6 py-4 text-center first:pl-0 last:pr-0 md:px-10"
            >
              <span className="text-4xl font-bold tabular-nums text-foreground md:text-6xl lg:text-7xl">
                {stat.value}
                {stat.unit && (
                  <span className="ml-1 text-2xl font-medium text-muted-foreground md:text-4xl">
                    {stat.unit}
                  </span>
                )}
              </span>
              <span className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/60">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom rule */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="mt-12 h-px bg-border"
        />
      </div>
    </section>
  );
}
