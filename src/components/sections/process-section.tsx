"use client"

import { useEffect, useRef, useState } from "react"

import { processSteps } from "@/lib/content/home"

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
        })
      },
      { threshold: 0.2 },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="methode" ref={sectionRef} className="bg-blue-700 py-20 text-white">
      <div className="m-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div className="lg:flex lg:items-center">
          <div>
            <h2 className="mt-3 text-3xl font-bold tracking-normal sm:text-4xl">
              De la demande au rapport final : un parcours <span className="text-yellow-700">fluide</span>, <span className="text-yellow-700">clair</span> et <span className="text-yellow-700">sans surprise</span>
            </h2>
          </div>
        </div>
        <div className="grid gap-8">
          {processSteps.map((step, index) => (
            <div
              key={step}
              className={`process-step ${isVisible ? "is-visible" : ""} flex gap-8 rounded-xl border bg-card p-5 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.25)]`}
              style={{ transitionDelay: `${index * 260}ms` }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-yellow-700 text-sm font-bold text-secondary-foreground">
                {index + 1}
              </div>
              <div>
                <h3 className="font-semibold text-green-700 content-center">{step}</h3>
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
