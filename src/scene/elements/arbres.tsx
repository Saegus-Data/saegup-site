import type { CityElement } from '../types';
import { P } from '../palette';

const POSITIONS = [70, 340, 640, 980, 1290, 1540];

function Arbres() {
  return (
    <g>
      {POSITIONS.map((x, i) => (
        <g key={x}>
          <rect x={x - 6} y={840} width={12} height={40} style={{ fill: P.navy }} />
          <circle cx={x} cy={830} r={30} style={{ fill: i % 2 ? P.feuillageSombre : P.feuillage }} />
        </g>
      ))}
    </g>
  );
}

const element: CityElement = {
  id: 'arbres',
  nom: 'Les arbres',
  layer: 'premier-plan',
  ajouteLe: '2026-11-01T09:00:00',
  Component: Arbres,
};
export default element;
