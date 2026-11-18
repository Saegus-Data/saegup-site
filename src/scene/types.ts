import type { JSX } from 'react';

/**
 * Plans de la scène, du plus lointain au plus proche : un élément est dessiné
 * par-dessus ceux des plans précédents.
 */
export const LAYERS = ['ciel', 'fond', 'ville', 'rue', 'premier-plan'] as const;
export type Layer = (typeof LAYERS)[number];

/**
 * Un élément de la ville : un fichier de `src/scene/elements/`, exporté par défaut.
 * Il est découvert tout seul, sans rien enregistrer ailleurs.
 */
export interface CityElement {
  /** Identifiant unique en kebab-case, identique au nom du fichier (`fusee.tsx` → `fusee`). */
  id: string;
  /** Libellé affiché dans la carte « Dernier ajout ». */
  nom: string;
  layer: Layer;
  /** Date-heure ISO de l'ajout : l'élément le plus récent est mis en avant. */
  ajouteLe: string;
  /** Référence du ticket ITSM qui l'a demandé (ex. `BUG-0042`). */
  ticket?: string;
  /** Prénom de la personne qui l'a proposé. */
  proposePar?: string;
  /** Dessin SVG en coordonnées de la scène (1600 × 900, sol à y = 720). */
  Component: () => JSX.Element;
}
