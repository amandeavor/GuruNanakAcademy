import { PageIntro } from '@/components/shared/page-intro';
import { Metadata } from 'next';
import Image from 'next/image';
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
    <div className="academy-page pt-20">
      {/* Hero Section */}
      <PageIntro
        label="About"
        title="An education with roots."
        description="A co-educational school in Dehradun, shaped by truthful living, equality and a belief in the potential of every child."
      ></PageIntro>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                  <Image
                    src="/images/about.png"
                    alt="The Academy entrance beneath mature campus trees"
                    fill
                    sizes="(max-width: 1023px) 100vw, 45vw"
                    className="object-cover"
                  />
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
