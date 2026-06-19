import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Clock, Users, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SCHOOL_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Boarding Facilities',
  description: `Explore boarding and day-boarding facilities at ${SCHOOL_INFO.name}. Safe, nurturing environment for students with modern amenities.`,
  openGraph: {
    title: `Boarding Facilities | ${SCHOOL_INFO.name}`,
    description: 'Discover our boarding and day-boarding facilities designed for holistic student development.',
    url: '/boarding',
  },
};

const boardingFeatures = [
  {
    icon: Shield,
    title: 'Safe Environment',
    description: 'Trained staff including housemistress and housemaster ensure student safety 24/7.',
  },
  {
    icon: Users,
    title: 'Trained Staff',
    description: 'Dedicated support staff entrusted with the well-being of all boarders.',
  },
  {
    icon: Heart,
    title: 'Wellness Centre',
    description: 'On-campus wellness centre with school counsellor available all seven days.',
  },
  {
    icon: Clock,
    title: 'Time Management',
    description: 'Structured routine helping students develop discipline and time management skills.',
  },
];

const boardingHighlights = [
  'Residential facilities for boys (Classes IV-VIII)',
  'Well-equipped hostel rooms with modern amenities',
  'Trained housemistress and housemaster',
  'Complete range of support staff',
  'Wellness Centre on campus',
  'School counsellor available 7 days a week',
  'More time for studies and extracurricular activities',
  'Career guidance lectures and sessions',
];

const dayBoardingHighlights = [
  'Open to boys and girls (Classes IV-XII)',
  'Extended school hours: 7:40 AM to 5 PM',
  'Mid-morning fruit break',
  'Nutritious lunch provided',
  'Tutorial sessions after school',
  'Tea break included',
  'Activity time until 5 PM',
  'Monday to Friday schedule',
];

export default function BoardingPage() {
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
              Home Away From Home
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Boarding Facilities
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Our boarding facilities provide a safe, nurturing environment where
              students can live, learn, and grow together as part of our school
              family.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:opacity-90 shadow-md border-0 font-medium">
                <Link href="/admission/form">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {boardingFeatures.map((feature, i) => {
              const Icon = feature.icon;
              const accents = [
                { bg: 'bg-emerald-500/10', icon: 'text-emerald-400' },
                { bg: 'bg-sky-500/10', icon: 'text-sky-400' },
                { bg: 'bg-rose-500/10', icon: 'text-rose-400' },
                { bg: 'bg-amber-500/10', icon: 'text-amber-400' },
              ];
              const a = accents[i % accents.length];
              return (
                <div
                  key={feature.title}
                  className="flex flex-col bg-card p-8 transition-colors hover:bg-muted/50"
                >
                  <div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl ${a.bg}`}>
                    <Icon className={`h-5 w-5 ${a.icon}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Boarding Section */}
      <section id="boarding" className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Images */}
            <div className="grid gap-4">
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <Image
                  src="/images/hero-bg.png"
                  alt="Boarding house exterior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src="/images/library1.png"
                    alt="Hostel bedroom"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src="/images/library2.png"
                    alt="Dining area"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Boys Only
              </span>
              <h2 className="mt-4 text-heading-xl font-bold text-foreground md:text-display">
                Boarding Facility
              </h2>
              <p className="mt-4 text-muted-foreground">
                The boarding provides residential facilities for boys only, on
                campus for classes IV to VIII. All the hostel rooms are well
                equipped with facilities that help the children live and grow in
                an environment that they can identify as their home.
              </p>
              <p className="mt-4 text-muted-foreground">
                The hostel life infuses confidence and makes a child independent,
                helping him grow physically, emotionally, socially and
                psychologically. It provides an opportunity where you make friends
                for life.
              </p>

              <ul className="mt-6 space-y-3">
                {boardingHighlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button asChild>
                  <Link href="/admission/form">Apply for Boarding</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Day-Boarding Section */}
      <section id="dayboarding" className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Boys & Girls
              </span>
              <h2 className="mt-4 text-heading-xl font-bold text-foreground md:text-display">
                Day-Boarding Facility
              </h2>
              <p className="mt-4 text-muted-foreground">
                The day boarding facility is open to girls and boys from classes
                IV to XII. This provides study through the school hours including
                a mid-morning fruit break, followed by a nutritious lunch break
                after school gives over.
              </p>
              <p className="mt-4 text-muted-foreground">
                Students benefit from tutorial sessions, a tea-break, and
                activity time until 5 PM (Monday to Friday), making it an
                extended and enriching school day experience.
              </p>

              <ul className="mt-6 space-y-3">
                {dayBoardingHighlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button asChild>
                  <Link href="/admission/form">Apply for Day-Boarding</Link>
                </Button>
              </div>
            </div>

            {/* Images */}
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/about.png"
                  alt="Day-boarding facility"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-purple-50/30 dark:bg-zinc-950 border-t border-purple-200/20 dark:border-white/5 py-16 md:py-24 transition-colors duration-300">
        <div className="theme-grid-overlay" aria-hidden="true" />
        <div className="container-custom relative z-10 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Why Board With Us</p>
          <h2 className="mt-3 text-2xl font-bold text-foreground md:text-4xl">
            Give Your Child the Best Start
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Boarders discover that they have much more time to study and pursue
            their wider interests. No time is wasted in travelling – learn Sport,
            Art, Music, Drama and also benefit from Career Guidance lectures.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:opacity-90 shadow-md font-medium border-0">
              <Link href="/admission/form">Apply Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
