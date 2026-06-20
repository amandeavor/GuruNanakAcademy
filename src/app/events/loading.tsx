import { Skeleton } from '@/components/ui/skeleton';

export default function EventsLoading() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden bg-background py-16 md:py-24 transition-colors duration-300">
        <div className="theme-grid-overlay" aria-hidden="true" />
        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto h-5 w-32 rounded-full" />
            <Skeleton className="mx-auto mt-5 h-12 w-3/4 md:w-1/2" />
            <Skeleton className="mx-auto mt-5 h-6 w-full md:w-2/3" />
          </div>
        </div>
      </section>

      {/* Events List Skeleton */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Categories Tab Pills */}
          <div className="mb-8 flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-border bg-card p-6"
              >
                {/* Image Placeholder */}
                <div className="relative aspect-video overflow-hidden rounded-xl bg-muted animate-pulse">
                  <Skeleton className="absolute inset-0 w-full h-full" />
                </div>

                {/* Content Block */}
                <div className="pt-6">
                  {/* Date line */}
                  <Skeleton className="h-4 w-24 mb-3" />

                  {/* Title & Description */}
                  <Skeleton className="h-6 w-11/12 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-4" />

                  {/* Read More Link */}
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
