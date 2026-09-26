# AC Diagnostics - site vitrine

Application Next.js 15 + React 19 + Tailwind CSS pour un site vitrine dédié aux diagnostics immobiliers.

## Ordre et fonctionnement du site

Le site est construit autour de deux pages principales :

1. Page d'accueil :
   - Présentation des services AC Diagnostics.
   - Mise en avant des diagnostics obligatoires (DPE, électricité, gaz, amiante, plomb, ERP).
   - CTA principal qui redirige vers la page de devis.

2. Page de devis :
   - Reprise du message de valeur de l'entreprise.
   - Formulaire complet de demande de devis.
   - Soumission vers l'API interne `/api/devis` qui envoie un email via Resend.

## Structure du projet

- `src/app/page.tsx` : page d'accueil avec le héros, les services et le bouton d’accès au devis.
- `src/app/devis/page.tsx` : page dédiée au devis, avec contenu marketing et formulaire.
- `src/app/contact-form.tsx` : composant client contenant la logique de validation et d’envoi du formulaire.
- `src/app/api/devis/route.ts` : endpoint backend qui valide les données puis appelle la fonction d’envoi d’email.
- `src/lib/email.ts` : configuration Resend et génération du contenu HTML/texte de l’email.
- `src/app/layout.tsx` : métadonnées globales du site, SEO et Open Graph.
- `src/app/sitemap.ts` et `src/app/robots.ts` : génération du sitemap et des règles d’indexation.

## Parcours utilisateur

1. L’utilisateur arrive sur la page d’accueil.
2. Il découvre les services et peut cliquer sur “Demander un devis”.
3. La navigation le redirige vers `/devis`, qui est une page dédiée et indexable.
4. Sur cette page, il remplit le formulaire.
5. Le formulaire envoie une requête JSON à `/api/devis`.
6. L’API envoie un email au destinataire configuré via Resend.
7. Un message de confirmation s’affiche sur la page si l’envoi réussit.

## SEO et référencement

- Les métadonnées sont définies dans `src/app/layout.tsx` avec un titre, une description, des mots-clés et un domaine canonique.
- La page de devis possède sa propre méta-description et une URL canonique.
- Un sitemap et un robots.txt sont générés pour faciliter l’indexation par les moteurs de recherche.
- Les images et les titres sont pensés pour un contexte immobilier et un usage local.

## Installation

```bash
npm install
```

## Configuration des emails

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```bash
RESEND_API_KEY=your_api_key
RESEND_FROM_EMAIL=no-reply@ac-diagnostics.fr
RESEND_TO_EMAIL=contact@ac-diagnostics.fr
```

## Lancement en local

```bash
npm run dev
```

Le site est ensuite accessible sur `http://localhost:3000`.

## Build et production

```bash
npm run build
npm run start
```

## Vérification de l’API de devis

Exemple de requête de test avec curl :

```bash
curl -X POST http://localhost:3000/api/devis \
  -H "Content-Type: application/json" \
  -d '{"name":"Jean Dupont","phone":"0123456789","email":"jean@example.com","propertyType":"Appartement","city":"Paris","project":"vente","message":"Surface 45 m²"}'
```

## Bonnes pratiques

- Ne jamais committer les clés API dans le dépôt.
- Vérifier les variables `RESEND_FROM_EMAIL` et `RESEND_TO_EMAIL` avant mise en production.
- Garder les pages marketing et le formulaire séparés pour une meilleure lisibilité et un meilleur SEO.
