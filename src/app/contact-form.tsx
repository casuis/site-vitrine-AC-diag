"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Status = "idle" | "loading" | "success" | "error"

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const addressInputRef = useRef<HTMLInputElement | null>(null)
  const cityInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!addressInputRef.current) {
      return
    }

    const currentInput = addressInputRef.current

    const handleInput = async () => {
      const value = currentInput.value.trim()

      if (value.length < 3) {
        setAddressSuggestions([])
        setShowSuggestions(false)
        return
      }

      try {
        const response = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(value)}&limit=5&lang=fr`,
        )
        const data = (await response.json()) as {
          features?: Array<{
            properties?: {
              name?: string
              city?: string
              street?: string
              housenumber?: string
              postcode?: string
              country?: string
            }
          }>
        }

        const suggestions = (data.features ?? []).map((feature) => {
          const properties = feature.properties ?? {}
          const number = properties.housenumber?.trim()
          const street = properties.street?.trim() ?? properties.name?.trim()
          const city = properties.city?.trim()
          const postcode = properties.postcode?.trim()
          const country = properties.country?.trim()

          const streetLine = number ? `${number} ${street}`.trim() : street
          const fullAddress = [streetLine, city, postcode, country].filter(Boolean).join(", ")

          return fullAddress
        })

        setAddressSuggestions(suggestions)
        setShowSuggestions(suggestions.length > 0)
      } catch {
        setAddressSuggestions([])
        setShowSuggestions(false)
      }
    }

    currentInput.addEventListener("input", handleInput)

    return () => {
      currentInput.removeEventListener("input", handleInput)
    }
  }, [])

  // Gestion de l'envoi du formulaire de devis vers l'API et retour utilisateur.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget

    // Validation native du navigateur avant appel réseau.
    if (!form.checkValidity()) {
      form.reportValidity()
      setStatus("error")
      setMessage("Merci de vérifier les champs requis et l'adresse email.")
      return
    }

    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch("/api/devis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = (await response.json().catch(() => null)) as {
        message?: string
      } | null

      if (!response.ok) {
        setStatus("error")

        setMessage(
          result?.message ??
            "L'envoi a echoue. Vous pouvez reessayer ou contacter AC Diagnostics par telephone.",
        )
        return
      }

      form.reset()
      setStatus("success")
      setMessage(
        result?.message ??
          "Votre demande a bien ete envoyee. Vous serez recontacte rapidement.",
      )

      // Redirection vers la page de confirmation après un envoi réussi.
      window.location.href = "/devis/confirmation"
    } catch {
      setStatus("error")
      setMessage(
        "L'envoi a echoue. Vous pouvez reessayer ou contacter AC Diagnostics par telephone.",
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demande de devis</CardTitle>
        <CardDescription>
          Les champs transmis permettent de preparer une estimation adaptee.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" name="name" autoComplete="name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telephone</Label>
              <Input id="phone" name="phone" autoComplete="tel" required />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="propertyType">Type de bien</Label>
              <select
                id="propertyType"
                name="propertyType"
                className="h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Sélectionner
                </option>
                <option value="Appartement">Appartement</option>
                <option value="Maison">Maison</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">Ville</Label>
              <Input id="city" name="city" ref={cityInputRef} autoComplete="address-level2" required />
            </div>
          </div>

          <div className="grid gap-2 relative">
            <Label htmlFor="address">Adresse complète</Label>
            <Input
              id="address"
              name="address"
              ref={addressInputRef}
              autoComplete="street-address"
              placeholder="Entrez une adresse complète"
              required
            />

            {showSuggestions && addressSuggestions.length > 0 ? (
              <ul className="absolute top-full left-0 z-20 mt-1 w-full rounded-md border bg-background shadow-lg">
                {addressSuggestions.map((suggestion, index) => (
                  <li key={`${suggestion}-${index}`}>
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-left text-sm hover:bg-muted"
                      onClick={() => {
                        if (addressInputRef.current) {
                          addressInputRef.current.value = suggestion
                        }
                        setShowSuggestions(false)

                        const cityMatch = suggestion.match(/,\s*([^,]+),\s*\d{5}/)
                        if (cityInputRef.current) {
                          cityInputRef.current.value = cityMatch?.[1] ?? ""
                        }
                      }}
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="project">Projet</Label>
            <select
              id="project"
              name="project"
              className="h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Selectionner
              </option>
              <option value="vente">Vente</option>
              <option value="location">Location</option>
              <option value="travaux">Travaux</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message">Details utiles</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Surface, annee du bien, diagnostics souhaites, delai..."
            />
          </div>

          <Button type="submit" size="lg" disabled={status === "loading"}>
            {status === "loading" ? "Envoi en cours" : "Envoyer la demande"}
            <ArrowRight className="h-4 w-4" />
          </Button>

          {message ? (
            <p
              className={
                status === "success"
                  ? "text-sm font-medium text-primary"
                  : "text-sm font-medium text-destructive"
              }
            >
              {message}
            </p>
          ) : null}
        </form>
      </CardContent>
    </Card>
  )
}
