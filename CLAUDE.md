# Saegus City

Une île flottante parisienne illustrée (SVG plein écran, animée) construite ticket après ticket : chaque idée déposée
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

2. **Dessiner en SVG** dans le repère de la scène : 1600 × 900. Le décor est une **île flottante
   parisienne** posée sur une mer de nuages (coordonnées ci-dessous dans le repère de la scène) :
   - ciel au-dessus de l'horizon (y = 366), mer en dessous ; mer de nuages en bas (y > 650) ;
   - pelouse de l'île de x ≈ 240 à 1360, du fond (y ≈ 275) à la pointe avant (x ≈ 795, y ≈ 710) ;
     socle de terre dessous jusqu'à y ≈ 850 ;
   - tour Eiffel : x ≈ 650, sommet y ≈ 195, pieds y ≈ 450 ; Notre-Dame : x 855–975, y 240–400 ;
     Arc de Triomphe : x 1020–1160, y 325–475 ; immeubles haussmanniens vers x 455, 895 et 1170 ;
   - la Seine descend du fond (x ≈ 1005, y ≈ 355) vers l'avant et tombe en cascades
     (x ≈ 615 et 995, y 625–775), plus deux cascades latérales (x ≈ 335 et 1245) ;
   - zones libres bien visibles : de part et d'autre de l'île (x < 230 ou x > 1380, y 280–600).
   Faire **grand et coloré** (la scène est projetée sur un écran) ; ne pas masquer les monuments.
   Le décor est dessiné via `<Ile>` (`src/scene/draw.tsx`) dans le repère de l'illustration
   d'origine ; un nouvel élément peut, lui, utiliser directement le repère de la scène.

   ⚠️ **Zone toujours visible : y ≥ 280.** La scène remplit l'écran en étant recadrée **par le
   haut** dès que l'écran est plus large que 16:9 (cas courant : barre du navigateur, portable,
   écran large) : jusqu'à ~260 unités disparaissent en haut. Le haut est aussi couvert par
   l'encart « Saegus City » (en haut à gauche) et la carte « Dernier ajout » (en haut à droite).
   Donc :
   - l'objet demandé par le ticket doit tenir **entièrement entre y = 280 et y = 900** (pour une
     animation : sur toute sa trajectoire) ; y < 280 = décor facultatif seulement ;
   - un objet volant ou céleste (montgolfière, dirigeable, oiseaux, astre…) se place **entre
     y = 280 et 600**, devant l'île : plan `ville` (ou plus) ;
   - un objet posé sur un monument (fusée, enseigne…) qui dépasserait y < 280 : l'agrandir vers
     le bas ou le placer sur un bâtiment plus bas plutôt que de le hisser hors champ.

   Les plans se superposent dans l'ordre `ciel → fond → ville → rue → premier-plan` : un objet
   du plan `ciel` est **caché derrière l'île**, et la zone de ciel libre est presque entièrement
   hors champ. `ciel` ne sert qu'au décor de fond (ex. ambiance), pas à l'objet demandé par un
   ticket. Un effet qui touche toute la scène (lumière, pluie, brouillard…) se met en
   `premier-plan`, par-dessus tout (ex. calque semi-transparent avec `mixBlendMode`,
   `pointerEvents: 'none'`).
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
