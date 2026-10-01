import { Mail, Phone } from "lucide-react"
import type { Metadata } from "next"

import { ContactForm } from "@/app/contact-form"

export const metadata: Metadata = {
  title: "Demande de devis | AC Diagnostics",
  description:
    "Demandez un devis en ligne pour vos diagnostics immobiliers obligatoires : DPE, amiante, plomb, ERP et plus encore.",
  alternates: {
    canonical: "https://ac-diagnostics.fr/devis",
  },
}

export default function DevisPage() {
  return (
    <main className="pt-24 pb-10">
      <section id="devis" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:items-start">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
              Devis rapide
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-normal sm:text-4xl">
              Demandez votre devis
            </h1>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Prenez rendez-vous ou envoyez simplement les informations utiles sur votre bien pour recevoir une estimation adaptée.
            </p>
            <div className="mt-6 grid gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                00 00 00 00 00
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                contact@ac-diagnostics.fr
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  )
}
