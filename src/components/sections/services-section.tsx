'use client'
import { useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { diagnostics } from "@/lib/content/home"

export function ServicesSection() {
  const [selectedDiagnostic, setSelectedDiagnostic] = useState(diagnostics[0])
  const SelectedIcon = selectedDiagnostic.icon

  return (
    <section id="services" className="border-y bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
            Diagnostics obligatoires
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal text-foreground sm:text-4xl">
            Un dossier technique complet pour avancer sans blocage.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="grid gap-3">
            {diagnostics.map((item) => {
              const Icon = item.icon
              const isSelected = selectedDiagnostic.title === item.title

              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setSelectedDiagnostic(item)}
                  className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-[0_4px_12px_-6px_rgba(15,23,42,0.35)]"
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

          <Card className="border-border/80 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.25)]">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <SelectedIcon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>{selectedDiagnostic.title}</CardTitle>
                  <CardDescription>Diagnostic obligatoire</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-7 text-foreground/85">
                {selectedDiagnostic.text}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
