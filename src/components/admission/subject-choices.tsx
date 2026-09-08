const classIXSubjects = {
  science: {
    title: 'Science Stream',
    compulsory: ['English', 'Hindi', 'Social Studies', 'Science', 'Mathematics'],
    sixth: ['Computer Applications', 'Physical Education', 'Art'],
  },
  commerce: {
    title: 'Commerce Stream (Without Maths)',
    note: 'For candidates conditionally promoted',
    compulsory: ['English', 'Hindi', 'Social Studies', 'Commercial Studies', 'Economics'],
    sixth: ['Computer Applications', 'Physical Education', 'Art'],
  },
  commerceMaths: {
    title: 'Commerce Stream (With Maths)',
    note: 'For candidates with Maths above 40% marks',
    compulsory: ['English', 'Hindi', 'Social Studies', 'Commercial Studies', 'Mathematics'],
    sixth: ['Economics Applications (mandatory as per Council rule)'],
  },
};

const classXISubjects = [
  {
    stream: 'Science (PCM)',
    subjects: ['English', 'Physics', 'Chemistry', 'Mathematics'],
    fifth: ['Computer Science', 'Hindi', 'Physical Education', 'Psychology'],
  },
  {
    stream: 'Science (PCB)',
    subjects: ['English', 'Physics', 'Chemistry', 'Biology'],
    fifth: ['Computer Science', 'Hindi', 'Physical Education', 'Psychology'],
  },
  {
    stream: 'Commerce',
    subjects: ['English', 'Commerce', 'Accounts', 'Economics'],
    fifth: ['Computer Science', 'Hindi', 'Physical Education', 'Psychology', 'Mathematics'],
  },
];

export function SubjectChoices() {
  return (
    <section className="section-padding bg-secondary/30" aria-labelledby="subjects-heading">
      <div className="container-custom">
        <p className="eyebrow">Academic pathways</p>
        <h2 id="subjects-heading" className="editorial-heading mb-10 mt-4">
          Choose a course of study.
        </h2>
        <h3 className="mb-6 text-xl">Class IX</h3>
        <div className="subject-options">
          {Object.entries(classIXSubjects).map(([key, stream]) => (
            <article key={key}>
              <div>
                <h4>{stream.title}</h4>
                {'note' in stream && (
                  <p className="mt-2 text-sm text-muted-foreground">{stream.note}</p>
                )}
              </div>
              <div>
                <h5>Compulsory subjects</h5>
                <p>{stream.compulsory.join(', ')}</p>
              </div>
              <div>
                <h5>Sixth subject options</h5>
                <p>{stream.sixth.join(', ')}</p>
              </div>
            </article>
          ))}
        </div>
        <h3 className="mb-6 mt-14 text-xl">Class XI</h3>
        <div className="subject-options">
          {classXISubjects.map((stream) => (
            <article key={stream.stream}>
              <h4>{stream.stream}</h4>
              <div>
                <h5>Core subjects</h5>
                <p>{stream.subjects.join(', ')}</p>
              </div>
              <div>
                <h5>Fifth subject · choose one</h5>
                <p>{stream.fifth.join(', ')}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          English is compulsory for all Class XI streams.
        </p>
      </div>
    </section>
  );
}
