import type { CityElement } from '../types';
import { P } from '../palette';

/** Silhouettes lointaines : [x, largeur, hauteur]. */
const TOURS: ReadonlyArray<readonly [number, number, number]> = [
  [0, 120, 230], [110, 90, 320], [190, 140, 260], [320, 80, 380], [390, 130, 290],
  [510, 100, 340], [930, 110, 300], [1030, 90, 400], [1110, 150, 270], [1250, 100, 350],
  [1340, 130, 240], [1460, 80, 330], [1530, 90, 280],
];

function Skyline() {
  return (
    <g style={{ fill: P.lavande, opacity: 0.85 }}>
      {TOURS.map(([x, w, h]) => (
        <rect key={x} x={x} y={720 - h} width={w} height={h} />
      ))}
    </g>
  );
}

const element: CityElement = {
  id: 'skyline',
  nom: 'Les quartiers lointains',
  layer: 'fond',
  ajouteLe: '2026-11-01T09:00:00',
  Component: Skyline,
};
export default element;
