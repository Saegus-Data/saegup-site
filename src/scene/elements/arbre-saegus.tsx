import type { CityElement } from '../types';
import { P } from '../palette';
import { TRAIT } from '../draw';

/** Pied de l'arbre (repère de la scène), sur la pelouse avant entre les deux ponts, à côté de la grande place de sable. */
const X = 735;
const Y = 666;

/** Touffes de feuillage : [décalage x, décalage y (depuis le pied), rayon]. */
const TOUFFES = [
  [-44, -128, 38], [44, -128, 38], [-26, -168, 40], [28, -170, 40], [0, -128, 44],
];

/** Reflets clairs du feuillage : [décalage x, décalage y, rayon]. */
const REFLETS = [
  [-34, -176, 14], [10, -192, 11], [-52, -136, 10], [30, -146, 9],
];

/** Le grand arbre aux couleurs de Saegus : tronc violet, feuillage corail, qui se balance. */
function ArbreSaegus() {
  return (
    <g className="anim-arbre">
      {/* Ombre au sol */}
      <ellipse cx={X} cy={Y + 2} rx={50} ry={9} style={{ fill: P.herbeSombre, opacity: 0.6 }} />
      {/* Tronc violet et ses deux branches maîtresses */}
      <path
        d={`M${X - 13},${Y} C${X - 9},${Y - 40} ${X - 8},${Y - 70} ${X - 30},${Y - 112} L${X - 18},${Y - 118} C${X - 4},${Y - 92} ${X},${Y - 86} ${X + 2},${Y - 82} C${X + 6},${Y - 92} ${X + 14},${Y - 106} ${X + 26},${Y - 120} L${X + 34},${Y - 110} C${X + 14},${Y - 78} ${X + 10},${Y - 40} ${X + 13},${Y} Z`}
        style={{ fill: P.violet, ...TRAIT }}
      />
      {/* Feuillage corail */}
      {TOUFFES.map(([dx, dy, r]) => (
        <circle key={`${dx}-${dy}`} cx={X + dx} cy={Y + dy} r={r} style={{ fill: P.corail, ...TRAIT }} />
      ))}
      <circle cx={X} cy={Y - 146} r={46} style={{ fill: P.corail }} />
      {REFLETS.map(([dx, dy, r]) => (
        <circle key={`${dx}-${dy}`} cx={X + dx} cy={Y + dy} r={r} style={{ fill: P.lavande, opacity: 0.45 }} />
      ))}
    </g>
  );
}

const element: CityElement = {
  id: 'arbre-saegus',
  nom: "L'arbre de Saegus",
  layer: 'rue',
  ajouteLe: '2026-11-26T19:05:00',
  ticket: 'BUG-6F4BEC5B',
  proposePar: 'Anonyme',
  Component: ArbreSaegus,
};
export default element;
