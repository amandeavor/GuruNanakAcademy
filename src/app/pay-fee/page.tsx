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
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 dark:border-white/10 bg-secondary/50 dark:bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground dark:text-white/60 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 dark:bg-white/40" aria-hidden="true" />
              Secure Payment
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Pay Fee Online
            </h1>
            <p className="mt-5 text-base text-muted-foreground">
              Please enter the student details below to initiate a secure online payment. Supports UPI, Net Banking, and Cards.
            </p>
          </div>
        </div>
      </section>

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
