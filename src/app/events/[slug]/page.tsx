import { Metadata } from 'next';
import Image from 'next/image';
import { ShareButton } from '@/components/shared/share-button';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SAMPLE_EVENTS, SCHOOL_INFO } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';

import { Calendar, ArrowLeft } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

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
    alternates: {
      canonical: `/events/${event.slug}`,
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
    <div className="academy-page article-page pt-20">
      {/* Back Navigation */}
      <div className="border-b border-border bg-secondary backdrop-blur-md transition-colors duration-300 dark:border-white/5 dark:bg-background/80">
        <div className="container-custom py-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Events
          </Link>
        </div>
      </div>

      {/* Event Header */}
      <article>
        <header className="relative overflow-hidden border-b border-border/60 bg-background py-12 transition-colors duration-300 md:py-16">
          <div className="container-custom relative z-10">
            <div className="mx-auto max-w-4xl">
              <Badge
                variant="secondary"
                className="mb-4 border-border/60 bg-secondary/50 text-foreground backdrop-blur-md dark:border-white/5 dark:bg-white/10 dark:text-white"
              >
                {event.category}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                {event.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
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
            <div className="relative aspect-video overflow-hidden rounded-md">
              <Image
                src={event.image}
                alt="Academy campus photograph"
                fill
                sizes="(max-width: 1023px) 100vw, 900px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container-custom py-12">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="lead text-lg text-muted-foreground">{event.excerpt}</p>
              <p>{event.content}</p>
            </div>

            {/* Share */}
            <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
              <p className="text-muted-foreground">Share this event</p>
              <ShareButton title={event.title} />
            </div>
          </div>
        </div>
      </article>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <section className="section-padding bg-muted/50">
          <div className="container-custom">
            <h2 className="mb-8 text-heading-lg font-bold text-foreground">Related Events</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {relatedEvents.map((relatedEvent) => (
                <Link
                  key={relatedEvent.id}
                  href={`/events/${relatedEvent.slug}`}
                  className="group overflow-hidden rounded-md border border-border bg-card transition-shadow "
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={relatedEvent.image}
                      alt=""
                      fill
                      sizes="(max-width: 767px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      {relatedEvent.date}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
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
