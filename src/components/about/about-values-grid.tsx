'use client';

import { motion } from 'framer-motion';
import { Heart, Award, Sparkles, HandHeart, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export function AboutValuesGrid() {
    return (
        <section className="py-12 md:py-20 lg:py-28 bg-muted/30">
            <div className="container-custom">
                {/* Section Header */}
                <div className="mb-8 md:mb-16 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-medium uppercase tracking-wider text-muted-foreground"
                    >
                        What We Stand For
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-3 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl"
                    >
                        Our Foundation
                    </motion.h2>
                </div>

                {/* Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid gap-6 md:grid-cols-3 md:grid-rows-2"
                >
                    {/* Featured Card - Core Values (Large) */}
                    <motion.div
                        variants={cardVariants}
                        className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:row-span-2 transition-all hover:border-emerald-500/30 hover:shadow-lg"
                    >
                        <div className="relative z-10 flex h-full flex-col">
                            <div className="mb-auto">
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-forest/10 text-gold">
                                    <Heart className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Core Values</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Divinity, service to society, and a grateful heart are the key quality traits nurtured in every student of Guru Nanak Academy.
                                </p>
                            </div>

                            <ul className="mt-8 space-y-3">
                                {['Truthful Living', 'Equality', 'Humility', 'Compassion'].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm md:text-base font-medium text-muted-foreground">
                                        <Sparkles className="h-4.5 w-4.5 shrink-0 text-gold" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Standard Cards */}
                    {[
                        {
                            title: 'Community Service',
                            icon: HandHeart,
                            description: 'Students participate in Gurudwara visits for Shabad chanting and neighborhood social work, fostering sensitivity to their environment and human needs.',
                            bg: 'bg-emerald-100 dark:bg-emerald-900/30',
                            text: 'text-emerald-600 dark:text-emerald-400',
                            borderHover: 'hover:border-emerald-500/30',
                            delay: 0.1
                        },
                        {
                            title: 'CISCE Affiliated',
                            icon: Award,
                            description: 'Affiliated to the Council for the Indian School Certificate Examinations (CISCE), New Delhi — a renowned board of education in India.',
                            bg: 'bg-blue-100 dark:bg-blue-900/30',
                            text: 'text-blue-600 dark:text-blue-400',
                            borderHover: 'hover:border-blue-500/30',
                            delay: 0.2
                        }
                    ].map((card) => (
                        <motion.div
                            key={card.title}
                            variants={cardVariants}
                            className={cn(
                                "group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:shadow-lg",
                                card.borderHover
                            )}
                        >
                            <div className={cn("mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl", card.bg, card.text)}>
                                <card.icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{card.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}

                    {/* Heritage Card - Wide */}
                    <motion.div
                        variants={cardVariants}
                        className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:col-span-2 transition-all hover:border-purple-500/30 hover:shadow-lg"
                    >
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-950/20 dark:text-purple-400">
                                <GraduationCap className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">Heritage & Vision</h3>
                                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                                    We aim to impart liberal and balanced education according to current societal needs, inspiring students to respect and follow India's rich cultural heritage.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
