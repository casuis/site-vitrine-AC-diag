import { Building2, Home, Mail, Phone } from "lucide-react"

export function SiteFooter() {
  return (
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
  )
}
