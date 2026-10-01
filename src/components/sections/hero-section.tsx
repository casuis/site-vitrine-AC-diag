import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { heroHighlights } from "@/lib/content/home"

export function HeroSection() {
  return (
    <section className="relative w-[100%] max-w-[100vw]">
      <div className="absolute inset-0">
        <Image
          src="/hero-diagnostic-immobilier-1.png"
          alt="Technicien realisant un diagnostic immobilier dans un appartement lumineux"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(42_35%_97%)_0%,hsl(42_35%_97%/.92)_28%,hsl(42_35%_97%/.58)_52%,hsl(42_35%_97%/.18)_76%,hsl(42_35%_97%/0)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 pb-8 pt-24 sm:px-6 lg:px-8">
        <div className="grid items-center lg:grid-cols-[0.92fr_1.08fr]">
          <div className="max-w-2xl py-6">
            <Text as="h1" style={1} className="max-w-3xl">
              L’expertise qui <span className="text-yellow-700">sécurise</span> vos projets immobiliers
            </Text>
            <div className="mt-8 flex flex-col gap-5 sm:flex-row">
              <Button asChild size="lg" className="uppercase tracking-[0.2em]">
                <Link href="/devis" className="flex items-center gap-4">
                  <Text as="span" style={3} text="Demander un devis" className="!text-white transition-colors duration-300 ease-out group-hover:!text-[#164480]" />
                  <ArrowRight className="hero-arrow-slide h-4 w-4 shrink-0 text-white transition-colors duration-300 ease-out group-hover:text-[#164480]" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="border border-white bg-white uppercase tracking-[0.2em] text-black shadow-[0_8px_20px_rgba(15,23,42,0.15)] transition-colors hover:border-[#f2b933] hover:bg-[#f2b933] hover:text-[#164480]"
              >
                {/* TODO verifier si garder */}
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-hidden pt-2">
          <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[minmax(0,3fr)_auto] lg:gap-10">
            <div className="flex w-full max-w-[760px] items-stretch justify-between gap-5 sm:gap-6">
              {heroHighlights.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="flex min-h-[118px] flex-1 basis-0 flex-col justify-center rounded-2xl border border-white/70 bg-card/90 p-3 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm"
                >
                  <div className="mb-4 flex items-center justify-center text-yellow-700">
                    <Icon className="h-9 w-9" strokeWidth={1.75} />
                  </div>
                  <div className="text-center text-sm font-semibold text-foreground">{label}</div>
                  <div className="mt-1 text-center text-[11px] text-muted-foreground">{value}</div>
                </div>
              ))}
            </div>

            <div className="hidden items-center justify-center gap-4 lg:flex">
              <Image
                src="/bv-logo.png"
                alt="Logo BV"
                width={180}
                height={180}
                className="h-[180px] w-[180px] object-contain drop-shadow-[0_16px_28px_rgba(15,23,42,0.12)]"
              />
              <Image
                src="/LSN-Assurances.png"
                alt="Logo LSN assurances"
                width={180}
                height={180}
                className="h-[180px] w-[180px] object-contain drop-shadow-[0_16px_28px_rgba(15,23,42,0.12)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
