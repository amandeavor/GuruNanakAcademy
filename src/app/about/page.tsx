import { Metadata } from 'next';
import { PremiumGradientPlaceholder } from '@/components/shared/image-placeholder';
import { Timeline } from '@/components/about/timeline';
import { LeadershipSection } from '@/components/about/leadership-section';
import { AboutContent } from '@/components/about/about-content';
import { AboutValuesGrid } from '@/components/about/about-values-grid';
import { MissionVision } from '@/components/about/mission-vision';
import { CampusStats } from '@/components/about/campus-stats';
import { SCHOOL_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Discover Guru Nanak Academy, a premier co-educational boarding and day-boarding CISCE school in Dehradun, offering excellence in education since 1972.`,
  openGraph: {
    title: `About Us | ${SCHOOL_INFO.name}`,
    description: `Learn about our ${SCHOOL_INFO.campusSize} campus, mission, and leadership team.`,
    url: '/about',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 md:py-32 transition-colors duration-300">
        {/* Subtle grid */}
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
              About Us
            </span>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-6xl">
              Our Story
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:mt-6 md:text-lg">
              Founded on the principles of truthful living and equality,{' '}
              {SCHOOL_INFO.name} has been shaping young minds for over five
              decades.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <PremiumGradientPlaceholder />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full">
              <AboutContent />
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid (Shifted Down) */}
      <AboutValuesGrid />

      {/* Campus Stats */}
      <CampusStats />

      {/* Timeline */}
      <Timeline />

      {/* Mission & Vision */}
      <MissionVision />

      {/* Leadership */}
      <LeadershipSection />
    </div>
  );
}
