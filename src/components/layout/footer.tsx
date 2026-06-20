'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Phone, Mail, MapPin, Instagram, Facebook, ArrowRight } from 'lucide-react';
import { SCHOOL_INFO, QUICK_LINKS } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <footer className="border-t border-purple-200/30 dark:border-border/20 bg-purple-50/40 dark:bg-zinc-950 transition-colors duration-300">

      {/* CTA Band */}
      {pathname !== '/admission/form' && (
        <div className="border-b border-purple-200/30 dark:border-white/5 bg-forest/[0.04] dark:bg-purple-950/30">
          <div className="container-custom flex flex-col items-center justify-between gap-4 py-8 text-center sm:flex-row sm:text-left md:py-10">
            <div>
              <p className="text-lg font-semibold text-foreground">Ready to be part of our legacy?</p>
              <p className="mt-1 text-sm text-muted-foreground">Admissions open for the 2026–27 academic year.</p>
            </div>
            <Link
              href="/admission/form"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold transition-all hover:opacity-90 shadow-md"
            >
              Apply for Admission
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="container-custom py-8 md:py-12 lg:py-16">
        <div className="grid gap-6 md:gap-8 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {/* School Info */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <Link
              href="/"
              className="mb-3 md:mb-4 flex items-center gap-2 text-foreground"
              aria-label={`${SCHOOL_INFO.name} - Home`}
            >
              <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="h-4 w-4 md:h-6 md:w-6" aria-hidden="true" />
              </div>
              <span className="text-base md:text-lg font-bold">{SCHOOL_INFO.name}</span>
            </Link>
            <p className="mb-3 md:mb-4 text-xs md:text-sm text-muted-foreground">
              One of the finest co-educational boarding and day-boarding Schools
              in Dehradun, established in {SCHOOL_INFO.founded}.
            </p>
            <p className="text-xs text-muted-foreground hidden md:block">
              Affiliated to {SCHOOL_INFO.affiliation}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-2 md:mb-4 text-xs md:text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-1 md:space-y-2">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs md:text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-2 md:mb-4 text-xs md:text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact Us
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li className="hidden md:block">
                <a
                  href={`https://maps.google.com/?q=${SCHOOL_INFO.coordinates.lat},${SCHOOL_INFO.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <MapPin
                    className="mt-0.5 h-3 w-3 md:h-4 md:w-4 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{SCHOOL_INFO.address.full}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                  <Phone
                    className="mt-0.5 h-3 w-3 md:h-4 md:w-4 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div className="space-y-0.5 md:space-y-1">
                    {SCHOOL_INFO.phones.slice(0, 2).map((phone, i) => (
                      <a
                        key={i}
                        href={`tel:${phone.number.replace(/[^+\d]/g, '')}`}
                        className="block transition-colors hover:text-foreground"
                      >
                        {phone.number}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                  <Mail
                    className="mt-0.5 h-3 w-3 md:h-4 md:w-4 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div className="space-y-0.5 md:space-y-1">
                    {SCHOOL_INFO.emails.slice(0, 1).map((email, i) => (
                      <a
                        key={i}
                        href={`mailto:${email.email}`}
                        className="block transition-colors hover:text-foreground"
                      >
                        {email.email}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div className="hidden md:block">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Follow Us
            </h3>
            <div className="mb-6 flex gap-3">
              <a
                href={`https://instagram.com/${SCHOOL_INFO.socialMedia.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5 text-muted-foreground transition-colors hover:bg-black/10 dark:hover:bg-white/10 hover:text-foreground"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={`https://facebook.com/${SCHOOL_INFO.socialMedia.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5 text-muted-foreground transition-colors hover:bg-black/10 dark:hover:bg-white/10 hover:text-foreground"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>

            <h4 className="mb-2 text-sm font-semibold text-foreground">
              Office Hours
            </h4>
            <p className="text-sm text-muted-foreground">
              Monday - Saturday
              <br />
              8:00 AM - 4:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-200/20 dark:border-white/5 py-3 md:py-4">
        <div className="container-custom flex flex-col items-center justify-between gap-1 md:gap-2 text-center sm:flex-row sm:text-left">
          <p className="text-[10px] md:text-xs text-muted-foreground">
            ©{currentYear} {SCHOOL_INFO.name}. All rights reserved.
          </p>
          <div className="flex gap-3 md:gap-4 text-[10px] md:text-xs">
            <Link
              href="/privacy"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
