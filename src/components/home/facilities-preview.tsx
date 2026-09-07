import Image from 'next/image';
import Link from 'next/link';
import { FACILITIES } from '@/lib/constants';
export function FacilitiesPreview() {
  return (
    <section className="section-padding academy-facilities" aria-labelledby="facilities-heading">
      <div className="container-custom">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Life at the Academy</p>
            <h2 id="facilities-heading" className="editorial-heading mt-4">
              More than a school day.
            </h2>
          </div>
          <Link href="/co-curricular" className="academy-link">
            Sport & activities <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Link href="/boarding" className="academy-feature group">
            <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-sm">
              <Image
                src="/images/hero-bg.png"
                alt="School buildings on the Academy campus"
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
              />
            </div>
            <h3 className="text-2xl">
              A place to belong <span aria-hidden="true">↗</span>
            </h3>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Boarding and day-boarding bring learning, friendships and daily life together in a
              caring school community.
            </p>
          </Link>
          <div className="border-t border-border">
            {FACILITIES.map((f) => (
              <Link
                href={f.href}
                key={f.id}
                className="block border-b border-border py-7 transition-colors hover:text-primary"
              >
                <h3 className="flex justify-between text-xl">
                  {f.title}
                  <span aria-hidden="true">↗</span>
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{f.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
