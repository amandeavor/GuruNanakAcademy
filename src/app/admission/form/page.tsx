import { PageIntro } from '@/components/shared/page-intro';
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
  alternates: {
    canonical: '/admission/form',
  },
};

export default function AdmissionFormPage() {
  return (
    <div className="academy-page pt-20">
      {/* Hero Section */}
      <PageIntro
        label="Application"
        title="Apply to the Academy."
        description="Complete the student and parent details, then review your application. Fields marked with an asterisk are required."
      ></PageIntro>

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
