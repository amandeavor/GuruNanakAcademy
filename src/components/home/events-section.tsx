import Link from 'next/link';
import { SAMPLE_EVENTS } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
export function EventsSection() {
  const events = SAMPLE_EVENTS.filter((event) => event.featured).sort((a, b) =>
    b.date.localeCompare(a.date)
  );
  return (
    <section className="section-padding-sm border-y border-border" aria-labelledby="events-heading">
      <div className="container-custom">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">From our community</p>
            <h2 id="events-heading" className="editorial-heading mt-4">
              Academy journal
            </h2>
          </div>
          <Link href="/events" className="academy-link">
            All events <span aria-hidden="true">↗</span>
          </Link>
        </div>
        {events.map((event) => (
          <Link key={event.id} href={`/events/${event.slug}`} className="academy-event-row">
            <time dateTime={event.date} className="text-sm text-muted-foreground">
              {formatDate(event.date)}
            </time>
            <h3 className="text-xl font-medium">{event.title}</h3>
            <span className="text-sm text-muted-foreground">{event.category}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
