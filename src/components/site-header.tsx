import Link from "next/link"
import { Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
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
          <a className="hover:text-foreground" href="#services">
            Diagnostics
          </a>
          <a className="hover:text-foreground" href="#methode">
            Methode
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm">
            <Link href="/devis">
              <Mail className="h-4 w-4" />
              Devis
            </Link>
          </Button>
          <Button asChild size="icon" variant="outline" aria-label="Appeler AC Diagnostics">
            <a href="tel:+33000000000">
              <Phone className="h-4 w-4" />
            </a>
          </Button>

        </div>
      </div>
    </header>
  )
}
