import type { CityElement } from '../types';
import { P } from '../palette';
import { Ile } from '../draw';

/** [x gauche, x droit, y haut, y bas] de chaque chute d'eau. */
const CHUTES = [
  [240, 274, 540, 720],
  [560, 608, 600, 772],
  [1002, 1048, 606, 762],
  [1304, 1334, 548, 706],
];

/** Les cascades qui tombent des bords de l'île dans la mer de nuages. */
function Cascades() {
  return (
    <Ile>
      <defs>
        <linearGradient id="cascade-fondu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: P.eau, stopOpacity: 1 }} />
          <stop offset="0.75" style={{ stopColor: P.eau, stopOpacity: 0.85 }} />
          <stop offset="1" style={{ stopColor: P.eauClaire, stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      {CHUTES.map(([x1, x2, y1, y2], i) => (
        <g key={x1}>
          <path
            d={`M${x1},${y1} L${x2},${y1} C${x2 + 4},${y1 + 40} ${x2 + 6},${y2 - 40} ${x2 + 8},${y2} L${x1 - 8},${y2} C${x1 - 6},${y2 - 40} ${x1 - 4},${y1 + 40} ${x1},${y1} Z`}
            style={{ fill: 'url(#cascade-fondu)' }}
          />
          {[0.2, 0.45, 0.7, 0.9].map((t) => (
            <path
              key={t}
              d={`M${x1 + (x2 - x1) * t},${y1} L${x1 + (x2 - x1) * t + (t - 0.5) * 14},${y2 - 20}`}
              className="anim-chute"
              style={{
                fill: 'none',
                stroke: P.eauClaire,
                strokeWidth: 3,
                strokeLinecap: 'round',
                animationDelay: `${-t - i * 0.3}s`,
              }}
            />
          ))}
          <ellipse
            className="anim-ecume"
            cx={(x1 + x2) / 2}
            cy={y2 - 12}
            rx={(x2 - x1) * 0.9}
            ry={12}
            style={{ fill: P.blanc, opacity: 0.85, animationDelay: `${-i * 0.4}s` }}
          />
        </g>
      ))}
    </Ile>
  );
}

const element: CityElement = {
  id: 'cascades',
  nom: 'Les cascades',
  layer: 'fond',
  ajouteLe: '2026-11-01T09:06:00',
  Component: Cascades,
};
export default element;
