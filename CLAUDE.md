# saegup-site

Page d'inscription au Saegup (Vite + React + TypeScript), déployée sur Vercel (une preview par PR).

## Commandes
- `npm run lint` — ESLint
- `npm run typecheck` — tsc
- `npm test -- --coverage` — Vitest ; seuil de couverture dans `vite.config.ts` (cliquet, ne jamais baisser)
- `npm run build` — build de prod

## Conventions
- Couleurs : uniquement via les tokens de `src/styles/tokens.css` (charte Saegus), jamais de valeur en dur.
- Styles de la page : `src/App.css`. Contenu de l'évènement : `src/event.ts`.
- Textes en français.
