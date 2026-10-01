import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { heroHighlights } from "@/lib/content/home"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/fond-hero-4.jpg"
          alt="Technicien realisant un diagnostic immobilier dans un appartement lumineux"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(42_35%_97%)_0%,hsl(42_35%_97%/.92)_28%,hsl(42_35%_97%/.58)_52%,hsl(42_35%_97%/.18)_76%,hsl(42_35%_97%/0)_100%)]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center px-4 pb-16 pt-24 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div className="max-w-2xl py-10">
          <Text as="h1" style={1} className="max-w-3xl">
            L’expertise qui <span className="text-yellow-700">sécurise</span> vos projets immobiliers
          </Text>
          <div className="mt-8 flex flex-col gap-5 sm:flex-row">
            <Button asChild size="lg" className="uppercase tracking-[0.2em]">
              <Link href="/devis" className="flex items-center gap-2">
                <Text as="span" style={3} text="Demander un devis" className="!text-white" />
                <ArrowRight className="hero-arrow-slide h-4 w-4 shrink-0" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border border-white bg-white uppercase tracking-[0.2em] text-black shadow-[0_8px_20px_rgba(15,23,42,0.15)] transition-colors hover:border-primary hover:bg-primary hover:text-white"
            >
              {/* TODO verifier si garder */}
              {/* <a href="tel:+33609116149" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <Text as="span" style={3} text="06 09 11 61 49" className="!text-inherit" />
              </a> */}
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
