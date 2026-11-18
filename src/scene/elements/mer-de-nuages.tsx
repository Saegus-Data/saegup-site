import type { CityElement } from '../types';
import { Ile, Nuage } from '../draw';

/** La mer de nuages sur laquelle flotte l'île, qui ondule doucement. */
function MerDeNuages() {
  return (
    <Ile>
      <g className="anim-houle">
        <Nuage x={120} y={640} s={1.5} />
        <Nuage x={1480} y={640} s={0.6} />
        <Nuage x={1180} y={780} s={1.2} />
        <Nuage x={60} y={850} s={2} />
        <Nuage x={1520} y={850} s={2} />
      </g>
      <g className="anim-houle" style={{ animationDelay: '-4s' }}>
        <Nuage x={330} y={820} s={1.4} />
        <Nuage x={560} y={900} s={1.3} />
        <Nuage x={980} y={900} s={1.4} />
        <Nuage x={1330} y={890} s={1.3} />
      </g>
    </Ile>
  );
}

const element: CityElement = {
  id: 'mer-de-nuages',
  nom: 'La mer de nuages',
  layer: 'fond',
  ajouteLe: '2026-11-01T09:01:00',
  Component: MerDeNuages,
};
export default element;
