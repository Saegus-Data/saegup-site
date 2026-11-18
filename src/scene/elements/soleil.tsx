import type { CityElement } from '../types';
import { P } from '../palette';

/** Centre du soleil (repère de la scène), une fois levé : zone libre à droite de l'île. */
const CX = 1470;
const CY = 440;
/** Rayon du disque. */
const R = 70;

/** Douze rayons dorés en triangle, alternés longs et courts, autour du centre. */
const RAYONS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i * Math.PI) / 6;
  const long = i % 2 === 0 ? R + 50 : R + 30;
  const demi = Math.PI / 24;
  const pt = (a: number, d: number) => `${CX + Math.cos(a) * d},${CY + Math.sin(a) * d}`;
  return `M${pt(angle - demi, R + 8)} L${pt(angle, long)} L${pt(angle + demi, R + 8)} Z`;
});

/** Faisceaux de lumière qui partent du soleil et balaient l'île (vers la gauche). */
const FAISCEAUX = [
  { haut: 250, bas: 330 },
  { haut: 420, bas: 520 },
  { haut: 610, bas: 720 },
].map(({ haut, bas }) => `M${CX},${CY} L-40,${haut} L-40,${bas} Z`);

/** Un grand soleil qui se lève au-dessus de la mer de nuages et dore tout le paysage. */
function Soleil() {
  return (
    <g style={{ pointerEvents: 'none' }}>
      {/* Lumière dorée diffuse sur toute la scène. */}
      <rect
        className="anim-soleil-lueur"
        x={0}
        y={0}
        width={1600}
        height={900}
        style={{ fill: P.jaune, opacity: 0.12, mixBlendMode: 'soft-light' }}
      />
      <g className="anim-soleil-leve">
        <g className="anim-soleil-faisceaux" style={{ mixBlendMode: 'screen' }}>
          {FAISCEAUX.map((d) => (
            <path key={d} d={d} style={{ fill: P.jaune, opacity: 0.16 }} />
          ))}
        </g>
        <circle cx={CX} cy={CY} r={R + 26} style={{ fill: P.jaune, opacity: 0.35 }} />
        <g className="anim-soleil-rayons">
          {RAYONS.map((d) => (
            <path key={d} d={d} style={{ fill: P.jaune, stroke: P.corail, strokeWidth: 2, strokeLinejoin: 'round' }} />
          ))}
        </g>
        <circle cx={CX} cy={CY} r={R} style={{ fill: P.jaune, stroke: P.corail, strokeWidth: 4 }} />
        <circle cx={CX - 22} cy={CY - 24} r={R * 0.32} style={{ fill: P.blanc, opacity: 0.55 }} />
      </g>
    </g>
  );
}

const element: CityElement = {
  id: 'soleil',
  nom: 'Le soleil levant',
  layer: 'premier-plan',
  ajouteLe: '2026-11-18T09:00:00',
  ticket: 'BUG-E1F9BF2D',
  proposePar: 'Julien',
  Component: Soleil,
};
export default element;
