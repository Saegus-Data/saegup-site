import type { CityElement } from '../types';
import { P } from '../palette';
import { Windows } from '../draw';

/** Le phare de la ville : la tour Saegus, au centre. */
function TourSaegus() {
  return (
    <g>
      {/* Antenne et sa balise */}
      <rect x={797} y={120} width={6} height={70} style={{ fill: P.navy }} />
      <circle className="anim-blink" cx={800} cy={116} r={9} style={{ fill: P.corail }} />
      {/* Fût */}
      <polygon points="730,720 740,190 860,190 870,720" style={{ fill: P.violet }} />
      <rect x={740} y={190} width={120} height={18} style={{ fill: P.navy }} />
      {/* Enseigne */}
      <circle cx={800} cy={262} r={34} style={{ fill: P.blanc }} />
      <text x={800} y={276} textAnchor="middle" className="scene-logo" style={{ fill: P.violet }}>
        S
      </text>
      <Windows x={752} y={320} cols={4} rows={15} size={16} gap={10} color={P.lavande} />
      {/* Entrée */}
      <rect x={780} y={680} width={40} height={40} rx={4} style={{ fill: P.navy }} />
    </g>
  );
}

const element: CityElement = {
  id: 'tour-saegus',
  nom: 'La tour Saegus',
  layer: 'ville',
  ajouteLe: '2026-11-01T09:00:00',
  Component: TourSaegus,
};
export default element;
