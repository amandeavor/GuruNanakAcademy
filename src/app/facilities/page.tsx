import { Metadata } from 'next';
import { PremiumGradientPlaceholder } from '@/components/shared/image-placeholder';
import { LABS, SCHOOL_INFO } from '@/lib/constants';
import { Check, BookOpen, Trophy, Activity } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Facilities',
  description: `Explore world-class facilities at ${SCHOOL_INFO.name}. Modern laboratories, library, sports facilities, and more on our ${SCHOOL_INFO.campusSize} campus.`,
  openGraph: {
    title: `Facilities | ${SCHOOL_INFO.name}`,
    description: 'State-of-the-art facilities including Physics, Chemistry, Biology, and Computer labs.',
    url: '/facilities',
  },
  alternates: {
    canonical: '/facilities',
  },
};

export default function FacilitiesPage() {
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
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 dark:border-white/10 bg-secondary/50 dark:bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground dark:text-white/60 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 dark:bg-white/40" aria-hidden="true" />
              World-Class Infrastructure
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Our Facilities
            </h1>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              Our school boasts of state-of-the-art infrastructure with modern
              facilities that meet the highest standards of education and
              comfort.
            </p>
          </div>
        </div>
      </section>

      {/* Labs Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="mb-12 text-center text-heading-xl font-bold text-foreground md:text-display">
            Our Laboratories
          </h2>

          <div className="space-y-16">
            {LABS.map((lab, index) => {
              const Icon = lab.icon;
              const isReversed = index % 2 === 1;
              const accents = [
                { bg: 'bg-blue-500/10', text: 'text-blue-400', check: 'text-blue-400', bullet: 'bg-blue-400' },
                { bg: 'bg-emerald-500/10', text: 'text-emerald-400', check: 'text-emerald-400', bullet: 'bg-emerald-400' },
                { bg: 'bg-violet-500/10', text: 'text-violet-400', check: 'text-violet-400', bullet: 'bg-violet-400' },
                { bg: 'bg-amber-500/10', text: 'text-amber-400', check: 'text-amber-400', bullet: 'bg-amber-400' },
              ];
              const a = accents[index % accents.length];

              return (
                <div
                  key={lab.id}
                  id={lab.id}
                  className="scroll-mt-24"
                >
                  <div
                    className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                      isReversed ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Image */}
                    <div className={isReversed ? 'lg:order-2' : ''}>
                      <div className="relative aspect-video overflow-hidden rounded-2xl">
                        <PremiumGradientPlaceholder icon={Icon} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={isReversed ? 'lg:order-1' : ''}>
                      <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${a.bg} ${a.text}`}>
                        <Icon className="h-7 w-7" aria-hidden="true" />
                      </div>
                      <h3 className="mb-4 text-heading-lg font-bold text-foreground">
                        {lab.title}
                      </h3>
                      <p className="mb-6 text-muted-foreground">
                        {lab.fullDescription}
                      </p>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="mb-3 font-semibold text-foreground">
                            Key Features
                          </h4>
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
                          <h4 className="mb-3 font-semibold text-foreground">
                            Equipment
                          </h4>
                          <ul className="space-y-2">
                            {lab.equipment.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <span className={`mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full ${a.bullet}`} />
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
      <section id="library" className="section-padding bg-muted/50 scroll-mt-24">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-video overflow-hidden rounded-2xl lg:aspect-[4/3]">
              <PremiumGradientPlaceholder icon={BookOpen} />
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
                Our library is a sanctuary of knowledge, equipped with a diverse
                collection of books, e-books, periodicals, and multimedia content.
                It provides comfortable reading areas and collaborative workspaces
                for students.
              </p>
              <p className="mt-4 text-muted-foreground">
                The library is designed to encourage a love for reading and
                research, with resources covering all academic subjects as well as
                general knowledge, fiction, and reference materials.
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
                    <Check
                      className="h-4 w-4 flex-shrink-0 text-emerald-400"
                      aria-hidden="true"
                    />
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
                'hover:border-emerald-500/30',
                'hover:border-sky-500/30',
                'hover:border-violet-500/30',
                'hover:border-amber-500/30',
                'hover:border-rose-500/30',
                'hover:border-blue-500/30',
              ];
              const borderHover = borderColors[idx % borderColors.length];
              return (
                <div
                  key={facility.title}
                  className={`group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg ${borderHover}`}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <PremiumGradientPlaceholder icon={facility.title === 'Gymnasium' ? Activity : Trophy} />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {facility.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {facility.description}
                    </p>
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
                Each classroom is well-equipped with the latest educational tools
                and resources, ensuring an engaging and interactive learning
                environment. Our smart classrooms feature digital boards,
                projectors, and audio-visual aids.
              </p>
              <p className="mt-4 text-muted-foreground">
                The design is not only visually appealing but also environment
                friendly, incorporating green spaces and sustainable practices
                throughout the campus.
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
                    <Check
                      className="h-4 w-4 flex-shrink-0 text-emerald-400"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <PremiumGradientPlaceholder icon={BookOpen} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
