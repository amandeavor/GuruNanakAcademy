'use client';

import { PremiumGradientPlaceholder } from '@/components/shared/image-placeholder';
import Link from 'next/link';
import { useState } from 'react';
import { SAMPLE_EVENTS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = ['All', 'Annual', 'Monthly', 'Festival', 'Sports', 'Academic'];

export function EventsList() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents =
    selectedCategory === 'All'
      ? SAMPLE_EVENTS
      : SAMPLE_EVENTS.filter((event) => event.category === selectedCategory);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 border',
              selectedCategory === category
                ? 'bg-primary/10 border-primary/30 text-primary shadow-lg'
                : 'bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground border-border'
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, idx) => {
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
              <article
                key={event.id}
                className={cn(
                  "group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg",
                  borderHover
                )}
              >
                <div className="relative aspect-video overflow-hidden">
                  <PremiumGradientPlaceholder icon={Calendar} />
                  <Badge
                    variant="secondary"
                    className="absolute left-4 top-4 border-0 bg-black/40 text-white backdrop-blur-md"
                  >
                    {event.category}
                  </Badge>
                </div>
                <div className="p-6">
                  <div className="mb-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                      {event.date}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary dark:group-hover:text-white transition-colors">
                    {event.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                    {event.excerpt}
                  </p>
                  <Link
                    href={`/events/${event.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-foreground/60 transition-colors group-hover:text-foreground"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No events found in this category.
          </p>
          <Button
            variant="outline"
            onClick={() => setSelectedCategory('All')}
            className="mt-4"
          >
            View All Events
          </Button>
        </div>
      )}
    </div>
  );
}
