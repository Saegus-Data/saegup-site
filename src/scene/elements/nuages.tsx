import type { CityElement } from '../types';
import { Ile, Nuage } from '../draw';

/** Les nuages du ciel, qui dérivent lentement derrière l'île. */
function Nuages() {
  return (
    <Ile>
      <g className="anim-drift">
        <Nuage x={290} y={125} s={1} />
        <Nuage x={1110} y={70} s={0.75} />
        <Nuage x={1530} y={268} s={0.5} />
      </g>
      <g className="anim-drift anim-drift--lent">
        <Nuage x={540} y={218} s={0.45} />
        <Nuage x={110} y={272} s={0.5} />
        <Nuage x={1300} y={188} s={0.6} />
      </g>
    </Ile>
  );
}

const element: CityElement = {
  id: 'nuages',
  nom: 'Les nuages',
  layer: 'ciel',
  ajouteLe: '2026-11-01T09:00:10',
  Component: Nuages,
};
export default element;
