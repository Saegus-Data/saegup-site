import type { CityElement } from '../types';
import { P } from '../palette';
import { Ile, TRAIT } from '../draw';

const PIECES = [
  '616,138 634,138 646,262 604,262',
  '601,268 649,268 670,330 580,330',
];

/** La tour Eiffel, avec sa dentelle de fer et son phare qui clignote au sommet. */
function TourEiffel() {
  return (
    <Ile>
      <defs>
        <pattern id="treillis-eiffel" width={9} height={9} patternUnits="userSpaceOnUse">
          <path d="M0,0 L9,9 M9,0 L0,9" style={{ stroke: P.bronzeSombre, strokeWidth: 1.3 }} />
        </pattern>
      </defs>
      {/* Pieds et grande arche */}
      <path
        d="M576,340 L674,340 L708,398 L668,398 Q625,346 582,398 L542,398 Z"
        style={{ fill: P.bronze, ...TRAIT }}
      />
      <path d="M576,340 L674,340 L708,398 L668,398 Q625,346 582,398 L542,398 Z" style={{ fill: 'url(#treillis-eiffel)' }} />
      {PIECES.map((points) => (
        <g key={points}>
          <polygon points={points} style={{ fill: P.bronze, ...TRAIT }} />
          <polygon points={points} style={{ fill: 'url(#treillis-eiffel)' }} />
        </g>
      ))}
      {/* Plateformes */}
      <rect x={568} y={326} width={114} height={14} rx={2} style={{ fill: P.bronzeSombre, ...TRAIT }} />
      <rect x={596} y={258} width={58} height={10} rx={2} style={{ fill: P.bronzeSombre, ...TRAIT }} />
      <rect x={612} y={132} width={26} height={8} rx={2} style={{ fill: P.bronzeSombre, ...TRAIT }} />
      {/* Antenne et phare */}
      <rect x={622} y={108} width={6} height={26} style={{ fill: P.bronzeSombre }} />
      <circle className="anim-scintille" cx={625} cy={106} r={6} style={{ fill: P.jaune }} />
    </Ile>
  );
}

const element: CityElement = {
  id: 'tour-eiffel',
  nom: 'La tour Eiffel',
  layer: 'ville',
  ajouteLe: '2026-11-01T09:11:00',
  Component: TourEiffel,
};
export default element;
