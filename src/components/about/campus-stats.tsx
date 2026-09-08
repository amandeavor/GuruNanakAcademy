import { CAMPUS_STATS } from '@/lib/constants';
export function CampusStats() {
  return (
    <section className="section-padding-sm" aria-label="The Academy at a glance">
      <div className="container-custom">
        <dl className="school-facts">
          {CAMPUS_STATS.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>
                {stat.value} <small>{stat.unit}</small>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
