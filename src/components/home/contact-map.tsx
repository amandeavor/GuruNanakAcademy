'use client';
import { SCHOOL_INFO } from '@/lib/constants';
import { DeferredMap } from '@/components/shared/deferred-map';
import { ArrowUpRight } from 'lucide-react';
export function ContactMap() {
  const directions = `https://maps.google.com/?q=${SCHOOL_INFO.coordinates.lat},${SCHOOL_INFO.coordinates.lng}`;
  return (
    <section className="section-padding academy-contact" aria-labelledby="contact-heading">
      <div className="container-custom">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Come and see for yourself</p>
            <h2 id="contact-heading" className="editorial-heading mt-4">
              Your first visit starts here.
            </h2>
          </div>
          <a
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            className="academy-link inline-flex"
          >
            Get directions <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="relative min-h-[320px] overflow-hidden rounded-sm border border-border lg:min-h-[460px]">
            <DeferredMap
              center={[SCHOOL_INFO.coordinates.lat, SCHOOL_INFO.coordinates.lng]}
              zoom={15}
              markerPosition={[SCHOOL_INFO.coordinates.lat, SCHOOL_INFO.coordinates.lng]}
              markerTitle={SCHOOL_INFO.name}
            />
          </div>
          <div className="contact-directory">
            <div>
              <h3>Find us</h3>
              <address className="not-italic">
                {SCHOOL_INFO.address.street}
                <br />
                {SCHOOL_INFO.address.city}, {SCHOOL_INFO.address.state}
                <br />
                {SCHOOL_INFO.address.country}
              </address>
            </div>
            <div>
              <h3>Call the office</h3>
              <ul>
                {SCHOOL_INFO.phones.slice(0, 3).map((p) => (
                  <li key={p.number}>
                    <a href={`tel:${p.number.replace(/[^+\d]/g, '')}`}>{p.number}</a>
                    <span>{p.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Write to us</h3>
              <ul>
                {SCHOOL_INFO.emails.map((e) => (
                  <li key={e.email}>
                    <a href={`mailto:${e.email}`}>{e.email}</a>
                    <span>{e.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Office hours</h3>
              <p>
                Monday–Saturday
                <br />
                8:00 AM–4:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
