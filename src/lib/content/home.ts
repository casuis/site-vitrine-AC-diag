import type { LucideIcon } from "lucide-react"
import {
  BadgeCheck,
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
]

export const processSteps = [
  "Analyse du bien et des diagnostics obligatoires",
  "Intervention planifiee selon vos contraintes",
  "Rapport transmis rapidement, pret pour le notaire ou l'agence",
]

export const heroHighlights = [
  ["Rapports", "rapides"],
  ["Devis", "personnalise"],
  ["Intervention", "sur rendez-vous"],
]
