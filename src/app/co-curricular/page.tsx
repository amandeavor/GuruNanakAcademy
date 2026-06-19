import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SCHOOL_INFO } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Music, Palette, BookOpen, Trophy, Users, Camera } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Co-Curricular Activities',
  description: `Discover the co-curricular activities at ${SCHOOL_INFO.name}. Sports, music, dance, art, and various clubs that nurture holistic development.`,
  openGraph: {
    title: `Co-Curricular Activities | ${SCHOOL_INFO.name}`,
    description: 'Explore our diverse range of co-curricular activities for holistic student development.',
    url: '/co-curricular',
  },
};

const activities = [
  {
    id: 'sports',
    title: 'Sports & Athletics',
    description:
      'A comprehensive sports program including football, basketball, cricket, badminton, table tennis, and athletics. Students are encouraged to participate in inter-school and state-level competitions.',
    icon: Trophy,
    image: '/images/basketball.png',
    items: ['Football', 'Basketball', 'Cricket', 'Badminton', 'Table Tennis', 'Athletics'],
  },
  {
    id: 'music',
    title: 'Music & Dance',
    description:
      'Express yourself through our music and dance programs. From classical to contemporary, students explore various forms of musical and dance expression under expert guidance.',
    icon: Music,
    image: '/images/girlsbadminton.png',
    items: ['Classical Music', 'Western Music', 'Folk Dance', 'Contemporary Dance', 'Choir', 'Band'],
  },
  {
    id: 'art',
    title: 'Art & Craft',
    description:
      'Unleash creativity through our art programs. Students learn painting, sketching, sculpture, and various craft techniques while developing their artistic abilities.',
    icon: Palette,
    image: '/images/library1.png',
    items: ['Painting', 'Sketching', 'Clay Modeling', 'Paper Craft', 'Origami', 'Sculpture'],
  },
  {
    id: 'literary',
    title: 'Literary Activities',
    description:
      'Develop communication and creative writing skills through debates, elocution, essay writing, poetry recitation, and our school magazine contributions.',
    icon: BookOpen,
    image: '/images/library2.png',
    items: ['Debate', 'Elocution', 'Essay Writing', 'Poetry', 'Quiz', 'Drama'],
  },
  {
    id: 'clubs',
    title: 'Clubs & Societies',
    description:
      'Join various clubs based on your interests. From science to environment, photography to robotics, there is a club for every passion.',
    icon: Users,
    image: '/images/tabletennis.png',
    items: ['Science Club', 'Eco Club', 'Photography', 'Robotics', 'Astronomy', 'Social Service'],
  },
];

const galleryImages = [
  { src: '/images/basketball.png', alt: 'Basketball' },
  { src: '/images/girlsbadminton.png', alt: 'Badminton' },
  { src: '/images/tabletennis.png', alt: 'Table Tennis' },
  { src: '/images/library1.png', alt: 'Library' },
  { src: '/images/library2.png', alt: 'Library Reading Area' },
  { src: '/images/physicslab.png', alt: 'Physics Lab' },
  { src: '/images/chemistrylab.png', alt: 'Chemistry Lab' },
  { src: '/images/biolab.png', alt: 'Biology Lab' },
];

export default function CoCurricularPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 md:py-32 transition-colors duration-300">
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
              Beyond Academics
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Co-Curricular Activities
            </h1>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              At {SCHOOL_INFO.name}, we believe in nurturing well-rounded
              individuals. Our diverse co-curricular activities help students
              discover their passions and develop essential life skills.
            </p>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="space-y-20">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              const isReversed = index % 2 === 1;
              const accents = [
                { bg: 'bg-emerald-500/10', text: 'text-emerald-400', badge: 'bg-emerald-500/5 text-emerald-400 border border-emerald-500/10' },
                { bg: 'bg-sky-500/10', text: 'text-sky-400', badge: 'bg-sky-500/5 text-sky-400 border border-sky-500/10' },
                { bg: 'bg-violet-500/10', text: 'text-violet-400', badge: 'bg-violet-500/5 text-violet-400 border border-violet-500/10' },
                { bg: 'bg-amber-500/10', text: 'text-amber-400', badge: 'bg-amber-500/5 text-amber-400 border border-amber-500/10' },
                { bg: 'bg-rose-500/10', text: 'text-rose-400', badge: 'bg-rose-500/5 text-rose-400 border border-rose-500/10' },
              ];
              const a = accents[index % accents.length];

              return (
                <div
                  key={activity.id}
                  id={activity.id}
                  className="scroll-mt-24"
                >
                  <div
                    className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12`}
                  >
                    {/* Image */}
                    <div className={isReversed ? 'lg:order-2' : ''}>
                      <div className="relative aspect-video overflow-hidden rounded-2xl">
                        <Image
                          src={activity.image}
                          alt={activity.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={isReversed ? 'lg:order-1' : ''}>
                      <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${a.bg} ${a.text}`}>
                        <Icon className="h-7 w-7" aria-hidden="true" />
                      </div>
                      <h2 className="mb-4 text-heading-lg font-bold text-foreground">
                        {activity.title}
                      </h2>
                      <p className="mb-6 text-muted-foreground">
                        {activity.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {activity.items.map((item) => (
                          <span
                            key={item}
                            className={`rounded-full px-3 py-1 text-xs font-medium ${a.badge}`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Moments
              </span>
              <h2 className="mt-2 text-heading-xl font-bold text-foreground md:text-display">
                Photo Gallery
              </h2>
            </div>
            <div className="hidden md:block">
              <Camera className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-end p-4">
                    <p className="text-sm font-semibold text-white tracking-wide">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-purple-50/30 dark:bg-zinc-950 border-t border-purple-200/20 dark:border-white/5 py-16 md:py-24 transition-colors duration-300">
        <div className="theme-grid-overlay" aria-hidden="true" />
        <div className="container-custom relative z-10 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Beyond Academics</p>
          <h2 className="mt-3 text-2xl font-bold text-foreground md:text-4xl">
            Join Our Vibrant Community
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Give your child the opportunity to explore their interests and
            talents through our comprehensive co-curricular program.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:opacity-90 shadow-md font-medium border-0">
              <Link href="/admission/form">Apply Now</Link>
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
