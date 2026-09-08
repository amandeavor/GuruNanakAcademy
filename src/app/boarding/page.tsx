import { PageIntro } from '@/components/shared/page-intro';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Clock, Users, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SCHOOL_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Boarding Facilities',
  description: `Explore boarding and day-boarding facilities at ${SCHOOL_INFO.name}. Safe, nurturing environment for students with modern amenities.`,
  openGraph: {
    title: `Boarding Facilities | ${SCHOOL_INFO.name}`,
    description:
      'Discover our boarding and day-boarding facilities designed for holistic student development.',
    url: '/boarding',
  },
  alternates: {
    canonical: '/boarding',
  },
};

const boardingFeatures = [
  {
    icon: Shield,
    title: 'Safe Environment',
    description:
      'Trained staff including housemistress and housemaster ensure student safety 24/7.',
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
    description:
      'Structured routine helping students develop discipline and time management skills.',
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
    <div className="academy-page pt-20">
      {/* Hero Section */}
      <PageIntro
        label="Boarding"
        title="A home within the Academy."
        description="Boarding and day-boarding combine a caring routine with time to learn, make friends and explore new interests."
      >
        <Link className="academy-button" href="/admission/form">
          Apply for admission <span aria-hidden="true">↗</span>
        </Link>
        <Link className="academy-link" href="#dayboarding">
          Explore day-boarding
        </Link>
      </PageIntro>

      {/* Features Grid */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {boardingFeatures.map((feature, i) => {
              const Icon = feature.icon;
              const accents = [
                { bg: 'bg-secondary', icon: 'text-primary' },
                { bg: 'bg-secondary', icon: 'text-primary' },
                { bg: 'bg-secondary', icon: 'text-primary' },
                { bg: 'bg-secondary', icon: 'text-primary' },
              ];
              const a = accents[i % accents.length];
              return (
                <div
                  key={feature.title}
                  className="flex flex-col bg-card p-8 transition-colors hover:bg-muted/50"
                >
                  <div
                    className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl ${a.bg}`}
                  >
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
              <div className="relative aspect-video overflow-hidden rounded-md">
                <Image
                  src="/images/hero-bg.png"
                  alt="Academy campus buildings"
                  fill
                  sizes="(max-width: 1023px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src="/images/library1.png"
                    alt="The school library"
                    fill
                    sizes="(max-width: 1023px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src="/images/basketball.png"
                    alt="Basketball facilities on campus"
                    fill
                    sizes="(max-width: 1023px) 50vw, 25vw"
                    className="object-cover"
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
                The boarding provides residential facilities for boys only, on campus for classes IV
                to VIII. All the hostel rooms are well equipped with facilities that help the
                children live and grow in an environment that they can identify as their home.
              </p>
              <p className="mt-4 text-muted-foreground">
                The hostel life infuses confidence and makes a child independent, helping him grow
                physically, emotionally, socially and psychologically. It provides an opportunity
                where you make friends for life.
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
                The day boarding facility is open to girls and boys from classes IV to XII. This
                provides study through the school hours including a mid-morning fruit break,
                followed by a nutritious lunch break after school gives over.
              </p>
              <p className="mt-4 text-muted-foreground">
                Students benefit from tutorial sessions, a tea-break, and activity time until 5 PM
                (Monday to Friday), making it an extended and enriching school day experience.
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                <Image
                  src="/images/library2.png"
                  alt="Library space available to Academy students"
                  fill
                  sizes="(max-width: 1023px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden border-t border-border bg-secondary py-16 transition-colors duration-300 dark:border-white/5 dark:bg-background md:py-24">
        <div className="container-custom relative z-10 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Why Board With Us
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foreground md:text-4xl">
            Make time for learning and living.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Boarders discover that they have much more time to study and pursue their wider
            interests. No time is wasted in travelling – learn Sport, Art, Music, Drama and also
            benefit from Career Guidance lectures.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="border-0 bg-primary font-medium text-primary-foreground shadow-md hover:opacity-90"
            >
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
