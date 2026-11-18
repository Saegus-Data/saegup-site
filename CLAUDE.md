# Saegus City

Une ville illustrée (SVG plein écran) construite ticket après ticket : chaque idée déposée
depuis le bandeau devient un ticket ITSM dans AI Studio, puis un élément de la ville.
Vite + React + TypeScript, en production sur Vercel (`main`). Les PR se testent dans la VM
GitHub Codespaces (`.devcontainer/`).

## Commandes
- `npm run lint` — ESLint
- `npm run typecheck` — tsc
- `npm test -- --coverage` — Vitest ; seuil de couverture dans `vite.config.ts` (cliquet à 100 %, ne jamais baisser)
- `npm run build` — build de prod

## Traiter un ticket « Ville du Saegup » (la recette)

Le but : un changement **visible au premier coup d'œil** sur la scène, et rien d'autre.

1. **Créer un fichier** `src/scene/elements/<id>.tsx` (kebab-case, l'id = le nom du fichier).
   Il est découvert tout seul : ne rien enregistrer ailleurs. Modèle :

   ```tsx
   import type { CityElement } from '../types';
   import { P } from '../palette';

   function Fusee() {
     return (
       <g className="anim-…">
         <rect x={…} y={…} width={…} height={…} style={{ fill: P.violet }} />
       </g>
     );
   }

   const element: CityElement = {
     id: 'fusee',
     nom: 'La fusée',                 // affiché dans la carte « Dernier ajout »
     layer: 'ville',                  // ciel | fond | ville | rue | premier-plan (voir étape 2)
     ajouteLe: '2026-11-26T19:05:00', // date-heure ACTUELLE : l'élément le plus récent est mis en avant
     ticket: 'BUG-0042',              // référence du ticket ITSM
     proposePar: 'Léa',               // prénom indiqué dans le ticket (ou 'Anonyme')
     Component: Fusee,
   };
   export default element;
   ```

2. **Dessiner en SVG** dans le repère de la scène : 1600 × 900, sol à y = 720, avenue de 740
   à 830, trottoir avant de 830 à 900. Centre de la tour Saegus : x = 800, sommet y = 190 ;
   toits des immeubles entre y = 320 et 480.
   Faire **grand et coloré** (la scène est projetée sur un écran) ; ne pas masquer la tour.

   ⚠️ **Zone toujours visible : y ≥ 280.** La scène remplit l'écran en étant recadrée **par le
   haut** dès que l'écran est plus large que 16:9 (cas courant : barre du navigateur, portable,
   écran large) : jusqu'à ~260 unités disparaissent en haut. Le haut est aussi couvert par
   l'encart « Saegus City » (en haut à gauche) et la carte « Dernier ajout » (en haut à droite).
   Donc :
   - l'objet demandé par le ticket doit tenir **entièrement entre y = 280 et y = 900** (pour une
     animation : sur toute sa trajectoire) ; y < 280 = décor facultatif seulement ;
   - un objet volant (montgolfière, dirigeable, oiseaux…) vole **entre y = 280 et 480**, donc
     devant les immeubles : plan `ville` (ou plus) ;
   - un objet posé sur la tour (fusée, enseigne…) qui dépasserait y < 280 : l'agrandir vers le
     bas ou le placer sur un immeuble plus bas plutôt que de le hisser hors champ.

   Les plans se superposent dans l'ordre `ciel → fond → ville → rue → premier-plan` : un objet
   du plan `ciel` est **caché derrière les bâtiments**, et la zone de ciel libre est presque
   entièrement hors champ. `ciel` ne sert qu'au décor de fond (ex. ambiance), pas à l'objet
   demandé par un ticket.
3. **Animer** si l'idée s'y prête : ajouter un `@keyframes` + une classe `anim-<id>` dans
   `src/App.css` (section « Scène »). Les animations sont coupées en `prefers-reduced-motion`.
4. **Couleurs** : uniquement `P.*` (`src/scene/palette.ts`) via `style={{ fill: … }}`, jamais
   d'attribut `fill="var(--…)"` ni de valeur en dur. Une couleur manquante : l'ajouter dans
   `src/styles/tokens.css` puis dans `palette.ts`.
5. **Ambiance** (nuit, crépuscule…) : changer `AMBIANCE` dans `src/scene/ambiance.ts` ; les
   éléments peuvent lire `AMBIANCE` (ex. fenêtres allumées la nuit).
6. **Modifier un élément existant** seulement si le ticket le demande explicitement ; dans ce
   cas, mettre à jour son `ajouteLe`, `ticket` et `proposePar` pour qu'il soit mis en avant.

Les tests génériques (`src/scene/registry.test.tsx`, `src/App.test.tsx`) vérifient et rendent
chaque élément : un nouvel élément sans logique conditionnelle n'a pas besoin de test dédié.
S'il contient des branches (`? :`, `if`), ajouter un test pour garder 100 % de couverture.
Un test dédié se place **hors de** `elements/` (ex. `src/scene/<id>.test.tsx`) : tout fichier
`.tsx` de `elements/` est chargé comme un élément de la ville.

## Garde-fous
- Ne pas toucher : `.devcontainer/`, `vite.config.ts` (seuil de couverture, route `/api/idea`),
  `eslint.config.js`, `api/`, `src/server/` (dépôt des tickets), `src/ideas/` (bandeau), sauf demande explicite.
- Pas de nouvelle dépendance npm : tout se dessine en SVG.
- Textes en français. Une PR = un ticket.
