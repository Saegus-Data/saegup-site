import type { CityElement } from '../types';
import { P } from '../palette';
import { Ile, TRAIT } from '../draw';

/** Une fenêtre en ogive (bas gauche en x, y). */
function Ogive({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <path
      d={`M${x},${y} L${x},${y - h + w / 2} Q${x + w / 2},${y - h - w / 3} ${x + w},${y - h + w / 2} L${x + w},${y} Z`}
      style={{ fill: P.vitre, stroke: P.contour, strokeWidth: 1.5 }}
    />
  );
}

/** Notre-Dame de Paris : deux tours, la rosace et les trois portails. */
function NotreDame() {
  return (
    <Ile>
      {/* Flanc dans l'ombre */}
      <polygon points="986,242 1002,232 1002,330 986,340" style={{ fill: P.pierreSombre, ...TRAIT }} />
      {/* Tours */}
      <rect x={870} y={160} width={56} height={92} style={{ fill: P.pierre, ...TRAIT }} />
      <rect x={930} y={168} width={56} height={84} style={{ fill: P.pierre, ...TRAIT }} />
      {[870, 930].map((x) => (
        <g key={x}>
          <rect x={x - 3} y={x === 870 ? 154 : 162} width={62} height={8} style={{ fill: P.pierreSombre, ...TRAIT }} />
          <Ogive x={x + 10} y={240} w={13} h={52} />
          <Ogive x={x + 33} y={240} w={13} h={52} />
        </g>
      ))}
      {/* Façade, galerie, rosace et portails */}
      <rect x={866} y={244} width={122} height={96} style={{ fill: P.pierre, ...TRAIT }} />
      <rect x={866} y={244} width={122} height={14} style={{ fill: P.pierreSombre, ...TRAIT }} />
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={871 + i * 12} y={247} width={6} height={9} rx={3} style={{ fill: P.vitre }} />
      ))}
      <circle cx={927} cy={284} r={18} style={{ fill: P.vitre, ...TRAIT }} />
      <circle cx={927} cy={284} r={8} style={{ fill: P.mauve, stroke: P.pierre, strokeWidth: 2 }} />
      {[0, 45, 90, 135].map((a) => (
        <line
          key={a}
          x1={927 - 18 * Math.cos((a * Math.PI) / 180)}
          y1={284 - 18 * Math.sin((a * Math.PI) / 180)}
          x2={927 + 18 * Math.cos((a * Math.PI) / 180)}
          y2={284 + 18 * Math.sin((a * Math.PI) / 180)}
          style={{ stroke: P.pierre, strokeWidth: 2 }}
        />
      ))}
      <Ogive x={877} y={340} w={24} h={34} />
      <Ogive x={913} y={340} w={28} h={40} />
      <Ogive x={953} y={340} w={24} h={34} />
    </Ile>
  );
}

const element: CityElement = {
  id: 'notre-dame',
  nom: 'Notre-Dame',
  layer: 'ville',
  ajouteLe: '2026-11-01T09:12:00',
  Component: NotreDame,
};
export default element;
