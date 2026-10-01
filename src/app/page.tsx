"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

import { HeroSection } from "@/components/sections/hero-section"
import { ProcessSection } from "@/components/sections/process-section"
import { QuoteSection } from "@/components/sections/quote-section"
import { ServicesSection } from "@/components/sections/services-section"

const faqs = [
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "Praesent luctus, ex ac hendrerit maximus, augue velit laoreet ?",
    answer:
      "Praesent luctus, ex ac hendrerit maximus, augue velit laoreet nibh, sed interdum eros lacus a risus. Integer mollis accumsan massa, sit amet imperdiet risus viverra non. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
  },
  {
    question: "Curabitur aliquam erat ac arcu efficitur, eu pretium magna suscipit ?",
    answer:
      "Curabitur aliquam erat ac arcu efficitur, eu pretium magna suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Vivamus id lectus id lectus feugiat rhoncus.",
  },
  {
    question: "Donec porta, arcu ut feugiat tempus, nibh ligula feugiat sapien ?",
    answer:
      "Donec porta, arcu ut feugiat tempus, nibh ligula feugiat sapien, at posuere metus ligula in nisi. Nulla facilisi. Nunc luctus, lorem non sagittis varius, felis neque consectetur ipsum, vitae feugiat velit tortor et massa.",
  },
]

export default function HomePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <main className="w-[100%] max-w-[100vw]">
      <HeroSection />
      <ServicesSection />
      <ProcessSection />

      <section className="border-t border-border/60 bg-muted/30 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              FAQ
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_10px_30px_-12px_rgba(15,23,42,0.25)]"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-5 py-4 text-left text-base font-medium text-foreground transition-colors hover:bg-accent/50 sm:px-6"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 pt-1 text-sm leading-7 text-muted-foreground sm:px-6">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <QuoteSection />
    </main>
  )
}
