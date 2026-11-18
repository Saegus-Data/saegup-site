import type { CityElement } from '../types';
import { P } from '../palette';

/** [x, y, retard de l'animation] de chaque reflet. */
const REFLETS = [
  [120, 420, 0], [330, 380, 1.1], [190, 520, 2.2], [1380, 400, 0.6], [1500, 470, 1.7], [1290, 560, 2.6],
  [60, 610, 1.4], [1540, 380, 0.3], [1460, 620, 2.0],
];

/** La mer à l'horizon, tout autour de l'île, avec ses reflets qui scintillent. */
function Mer() {
  return (
    <g>
      <rect x={0} y={366} width={1600} height={534} style={{ fill: P.mer }} />
      <rect x={0} y={364} width={1600} height={8} style={{ fill: P.merClaire }} />
      {REFLETS.map(([x, y, d]) => (
        <rect
          key={`${x}-${y}`}
          className="anim-scintille"
          x={x}
          y={y}
          width={46}
          height={4}
          rx={2}
          style={{ fill: P.blanc, animationDelay: `${d}s` }}
        />
      ))}
    </g>
  );
}

const element: CityElement = {
  id: 'mer',
  nom: 'La mer',
  layer: 'ciel',
  ajouteLe: '2026-11-01T09:00:00',
  Component: Mer,
};
export default element;
