import { Skeleton } from '@/components/ui/skeleton';

export default function FacilitiesLoading() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden bg-background py-16 md:py-24 transition-colors duration-300">
        <div className="theme-grid-overlay" aria-hidden="true" />
        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto h-5 w-48 rounded-full" />
            <Skeleton className="mx-auto mt-5 h-12 w-3/4 md:w-1/2" />
            <Skeleton className="mx-auto mt-5 h-6 w-full md:w-2/3" />
          </div>
        </div>
      </section>

      {/* Labs Section Skeleton */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <Skeleton className="mx-auto h-10 w-64 mb-12 rounded-lg" />

          <div className="space-y-16">
            {[...Array(3)].map((_, index) => {
              const isReversed = index % 2 === 1;
              return (
                <div key={index} className="scroll-mt-24">
                  <div className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12`}>
                    {/* Image Block */}
                    <div className={isReversed ? 'lg:order-2' : ''}>
                      <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted animate-pulse">
                        <Skeleton className="absolute inset-0 w-full h-full" />
                      </div>
                    </div>

                    {/* Content Block */}
                    <div className={isReversed ? 'lg:order-1' : ''}>
                      {/* Icon & Title */}
                      <Skeleton className="h-14 w-14 rounded-xl mb-4" />
                      <Skeleton className="h-8 w-1/2 mb-4" />

                      {/* Description */}
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-6" />

                      {/* Features lists */}
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <Skeleton className="h-5 w-28 mb-3" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-11/12" />
                            <Skeleton className="h-4 w-5/6" />
                          </div>
                        </div>
                        <div>
                          <Skeleton className="h-5 w-28 mb-3" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-11/12" />
                            <Skeleton className="h-4 w-5/6" />
                          </div>
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

      {/* Sports & Other Facilities Skeleton */}
      <section className="section-padding bg-background border-t border-border">
        <div className="container-custom">
          <Skeleton className="mx-auto h-10 w-64 mb-12 rounded-lg" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm p-6"
              >
                {/* Image Placeholder */}
                <div className="relative aspect-video overflow-hidden rounded-xl bg-muted animate-pulse mb-6">
                  <Skeleton className="absolute inset-0 w-full h-full" />
                </div>
                {/* Title & Desc */}
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
