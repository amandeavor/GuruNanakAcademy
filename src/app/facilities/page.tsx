import { PageIntro } from '@/components/shared/page-intro';
import { Metadata } from 'next';
import Image from 'next/image';
import { LABS, SCHOOL_INFO } from '@/lib/constants';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Facilities',
  description: `Explore world-class facilities at ${SCHOOL_INFO.name}. Modern laboratories, library, sports facilities, and more on our ${SCHOOL_INFO.campusSize} campus.`,
  openGraph: {
    title: `Facilities | ${SCHOOL_INFO.name}`,
    description:
      'State-of-the-art facilities including Physics, Chemistry, Biology, and Computer labs.',
    url: '/facilities',
  },
  alternates: {
    canonical: '/facilities',
  },
};

export default function FacilitiesPage() {
  return (
    <div className="academy-page pt-20">
      {/* Hero Section */}
      <PageIntro
        label="Facilities"
        title="Room for discovery."
        description="Explore the laboratories, library and places to play across our 13-acre campus."
      ></PageIntro>

      {/* Labs Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="mb-12 text-center text-heading-xl font-bold text-foreground md:text-display">
            Our Laboratories
          </h2>

          <div className="facility-list">
            {LABS.map((lab, index) => {
              const isReversed = index % 2 === 1;
              const accents = [
                {
                  bg: 'bg-secondary',
                  text: 'text-primary',
                  check: 'text-primary',
                  bullet: 'bg-secondary',
                },
                {
                  bg: 'bg-secondary',
                  text: 'text-primary',
                  check: 'text-primary',
                  bullet: 'bg-secondary',
                },
                {
                  bg: 'bg-secondary',
                  text: 'text-primary',
                  check: 'text-primary',
                  bullet: 'bg-secondary',
                },
                {
                  bg: 'bg-secondary',
                  text: 'text-primary',
                  check: 'text-primary',
                  bullet: 'bg-secondary',
                },
              ];
              const a = accents[index % accents.length];

              return (
                <div key={lab.id} id={lab.id} className="facility-detail scroll-mt-24">
                  <div
                    className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                      isReversed ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Image */}
                    <div className={isReversed ? 'lg:order-2' : ''}>
                      <div className="relative aspect-video overflow-hidden rounded-md">
                        {lab.id !== 'computer' ? (
                          <Image
                            src={lab.image}
                            alt={lab.title}
                            fill
                            sizes="(max-width: 1023px) 100vw, 45vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="lab-note">
                            <p className="eyebrow">Digital learning</p>
                            <p>From first programs to new possibilities.</p>
                            <span>Programming · Design · Multimedia</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={isReversed ? 'lg:order-1' : ''}>
                      <h3 className="mb-4 text-heading-lg font-bold text-foreground">
                        {lab.title}
                      </h3>
                      <p className="mb-6 text-muted-foreground">{lab.fullDescription}</p>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="mb-3 font-semibold text-foreground">Key Features</h4>
                          <ul className="space-y-2">
                            {lab.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <Check
                                  className={`mt-0.5 h-4 w-4 flex-shrink-0 ${a.check}`}
                                  aria-hidden="true"
                                />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-3 font-semibold text-foreground">Equipment</h4>
                          <ul className="space-y-2">
                            {lab.equipment.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <span
                                  className={`mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full ${a.bullet}`}
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section id="library" className="section-padding scroll-mt-24 bg-muted/50">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-video overflow-hidden rounded-md lg:aspect-[4/3]">
              <Image
                src="/images/library1.png"
                alt="Library shelves and reading space"
                fill
                sizes="(max-width: 1023px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Knowledge Hub
              </span>
              <h2 className="mt-2 text-heading-xl font-bold text-foreground md:text-display">
                Library
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our library is a sanctuary of knowledge, equipped with a diverse collection of
                books, e-books, periodicals, and multimedia content. It provides comfortable reading
                areas and collaborative workspaces for students.
              </p>
              <p className="mt-4 text-muted-foreground">
                The library is designed to encourage a love for reading and research, with resources
                covering all academic subjects as well as general knowledge, fiction, and reference
                materials.
              </p>

              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {[
                  'Diverse collection of books',
                  'E-books and digital resources',
                  'Academic journals',
                  'Comfortable reading areas',
                  'Collaborative workspaces',
                  'Computer terminals',
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sports & Other Facilities */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="mb-12 text-center text-heading-xl font-bold text-foreground md:text-display">
            Sports & Recreation
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Football Ground',
                description: 'Full-size football field for matches and practice.',
                image: '/images/about.png',
              },
              {
                title: 'Basketball Court',
                description: 'Standard court with professional markings.',
                image: '/images/basketball.png',
              },
              {
                title: 'Indoor Cricket',
                description: 'Indoor cricket facility with practice nets.',
                image: '/images/hero-bg.png',
              },
              {
                title: 'Table Tennis',
                description: 'Multiple tables for practice and tournaments.',
                image: '/images/tabletennis.png',
              },
              {
                title: 'Badminton',
                description: 'Indoor and outdoor badminton courts.',
                image: '/images/girlsbadminton.png',
              },
              {
                title: 'Gymnasium',
                description: 'Well-equipped gym for physical fitness.',
                image: '/images/library2.png',
              },
            ].map((facility, idx) => {
              const borderColors = [
                'hover:border-border',
                'hover:border-border',
                'hover:border-border',
                'hover:border-border',
                'hover:border-border',
                'hover:border-border',
              ];
              const borderHover = borderColors[idx % borderColors.length];
              return (
                <div
                  key={facility.title}
                  className={`group overflow-hidden rounded-md border border-border bg-card transition-all duration-300  ${borderHover}`}
                >
                  {['Basketball Court', 'Table Tennis', 'Badminton'].includes(facility.title) && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={facility.image}
                        alt={facility.title}
                        fill
                        sizes="(max-width: 767px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{facility.title}</h3>
                    <p className="text-sm text-muted-foreground">{facility.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Smart Classrooms */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Modern Learning
              </span>
              <h2 className="mt-2 text-heading-xl font-bold text-foreground md:text-display">
                Smart Classrooms
              </h2>
              <p className="mt-4 text-muted-foreground">
                Each classroom is well-equipped with the latest educational tools and resources,
                ensuring an engaging and interactive learning environment. Our smart classrooms
                feature digital boards, projectors, and audio-visual aids.
              </p>
              <p className="mt-4 text-muted-foreground">
                The design is not only visually appealing but also environment friendly,
                incorporating green spaces and sustainable practices throughout the campus.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  'Digital interactive boards',
                  'High-speed internet connectivity',
                  'Audio-visual equipment',
                  'Comfortable seating arrangements',
                  'Natural lighting and ventilation',
                  'Air-conditioned classrooms',
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-md">
              <Image
                src="/images/hero-bg.png"
                alt="Academy buildings and campus gardens"
                fill
                sizes="(max-width: 1023px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
