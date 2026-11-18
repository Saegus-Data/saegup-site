import type { CityElement } from '../types';
import { P } from '../palette';
import { Ile, TRAIT } from '../draw';

interface BallonProps {
  /** Centre de l'enveloppe et rayon. */
  x: number;
  y: number;
  r: number;
  couleurs: [string, string];
}

/** Une montgolfière à fuseaux de deux couleurs, avec sa nacelle en osier. */
function Ballon({ x, y, r, couleurs: [a, b] }: BallonProps) {
  return (
    <g>
      <path
        d={`M${x - r * 0.42},${y + r * 0.9} L${x - r * 0.2},${y + r * 1.55} M${x + r * 0.42},${y + r * 0.9} L${x + r * 0.2},${y + r * 1.55}`}
        style={{ stroke: P.contour, strokeWidth: 1.5 }}
      />
      <path
        d={`M${x - r * 0.45},${y + r * 0.88} C${x - r * 1.25},${y + r * 0.2} ${x - r * 1.05},${y - r * 1.05} ${x},${y - r * 1.05} C${x + r * 1.05},${y - r * 1.05} ${x + r * 1.25},${y + r * 0.2} ${x + r * 0.45},${y + r * 0.88} Z`}
        style={{ fill: a, ...TRAIT }}
      />
      <path
        d={`M${x - r * 0.18},${y + r * 0.9} C${x - r * 0.55},${y + r * 0.2} ${x - r * 0.45},${y - r} ${x},${y - r * 1.05} C${x + r * 0.45},${y - r} ${x + r * 0.55},${y + r * 0.2} ${x + r * 0.18},${y + r * 0.9} Z`}
        style={{ fill: b, ...TRAIT }}
      />
      <rect x={x - r * 0.24} y={y + r * 1.5} width={r * 0.48} height={r * 0.36} rx={3} style={{ fill: P.tronc, ...TRAIT }} />
    </g>
  );
}

/** Deux montgolfières qui flottent au-dessus de l'île. */
function Montgolfieres() {
  return (
    <Ile>
      <g className="anim-drift anim-drift--lent">
        <g className="anim-ballon">
          <Ballon x={120} y={265} r={46} couleurs={[P.ardoiseClaire, P.jaune]} />
        </g>
      </g>
      <g className="anim-drift">
        <g className="anim-ballon" style={{ animationDelay: '-3s' }}>
          <Ballon x={1080} y={135} r={30} couleurs={[P.mauve, P.lavande]} />
        </g>
      </g>
    </Ile>
  );
}

const element: CityElement = {
  id: 'montgolfieres',
  nom: 'Les montgolfières',
  layer: 'premier-plan',
  ajouteLe: '2026-11-01T09:20:00',
  Component: Montgolfieres,
};
export default element;
