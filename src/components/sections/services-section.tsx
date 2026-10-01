'use client'
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

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
            <div className="grid gap-3 rounded-2xl bg-white p-2 shadow-[0_18px_35px_-24px_rgba(0,0,0,0.8)]">
              {cards.map((item) => {
                const Icon = item.icon
                const isSelected = selectedDiagnostic.title === item.title

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => handleMenuSelect(item.title)}
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-[0_6px_18px_-10px_rgba(15,23,42,0.35)]"
                        : "border-border/70 bg-card hover:border-primary/30 hover:bg-muted/50"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${
                        isSelected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-foreground">{item.title}</span>
                  </button>
                )
              })}
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
                      : "min-h-[230px] border-border/80 bg-card shadow-[0_18px_42px_-24px_rgba(15,23,42,0.35)] hover:border-primary/40"
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

                  <div className="mt-10 flex items-center justify-between gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-border/80 bg-white/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      {isExpanded ? "Aperçu" : "Diagnostic"}
                    </span>
                  </div>

                  <div className={`mt-5 flex flex-1 flex-col ${isExpanded ? "justify-start" : "justify-between"}`}>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                      <p
                        className={`mt-3 text-sm leading-7 text-muted-foreground transition-all duration-300 ${
                          isExpanded ? "opacity-100" : "opacity-80"
                        }`}
                      >
                        {isExpanded ? item.description : item.description.slice(0, 100) + "..."}
                      </p>
                    </div>

                    {isExpanded ? (
                      <div className="mt-5 rounded-xl bg-white/80 p-4 text-left shadow-[inset_0_0_0_1px_rgba(15,23,42,0.04)]">
                        <p className="text-sm leading-7 text-foreground/80">{item.description}</p>
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
