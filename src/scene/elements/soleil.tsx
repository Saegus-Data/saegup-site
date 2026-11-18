import type { CityElement } from '../types';
import { P } from '../palette';

function Soleil() {
  return (
    <g className="anim-pulse">
      <circle cx={1340} cy={170} r={90} style={{ fill: P.jaune, opacity: 0.25 }} />
      <circle cx={1340} cy={170} r={62} style={{ fill: P.jaune }} />
    </g>
  );
}

const element: CityElement = {
  id: 'soleil',
  nom: 'Le soleil',
  layer: 'ciel',
  ajouteLe: '2026-11-01T09:00:00',
  Component: Soleil,
};
export default element;
