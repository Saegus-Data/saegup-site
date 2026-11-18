import { LAYERS, type CityElement } from './types';

type ElementModule = { default: CityElement };

/** Range les éléments par plan, puis par date d'ajout (les plus anciens dessous). */
export function sortElements(elements: CityElement[]): CityElement[] {
  return [...elements].sort(
    (a, b) =>
      LAYERS.indexOf(a.layer) - LAYERS.indexOf(b.layer) ||
      a.ajouteLe.localeCompare(b.ajouteLe) ||
      a.id.localeCompare(b.id),
  );
}

/** L'élément ajouté le plus récemment (mis en avant à l'écran). */
export function newestElement(elements: CityElement[]): CityElement | undefined {
  return [...elements].sort((a, b) => b.ajouteLe.localeCompare(a.ajouteLe) || a.id.localeCompare(b.id))[0];
}

/** Nombre de personnes distinctes ayant proposé un élément. */
export function contributorCount(elements: CityElement[]): number {
  return new Set(elements.flatMap((e) => (e.proposePar ? [e.proposePar.trim().toLowerCase()] : []))).size;
}

/** Tous les fichiers de `elements/` : en ajouter un suffit à le faire apparaître. */
export function loadElements(modules: Record<string, ElementModule>): CityElement[] {
  return sortElements(Object.values(modules).map((m) => m.default));
}

export const ELEMENTS = loadElements(import.meta.glob<ElementModule>('./elements/*.tsx', { eager: true }));
