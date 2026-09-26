import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  // Base de métadonnées utilisée par les moteurs de recherche et les previews sociaux.
  metadataBase: new URL("https://ac-diagnostics.fr"),
  title: "AC Diagnostics | Diagnostics immobiliers obligatoires",
  description:
    "AC Diagnostics réalise vos diagnostics immobiliers obligatoires (DPE, amiante, plomb, ERP, électricité, gaz) avec un devis rapide et un accompagnement clair.",
  keywords: [
    "diagnostics immobiliers",
    "DPE",
    "diagnostic amiante",
    "diagnostic plomb",
    "ERP",
    "diagnostic électrique",
    "diagnostic gaz",
    "devis diagnostics immobiliers",
    "AC Diagnostics",
  ],
  alternates: {
    canonical: "https://ac-diagnostics.fr",
  },
  openGraph: {
    title: "AC Diagnostics | Diagnostics immobiliers obligatoires",
    description:
      "AC Diagnostics réalise vos diagnostics immobiliers obligatoires avec un devis rapide et un accompagnement clair.",
    url: "https://ac-diagnostics.fr",
    siteName: "AC Diagnostics",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AC Diagnostics | Diagnostics immobiliers obligatoires",
    description:
      "Diagnostics immobiliers obligatoires : DPE, amiante, plomb, ERP et devis rapide.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
