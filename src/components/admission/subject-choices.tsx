'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

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
    <section className="section-padding bg-muted/50" aria-labelledby="subjects-heading">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            Academic Streams
          </motion.span>
          <motion.h2
            id="subjects-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-heading-xl font-bold text-foreground md:text-display"
          >
            Subject Choices
          </motion.h2>
        </div>

        {/* Class IX */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="mb-8 flex items-center gap-3 text-heading-lg font-bold text-foreground">
            <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
            Class IX Subject Options
          </h3>

          <div className="grid gap-6 lg:grid-cols-3">
            {Object.entries(classIXSubjects).map(([key, stream], idx) => {
              const streamAccents = [
                { top: 'bg-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/10', badge: 'bg-emerald-500/5 text-emerald-400 border border-emerald-500/10' },
                { top: 'bg-sky-500', text: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/10', badge: 'bg-sky-500/5 text-sky-400 border border-sky-500/10' },
                { top: 'bg-violet-500', text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/10', badge: 'bg-violet-500/5 text-violet-400 border border-violet-500/10' }
              ];
              const a = streamAccents[idx % streamAccents.length];

              return (
                <div
                  key={key}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-border hover:shadow-lg"
                >
                  <div className={`h-0.5 w-full ${a.top}`} />
                  <div className="p-6">
                    <h4 className="mb-1 text-lg font-semibold text-foreground">
                      {stream.title}
                    </h4>
                    {'note' in stream && stream.note && (
                      <p className="mb-4 text-xs text-muted-foreground italic">
                        {stream.note}
                      </p>
                    )}

                    <div className="mb-6 mt-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground">
                        Compulsory Subjects
                      </p>
                      <ul className="space-y-1.5">
                        {stream.compulsory.map((subject, i) => (
                          <li
                            key={subject}
                            className="flex items-center gap-2.5 text-sm text-muted-foreground"
                          >
                            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-2xs font-bold ${a.bg} ${a.text}`}>
                              {i + 1}
                            </span>
                            {subject}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-border/60 pt-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground">
                        6th Subject Options
                      </p>
                      <ul className="space-y-1.5">
                        {stream.sixth.map((subject) => (
                          <li
                            key={subject}
                            className="flex items-center gap-2.5 text-sm text-muted-foreground"
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${a.top}`} />
                            {subject}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Class XI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-8 flex items-center gap-3 text-heading-lg font-bold text-foreground">
            <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
            Class XI Subject Options
          </h3>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border bg-white/[0.01]">
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Stream
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Core Subjects
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      5th Subject Options (Choose one)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {classXISubjects.map((stream, idx) => {
                    const accents = [
                      { text: 'text-emerald-400', badge: 'bg-emerald-500/5 text-emerald-400 border border-emerald-500/10', bar: 'bg-emerald-500' },
                      { text: 'text-sky-400', badge: 'bg-sky-500/5 text-sky-400 border border-sky-500/10', bar: 'bg-sky-500' },
                      { text: 'text-violet-400', badge: 'bg-violet-500/5 text-violet-400 border border-violet-500/10', bar: 'bg-violet-500' },
                    ];
                    const a = accents[idx % accents.length];
                    return (
                      <tr key={stream.stream} className="hover:bg-white/[0.01] transition-colors">
                        <td className="px-6 py-5 align-top">
                          <div className="flex items-center gap-3">
                            <div className={`h-4 w-1 rounded-full ${a.bar}`} />
                            <span className="font-semibold text-foreground md:text-base">
                              {stream.stream}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 align-top">
                          <ul className="space-y-1">
                            {stream.subjects.map((subject) => (
                              <li
                                key={subject}
                                className="text-sm text-muted-foreground"
                              >
                                {subject}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="px-6 py-5 align-top">
                          <div className="flex flex-wrap gap-2">
                            {stream.fifth.map((subject) => (
                              <span
                                key={subject}
                                className={`rounded-full px-3 py-1 text-xs font-medium ${a.badge}`}
                              >
                                {subject}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            <strong>Note:</strong> English is compulsory for all streams in Class
            XI.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
