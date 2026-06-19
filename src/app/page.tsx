import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Hero } from '@/components/home/hero';
import { LabCards } from '@/components/home/lab-cards';
import { SCHOOL_INFO } from '@/lib/constants';
import { ContactMap } from '@/components/home/contact-map';

// Lazy load below-fold components for faster initial load
const AboutSummary = dynamic(() => import('@/components/home/about-summary').then(mod => ({ default: mod.AboutSummary })), { ssr: true });
const FacilitiesPreview = dynamic(() => import('@/components/home/facilities-preview').then(mod => ({ default: mod.FacilitiesPreview })), { ssr: true });
const CampusIntro = dynamic(() => import('@/components/home/campus-intro').then(mod => ({ default: mod.CampusIntro })), { ssr: true });
const EventsSection = dynamic(() => import('@/components/home/events-section').then(mod => ({ default: mod.EventsSection })), { ssr: true });

export const metadata: Metadata = {
  title: `${SCHOOL_INFO.name} | Best School in Dehradun | CISCE Affiliated`,
  description: `${SCHOOL_INFO.name} is one of the best schools in Dehradun, Uttarakhand. A premier co-educational boarding and day-boarding school founded in ${SCHOOL_INFO.founded}. CISCE affiliated, offering quality education from Nursery to Class XII with state-of-the-art facilities.`,
  openGraph: {
    title: `${SCHOOL_INFO.name} | Best School in Dehradun`,
    description: `One of the finest co-educational boarding and day-boarding Schools in Dehradun, established in ${SCHOOL_INFO.founded}. CISCE affiliated with excellent academic results.`,
    url: '/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.gurunanakacademydehradun.org/',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LabCards />
      <AboutSummary />
      <FacilitiesPreview />
      <CampusIntro />
      <EventsSection />
      <ContactMap />
    </>
  );
}
