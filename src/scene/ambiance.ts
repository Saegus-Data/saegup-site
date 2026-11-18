/**
 * Ambiance générale de la ville. Changer `AMBIANCE` change le ciel de toute la scène
 * (les éléments peuvent aussi lire `AMBIANCE` pour s'adapter, ex. fenêtres allumées la nuit).
 */
export type Ambiance = 'jour' | 'crepuscule' | 'nuit';

export const AMBIANCE: Ambiance = 'jour';

/** Dégradé du ciel (haut → horizon), toujours via les tokens de `styles/tokens.css`. */
export const SKY: Record<Ambiance, readonly [string, string]> = {
  jour: ['var(--ciel-jour-haut)', 'var(--ciel-jour-bas)'],
  crepuscule: ['var(--ciel-crepuscule-haut)', 'var(--ciel-crepuscule-bas)'],
  nuit: ['var(--ciel-nuit-haut)', 'var(--ciel-nuit-bas)'],
};
