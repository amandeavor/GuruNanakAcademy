import { Metadata } from 'next';
import { AdmissionsWizard } from '@/components/admission/admissions-wizard';
import { SCHOOL_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Admission Form',
  description: `Apply for admission at ${SCHOOL_INFO.name}. Fill out the online admission form for classes Nursery to XII.`,
  openGraph: {
    title: `Admission Form | ${SCHOOL_INFO.name}`,
    description: 'Apply for admission online. Fill out the form to start your journey with us.',
    url: '/admission/form',
  },
};

export default function AdmissionFormPage() {
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
              Online Application
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Admission Form
            </h1>
            <p className="mt-5 text-base text-muted-foreground">
              Please fill out the form below with accurate information. All
              fields marked with asterisk (*) are required.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl">
            <AdmissionsWizard />
          </div>
        </div>
      </section>
    </div>
  );
}
