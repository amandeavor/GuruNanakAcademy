'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { LEADERSHIP } from '@/lib/constants';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;

const LONG_MESSAGES = {
  Chairman: {
    text: [
      "It is an honour for me to be the Chairman of Guru Nanak Academy. Leading this institution is a challenge, which I relish. We have a talented, dedicated and caring teaching faculty. Each of them works very hard to ensure that the abilities of the children in our care is nurtured.",
      "Our priority is to provide a broad, well-balanced and relevant curriculum. We encourage positive attitude and good behaviour among children. We believe in the notion that every child has the right to study in a calm, safe and secure environment.",
      "We assure you that we would leave no stone unturned in building your child's future."
    ]
  },
  Principal: {
    text: [
      "At Guru Nanak Academy, we aim at character building, social service and empathy besides academic excellence thereby providing a holistic and inclusive education.",
      "Every effort is being made to promote self-motivated, disciplined and intellectually aware students who lead a healthy life style supported by a nurturing and safe environment."
    ]
  },
  'School Consultant': {
    text: [
      "Keeping in view the rapidly changing environment, we at Guru Nanak Academy wish to empower our students with life skills, scholastic knowledge and values both social and cultural.",
      "The school keeps on evolving in a dynamic manner, moulding itself according to the needs of the young. New subject options have also been added including Psychology, Physical Education and Fine Arts."
    ]
  }
};

export function LeadershipSection() {
  return (
    <section className="section-padding bg-background" aria-labelledby="leadership-heading">
      <div className="container-custom">
        <div className="mb-16 max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"
          >
            Meet Our Leaders
          </motion.span>
          <motion.h2
            id="leadership-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            School Leadership
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground leading-relaxed"
          >
            Visionaries guiding our institution towards excellence in education and character building.
          </motion.p>
        </div>

        <div className="flex flex-col gap-16 md:gap-20">
          {LEADERSHIP.map((leader, index) => {
            const longMessage = LONG_MESSAGES[leader.role as keyof typeof LONG_MESSAGES];
            const isReverse = index % 2 !== 0;

            return (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1, ease }}
              >
                <div className={cn(
                  "flex flex-col items-center gap-8 md:flex-row md:gap-12 lg:gap-16",
                  isReverse ? "md:flex-row-reverse" : ""
                )}>
                  {/* Image */}
                  <div className="w-full shrink-0 md:w-2/5 flex justify-center">
                    <div className="relative h-64 w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 overflow-hidden rounded-full border-4 border-forest/10 bg-muted shadow-lg">
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-3/5">
                    <div className="mb-6">
                      <span className="inline-block rounded-full border border-border px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        {leader.role}
                      </span>
                      <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                        {leader.name}
                      </h3>
                    </div>

                    <div className="space-y-4 border-t border-border/60 pt-6">
                      {longMessage ? (
                        longMessage.text.map((paragraph, i) => (
                          <p key={i} className="text-base leading-relaxed text-muted-foreground">
                            {paragraph}
                          </p>
                        ))
                      ) : (
                        <p className="text-base leading-relaxed text-muted-foreground">
                          {leader.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
