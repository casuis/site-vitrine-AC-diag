'use client'
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

import { Text } from "@/components/ui/text"
import { diagnostics } from "@/lib/content/home"

const loremCards = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nulla massa, viverra eu justo sed, auctor volutpat purus. Integer varius congue purus, vitae volutpat erat feugiat dignissim.",
  "Suspendisse vitae suscipit lectus. Integer scelerisque urna quis augue feugiat, ac ullamcorper dolor blandit. Proin quis auctor nisl, et luctus eros. Vivamus ac fermentum mauris.",
  "Praesent tincidunt metus ipsum, faucibus congue lorem pellentesque a. Duis nec tincidunt odio. Curabitur sollicitudin sed nisi at ultricies. Nulla facilisi. Donec lacinia fermentum justo.",
  "Aliquam erat volutpat. Mauris malesuada odio ac nisi egestas, a feugiat lorem tristique. Vestibulum luctus luctus tortor, at tempor lectus iaculis a. Sed blandit erat sit amet ligula.",
  "Nunc consequat, mi vel malesuada pretium, eros dui facilisis ante, nec accumsan ipsum purus non sem. Quisque feugiat tristique ipsum, vitae imperdiet nibh semper non.",
  "Donec tincidunt, elit sed consequat luctus, erat nunc varius risus, nec eleifend dui augue vitae neque. Cras eget nibh et massa volutpat laoreet in et magna.",
]

export function ServicesSection() {
  const cards = diagnostics.map((item, index) => ({
    ...item,
    description: loremCards[index % loremCards.length],
  }))

  const [selectedDiagnostic, setSelectedDiagnostic] = useState<(typeof cards)[number] | null>(null)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const handleMenuSelect = (title: string) => {
    const matched = cards.find((card) => card.title === title)
    if (!matched) return

    setSelectedDiagnostic(matched)
    setExpandedCard(title)
  }

  const handleCardClick = (title: string) => {
    const matched = cards.find((card) => card.title === title)
    if (!matched) return

    if (selectedDiagnostic?.title === title && expandedCard === title) {
      setSelectedDiagnostic(null)
      setExpandedCard(null)
      return
    }

    setSelectedDiagnostic(matched)
    setExpandedCard(title)
  }

  const displayedCards = expandedCard
    ? cards.filter((item) => item.title === expandedCard)
    : cards

  return (
    <section id="services" className="w-[100%] max-w-[100vw] border-y bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
            Diagnostics obligatoires
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal text-foreground sm:text-4xl">
            Un dossier technique complet pour avancer sans blocage.
          </h2>
        </div>

        <div className={selectedDiagnostic ? "mt-6 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]" : "mt-6"}>
          {selectedDiagnostic ? (
            <div className="flex justify-center lg:justify-start">
              <div className="flex w-full max-w-[240px] flex-col items-stretch gap-3">
                {cards.map((item) => {
                  const Icon = item.icon
                  const isSelected = selectedDiagnostic.title === item.title

                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => handleMenuSelect(item.title)}
                      className={`flex w-full cursor-pointer items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-[0_6px_18px_-10px_rgba(15,23,42,0.35)]"
                          : "border-border/70 bg-card hover:border-primary/30 hover:bg-muted/50"
                      }`}
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${
                          isSelected ? "bg-yellow-700 text-white" : "bg-yellow-700/15 text-yellow-700"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <Text as="span" style={3} className="!text-xl !font-bold !tracking-[0.08em] !text-[#164480]">
                        {item.title}
                      </Text>
                    </button>
                  )
                })}
              </div>
            </div>
          ) : null}

          <div className={expandedCard ? "grid" : "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"}>
            {displayedCards.map((item) => {
              const Icon = item.icon
              const isBusy = selectedDiagnostic?.title === item.title
              const isExpanded = expandedCard === item.title

              return (
                <div
                  key={item.title}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  onClick={() => handleCardClick(item.title)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      handleCardClick(item.title)
                    }
                  }}
                  className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-card p-5 text-left transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] ${
                    isExpanded
                      ? "col-span-full min-h-[420px] border-primary/60 bg-primary/5 shadow-[0_18px_42px_-24px_rgba(15,23,42,0.35)]"
                      : "min-h-[230px] border-border/80 bg-card shadow-[0_18px_42px_-24px_rgba(15,23,42,0.35)] hover:border-primary/40 hover:grayscale-[0.08]"
                  } ${isBusy ? "ring-1 ring-primary/30" : ""}`}
                >
                  <button
                    type="button"
                    aria-label="Revenir au mode grille"
                    onClick={(event) => {
                      event.stopPropagation()
                      setExpandedCard(null)
                    }}
                    className={`absolute left-4 top-4 z-10 inline-flex h-9 w-9 cursor-pointer items-center justify-center text-primary transition-opacity duration-200 ${
                      isExpanded ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <ArrowLeft className="h-4 w-4 service-arrow" />
                  </button>

                  <div className="mt-10 w-full">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col items-start">
                        <span
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                            isExpanded ? "bg-yellow-700 text-white" : "bg-yellow-700/15 text-yellow-700"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>

                        <Text as="h3" style={3} className="!mt-3 !text-2xl !font-bold !tracking-[0.08em] !text-[#164480]">
                          {item.title}
                        </Text>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="rounded-full border border-border/80 bg-white/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                          {isExpanded ? "Aperçu" : "Avec mention"}
                        </span>
                        <span className="rounded-full border-2 border-[var(--ac-brand-700)] bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ac-brand-700)] shadow-[0_8px_18px_-12px_rgba(22,148,75,0.8)]">
                          Validité: 6 mois
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-5 flex flex-1 flex-col ${isExpanded ? "justify-start" : "justify-between"}`}>
                    <div>
                      <p
                        className={`mt-3 text-sm leading-7 text-muted-foreground transition-all duration-300 ${
                          isExpanded ? "opacity-100" : "opacity-80"
                        }`}
                      >
                        {isExpanded ? item.description : item.description.slice(0, 100) + "..."}
                      </p>
                    </div>

                    {isExpanded ? (
                      <div className="mt-5 rounded-xl bg-yellow-700/15 p-4 text-left text-[var(--ac-brand-900)] shadow-[inset_0_0_0_1px_rgba(15,23,42,0.04)]">
                        <p className="text-lg leading-8 text-[var(--ac-brand-900)] sm:text-xl sm:leading-9">
                          {item.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
