import type { CityElement } from '../types';
import { P } from '../palette';
import { Windows } from '../draw';

interface Immeuble {
  x: number;
  w: number;
  h: number;
  color: string;
  cols: number;
}

const IMMEUBLES: readonly Immeuble[] = [
  { x: 150, w: 170, h: 300, color: P.navy, cols: 5 },
  { x: 360, w: 140, h: 400, color: P.ciel, cols: 4 },
  { x: 540, w: 150, h: 240, color: P.corail, cols: 4 },
  { x: 920, w: 160, h: 340, color: P.ciel, cols: 5 },
  { x: 1120, w: 190, h: 220, color: P.navy, cols: 6 },
  { x: 1350, w: 150, h: 360, color: P.corail, cols: 4 },
];

function Immeubles() {
  return (
    <g>
      {IMMEUBLES.map(({ x, w, h, color, cols }) => (
        <g key={x}>
          <rect x={x} y={720 - h} width={w} height={h} rx={4} style={{ fill: color }} />
          <Windows x={x + 18} y={720 - h + 24} cols={cols} rows={Math.floor((h - 70) / 34)} size={18} gap={(w - 36 - cols * 18) / (cols - 1)} />
        </g>
      ))}
    </g>
  );
}

const element: CityElement = {
  id: 'immeubles',
  nom: 'Les immeubles',
  layer: 'ville',
  ajouteLe: '2026-11-01T09:00:00',
  Component: Immeubles,
};
export default element;
