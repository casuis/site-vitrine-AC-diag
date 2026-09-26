import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ClipboardCheck, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { heroHighlights } from "@/lib/content/home"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/ac-diagnostics-hero.png"
          alt="Technicien realisant un diagnostic immobilier dans un appartement lumineux"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(42_35%_97%)_0%,hsl(42_35%_97%/.94)_38%,hsl(42_35%_97%/.58)_68%,hsl(42_35%_97%/.18)_100%)]" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-66px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div className="max-w-2xl py-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm font-medium text-primary shadow-sm">
            <ClipboardCheck className="h-4 w-4" />
            Vente, location, gestion locative
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-normal text-foreground sm:text-5xl lg:text-6xl">
            AC Diagnostics
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            Des diagnostics immobiliers obligatoires realises avec rigueur, des delais clairs et des rapports exploitables pour vos projets de vente ou location.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/devis">
                Demander un devis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="tel:+33609116149">
                <Phone className="h-4 w-4" />
                06 09 11 61 49
              </a>
            </Button>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {heroHighlights.map(([label, value]) => (
              <div key={label} className="rounded-lg border bg-card/92 p-4 shadow-sm">
                <div className="text-sm font-semibold">{label}</div>
                <div className="mt-1 text-xs text-muted-foreground">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
