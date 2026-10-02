"use client"

import Image from "next/image"
import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-[0_1px_0_rgba(15,23,42,0.08)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" onClick={handleHomeClick} className="flex items-center gap-3" aria-label="AC Diagnostics accueil">
          <Image
            src="/DiagOuest_logo_horizontal_loupe.svg"
            alt="AC Diagnostics"
            width={200}
            height={200}
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <a
            className="group relative inline-flex items-center text-[#164480] transition-colors hover:text-[#164480]/75"
            href="#services"
          >
            <Text as="span" style={3} text="Diagnostics" />
            <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#164480] transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </a>
          <a
            className="group relative inline-flex items-center text-[#164480] transition-colors hover:text-[#164480]/75"
            href="#methode"
          >
            <Text as="span" style={3} text="Methode" />
            <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#164480] transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className={`${isScrolled ? "shadow-[0_14px_30px_-16px_rgba(15,23,42,0.65)]" : "shadow-[0_16px_32px_-16px_rgba(15,23,42,0.7)]"} uppercase tracking-[0.2em]`}
          >
            <Link href="/devis" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-white transition-colors duration-300 ease-out group-hover:text-[#164480]" />
              <Text as="span" style={3} text="Devis Gratuit" className="!text-white transition-colors duration-300 ease-out group-hover:!text-[#164480]" />
            </Link>
          </Button>
          <Button
            asChild
            size="icon"
            variant="outline"
            aria-label="Appeler AC Diagnostics"
            className={
              isScrolled
                ? "group border-primary bg-white text-primary shadow-[0_12px_28px_-18px_rgba(15,23,42,0.6)] hover:border-[#f2b933] hover:bg-[#f2b933] hover:text-[#164480]"
                : "group border-white bg-white text-black shadow-[0_14px_30px_-18px_rgba(15,23,42,0.68)] hover:border-[#f2b933] hover:bg-[#f2b933] hover:text-[#164480]"
            }
          >
            <a href="tel:+33000000000" className="inline-flex items-center justify-center">
              <Phone className="h-4 w-4 transition-transform duration-150 ease-out group-hover:animate-[phone-vibrate_0.18s_linear_3]" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
