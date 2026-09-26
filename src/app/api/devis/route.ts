import { NextResponse } from "next/server"
import { ContactFormData, sendContactEmail } from "@/lib/email"

const requiredFields = ["name", "phone", "email", "propertyType", "city", "address", "project"]

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ message: "Requête invalide." }, { status: 400 })
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ message: "Requête invalide." }, { status: 400 })
  }

  const formData = payload as Record<string, unknown>
  const missingFields = requiredFields.filter((field) => {
    const value = formData[field]
    return typeof value !== "string" || value.trim().length === 0
  })

  if (missingFields.length > 0) {
    return NextResponse.json(
      { message: "Merci de compléter les champs obligatoires." },
      { status: 400 },
    )
  }

  const contactData: ContactFormData = {
    name: String(formData.name ?? "").trim(),
    phone: String(formData.phone ?? "").trim(),
    email: String(formData.email ?? "").trim(),
    propertyType: String(formData.propertyType ?? "").trim(),
    city: String(formData.city ?? "").trim(),
    address: String(formData.address ?? "").trim(),
    project: String(formData.project ?? "").trim(),
    message:
      typeof formData.message === "string" ? formData.message.trim() : "",
  }

  try {
    await sendContactEmail(contactData)

    return NextResponse.json({
      message: "Votre demande a bien été envoyée. Vous serez recontacté rapidement.",
    })
  } catch (error) {
    console.error("Erreur envoi email contact", error)

    const isConfigurationError =
      error instanceof Error && /RESEND_(API_KEY|FROM_EMAIL|TO_EMAIL)/.test(error.message)

    return NextResponse.json(
      {
        message: isConfigurationError
          ? "La configuration de l'envoi d'email est manquante ou incorrecte."
          : "L'envoi a échoué. Vous pouvez réessayer ou contacter AC Diagnostics par téléphone.",
      },
      { status: isConfigurationError ? 503 : 502 },
    )
  }
}
