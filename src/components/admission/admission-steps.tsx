interface Step {
  step: number;
  title: string;
  description: string;
}
export function AdmissionSteps({ steps }: { steps: Step[] }) {
  return (
    <section className="section-padding" aria-labelledby="steps-heading">
      <div className="container-custom section-split">
        <div>
          <p className="eyebrow">Step by step</p>
          <h2 id="steps-heading" className="editorial-heading mt-4">
            A clear path to joining us.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Applications are considered subject to vacancies. The school office can help with
            questions at any stage.
          </p>
        </div>
        <ol className="school-timeline admission-sequence">
          {steps.map((step) => (
            <li key={step.step}>
              <span>0{step.step}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
