import type { CityElement } from '../types';
import { Ile, Pont } from '../draw';

/** Les trois ponts de pierre qui enjambent la Seine. */
function Ponts() {
  return (
    <Ile>
      <Pont x1={862} y1={362} x2={972} y2={378} />
      <Pont x1={596} y1={590} x2={712} y2={584} />
      <Pont x1={896} y1={584} x2={1020} y2={596} />
    </Ile>
  );
}

const element: CityElement = {
  id: 'ponts',
  nom: 'Les ponts',
  layer: 'ville',
  ajouteLe: '2026-11-01T09:14:00',
  Component: Ponts,
};
export default element;
