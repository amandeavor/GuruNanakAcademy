'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;

const timelineData = [
  {
    year: '1972',
    title: 'Foundation',
    description:
      'Guru Nanak Academy was founded by Guru Nanak Academy Society on the 500th birth anniversary of Shri Guru Nanak Dev Ji.',
  },
  {
    year: '1980s',
    title: 'Growth & Development',
    description:
      'The school expanded its facilities and curriculum, establishing itself as a premier educational institution in Dehradun.',
  },
  {
    year: '1990s',
    title: 'CISCE Affiliation',
    description:
      'Achieved affiliation with the Council for the Indian School Certificate Examinations (CISCE), New Delhi.',
  },
  {
    year: '2000s',
    title: 'Infrastructure Expansion',
    description:
      'Major infrastructure development including new laboratories, library expansion, and sports facilities.',
  },
  {
    year: '2020',
    title: 'Digital Transformation',
    description:
      'Adapted to modern educational needs with digital classrooms and online learning capabilities.',
  },
  {
    year: '2023',
    title: 'Boarding Facility Launch',
    description:
      'Introduced boarding school facility for boys from class V onwards and expanded day-boarding services.',
  },
  {
    year: 'Present',
    title: 'Continuing Excellence',
    description:
      'Continuing to provide holistic education with new subject options including Psychology, Physical Education, and Fine Arts.',
  },
];

function TimelineItem({ item, index }: { item: typeof timelineData[0]; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={itemRef}
      className="relative grid grid-cols-[40px_1fr] gap-6 md:grid-cols-[120px_40px_1fr] md:gap-8"
    >
      {/* Year — visible on md+ */}
      <div className="hidden md:flex items-start justify-end pt-1">
        <motion.span
          className={cn("text-base font-bold font-sans tabular-nums transition-colors duration-500", isInView ? "text-foreground" : "text-zinc-500")}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          {item.year}
        </motion.span>
      </div>

      {/* Dot */}
      <div className="relative flex flex-col items-center w-10">
        <motion.div
          className={cn(
            "mt-2 h-3.5 w-3.5 rounded-full border-2 transition-all duration-500 z-20",
            isInView
              ? "bg-primary border-primary shadow-[0_0_10px_rgba(167,139,250,0.6)]"
              : "bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
          )}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1.1, opacity: 1 } : { scale: 1, opacity: 0.5 }}
          transition={{ duration: 0.4, delay: 0.15, ease }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="pb-12 md:pb-14"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.08, ease }}
      >
        {/* Year — mobile only */}
        <span className={cn("mb-1 block text-xs font-bold uppercase tracking-wider md:hidden transition-colors duration-500", isInView ? "text-foreground" : "text-zinc-500")}>
          {item.year}
        </span>
        <h3 className={cn("text-lg font-semibold tracking-tight transition-colors duration-500", isInView ? "text-foreground" : "text-zinc-500 dark:text-zinc-400")}>
          {item.title}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
    layoutEffect: false,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 25,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="section-padding bg-muted/30" aria-labelledby="timeline-heading">
      <div className="container-custom">
        <div className="mb-16 max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"
          >
            Our Journey
          </motion.span>
          <motion.h2
            id="timeline-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            Timeline of Excellence
          </motion.h2>
        </div>

        <div className="relative mx-auto max-w-3xl" ref={containerRef}>
          {/* Static background track line */}
          <div className="absolute left-[19px] md:left-[139px] top-2 bottom-2 w-[2px] bg-zinc-200 dark:bg-zinc-800" />

          {/* Animated progress overlay on the line */}
          <motion.div
            className="absolute left-[19px] md:left-[139px] top-2 w-[2px] bg-primary shadow-[0_0_8px_rgba(255,140,66,0.6)] z-10 origin-top"
            style={{ height: lineHeight }}
            aria-hidden="true"
          />

          {timelineData.map((item, index) => (
            <TimelineItem key={item.year} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
