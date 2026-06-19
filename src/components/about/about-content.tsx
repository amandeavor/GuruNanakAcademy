'use client';

import { motion } from 'framer-motion';
import { Quote, Sparkles, BookOpen } from 'lucide-react';
import { SCHOOL_INFO } from '@/lib/constants';
import { cn } from '@/lib/utils';

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
                <div className="flex items-center gap-2 text-primary font-medium tracking-wide uppercase text-sm">
                    <Sparkles className="h-4 w-4" />
                    <span>Established 1972</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">A Legacy of Excellence</h2>
                <div className="text-lg md:text-xl text-muted-foreground leading-relaxed space-y-6">
                    <p>
                        <span className="text-foreground font-semibold">{SCHOOL_INFO.name}</span> is one of the finest co-educational boarding and day-boarding Schools in India with a strong intellectual heart-beat. The Academy is set up on a sprawling campus of {SCHOOL_INFO.campusSize} in the heart of the city of Dehradun and has easy accessibility and connectivity by Air, train and road with all parts of the country.
                    </p>
                    <p className="border-l-4 border-primary/20 pl-6 text-base md:text-lg">
                        The Academy was founded by Guru Nanak Academy Society in {SCHOOL_INFO.founded} on the occasion of the 500th birth anniversary of Shri Guru Nanak Dev Ji who stood for truthful living and equality of all religions, caste and creed.
                    </p>
                    <p className="text-base">
                        Education is imparted on public school lines and the Academy caters to the academic, emotional, social, psychological and co-curricular needs of students of all age groups from Nursery to class XII.
                    </p>
                </div>
            </motion.div>

            {/* Philosophy Section - Featured Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-3xl bg-primary/5 p-8 md:p-12"
            >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Quote className="h-48 w-48 rotate-180" />
                </div>

                <div className="relative z-10">
                    <h3 className="flex items-center gap-3 text-2xl font-bold mb-8">
                        <BookOpen className="h-6 w-6 text-primary" />
                        Our Philosophy
                    </h3>

                    <div className="max-w-3xl">
                        <blockquote className="space-y-6">
                            <p className="text-xl md:text-3xl font-medium italic text-foreground leading-normal">
                                "Main nahi, kich houn nahi, kich aye na mora, awsar lajja raakh le, sadna jan tera"
                            </p>
                            <footer className="flex items-center gap-4">
                                <div className="h-px bg-primary/30 w-12" />
                                <cite className="text-sm font-semibold tracking-wider uppercase not-italic text-muted-foreground">
                                    — Bhagat Sadna, Shri Guru Granth Sahib
                                </cite>
                            </footer>
                        </blockquote>

                        <div className="mt-8 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50">
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Lord I am nothing, nothing belongs to me, I know nothing – Yet you somehow do always come at the right moment to help me to keep alive my self respect and esteem.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>


        </div>
    );
}
