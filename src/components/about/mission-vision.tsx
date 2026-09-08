export function MissionVision() {
  return (
    <section className="section-padding" aria-labelledby="mission-heading">
      <div className="container-custom">
        <p className="eyebrow">Our purpose</p>
        <h2 id="mission-heading" className="editorial-heading mb-10 mt-4">
          Learning for the life ahead.
        </h2>
        <div className="grid gap-10 md:grid-cols-2 md:gap-20">
          <article className="border-t border-border pt-6">
            <h3 className="mb-4 text-xl">Our mission</h3>
            <p className="text-muted-foreground">
              To impart liberal and balanced education according to the needs of society, inspiring
              students to respect India’s rich cultural heritage while preparing them for global
              challenges.
            </p>
          </article>
          <article className="border-t border-border pt-6">
            <h3 className="mb-4 text-xl">Our vision</h3>
            <p className="text-muted-foreground">
              To nurture intellectually curious, socially responsible and morally upright citizens
              who contribute to society and uphold the values of truthful living.
            </p>
          </article>
        </div>
        <p className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          Character · Discipline · Team spirit · Empathy · Fair play · Honesty · Service
        </p>
      </div>
    </section>
  );
}
