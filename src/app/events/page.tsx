import { PageIntro } from '@/components/shared/page-intro';
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
    <div className="academy-page pt-20">
      {/* Hero Section */}
      <PageIntro
        label="Events"
        title="Life, shared together."
        description="School celebrations, competitions and the moments that bring our community together."
      ></PageIntro>

      {/* Events List */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <EventsList />
        </div>
      </section>
    </div>
  );
}
