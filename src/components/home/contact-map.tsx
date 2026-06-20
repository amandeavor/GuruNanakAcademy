'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SCHOOL_INFO } from '@/lib/constants';
import { DeferredMap } from '@/components/shared/deferred-map';

export function ContactMap() {
  return (
    <section className="section-padding bg-background" aria-labelledby="contact-heading">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            Get in Touch
          </motion.span>
          <motion.h2
            id="contact-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-heading-xl font-bold text-foreground md:text-display"
          >
            Visit Our Campus
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8 items-stretch">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 relative z-0 h-full flex flex-col"
          >
            <div className="h-[300px] overflow-hidden rounded-2xl border border-border sm:h-[400px] lg:h-full lg:min-h-[500px] flex-1 relative z-0">
              <DeferredMap
                center={[SCHOOL_INFO.coordinates.lat, SCHOOL_INFO.coordinates.lng]}
                zoom={15}
                markerPosition={[
                  SCHOOL_INFO.coordinates.lat,
                  SCHOOL_INFO.coordinates.lng,
                ]}
                markerTitle={SCHOOL_INFO.name}
              />
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 h-full flex flex-col"
          >
            <div className="relative overflow-hidden rounded-3xl border border-purple-500/10 dark:border-white/5 bg-card/60 dark:bg-zinc-900/40 p-6 md:p-8 h-full flex flex-col justify-between backdrop-blur-xl shadow-soft dark:shadow-[0_0_50px_-12px_rgba(167,139,250,0.08)] pl-8 md:pl-10">
              {/* Decorative accent lines & radial glows */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[50px] pointer-events-none" />
              <div className="absolute left-0 top-8 bottom-8 w-1 rounded-r-lg bg-gradient-to-b from-primary via-indigo-500 to-transparent" />

              <div className="mb-6 md:mb-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Get in Touch</span>
                <h3 className="text-2xl font-bold tracking-tight text-foreground mt-1">Contact Details</h3>
              </div>

              <div className="space-y-5 md:space-y-7">
                {/* Location */}
                <motion.div whileHover={{ x: 4 }} className="flex gap-4 group/item">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-primary md:h-12 md:w-12 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                    <MapPin className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Location</h4>
                    <a
                      href={`https://maps.google.com/?q=${SCHOOL_INFO.coordinates.lat},${SCHOOL_INFO.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-sm text-foreground/80 hover:text-primary transition-colors block leading-relaxed hover:underline underline-offset-4"
                    >
                      {SCHOOL_INFO.address.street}
                      <br />
                      {SCHOOL_INFO.address.city}, {SCHOOL_INFO.address.state}
                      <br />
                      {SCHOOL_INFO.address.country}
                    </a>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div whileHover={{ x: 4 }} className="flex gap-4 group/item">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-primary md:h-12 md:w-12 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                    <Phone className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mobile</h4>
                    <div className="mt-2 space-y-1.5">
                      {SCHOOL_INFO.phones.slice(0, 3).map((phone, i) => (
                        <a
                          key={i}
                          href={`tel:${phone.number.replace(/[^+\d]/g, '')}`}
                          className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors hover:underline underline-offset-4"
                        >
                          <span className="font-medium">{phone.number}</span>
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-secondary/80 dark:bg-white/5 text-muted-foreground dark:text-white/40 border border-border/50">
                            {phone.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div whileHover={{ x: 4 }} className="flex gap-4 group/item">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-primary md:h-12 md:w-12 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                    <Mail className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</h4>
                    <div className="mt-2 space-y-1.5">
                      {SCHOOL_INFO.emails.map((email, i) => (
                        <a
                          key={i}
                          href={`mailto:${email.email}`}
                          className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors hover:underline underline-offset-4"
                        >
                          <span className="font-medium">{email.email}</span>
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-secondary/80 dark:bg-white/5 text-muted-foreground dark:text-white/40 border border-border/50">
                            {email.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Office Hours */}
                <motion.div whileHover={{ x: 4 }} className="flex gap-4 group/item">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-primary md:h-12 md:w-12 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                    <Clock className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Office Hours</h4>
                    <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                      Monday - Saturday
                      <br />
                      8:00 AM - 4:00 PM
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
