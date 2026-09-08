const values = [
  [
    'Truthful living',
    'Honesty, humility and compassion guide how we learn and how we treat one another.',
  ],
  [
    'Service to others',
    'Gurudwara visits, Shabad chanting and neighbourhood social work connect students with the needs of their community.',
  ],
  [
    'A broad education',
    'CISCE affiliation and opportunities in sport, arts and service support learning beyond examinations.',
  ],
  [
    'Respect for heritage',
    'We encourage students to understand India’s cultural heritage and respect people of every religion, caste and creed.',
  ],
];
export function AboutValuesGrid() {
  return (
    <section className="section-padding bg-secondary/40" aria-labelledby="values-title">
      <div className="container-custom section-split">
        <div>
          <p className="eyebrow">What we stand for</p>
          <h2 id="values-title" className="editorial-heading mt-4">
            Values for everyday life.
          </h2>
        </div>
        <div className="editorial-list">
          {values.map(([title, text], i) => (
            <article key={title}>
              <span className="list-number">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
