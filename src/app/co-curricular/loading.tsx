import { Skeleton } from '@/components/ui/skeleton';

export default function CoCurricularLoading() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden bg-background py-20 md:py-32 transition-colors duration-300">
        <div className="theme-grid-overlay" aria-hidden="true" />
        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto h-5 w-32 rounded-full" />
            <Skeleton className="mx-auto mt-5 h-12 w-3/4 md:w-1/2" />
            <Skeleton className="mx-auto mt-5 h-6 w-full md:w-2/3" />
          </div>
        </div>
      </section>

      {/* Activities Section Skeleton */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="space-y-20">
            {[...Array(3)].map((_, index) => {
              const isReversed = index % 2 === 1;
              return (
                <div key={index} className="scroll-mt-24">
                  <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Image Block */}
                    <div className={isReversed ? 'lg:order-2' : ''}>
                      <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted animate-pulse">
                        <Skeleton className="absolute inset-0 w-full h-full" />
                      </div>
                    </div>

                    {/* Content Block */}
                    <div className={isReversed ? 'lg:order-1' : ''}>
                      <div className="mb-4 h-14 w-14 rounded-xl bg-muted animate-pulse" />
                      <Skeleton className="h-8 w-1/2 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-6" />

                      {/* Badge placeholders */}
                      <div className="flex flex-wrap gap-2">
                        {[...Array(5)].map((_, j) => (
                          <Skeleton key={j} className="h-6 w-20 rounded-full" />
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

      {/* Gallery Section Skeleton */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-10 w-48" />
            </div>
            <div className="hidden md:block">
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-border bg-card shadow-md p-4"
              >
                <div className="relative aspect-[4/3] rounded-lg bg-muted animate-pulse overflow-hidden">
                  <Skeleton className="absolute inset-0 w-full h-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
