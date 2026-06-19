import { Metadata } from 'next';
import { SCHOOL_INFO } from '@/lib/constants';
import { ContactForm } from '@/components/contact/contact-form';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { DeferredMap } from '@/components/shared/deferred-map';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with ${SCHOOL_INFO.name}. Find our address, phone numbers, email, and use our contact form for inquiries.`,
  openGraph: {
    title: `Contact Us | ${SCHOOL_INFO.name}`,
    description: 'Reach out to us for admissions, general inquiries, or any other questions.',
    url: '/contact',
  },
};

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone Numbers',
    details: SCHOOL_INFO.phones.slice(0, 3).map(p => p.number),
    href: `tel:${SCHOOL_INFO.phones[0].number}`,
  },
  {
    icon: Mail,
    title: 'Email Address',
    details: SCHOOL_INFO.emails.map(e => e.email),
    href: `mailto:${SCHOOL_INFO.emails[0].email}`,
  },
  {
    icon: MapPin,
    title: 'Address',
    details: [SCHOOL_INFO.address.full],
    href: '#map',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    details: ['Monday - Saturday', '8:00 AM - 4:00 PM'],
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 md:py-28 transition-colors duration-300">
        <div className="theme-grid-overlay" aria-hidden="true" />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full blur-[100px]"
          style={{ background: 'var(--radial-glow)' }}
          aria-hidden="true"
        />
        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 dark:border-white/10 bg-secondary/50 dark:bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground dark:text-white/60 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 dark:bg-white/40" aria-hidden="true" />
              Get in Touch
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Whether you have questions about admissions, curriculum, or anything
              else — our team is ready to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              const accents = [
                { bg: 'bg-emerald-500/10', icon: 'text-emerald-400' },
                { bg: 'bg-sky-500/10', icon: 'text-sky-400' },
                { bg: 'bg-violet-500/10', icon: 'text-violet-400' },
                { bg: 'bg-amber-500/10', icon: 'text-amber-400' },
              ];
              const a = accents[idx % accents.length];
              const Content = (
                <div className="flex h-full flex-col bg-card p-8 transition-colors hover:bg-muted/50">
                  <div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl ${a.bg}`}>
                    <Icon className={`h-5 w-5 ${a.icon}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {info.title}
                  </h3>
                  <div className="mt-3 flex flex-1 flex-col justify-center space-y-1.5">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-base font-medium text-foreground leading-snug">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              );

              if (info.href) {
                return (
                  <a key={info.title} href={info.href} className="block h-full">
                    {Content}
                  </a>
                );
              }

              return <div key={info.title} className="h-full">{Content}</div>;
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 items-stretch">
            {/* Contact Form */}
            <div className="flex flex-col h-full">
              <h2 className="mb-2 text-heading-lg font-bold text-foreground">
                Send us a Message
              </h2>
              <p className="mb-8 text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8 flex-1">
                <ContactForm />
              </div>
            </div>

            {/* Map */}
            <div id="map" className="scroll-mt-24 flex flex-col h-full">
              <h2 className="mb-2 text-heading-lg font-bold text-foreground">
                Find Us
              </h2>
              <p className="mb-8 text-muted-foreground">
                Visit our campus and experience our world-class facilities firsthand.
              </p>
              <div className="h-[400px] overflow-hidden rounded-2xl border border-border lg:h-full lg:min-h-[500px] flex-1 relative z-0">
                <DeferredMap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Visit Our Campus
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We welcome prospective families to visit our campus and see our
              facilities in person. Please contact us to schedule a campus tour.
            </p>
            <div className="mt-8 rounded-2xl border border-border bg-card p-8">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Campus Tours Available
              </p>
              <p className="mt-3 text-lg font-medium text-foreground">
                Monday to Saturday, 9:00 AM – 3:00 PM
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                By prior appointment only
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
