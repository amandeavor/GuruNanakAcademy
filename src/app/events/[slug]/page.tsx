import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SAMPLE_EVENTS, SCHOOL_INFO } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft, Share2 } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SAMPLE_EVENTS.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = SAMPLE_EVENTS.find((e) => e.slug === slug);

  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  return {
    title: event.title,
    description: event.excerpt,
    openGraph: {
      title: `${event.title} | ${SCHOOL_INFO.name}`,
      description: event.excerpt,
      url: `/events/${event.slug}`,
      images: [event.image],
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = SAMPLE_EVENTS.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const relatedEvents = SAMPLE_EVENTS.filter(
    (e) => e.category === event.category && e.id !== event.id
  ).slice(0, 2);

  return (
    <div className="pt-20">
      {/* Back Navigation */}
      <div className="border-b border-purple-200/20 dark:border-white/5 bg-purple-50/40 dark:bg-zinc-950/80 backdrop-blur-md transition-colors duration-300">
        <div className="container-custom py-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Events
          </Link>
        </div>
      </div>

      {/* Event Header */}
      <article>
        <header className="relative overflow-hidden bg-background border-b border-border/60 py-12 md:py-16 transition-colors duration-300">
          <div className="theme-grid-overlay" aria-hidden="true" />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full blur-[100px]"
            style={{ background: 'var(--radial-glow)' }}
            aria-hidden="true"
          />
          <div className="container-custom relative z-10">
            <div className="mx-auto max-w-4xl">
              <Badge variant="secondary" className="mb-4 border-border/60 dark:border-white/5 bg-secondary/50 dark:bg-white/10 text-foreground dark:text-white backdrop-blur-md">
                {event.category}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                {event.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-6 text-muted-foreground text-sm">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4.5 w-4.5" aria-hidden="true" />
                  {event.date}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="container-custom -mt-0 md:-mt-4">
          <div className="mx-auto max-w-4xl">
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container-custom py-12">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead text-lg text-muted-foreground">
                {event.excerpt}
              </p>
              <p>
                {event.content}
              </p>
              <h2>Event Highlights</h2>
              <ul>
                <li>Opening ceremony with special guests</li>
                <li>Student performances and exhibitions</li>
                <li>Prize distribution for outstanding achievements</li>
                <li>Cultural program showcasing student talents</li>
                <li>Interactive sessions and workshops</li>
              </ul>
              <p>
                We extend our heartfelt gratitude to all who participated in
                making this event a grand success. Such occasions strengthen the
                bond between our school and the community we serve.
              </p>
            </div>

            {/* Share */}
            <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
              <p className="text-muted-foreground">Share this event</p>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <section className="section-padding bg-muted/50">
          <div className="container-custom">
            <h2 className="mb-8 text-heading-lg font-bold text-foreground">
              Related Events
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {relatedEvents.map((relatedEvent) => (
                <Link
                  key={relatedEvent.id}
                  href={`/events/${relatedEvent.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={relatedEvent.image}
                      alt={relatedEvent.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      {relatedEvent.date}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {relatedEvent.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
