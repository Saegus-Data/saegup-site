import type { CityElement } from '../types';
import { P } from '../palette';

function Route() {
  const tirets = Array.from({ length: 20 }, (_, i) => i * 84);
  return (
    <g>
      <rect x={0} y={720} width={1600} height={20} style={{ fill: P.trottoir }} />
      <rect x={0} y={740} width={1600} height={90} style={{ fill: P.bitume }} />
      {tirets.map((x) => (
        <rect key={x} x={x} y={782} width={46} height={6} rx={3} style={{ fill: P.blanc, opacity: 0.7 }} />
      ))}
      <rect x={0} y={830} width={1600} height={70} style={{ fill: P.trottoir }} />
    </g>
  );
}

const element: CityElement = {
  id: 'route',
  nom: 'La grande avenue',
  layer: 'rue',
  ajouteLe: '2026-11-01T09:00:00',
  Component: Route,
};
export default element;
