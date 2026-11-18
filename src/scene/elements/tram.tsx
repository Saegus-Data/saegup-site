import type { CityElement } from '../types';
import { P } from '../palette';

function Tram() {
  return (
    <g className="anim-tram">
      <rect x={0} y={746} width={240} height={64} rx={14} style={{ fill: P.violet }} />
      <rect x={0} y={796} width={240} height={10} style={{ fill: P.navy }} />
      {[16, 70, 124, 178].map((x) => (
        <rect key={x} x={x} y={758} width={44} height={26} rx={4} style={{ fill: P.lavande }} />
      ))}
      <circle cx={50} cy={812} r={9} style={{ fill: P.noir }} />
      <circle cx={190} cy={812} r={9} style={{ fill: P.noir }} />
    </g>
  );
}

const element: CityElement = {
  id: 'tram',
  nom: 'Le tram',
  layer: 'rue',
  ajouteLe: '2026-11-01T09:00:00',
  Component: Tram,
};
export default element;
