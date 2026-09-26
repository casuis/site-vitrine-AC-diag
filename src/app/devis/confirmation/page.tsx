import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, Home, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Confirmation de votre devis | AC Diagnostics",
  description:
    "Votre demande de devis a bien été envoyée à AC Diagnostics. Nous vous recontacterons rapidement.",
  alternates: {
    canonical: "https://ac-diagnostics.fr/devis/confirmation",
  },
}

export default function DevisConfirmationPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex min-h-screen items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl rounded-2xl border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-normal sm:text-4xl">
            Votre demande de devis a bien été envoyée
          </h1>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Merci pour votre prise de contact. Notre équipe va examiner votre demande et vous recontacter rapidement avec une proposition adaptée à votre projet.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="h-4 w-4" />
                Retour à l’accueil
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/devis">
                <Mail className="h-4 w-4" />
                Nouvelle demande
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
