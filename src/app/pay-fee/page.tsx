import { PageIntro } from '@/components/shared/page-intro';
import { Metadata } from 'next';
import { FeePortalForm } from '@/components/payment/fee-portal-form';
import { SCHOOL_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Pay Fee Online',
  description: `Online fee payment portal for ${SCHOOL_INFO.name}. Securely pay tuition fee, admission fee, hostel fee, and other components online.`,
  openGraph: {
    title: `Pay Fee Online | ${SCHOOL_INFO.name}`,
    description: 'Secure online school fee payment portal with UPI and card options.',
    url: '/pay-fee',
  },
  alternates: {
    canonical: '/pay-fee',
  },
};

export default function PayFeePage() {
  return (
    <div className="academy-page pt-20">
      {/* Hero Section */}
      <PageIntro
        label="School fees"
        title="School fee payment."
        description="Have the student’s admission number and fee details ready. Check the information carefully before proceeding to payment."
      ></PageIntro>

      {/* Portal Form Section */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl">
            <FeePortalForm />
          </div>
        </div>
      </section>
    </div>
  );
}
