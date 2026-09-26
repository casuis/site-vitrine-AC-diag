import { processSteps } from "@/lib/content/home"

export function ProcessSection() {
  return (
    <section id="methode" className="bg-muted/55 py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
            Methode
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal sm:text-4xl">
            Une intervention lisible du premier contact au rapport final.
          </h2>
        </div>
        <div className="grid gap-4">
          {processSteps.map((step, index) => (
            <div key={step} className="flex gap-4 rounded-lg border bg-card p-5 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.25)]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-sm font-bold text-secondary-foreground">
                {index + 1}
              </div>
              <div>
                <h3 className="font-semibold">{step}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  AC Diagnostics vous aide a identifier les pieces utiles, organiser le passage et transmettre les elements attendus par les professionnels de la transaction.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
