import { Metadata } from 'next';
import { SCHOOL_INFO } from '@/lib/constants';
import { EventsList } from '@/components/events/events-list';

export const metadata: Metadata = {
  title: 'Events',
  description: `Stay updated with the latest events, celebrations, and activities at ${SCHOOL_INFO.name}. Annual functions, sports meets, cultural programs, and more.`,
  openGraph: {
    title: `Events | ${SCHOOL_INFO.name}`,
    description: 'Explore our school events, celebrations, and activities throughout the year.',
    url: '/events',
  },
  alternates: {
    canonical: '/events',
  },
};

export default function EventsPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-16 md:py-24 transition-colors duration-300">
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
              Stay Connected
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              School Events
            </h1>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              Explore our vibrant school life through various events, celebrations,
              and activities that bring our community together throughout the year.
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <EventsList />
        </div>
      </section>
    </div>
  );
}
