'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, Instagram, Facebook, ArrowRight } from 'lucide-react';
import { SCHOOL_INFO, QUICK_LINKS } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <footer className="academy-footer border-t border-border bg-secondary/50">
      {/* CTA Band */}
      {pathname !== '/admission/form' && (
        <div className="border-b border-border">
          <div className="container-custom flex flex-col items-center justify-between gap-4 py-8 text-center sm:flex-row sm:text-left md:py-10">
            <div>
              <p className="editorial-heading text-foreground">Come and get to know us.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Find out about admissions and life at the Academy.
              </p>
            </div>
            <Link href="/admission/form" className="academy-button shrink-0">
              Apply for Admission
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="container-custom py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {/* School Info */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <Link
              href="/"
              className="mb-3 flex items-center gap-2 text-foreground md:mb-4"
              aria-label={`${SCHOOL_INFO.name} - Home`}
            >
              <Image
                src="/images/logo.png"
                alt=""
                width={42}
                height={42}
                className="h-10 w-10 object-contain"
              />
              <span className="text-base font-bold md:text-lg">{SCHOOL_INFO.name}</span>
            </Link>
            <p className="mb-3 text-xs text-muted-foreground md:mb-4 md:text-sm">
              One of the finest co-educational boarding and day-boarding Schools in Dehradun,
              established in {SCHOOL_INFO.founded}.
            </p>
            <p className="hidden text-xs text-muted-foreground md:block">
              Affiliated to {SCHOOL_INFO.affiliation}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground md:mb-4 md:text-sm">
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-1 md:space-y-2">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground md:text-sm"
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
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground md:mb-4 md:text-sm">
              Contact Us
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li className="block">
                <a
                  href={`https://maps.google.com/?q=${SCHOOL_INFO.coordinates.lat},${SCHOOL_INFO.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground md:text-sm"
                >
                  <MapPin
                    className="mt-0.5 h-3 w-3 flex-shrink-0 md:h-4 md:w-4"
                    aria-hidden="true"
                  />
                  <span>{SCHOOL_INFO.address.full}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-xs text-muted-foreground md:text-sm">
                  <Phone
                    className="mt-0.5 h-3 w-3 flex-shrink-0 md:h-4 md:w-4"
                    aria-hidden="true"
                  />
                  <div className="space-y-0.5 md:space-y-1">
                    {SCHOOL_INFO.phones.slice(0, 2).map((phone, i) => (
                      <a
                        key={i}
                        href={`tel:${phone.number.replace(/[^+\d]/g, '')}`}
                        className="block break-words transition-colors hover:text-foreground"
                      >
                        {phone.number}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2 text-xs text-muted-foreground md:text-sm">
                  <Mail className="mt-0.5 h-3 w-3 flex-shrink-0 md:h-4 md:w-4" aria-hidden="true" />
                  <div className="space-y-0.5 md:space-y-1">
                    {SCHOOL_INFO.emails.slice(0, 1).map((email, i) => (
                      <a
                        key={i}
                        href={`mailto:${email.email}`}
                        className="block break-words transition-colors hover:text-foreground"
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
          <div className="block">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Follow Us
            </h3>
            <div className="mb-6 flex gap-3">
              <a
                href={`https://instagram.com/${SCHOOL_INFO.socialMedia.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/5 text-muted-foreground transition-colors hover:bg-black/10 hover:text-foreground dark:bg-white/5 dark:hover:bg-white/10"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={`https://facebook.com/${SCHOOL_INFO.socialMedia.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/5 text-muted-foreground transition-colors hover:bg-black/10 hover:text-foreground dark:bg-white/5 dark:hover:bg-white/10"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>

            <h4 className="mb-2 text-sm font-semibold text-foreground">Office Hours</h4>
            <p className="text-sm text-muted-foreground">
              Monday - Saturday
              <br />
              8:00 AM - 4:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary/20 py-3 dark:border-white/5 md:py-4">
        <div className="container-custom flex flex-col items-center justify-between gap-1 text-center sm:flex-row sm:text-left md:gap-2">
          <p className="text-[10px] text-muted-foreground md:text-xs">
            ©{currentYear} {SCHOOL_INFO.name}. All rights reserved.
          </p>
          <div className="flex gap-3 text-[10px] md:gap-4 md:text-xs">
            <Link
              href="/contact"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Enquiries
            </Link>
            <Link
              href="/admission"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Admissions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
