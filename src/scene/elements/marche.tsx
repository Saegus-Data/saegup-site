import type { CityElement } from '../types';
import { P } from '../palette';
import { Ile, TRAIT } from '../draw';

/** Un étal de marché sous auvent rayé (coin bas gauche en x, y). */
function Etal({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <rect x={x + 4} y={y - 52} width={4} height={52} style={{ fill: P.tronc }} />
      <rect x={x + w - 8} y={y - 52} width={4} height={52} style={{ fill: P.tronc }} />
      <rect x={x} y={y - 26} width={w} height={26} style={{ fill: P.tronc, ...TRAIT }} />
      <rect x={x + 6} y={y - 34} width={w - 12} height={8} style={{ fill: P.fleur }} />
      <circle cx={x + 14} cy={y - 36} r={4} style={{ fill: P.jaune }} />
      <circle cx={x + w - 14} cy={y - 36} r={4} style={{ fill: P.corail }} />
      <path
        d={`M${x - 6},${y - 52} L${x + w + 6},${y - 52} L${x + w - 4},${y - 70} L${x + 4},${y - 70} Z`}
        style={{ fill: P.herbeSombre, ...TRAIT }}
      />
      {[0.2, 0.5, 0.8].map((t) => (
        <rect key={t} x={x + w * t - 4} y={y - 68} width={8} height={16} style={{ fill: P.blanc }} />
      ))}
    </g>
  );
}

/** Les étals du marché, au bord des allées. */
function Marche() {
  return (
    <Ile>
      <Etal x={690} y={466} w={56} />
      <Etal x={1048} y={578} w={52} />
    </Ile>
  );
}

const element: CityElement = {
  id: 'marche',
  nom: 'Le marché',
  layer: 'ville',
  ajouteLe: '2026-11-01T09:17:00',
  Component: Marche,
};
export default element;
