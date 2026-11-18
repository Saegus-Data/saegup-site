/**
 * Couleurs de la charte pour le SVG. Les attributs `fill="var(--x)"` ne sont pas fiables :
 * on passe par `style={{ fill: P.violet }}`. Une couleur manquante s'ajoute dans
 * `styles/tokens.css`, puis ici.
 */
export const P = {
  violet: 'var(--violet)',
  lavande: 'var(--lavande)',
  navy: 'var(--navy)',
  noir: 'var(--noir)',
  gris: 'var(--gris)',
  grisClair: 'var(--gris-clair)',
  blanc: 'var(--blanc)',
  corail: 'var(--corail)',
  ciel: 'var(--ciel)',
  jaune: 'var(--jaune)',
  feuillage: 'var(--feuillage)',
  feuillageSombre: 'var(--feuillage-sombre)',
  bitume: 'var(--bitume)',
  trottoir: 'var(--trottoir)',
  fenetre: 'var(--fenetre)',
} as const;
