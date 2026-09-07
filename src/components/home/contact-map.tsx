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
            className="editorial-heading mt-2 text-foreground"
          >
            Visit Our Campus
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid items-stretch gap-6 lg:grid-cols-5 lg:gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-0 flex h-full flex-col lg:col-span-3"
          >
            <div className="relative z-0 h-[300px] flex-1 overflow-hidden rounded-2xl border border-border sm:h-[400px] lg:h-full lg:min-h-[500px]">
              <DeferredMap
                center={[SCHOOL_INFO.coordinates.lat, SCHOOL_INFO.coordinates.lng]}
                zoom={15}
                markerPosition={[SCHOOL_INFO.coordinates.lat, SCHOOL_INFO.coordinates.lng]}
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
            className="flex h-full flex-col lg:col-span-2"
          >
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-border bg-card p-6 md:p-8">
              <div className="mb-6 md:mb-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  Get in Touch
                </span>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                  Contact Details
                </h3>
              </div>

              <div className="space-y-5 md:space-y-7">
                {/* Location */}
                <motion.div whileHover={{ x: 4 }} className="group/item flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover/item:bg-primary group-hover/item:text-primary-foreground md:h-12 md:w-12">
                    <MapPin className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Location
                    </h4>
                    <a
                      href={`https://maps.google.com/?q=${SCHOOL_INFO.coordinates.lat},${SCHOOL_INFO.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm leading-relaxed text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
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
                <motion.div whileHover={{ x: 4 }} className="group/item flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover/item:bg-primary group-hover/item:text-primary-foreground md:h-12 md:w-12">
                    <Phone className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Mobile
                    </h4>
                    <div className="mt-2 space-y-1.5">
                      {SCHOOL_INFO.phones.slice(0, 3).map((phone, i) => (
                        <a
                          key={i}
                          href={`tel:${phone.number.replace(/[^+\d]/g, '')}`}
                          className="flex items-center gap-2 text-sm text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
                        >
                          <span className="font-medium">{phone.number}</span>
                          <span className="rounded border border-border/50 bg-secondary/80 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground dark:bg-white/5 dark:text-white/40">
                            {phone.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div whileHover={{ x: 4 }} className="group/item flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover/item:bg-primary group-hover/item:text-primary-foreground md:h-12 md:w-12">
                    <Mail className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Email
                    </h4>
                    <div className="mt-2 space-y-1.5">
                      {SCHOOL_INFO.emails.map((email, i) => (
                        <a
                          key={i}
                          href={`mailto:${email.email}`}
                          className="flex items-center gap-2 text-sm text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
                        >
                          <span className="font-medium">{email.email}</span>
                          <span className="rounded border border-border/50 bg-secondary/80 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground dark:bg-white/5 dark:text-white/40">
                            {email.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Office Hours */}
                <motion.div whileHover={{ x: 4 }} className="group/item flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover/item:bg-primary group-hover/item:text-primary-foreground md:h-12 md:w-12">
                    <Clock className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Office Hours
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/80">
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
