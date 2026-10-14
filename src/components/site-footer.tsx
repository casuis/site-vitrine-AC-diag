import Link from "next/link"
import { Building2, FileText, Home, Mail, Phone, Scale, ShieldCheck } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-foreground py-8 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 text-sm sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr] lg:px-8">
        <div className="flex items-center justify-center lg:justify-start">
          <div className="flex items-center rounded-xl bg-white p-2 shadow-sm">
            <img
              src="/Diagouest_logo_horizontal_loupe.svg"
              alt="DiagOuest"
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 text-left text-primary-foreground/78">
          <div className="flex items-center gap-2 text-base font-semibold text-primary-foreground">
            <Building2 className="h-4 w-4" />
            À propos
          </div>

          <div className="flex flex-col items-start gap-2 text-left">
            <Link href="/certification-assurance" className="flex items-center gap-2 underline underline-offset-4 hover:text-primary-foreground">
              <ShieldCheck className="h-4 w-4" />
              Certification & assurance
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 text-left text-primary-foreground/78">
          <div className="flex items-center gap-2 text-base font-semibold text-primary-foreground">
            <Phone className="h-4 w-4" />
            Contact
          </div>

          <div className="flex flex-col items-start gap-2 text-left">
            <a href="tel:0609116149" className="flex items-center gap-2 underline underline-offset-4 hover:text-primary-foreground">
              <Phone className="h-4 w-4" />
              06 09 11 61 49
            </a>
            <a href="mailto:acdiagnostics92@gmail.com" className="flex items-center gap-2 underline underline-offset-4 hover:text-primary-foreground">
              <Mail className="h-4 w-4" />
              acdiagnostics92@gmail.com
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 text-left text-primary-foreground/78">
          <div className="flex items-center gap-2 text-base font-semibold text-primary-foreground">
            <Home className="h-4 w-4" />
            Informations
          </div>

          <div className="flex flex-col items-start gap-2 text-left">
            <Link href="/politique-confidentialite" className="flex items-center gap-2 underline underline-offset-4 hover:text-primary-foreground">
              <FileText className="h-4 w-4" />
              Politique de confidentialité
            </Link>
            <Link href="/mentions-legales" className="flex items-center gap-2 underline underline-offset-4 hover:text-primary-foreground">
              <Scale className="h-4 w-4" />
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
