import type { CityElement } from '../types';
import { Arbre, Ile } from '../draw';

/** [x du pied, y du pied, rayon] des arbres du premier rang. */
const ARBRES = [
  [205, 442, 34], [382, 442, 28], [325, 468, 34], [640, 482, 32], [1395, 422, 34], [1360, 448, 24],
  [1112, 518, 32], [788, 668, 28], [842, 670, 32],
];

/** Les arbres du parc, qui se balancent dans la brise. */
function Arbres() {
  return (
    <Ile>
      {ARBRES.map(([x, y, r], i) => (
        <Arbre key={`${x}-${y}`} x={x} y={y} r={r} delai={-i * 0.7} />
      ))}
    </Ile>
  );
}

const element: CityElement = {
  id: 'arbres',
  nom: 'Les arbres',
  layer: 'ville',
  ajouteLe: '2026-11-01T09:19:00',
  Component: Arbres,
};
export default element;
