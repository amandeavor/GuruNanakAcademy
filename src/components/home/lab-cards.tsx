import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { LABS } from '@/lib/constants';
export function LabCards() {
  return (
    <section className="section-padding-sm" aria-labelledby="labs-heading">
      <div className="container-custom grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="eyebrow">Learning by doing</p>
          <h2 id="labs-heading" className="editorial-heading mt-4">
            Curiosity,
            <br />
            put into practice.
          </h2>
          <p className="mt-5 max-w-sm text-muted-foreground">
            Space to experiment, ask questions and make discoveries of your own.
          </p>
        </div>
        <div className="border-t border-border">
          {LABS.map((lab, i) => (
            <Link key={lab.id} href={`/facilities#${lab.id}`} className="academy-lab-row">
              <span className="text-xs tabular-nums text-muted-foreground">0{i + 1}</span>
              <div>
                <h3 className="text-lg font-medium">{lab.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{lab.description}</p>
              </div>
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
