import type { CityElement } from '../types';
import { P } from '../palette';

/**
 * Une montgolfière violette et blanche, aux couleurs de Saegus, qui traverse lentement
 * le ciel de gauche à droite. Dessinée autour de x = 0 et déplacée par `anim-montgolfiere`.
 * Toute sa hauteur tient entre y = 290 et y = 478 (zone toujours visible).
 */
function Montgolfiere() {
  return (
    <g className="anim-montgolfiere">
      <g className="anim-montgolfiere-flotte">
        {/* Enveloppe : fuseaux violets et blancs */}
        <ellipse cx={0} cy={360} rx={66} ry={70} style={{ fill: P.violet }} />
        <ellipse cx={0} cy={360} rx={40} ry={70} style={{ fill: P.blanc }} />
        <ellipse cx={0} cy={360} rx={16} ry={70} style={{ fill: P.violet }} />
        {/* Jupe qui se resserre vers la nacelle */}
        <polygon points="-50,408 50,408 22,440 -22,440" style={{ fill: P.violet }} />
        <polygon points="-14,408 14,408 8,440 -8,440" style={{ fill: P.blanc }} />
        <rect x={-24} y={438} width={48} height={6} rx={2} style={{ fill: P.navy }} />
        {/* Cordages */}
        <polygon points="-22,444 -18,444 -14,458 -18,458" style={{ fill: P.navy }} />
        <polygon points="18,444 22,444 18,458 14,458" style={{ fill: P.navy }} />
        {/* Nacelle */}
        <rect x={-20} y={456} width={40} height={22} rx={4} style={{ fill: P.corail }} />
        <rect x={-20} y={456} width={40} height={5} rx={2} style={{ fill: P.navy }} />
      </g>
    </g>
  );
}

const element: CityElement = {
  id: 'montgolfiere',
  nom: 'La montgolfière Saegus',
  layer: 'ville',
  ajouteLe: '2026-11-18T15:50:00',
  ticket: 'BUG-D028D7AD',
  proposePar: 'Julien',
  Component: Montgolfiere,
};
export default element;
