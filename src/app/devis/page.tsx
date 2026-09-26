import Link from "next/link"
import { Building2, Home, Mail, Phone } from "lucide-react"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
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
    <div className="min-h-screen bg-background">
      {/* En-tête simple pour rester sur la page de devis tout en pouvant revenir à l'accueil */}
      <header className="sticky top-0 z-40 border-b bg-background/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="AC Diagnostics accueil">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
              AC
            </span>
            <span className="flex flex-col">
              <span className="text-base font-bold leading-tight">AC Diagnostics</span>
              <span className="text-xs text-muted-foreground">Diagnostics immobiliers</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <Link className="hover:text-foreground" href="/">
              Accueil
            </Link>
            <Link className="hover:text-foreground" href="/#services">
              Diagnostics
            </Link>
            <Link className="hover:text-foreground" href="/#methode">
              Méthode
            </Link>
          </nav>

          <Button asChild size="sm">
            <Link href="/">
              <Home className="h-4 w-4" />
              Accueil
            </Link>
          </Button>
        </div>
      </header>

      <main className="py-10">
        {/* Page de devis orientée uniquement formulaire avec un rappel de contact */}
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

      <footer className="border-t bg-foreground py-8 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-2 font-semibold">
            <Home className="h-4 w-4" />
            AC Diagnostics
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-primary-foreground/78">
            <span className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Diagnostics immobiliers
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              00 00 00 00 00
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              contact@ac-diagnostics.fr
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
