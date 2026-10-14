"use client"

import { FormEvent, useEffect, useRef, useState, type ReactNode } from "react"
import { ArrowRight, ChevronDown } from "lucide-react"

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
type FormErrors = Partial<Record<string, string>>
type FormValues = Record<string, string>

const initialFormValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  propertyType: "",
  city: "",
  floor: "",
  propertySubtype: "",
  constructionDate: "",
  levels: "",
  rooms: "",
  address: "",
  project: "",
  message: "",
}

function RequiredLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <Label htmlFor={htmlFor} className="flex items-center gap-1">
      <span>{children}</span>
      <span className="text-destructive">*</span>
    </Label>
  )
}

function getFieldErrorMessage(name: string, value: string) {
  const trimmed = value.trim()

  if (name === "message" || name === "floor" || name === "constructionDate") {
    return ""
  }

  if (!trimmed) {
    return "Ce champ est obligatoire."
  }

  if (name === "email") {
    const validEmail = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(trimmed)
    if (!validEmail) {
      return "Saisissez une adresse email valide."
    }
  }

  return ""
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const addressInputRef = useRef<HTMLInputElement | null>(null)
  const cityInputRef = useRef<HTMLInputElement | null>(null)

  const updateField = (name: string, value: string) => {
    setFormValues((current) => ({ ...current, [name]: value }))

    const shouldValidate = touched[name] || value.trim().length > 0

    if (!shouldValidate) {
      return
    }

    const error = getFieldErrorMessage(name, value)
    setFormErrors((current) => {
      const next = { ...current }
      if (error) {
        next[name] = error
      } else {
        delete next[name]
      }
      return next
    })
  }

  const validateField = (name: string) => {
    const value = formValues[name] ?? ""
    const error = getFieldErrorMessage(name, value)
    setTouched((current) => ({ ...current, [name]: true }))
    setFormErrors((current) => {
      const next = { ...current }
      if (error) {
        next[name] = error
      } else {
        delete next[name]
      }
      return next
    })
  }

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

    const nextErrors: FormErrors = {}

    Object.entries(formValues).forEach(([name, value]) => {
      if (name === "constructionDate" || name === "floor" || name === "message") {
        return
      }

      const error = getFieldErrorMessage(name, value)
      if (error) {
        nextErrors[name] = error
      }
    })

    setTouched((current) => {
      const next = { ...current }
      Object.keys(formValues).forEach((key) => {
        next[key] = true
      })
      return next
    })
    setFormErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error")
      setMessage("Merci de vérifier les champs requis et l'adresse email.")
      return
    }

    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch("/api/devis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
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

      setFormValues(initialFormValues)
      setTouched({})
      setFormErrors({})
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
              <RequiredLabel htmlFor="name">Nom</RequiredLabel>
              {formErrors.name ? <p className="text-[11px] text-red-500">{formErrors.name}</p> : null}
              <Input
                id="name"
                name="name"
                autoComplete="name"
                required
                value={formValues.name}
                onChange={(event) => updateField("name", event.target.value)}
                onBlur={() => validateField("name")}
                aria-invalid={Boolean(formErrors.name)}
              />
            </div>
            <div className="grid gap-2">
              <RequiredLabel htmlFor="phone">Telephone</RequiredLabel>
              {formErrors.phone ? <p className="text-[11px] text-red-500">{formErrors.phone}</p> : null}
              <Input
                id="phone"
                name="phone"
                autoComplete="tel"
                required
                value={formValues.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                onBlur={() => validateField("phone")}
                aria-invalid={Boolean(formErrors.phone)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <RequiredLabel htmlFor="email">Email</RequiredLabel>
            {formErrors.email ? <p className="text-[11px] text-red-500">{formErrors.email}</p> : null}
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formValues.email}
              onChange={(event) => updateField("email", event.target.value)}
              onBlur={() => validateField("email")}
              aria-invalid={Boolean(formErrors.email)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <RequiredLabel htmlFor="propertyType">Type de bien</RequiredLabel>
              {formErrors.propertyType ? (
                <p className="text-[11px] text-red-500">{formErrors.propertyType}</p>
              ) : null}
              <div className="relative">
                <select
                  id="propertyType"
                  name="propertyType"
                  className="h-10 w-full cursor-pointer appearance-none rounded-md border border-input bg-background px-3 pr-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                  value={formValues.propertyType}
                  onChange={(event) => {
                    updateField("propertyType", event.target.value)
                    setTouched((current) => ({ ...current, propertyType: true }))
                  }}
                  onBlur={() => validateField("propertyType")}
                  aria-invalid={Boolean(formErrors.propertyType)}
                >
                  <option value="" disabled>
                    Sélectionner
                  </option>
                  <option value="Appartement">Appartement</option>
                  <option value="Maison">Maison</option>
                  <option value="Locaux tertiaires / publics">Locaux tertiaires / publics</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="grid gap-2">
              <RequiredLabel htmlFor="city">Ville</RequiredLabel>
              {formErrors.city ? <p className="text-[11px] text-red-500">{formErrors.city}</p> : null}
              <Input
                id="city"
                name="city"
                ref={cityInputRef}
                autoComplete="address-level2"
                required
                value={formValues.city}
                onChange={(event) => updateField("city", event.target.value)}
                onBlur={() => validateField("city")}
                aria-invalid={Boolean(formErrors.city)}
              />
            </div>
          </div>

          {formValues.propertyType === "Appartement" ? (
            <div className="grid gap-2">
              <Label htmlFor="floor">Étage de l&apos;appartement</Label>
              <Input
                id="floor"
                name="floor"
                placeholder="Ex : 2e étage"
                value={formValues.floor}
                onChange={(event) => updateField("floor", event.target.value)}
                onBlur={() => validateField("floor")}
              />
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <RequiredLabel htmlFor="propertySubtype">Type</RequiredLabel>
              {formErrors.propertySubtype ? (
                <p className="text-[11px] text-red-500">{formErrors.propertySubtype}</p>
              ) : null}
              <div className="relative">
                <select
                  id="propertySubtype"
                  name="propertySubtype"
                  className="h-10 w-full cursor-pointer appearance-none rounded-md border border-input bg-background px-3 pr-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                  value={formValues.propertySubtype}
                  onChange={(event) => {
                    updateField("propertySubtype", event.target.value)
                    setTouched((current) => ({ ...current, propertySubtype: true }))
                  }}
                  onBlur={() => validateField("propertySubtype")}
                  aria-invalid={Boolean(formErrors.propertySubtype)}
                >
                  <option value="" disabled>
                    Sélectionner
                  </option>
                  <option value="T1">T1</option>
                  <option value="T2">T2</option>
                  <option value="T3">T3</option>
                  <option value="T4">T4</option>
                  <option value="T5">T5</option>
                  <option value="T6+">T6+</option>
                  <option value="Appartement">Appartement</option>
                  <option value="Terrain nu">Terrain nu</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="constructionDate">Date de construction</Label>
              <Input
                id="constructionDate"
                name="constructionDate"
                type="date"
                className="cursor-pointer pr-8 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                value={formValues.constructionDate}
                onChange={(event) => updateField("constructionDate", event.target.value)}
                onBlur={() => validateField("constructionDate")}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <RequiredLabel htmlFor="levels">Nombre de niveaux</RequiredLabel>
              {formErrors.levels ? <p className="text-[11px] text-red-500">{formErrors.levels}</p> : null}
              <Input
                id="levels"
                name="levels"
                type="number"
                min="1"
                required
                value={formValues.levels}
                onChange={(event) => updateField("levels", event.target.value)}
                onBlur={() => validateField("levels")}
                aria-invalid={Boolean(formErrors.levels)}
              />
            </div>
            <div className="grid gap-2">
              <RequiredLabel htmlFor="rooms">Nombre de pièces</RequiredLabel>
              {formErrors.rooms ? <p className="text-[11px] text-red-500">{formErrors.rooms}</p> : null}
              <Input
                id="rooms"
                name="rooms"
                type="number"
                min="1"
                required
                value={formValues.rooms}
                onChange={(event) => updateField("rooms", event.target.value)}
                onBlur={() => validateField("rooms")}
                aria-invalid={Boolean(formErrors.rooms)}
              />
            </div>
          </div>

          <div className="grid gap-2 relative">
            <RequiredLabel htmlFor="address">Adresse complète</RequiredLabel>
            {formErrors.address ? <p className="text-[11px] text-red-500">{formErrors.address}</p> : null}
            <Input
              id="address"
              name="address"
              ref={addressInputRef}
              autoComplete="street-address"
              placeholder="Entrez une adresse complète"
              required
              value={formValues.address}
              onChange={(event) => {
                updateField("address", event.target.value)

                const value = event.target.value.trim()
                if (value.length < 3) {
                  setAddressSuggestions([])
                  setShowSuggestions(false)
                  return
                }

                void fetch(
                  `https://photon.komoot.io/api/?q=${encodeURIComponent(value)}&limit=5&lang=fr`,
                )
                  .then((response) => response.json())
                  .then((data: { features?: Array<{ properties?: { name?: string; city?: string; street?: string; housenumber?: string; postcode?: string; country?: string } }> }) => {
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
                  })
                  .catch(() => {
                    setAddressSuggestions([])
                    setShowSuggestions(false)
                  })
              }}
              onBlur={() => validateField("address")}
              aria-invalid={Boolean(formErrors.address)}
            />

            {showSuggestions && addressSuggestions.length > 0 ? (
              <ul className="absolute top-full left-0 z-20 mt-1 w-full rounded-md border bg-background shadow-lg">
                {addressSuggestions.map((suggestion, index) => (
                  <li key={`${suggestion}-${index}`}>
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-left text-sm hover:bg-muted"
                      onClick={() => {
                        setFormValues((current) => ({
                          ...current,
                          address: suggestion,
                        }))
                        setShowSuggestions(false)

                        const cityMatch = suggestion.match(/,\s*([^,]+),\s*\d{5}/)
                        if (cityInputRef.current) {
                          const cityValue = cityMatch?.[1] ?? ""
                          setFormValues((current) => ({ ...current, city: cityValue }))
                          cityInputRef.current.value = cityValue
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
            <RequiredLabel htmlFor="project">Projet</RequiredLabel>
            {formErrors.project ? <p className="text-[11px] text-red-500">{formErrors.project}</p> : null}
            <div className="relative">
              <select
                id="project"
                name="project"
                className="h-10 w-full cursor-pointer appearance-none rounded-md border border-input bg-background px-3 pr-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
                value={formValues.project}
                onChange={(event) => {
                  updateField("project", event.target.value)
                  setTouched((current) => ({ ...current, project: true }))
                }}
                onBlur={() => validateField("project")}
                aria-invalid={Boolean(formErrors.project)}
              >
                <option value="" disabled>
                  Selectionner
                </option>
                <option value="vente">Vente</option>
                <option value="location">Location</option>
                <option value="travaux">Travaux</option>
                <option value="autre">Autre</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message">Details utiles</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Surface, annee du bien, diagnostics souhaites, delai..."
              value={formValues.message}
              onChange={(event) => updateField("message", event.target.value)}
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
