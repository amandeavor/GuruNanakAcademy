import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Skeleton */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto h-4 w-32" />
            <Skeleton className="mx-auto mt-4 h-12 w-3/4" />
            <Skeleton className="mx-auto mt-6 h-20 w-full" />
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl border border-border p-6">
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="mt-4 h-6 w-3/4" />
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
