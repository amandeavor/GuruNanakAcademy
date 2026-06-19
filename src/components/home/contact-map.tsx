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
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 h-full flex flex-col justify-between">
              <h3 className="mb-4 text-lg font-semibold text-foreground md:mb-6 md:text-xl">
                Contact Information
              </h3>

              <div className="space-y-4 md:space-y-6">
                {/* Location */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 md:h-12 md:w-12">
                    <MapPin className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Location</h4>
                    <a
                      href={`https://maps.google.com/?q=${SCHOOL_INFO.coordinates.lat},${SCHOOL_INFO.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {SCHOOL_INFO.address.street}
                      <br />
                      {SCHOOL_INFO.address.city}, {SCHOOL_INFO.address.state}
                      <br />
                      {SCHOOL_INFO.address.country}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 md:h-12 md:w-12">
                    <Phone className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Mobile</h4>
                    <div className="mt-1 space-y-1">
                      {SCHOOL_INFO.phones.slice(0, 3).map((phone, i) => (
                        <a
                          key={i}
                          href={`tel:${phone.number.replace(/[^+\d]/g, '')}`}
                          className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {phone.number}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 md:h-12 md:w-12">
                    <Mail className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Email</h4>
                    <div className="mt-1 space-y-1">
                      {SCHOOL_INFO.emails.map((email, i) => (
                        <a
                          key={i}
                          href={`mailto:${email.email}`}
                          className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {email.email}
                          <span className="ml-1 text-xs">({email.label})</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 md:h-12 md:w-12">
                    <Clock className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Office Hours</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Monday - Saturday
                      <br />
                      8:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
