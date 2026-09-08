'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { SCHOOL_INFO } from '@/lib/constants';

export function AboutContent() {
  return (
    <div className="space-y-16">
      {/* Legacy Section - Lead Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-primary">
          <span>Established 1972</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">
          Rooted in Dehradun since 1972.
        </h2>
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
          <p>
            <span className="font-semibold text-foreground">{SCHOOL_INFO.name}</span> is one of the
            finest co-educational boarding and day-boarding Schools in India with a strong
            intellectual heart-beat. The Academy is set up on a sprawling campus of{' '}
            {SCHOOL_INFO.campusSize} in the heart of the city of Dehradun and has easy accessibility
            and connectivity by Air, train and road with all parts of the country.
          </p>
          <p className="border-l-4 border-primary/20 pl-6 text-base md:text-lg">
            The Academy was founded by Guru Nanak Academy Society in {SCHOOL_INFO.founded} on the
            occasion of the 500th birth anniversary of Shri Guru Nanak Dev Ji who stood for truthful
            living and equality of all religions, caste and creed.
          </p>
          <p className="text-base">
            Education is imparted on public school lines and the Academy caters to the academic,
            emotional, social, psychological and co-curricular needs of students of all age groups
            from Nursery to class XII.
          </p>
        </div>
      </motion.div>

      {/* Philosophy Section - Featured Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden border-t border-border pt-8"
      >
        <div className="relative z-10">
          <h3 className="mb-8 flex items-center gap-3 text-2xl font-bold">
            <BookOpen className="h-6 w-6 text-primary" />
            Our Philosophy
          </h3>

          <div className="max-w-3xl">
            <blockquote className="space-y-6">
              <p className="text-xl font-normal italic leading-relaxed text-foreground md:text-2xl">
                "Main nahi, kich houn nahi, kich aye na mora, awsar lajja raakh le, sadna jan tera"
              </p>
              <footer className="flex items-center gap-4">
                <div className="h-px w-12 bg-primary/30" />
                <cite className="text-sm font-semibold uppercase not-italic tracking-wider text-muted-foreground">
                  — Bhagat Sadna, Shri Guru Granth Sahib
                </cite>
              </footer>
            </blockquote>

            <div className="mt-8 rounded-md border border-border/50 bg-background/50 p-6 backdrop-blur-sm">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Lord I am nothing, nothing belongs to me, I know nothing – Yet you somehow do always
                come at the right moment to help me to keep alive my self respect and esteem.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
