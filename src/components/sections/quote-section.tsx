import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"

export function QuoteSection() {
  return (
    <section id="devis" className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border/70 bg-card p-8 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.25)]">
          <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
            Devis rapide
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal sm:text-4xl">
            Besoin d&apos;une estimation claire pour un bien ?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Accédez à un formulaire dédié avec les informations utiles pour préparer votre devis, sans perdre le contexte de votre projet immobilier.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/devis">
                Accéder au formulaire de devis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="tel:+33000000000">
                <Phone className="h-4 w-4" />
                Nous appeler
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
