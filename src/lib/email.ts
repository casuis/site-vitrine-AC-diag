import { Resend } from "resend"

export interface ContactFormData {
  name: string
  phone: string
  email: string
  propertyType: string
  propertySubtype: string
  floor?: string
  levels: string
  rooms: string
  constructionDate?: string
  city: string
  address: string
  project: string
  message?: string
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL
  const toEmail = process.env.RESEND_TO_EMAIL

  if (!apiKey) {
    throw new Error("RESEND_API_KEY n'est pas configuré. Ajoutez-le dans votre fichier .env.local.")
  }

  if (!fromEmail || !toEmail) {
    throw new Error(
      "RESEND_FROM_EMAIL et RESEND_TO_EMAIL doivent être configurés dans votre fichier .env.local.",
    )
  }

  const resend = new Resend(apiKey)
  return { resend, fromEmail, toEmail }
}

export async function sendContactEmail(data: ContactFormData) {
  const { resend, fromEmail, toEmail } = getResendClient()
  const html = `
    <h1>Nouvelle demande de devis</h1>
    <p>Un visiteur a soumis le formulaire de contact depuis le site DiagOuest.</p>
    <ul>
      <li><strong>Nom :</strong> ${data.name}</li>
      <li><strong>Téléphone :</strong> ${data.phone}</li>
      <li><strong>Email :</strong> ${data.email}</li>
      <li><strong>Type de bien :</strong> ${data.propertyType}</li>
      <li><strong>Type :</strong> ${data.propertySubtype}</li>
      ${data.floor ? `<li><strong>Étage :</strong> ${data.floor}</li>` : ""}
      <li><strong>Nombre de niveaux :</strong> ${data.levels}</li>
      <li><strong>Nombre de pièces :</strong> ${data.rooms}</li>
      ${data.constructionDate ? `<li><strong>Date de construction :</strong> ${data.constructionDate}</li>` : ""}
      <li><strong>Ville :</strong> ${data.city}</li>
      <li><strong>Adresse complète :</strong> ${data.address}</li>
      <li><strong>Projet :</strong> ${data.project}</li>
    </ul>
    <h2>Détails utiles</h2>
    <p>${data.message ? data.message.replace(/\n/g, "<br />") : "Aucun détail supplémentaire fourni."}</p>
    <p>Envoyé le ${new Date().toLocaleString("fr-FR")}</p>
  `

  const text = `Nouvelle demande de devis\n\nNom : ${data.name}\nTéléphone : ${data.phone}\nEmail : ${data.email}\nType de bien : ${data.propertyType}\nType : ${data.propertySubtype}\nÉtage : ${data.floor || "Non renseigné"}\nNombre de niveaux : ${data.levels}\nNombre de pièces : ${data.rooms}\nDate de construction : ${data.constructionDate || "Non renseignée"}\nVille : ${data.city}\nAdresse complète : ${data.address}\nProjet : ${data.project}\n\nDétails utiles : ${data.message ?? "Aucun détail supplémentaire fourni."}\n\nEnvoyé le ${new Date().toLocaleString("fr-FR")}`

  return resend.emails.send({
    from: fromEmail,
    to: toEmail,
    subject: "Nouvelle demande de devis - AC Diagnostics",
    html,
    text,
  })
}
