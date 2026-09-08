import { PageIntro } from '@/components/shared/page-intro';
import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdmissionSteps } from '@/components/admission/admission-steps';
import { SubjectChoices } from '@/components/admission/subject-choices';
import { SCHOOL_INFO, ADMISSION_STEPS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Admission Procedure',
  description: `Learn about the admission procedure at ${SCHOOL_INFO.name}. Admissions open for classes Nursery to XII. Find out about eligibility, entrance tests, and required documents.`,
  openGraph: {
    title: `Admission Procedure | ${SCHOOL_INFO.name}`,
    description: 'Complete guide to admission process, eligibility criteria, and subject choices.',
    url: '/admission',
  },
  alternates: {
    canonical: '/admission',
  },
};

export default function AdmissionPage() {
  return (
    <div className="academy-page pt-20">
      {/* Hero Section */}
      <PageIntro
        label="Admissions"
        title="Your next chapter starts here."
        description="A guide to joining Guru Nanak Academy, from eligibility and subject choices to the documents you will need."
      >
        <Link className="academy-button" href="/admission/form">
          Start an application <span aria-hidden="true">↗</span>
        </Link>
        <Link className="academy-link" href="/contact">
          Ask about fees
        </Link>
      </PageIntro>

      {/* Admission Steps */}
      <AdmissionSteps steps={ADMISSION_STEPS} />

      {/* Age Requirements */}
      <section className="section-padding bg-muted/50" aria-labelledby="age-heading">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2
              id="age-heading"
              className="mb-8 text-center text-heading-xl font-bold text-foreground"
            >
              Age Requirements
            </h2>

            <div className="rounded-md border border-border bg-card p-8">
              <p className="mb-6 text-muted-foreground">
                Use the age guide below when preparing your application. Contact the school office
                if you need help confirming eligibility.
              </p>

              <div className="space-y-4">
                {[
                  { class: 'Play Group', age: '3+ years as of 31st March' },
                  { class: 'Kindergarten', age: '4+ years' },
                  { class: 'Class 1', age: '5+ years' },
                  { class: 'Class 2 onwards', age: 'Age calculation continues accordingly' },
                ].map((item) => (
                  <div
                    key={item.class}
                    className="flex items-start gap-3 rounded-lg bg-muted/50 p-4"
                  >
                    <CheckCircle
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-medium text-foreground">{item.class}:</span>{' '}
                      <span className="text-muted-foreground">{item.age}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm text-foreground">
                  <strong>Note:</strong> Admission to Standard IX & XI will be as per the procedures
                  of CISCE, New Delhi, and the School authorities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="section-padding bg-background" aria-labelledby="documents-heading">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2
              id="documents-heading"
              className="mb-8 text-center text-heading-xl font-bold text-foreground"
            >
              Required Documents
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-md border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  For Nursery Admission
                </h3>
                <ul className="space-y-3">
                  {[
                    'Birth Certificate (Original)',
                    'Three recent passport photographs',
                    'Completed Admission Form',
                  ].map((doc) => (
                    <li key={doc} className="flex items-start gap-2 text-sm">
                      <CheckCircle
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-muted-foreground">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-md border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">For Other Classes</h3>
                <ul className="space-y-3">
                  {[
                    'Original Report Card (Previous Class)',
                    'Bonafide Certificate',
                    'Transfer Certificate (Original)',
                    'Three recent passport photographs',
                    'Completed Admission Form',
                  ].map((doc) => (
                    <li key={doc} className="flex items-start gap-2 text-sm">
                      <CheckCircle
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-muted-foreground">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-border bg-secondary p-4 dark:border-border dark:bg-secondary">
              <p className="text-sm text-primary dark:text-primary">
                <strong>Important:</strong> Admissions are made strictly on merit. Any form of
                canvassing will automatically result in the rejection of candidature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subject Choices */}
      <SubjectChoices />

      {/* Academic Year Info */}
      <section className="relative overflow-hidden border-t border-border bg-secondary py-14 transition-colors duration-300 dark:border-white/5 dark:bg-background md:py-20">
        <div className="container-custom relative z-10 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Academic Calendar
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foreground md:text-3xl">
            Academic Year: April to March
          </h2>
          <p className="mt-3 text-muted-foreground">
            A detailed fee schedule can be obtained from the school Administrative/Account Office.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="border-0 bg-primary font-medium text-primary-foreground shadow-md hover:opacity-90"
            >
              <Link href="/admission/form">Apply for Admission</Link>
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
