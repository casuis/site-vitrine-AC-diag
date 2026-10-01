import type { LucideIcon } from "lucide-react"
import {
  BadgeCheck,
  Bug,
  CalendarCheck2,
  Clock3,
  FileText,
  Flame,
  Gauge,
  PlugZap,
  ShieldCheck,
  Waves,
} from "lucide-react"

export type DiagnosticItem = {
  title: string
  text: string
  icon: LucideIcon
}

export const diagnostics: DiagnosticItem[] = [
  {
    title: "DPE",
    text: "Performance energetique, recommandations et lecture claire du classement.",
    icon: Gauge,
  },
  {
    title: "Electricite",
    text: "Controle des installations de plus de 15 ans avant vente ou location.",
    icon: PlugZap,
  },
  {
    title: "Gaz",
    text: "Verification des points sensibles pour securiser votre transaction.",
    icon: Flame,
  },
  {
    title: "Amiante",
    text: "Reperage selon l'annee du bien et le contexte de vente ou travaux.",
    icon: ShieldCheck,
  },
  {
    title: "Plomb",
    text: "Constat de risque d'exposition au plomb pour les logements concernes.",
    icon: BadgeCheck,
  },
  {
    title: "ERP",
    text: "Etat des risques et pollutions avec donnees locales actualisees.",
    icon: Waves,
  },
  {
    title: "Termites",
    text: "Diagnostic de l'existence de termites et des risques de dégradation structurelle.",
    icon: Bug,
  },
]

export const processSteps = [
  "Analyse du bien et des diagnostics obligatoires",
  "Intervention planifiee selon vos contraintes",
  "Rapport transmis rapidement, pret pour le notaire ou l'agence",
]

export type HeroHighlight = {
  label: string
  value: string
  icon: LucideIcon
}

export const heroHighlights: HeroHighlight[] = [
  { label: "Rapports", value: "rapides", icon: Clock3 },
  { label: "Devis", value: "personnalise", icon: FileText },
  { label: "Intervention", value: "sur rendez-vous", icon: CalendarCheck2 },
]
