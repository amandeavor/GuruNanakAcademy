import Image from 'next/image';
import Link from 'next/link';
import { SCHOOL_INFO } from '@/lib/constants';
export function AboutSummary() {
  return (
    <section className="section-padding academy-about" aria-labelledby="about-heading">
      <div className="container-custom grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src="/images/about.png"
              alt="The Guru Nanak Academy entrance beneath mature campus trees"
              fill
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-4 text-sm text-muted-foreground">
            Rooted in Dehradun, since {SCHOOL_INFO.founded}.
          </figcaption>
        </figure>
        <div>
          <p className="eyebrow">The Academy</p>
          <h2 id="about-heading" className="editorial-heading mt-5">
            An education with
            <br />
            character at its heart.
          </h2>
          <p className="mt-6 text-muted-foreground">
            Set across {SCHOOL_INFO.campusSize}, Guru Nanak Academy brings together academic
            learning, sport and everyday discovery. Our students learn to think independently and
            care for the world around them.
          </p>
          <p className="mt-4 text-muted-foreground">
            Inspired by the teachings of Shri Guru Nanak Dev Ji, our community is built on truthful
            living and respect for all religions, castes and creeds.
          </p>
          <Link href="/about" className="academy-link mt-8 inline-flex">
            Our story <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
