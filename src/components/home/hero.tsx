import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SCHOOL_INFO } from '@/lib/constants';

export function Hero() {
  return (
    <section className="academy-hero" aria-labelledby="hero-heading">
      <div className="container-custom">
        <div className="academy-hero-grid">
          <div className="academy-hero-copy">
            <p className="eyebrow">Dehradun · Established {SCHOOL_INFO.founded}</p>
            <h1 id="hero-heading">
              A place to learn.
              <br />A space to <em>grow.</em>
            </h1>
            <p className="hero-description">
              At Guru Nanak Academy, learning goes beyond the classroom. A co-educational boarding
              and day-boarding school, rooted in the heart of Dehradun.
            </p>
            <div className="hero-actions">
              <Link className="academy-button" href="/admission/form">
                Apply for admission <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="academy-link" href="/about">
                Discover the Academy <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <p className="hero-note">
              Nursery to Class XII <span aria-hidden="true">/</span> CISCE affiliated
            </p>
          </div>
          <figure className="academy-hero-photo">
            <div className="hero-image-wrap">
              <Image
                src="/images/hero-bg.png"
                alt="Guru Nanak Academy campus buildings and gardens in Dehradun"
                fill
                priority
                sizes="(max-width: 767px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <figcaption>
              <span>Room to discover. Space to belong.</span>
              <span>13-acre campus</span>
            </figcaption>
          </figure>
        </div>
        <div className="academy-quicklinks">
          <span>A little closer to your next chapter</span>
          <Link href="/admission">
            Admission procedure <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <Link href="/contact">
            Plan a visit <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <Link href="/pay-fee">
            Pay school fees <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
