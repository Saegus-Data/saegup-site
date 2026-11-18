import type { CityElement } from '../types';
import { P } from '../palette';
import { Ile, Lampadaire, TRAIT } from '../draw';

const LAMPADAIRES = [
  [512, 560], [627, 546], [853, 376], [1040, 522], [1305, 486],
];

/** Grilles de jardin : [x1, y1, x2, y2]. */
const GRILLES = [
  [366, 508, 404, 538], [728, 352, 792, 340], [792, 372, 846, 360], [1160, 478, 1244, 516],
];

/** Massifs de fleurs : [x, y, couleur]. */
const FLEURS: [number, number, string][] = [
  [265, 466, P.fleur], [340, 496, P.mauve], [490, 548, P.fleur], [655, 520, P.fleur], [715, 490, P.fleur],
  [890, 440, P.corail], [872, 470, P.mauve], [1198, 430, P.corail], [1218, 436, P.mauve], [1335, 460, P.blanc],
  [735, 668, P.fleur], [778, 690, P.corail], [880, 666, P.mauve], [965, 632, P.fleur], [795, 562, P.mauve],
];

/** Le mobilier urbain : réverbères, bancs, grilles et massifs de fleurs. */
function Mobilier() {
  return (
    <Ile>
      {GRILLES.map(([x1, y1, x2, y2]) => (
        <g key={`${x1}-${y1}`} style={{ stroke: P.rocheSombre, strokeWidth: 2.5 }}>
          <line x1={x1} y1={y1 - 18} x2={x2} y2={y2 - 18} />
          <line x1={x1} y1={y1 - 6} x2={x2} y2={y2 - 6} />
          {Array.from({ length: 6 }, (_, i) => (
            <line
              key={i}
              x1={x1 + ((x2 - x1) * i) / 5}
              y1={y1 + ((y2 - y1) * i) / 5}
              x2={x1 + ((x2 - x1) * i) / 5}
              y2={y1 + ((y2 - y1) * i) / 5 - 22}
            />
          ))}
        </g>
      ))}
      {/* Bancs */}
      <polygon points="410,532 472,552 472,560 410,540" style={{ fill: P.feuillage, ...TRAIT }} />
      <polygon points="410,520 472,540 472,546 410,526" style={{ fill: P.feuillage, ...TRAIT }} />
      <polygon points="1150,540 1200,526 1200,534 1150,548" style={{ fill: P.tronc, ...TRAIT }} />
      <polygon points="1150,528 1200,514 1200,520 1150,534" style={{ fill: P.tronc, ...TRAIT }} />
      {FLEURS.map(([x, y, c]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={7} style={{ fill: P.herbeSombre }} />
          <circle cx={x - 4} cy={y - 3} r={3.5} style={{ fill: c }} />
          <circle cx={x + 4} cy={y - 2} r={3.5} style={{ fill: c }} />
          <circle cx={x} cy={y - 6} r={3.5} style={{ fill: c }} />
        </g>
      ))}
      {LAMPADAIRES.map(([x, y]) => (
        <Lampadaire key={x} x={x} y={y} />
      ))}
    </Ile>
  );
}

const element: CityElement = {
  id: 'mobilier',
  nom: 'Le mobilier urbain',
  layer: 'ville',
  ajouteLe: '2026-11-01T09:18:00',
  Component: Mobilier,
};
export default element;
