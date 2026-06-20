import { Skeleton } from '@/components/ui/skeleton';

export default function BlogLoading() {
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

      {/* Blog Cards Grid Skeleton */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-custom">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-md p-6"
              >
                {/* Image Placeholder */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted animate-pulse">
                  <Skeleton className="absolute inset-0 w-full h-full" />
                </div>

                {/* Content Block */}
                <div className="flex flex-1 flex-col pt-6">
                  {/* Metadata line */}
                  <div className="mb-4 flex gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>

                  {/* Title & Excerpt */}
                  <Skeleton className="h-6 w-11/12 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-6" />

                  {/* Read More Link */}
                  <Skeleton className="h-4 w-24 mt-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
