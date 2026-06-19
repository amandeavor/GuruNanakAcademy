'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SAMPLE_EVENTS } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

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

export function EventsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const featuredEvents = SAMPLE_EVENTS.filter((e) => e.featured).slice(0, 3);

  return (
    <section
      ref={ref}
      className="section-padding relative bg-background"
      aria-labelledby="events-heading"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-5 md:mb-14 sm:flex-row sm:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              School Life
            </span>
            <h2
              id="events-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            >
              Latest Events
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease }}
          >
            <Button asChild variant="outline" className="group">
              <Link href="/events">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Events Grid — uniform 3 columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {featuredEvents.map((event) => (
            <motion.article
              key={event.id}
              variants={cardVariants}
            >
              <Link
                href={`/events/${event.slug}`}
                className={cn(
                  'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card',
                  'transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/20'
                )}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={event.image || '/images/about.png'}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <Badge variant="secondary" className="border-0 bg-black/40 text-white backdrop-blur-md text-xs">
                      {event.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                    <time dateTime={event.date}>{formatDate(event.date)}</time>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary dark:group-hover:text-white transition-colors">
                    {event.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {event.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground/60 transition-colors group-hover:text-foreground">
                    Read More
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
