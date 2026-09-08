'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { SAMPLE_EVENTS } from '@/lib/constants';
const categories = ['All', ...Array.from(new Set(SAMPLE_EVENTS.map((event) => event.category)))];
export function EventsList() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [query, setQuery] = useState('');
  const events = useMemo(
    () =>
      SAMPLE_EVENTS.filter(
        (event) =>
          (selectedCategory === 'All' || event.category === selectedCategory) &&
          `${event.title} ${event.excerpt}`.toLowerCase().includes(query.toLowerCase())
      ).sort((a, b) => b.date.localeCompare(a.date)),
    [selectedCategory, query]
  );
  return (
    <div>
      <div className="event-tools">
        <div>
          <label htmlFor="event-search" className="mb-2 block text-sm font-medium">
            Find an event
          </label>
          <input
            id="event-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or topic"
            className="event-search"
          />
        </div>
        <p role="status" className="text-sm text-muted-foreground">
          {events.length} {events.length === 1 ? 'event' : 'events'}
        </p>
      </div>
      <div className="event-filters" role="group" aria-label="Filter events by category">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="event-index">
        {events.length ? (
          events.map((event) => (
            <article key={event.id}>
              <time dateTime={event.date}>
                {new Date(event.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  timeZone: 'UTC',
                })}
              </time>
              <div>
                <p className="eyebrow">{event.category}</p>
                <h2>
                  <Link href={`/events/${event.slug}`}>{event.title}</Link>
                </h2>
                <p>{event.excerpt}</p>
              </div>
              <Link
                href={`/events/${event.slug}`}
                className="event-arrow"
                aria-label={`Read ${event.title}`}
              >
                ↗
              </Link>
            </article>
          ))
        ) : (
          <div className="empty-state">
            <h2>No matching events.</h2>
            <p>Try another phrase or show all categories.</p>
            <button
              type="button"
              className="academy-button"
              onClick={() => {
                setQuery('');
                setSelectedCategory('All');
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
