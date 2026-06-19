'use client';

import { motion } from 'framer-motion';

interface Step {
  step: number;
  title: string;
  description: string;
}

interface AdmissionStepsProps {
  steps: Step[];
}

export function AdmissionSteps({ steps }: AdmissionStepsProps) {
  return (
    <section className="section-padding bg-background" aria-labelledby="steps-heading">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            Step by Step
          </motion.span>
          <motion.h2
            id="steps-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-heading-xl font-bold text-foreground md:text-display"
          >
            Admission Process
          </motion.h2>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {/* Connecting Line */}
            <div
              className="absolute left-6 top-0 hidden h-full w-0.5 bg-border md:left-1/2 md:block md:-translate-x-1/2"
              aria-hidden="true"
            />

            {/* Steps */}
            <div className="space-y-8 md:space-y-12">
              {steps.map((step, index) => {
                const stepAccents = [
                  { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
                  { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20' },
                  { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20' },
                  { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
                  { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
                ];
                const a = stepAccents[index % stepAccents.length];
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      index % 2 === 0
                        ? 'md:flex-row'
                        : 'md:flex-row-reverse md:text-right'
                    }`}
                  >
                    {/* Step Number (Mobile) */}
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border ${a.bg} ${a.border} ${a.text} text-lg font-bold md:hidden`}
                      aria-hidden="true"
                    >
                      {step.step}
                    </div>

                    {/* Content */}
                    <div className="flex-1 md:w-5/12">
                      <div
                        className={`rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:border-white/10 ${
                          index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                        }`}
                      >
                        <h3 className="mb-2 text-lg font-semibold text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Step Number (Desktop - Center) */}
                    <div
                      className={`absolute left-1/2 top-6 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border ${a.bg} ${a.border} ${a.text} text-lg font-bold shadow-2xl md:flex`}
                      aria-hidden="true"
                    >
                      {step.step}
                    </div>

                    {/* Empty space for alternating layout */}
                    <div className="hidden md:block md:w-5/12" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
