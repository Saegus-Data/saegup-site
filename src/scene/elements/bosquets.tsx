import type { CityElement } from '../types';
import { Arbre, Ile } from '../draw';

/** [x du pied, y du pied, rayon] des arbres du fond, derrière les monuments. */
const ARBRES = [
  [745, 218, 14], [835, 222, 14], [335, 302, 26], [565, 318, 18], [712, 322, 26], [806, 288, 28], [848, 282, 20],
  [1015, 298, 26],
];

/** Les bosquets du fond de l'île, sur les collines. */
function Bosquets() {
  return (
    <Ile>
      {ARBRES.map(([x, y, r], i) => (
        <Arbre key={`${x}-${y}`} x={x} y={y} r={r} delai={-i * 0.6} />
      ))}
    </Ile>
  );
}

const element: CityElement = {
  id: 'bosquets',
  nom: 'Les bosquets',
  layer: 'ville',
  ajouteLe: '2026-11-01T09:10:00',
  Component: Bosquets,
};
export default element;
