import { Metadata } from 'next';
import { PageIntro } from '@/components/shared/page-intro';
import { SCHOOL_INFO } from '@/lib/constants';
import { ContactForm } from '@/components/contact/contact-form';
import { ContactMap } from '@/components/home/contact-map';
export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with Guru Nanak Academy in Dehradun. Find our address, phone numbers, email, and contact form for admissions and inquiries.`,
  openGraph: {
    title: `Contact Us | ${SCHOOL_INFO.name}`,
    description: 'Reach out to us for admissions, general inquiries, or any other questions.',
    url: '/contact',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="academy-page pt-20">
      <PageIntro
        label="Contact"
        title="Let’s start a conversation."
        description="Speak with our office about admissions, school life or arranging your first visit to the Academy."
      />
      <section className="section-padding">
        <div className="container-custom section-split">
          <div>
            <p className="eyebrow">Send an enquiry</p>
            <h2 className="editorial-heading mt-4">We’re here to help.</h2>
            <p className="mt-5 max-w-sm text-muted-foreground">
              Tell us what you would like to know and include your contact details so our team can
              get back to you.
            </p>
            <div className="info-note mt-8">
              <h3 className="text-base font-medium">Planning a campus visit?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tours are available Monday to Saturday, 9:00 AM–3:00 PM, by prior appointment. Call
                the office to arrange a time.
              </p>
            </div>
          </div>
          <div className="form-panel">
            <ContactForm />
          </div>
        </div>
      </section>
      <ContactMap />
    </div>
  );
}
