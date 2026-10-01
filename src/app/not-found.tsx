import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div className="max-w-md">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">404</p>
        <h1 className="mt-4 text-3xl font-bold text-foreground">Page introuvable</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          La page que vous cherchez n’existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90"
        >
          Retour à l’accueil
        </Link>
      </div>
    </div>
  )
}
