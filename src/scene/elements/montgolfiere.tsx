import type { CityElement } from '../types';
import { P } from '../palette';

/**
 * Montgolfière aux couleurs Saegus. Posée à x = 560 (position fixe si les animations sont
 * coupées), puis déplacée par `anim-montgolfiere` d'un bord à l'autre de la scène.
 * Elle reste entièrement au-dessus de y = 180 pour ne jamais passer derrière les bâtiments
 * (plan `ciel`).
 */
function Montgolfiere() {
  return (
    <g transform="translate(560 0)">
      <g className="anim-montgolfiere">
        <g className="anim-montgolfiere-flotte">
          {/* Enveloppe : fuseaux violet, corail et jaune */}
          <ellipse cx={0} cy={72} rx={60} ry={64} style={{ fill: P.violet }} />
          <ellipse cx={0} cy={72} rx={38} ry={64} style={{ fill: P.corail }} />
          <ellipse cx={0} cy={72} rx={15} ry={64} style={{ fill: P.jaune }} />
          <path d="M -44 116 L -18 146 L 18 146 L 44 116 Z" style={{ fill: P.violet }} />
          <rect x={-18} y={142} width={36} height={6} rx={2} style={{ fill: P.navy }} />
          {/* Suspentes */}
          <line x1={-16} y1={148} x2={-12} y2={160} style={{ stroke: P.navy, strokeWidth: 2 }} />
          <line x1={16} y1={148} x2={12} y2={160} style={{ stroke: P.navy, strokeWidth: 2 }} />
          {/* Nacelle */}
          <rect x={-14} y={160} width={28} height={18} rx={3} style={{ fill: P.corail }} />
          <rect x={-14} y={160} width={28} height={4} style={{ fill: P.navy }} />
        </g>
      </g>
    </g>
  );
}

const element: CityElement = {
  id: 'montgolfiere',
  nom: 'La montgolfière Saegus',
  layer: 'ciel',
  ajouteLe: '2026-11-18T09:31:00',
  ticket: 'BUG-CE32DB84',
  proposePar: 'Julien',
  Component: Montgolfiere,
};
export default element;
