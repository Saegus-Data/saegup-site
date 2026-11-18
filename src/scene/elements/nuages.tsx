import type { CityElement } from '../types';
import { P } from '../palette';

function Nuage({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} style={{ fill: P.blanc, opacity: 0.9 }}>
      <ellipse cx={0} cy={0} rx={70} ry={26} />
      <ellipse cx={-30} cy={-18} rx={36} ry={28} />
      <ellipse cx={22} cy={-26} rx={44} ry={34} />
    </g>
  );
}

function Nuages() {
  return (
    <>
      <g className="anim-drift">
        <Nuage x={260} y={150} s={1} />
        <Nuage x={980} y={110} s={0.8} />
      </g>
      <g className="anim-drift anim-drift--lent">
        <Nuage x={620} y={250} s={0.6} />
        <Nuage x={1500} y={300} s={0.7} />
      </g>
    </>
  );
}

const element: CityElement = {
  id: 'nuages',
  nom: 'Les nuages',
  layer: 'ciel',
  ajouteLe: '2026-11-01T09:00:00',
  Component: Nuages,
};
export default element;
