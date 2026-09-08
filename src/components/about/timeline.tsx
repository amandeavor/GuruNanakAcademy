const timelineData = [
  {
    year: '1972',
    title: 'Foundation',
    description:
      'Guru Nanak Academy was founded by Guru Nanak Academy Society on the 500th birth anniversary of Shri Guru Nanak Dev Ji.',
  },
  {
    year: '1980s',
    title: 'Growth & Development',
    description:
      'The school expanded its facilities and curriculum, establishing itself as a premier educational institution in Dehradun.',
  },
  {
    year: '1990s',
    title: 'CISCE Affiliation',
    description:
      'Achieved affiliation with the Council for the Indian School Certificate Examinations (CISCE), New Delhi.',
  },
  {
    year: '2000s',
    title: 'Infrastructure Expansion',
    description:
      'Major infrastructure development including new laboratories, library expansion, and sports facilities.',
  },
  {
    year: '2020',
    title: 'Digital Transformation',
    description:
      'Adapted to modern educational needs with digital classrooms and online learning capabilities.',
  },
  {
    year: '2023',
    title: 'Boarding Facility Launch',
    description:
      'Introduced boarding school facility for boys from class V onwards and expanded day-boarding services.',
  },
  {
    year: 'Present',
    title: 'Continuing Excellence',
    description:
      'Continuing to provide holistic education with new subject options including Psychology, Physical Education, and Fine Arts.',
  },
];

export function Timeline() {
  return (
    <section className="section-padding bg-secondary/30" aria-labelledby="history-heading">
      <div className="container-custom section-split">
        <div>
          <p className="eyebrow">Through the years</p>
          <h2 id="history-heading" className="editorial-heading mt-4">
            Growing with generations.
          </h2>
        </div>
        <ol className="school-timeline">
          {timelineData.map((item) => (
            <li key={item.year}>
              <span>{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
