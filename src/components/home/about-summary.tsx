'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SCHOOL_INFO } from '@/lib/constants';
import { useRef } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

export function AboutSummary() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section
      ref={ref}
      className="section-padding relative bg-muted/30"
      aria-labelledby="about-heading"
    >
      <div className="container-custom">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease }}
            className="relative"
          >
            <motion.div
              className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:rounded-3xl"
              style={{ y: imageY }}
            >
              <Image
                src="/images/about.png"
                alt="Guru Nanak Academy campus building"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
            </motion.div>

            {/* Stats card — clean glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35, ease }}
              className="absolute -bottom-4 right-2 rounded-xl border border-border/60 dark:border-white/10 bg-card/90 dark:bg-zinc-900/90 px-4 py-3 shadow-2xl backdrop-blur-md sm:-bottom-6 sm:-right-4 md:-right-6 sm:px-7 sm:py-5 md:px-7 md:py-5"
            >
              <p className="text-3xl font-bold text-foreground md:text-5xl">
                50+
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Years of Excellence
              </p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              About Us
            </span>

            <h2
              id="about-heading"
              className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            >
              Nurturing Excellence Since {SCHOOL_INFO.founded}
            </h2>

            <div className="mt-7 space-y-4 text-muted-foreground">
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {SCHOOL_INFO.name} is one of the finest co-educational boarding
                and day-boarding Schools in India with a strong intellectual
                heart-beat. The Academy is set up on a sprawling campus of{' '}
                <span className="font-medium text-foreground">{SCHOOL_INFO.campusSize}</span>{' '}
                in the heart of Dehradun.
              </p>
              <p className="text-base leading-relaxed">
                Founded by Guru Nanak Academy Society in{' '}
                <span className="font-medium text-foreground">{SCHOOL_INFO.founded}</span> on
                the occasion of the 500th birth anniversary of Shri Guru Nanak Dev
                Ji, who stood for truthful living and equality of all religions,
                caste and creed.
              </p>
              <p className="text-base leading-relaxed">
                The Academy caters to the academic, emotional, social,
                psychological and co-curricular needs of students from Nursery to
                Class XII, affiliated to{' '}
                <span className="font-medium text-foreground">{SCHOOL_INFO.affiliation}</span>.
              </p>
            </div>

            <motion.div
              className="mt-9"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button asChild size="lg" variant="outline" className="group">
                <Link href="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
