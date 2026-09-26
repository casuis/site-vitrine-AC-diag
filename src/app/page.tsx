import { HeroSection } from "@/components/sections/hero-section"
import { ProcessSection } from "@/components/sections/process-section"
import { QuoteSection } from "@/components/sections/quote-section"
import { ServicesSection } from "@/components/sections/services-section"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <QuoteSection />
      </main>

      <SiteFooter />
    </div>
  )
}
