'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    colorClass: 'text-gold',
    bgClass: 'bg-forest/10 border-forest/20',
    glowClass: '',
    description:
      'To impart liberal and balanced education according to the current needs of society, inspiring students to respect and follow the rich cultural heritage of India while preparing them for global challenges.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    colorClass: 'text-purple-400',
    bgClass: 'bg-purple-950/20 border-purple-800/20',
    glowClass: '',
    description:
      'To be a leading institution that nurtures intellectually curious, socially responsible, and morally upright citizens who contribute positively to society and uphold the values of truthful living.',
  },
  {
    icon: Heart,
    title: 'Our Values',
    colorClass: 'text-red-400',
    bgClass: 'bg-red-950/20 border-red-850/20',
    glowClass: '',
    description:
      'Character building, discipline, spirit-de-corps, holistic development, empathy, fair play, and honesty. We believe in divinity, service to society, and cultivating a grateful heart.',
  },
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

export function MissionVision() {
  return (
    <section className="section-padding bg-background" aria-labelledby="mission-heading">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            What Drives Us
          </motion.span>
          <motion.h2
            id="mission-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-heading-xl font-bold text-foreground md:text-display"
          >
            Mission, Vision & Values
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-8 md:grid-cols-3"
        >
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="rounded-2xl border border-border bg-card p-6 text-center md:p-8 hover:shadow-2xl transition-all duration-300 shadow-xl hover:border-primary/25"
              >
                <div className={cn(
                  "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl md:mb-5 md:h-16 md:w-16 transition-all duration-300",
                  item.bgClass,
                  item.colorClass,
                  item.glowClass
                )}>
                  <Icon className="h-6 w-6 md:h-8 md:w-8" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Core Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="mb-8 text-center text-heading-lg font-bold text-foreground">
            What We Strive to Imbibe
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
            {[
              'Character Building',
              'Discipline',
              'Spirit de Corps',
              'Holistic Development',
              'Empathy',
              'Fair Play',
              'Honesty',
              'Service',
            ].map((value, index) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-border bg-secondary/30 dark:bg-zinc-900/60 p-4 text-center hover:border-primary/40 hover:text-primary transition-colors duration-300 cursor-default"
              >
                <span className="text-sm font-medium transition-colors">{value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
