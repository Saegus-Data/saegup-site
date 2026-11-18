import { AMBIANCE, SKY, type Ambiance } from './ambiance';
import type { CityElement } from './types';

interface CitySceneProps {
  elements: CityElement[];
  /** Élément mis en avant (halo animé). */
  newestId?: string;
  ambiance?: Ambiance;
}

/** La ville : un SVG plein écran, chaque élément dans l'ordre de ses plans. */
export function CityScene({ elements, newestId, ambiance = AMBIANCE }: CitySceneProps) {
  const [haut, bas] = SKY[ambiance];
  return (
    <svg
      className="scene"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-label={`La ville du Saegup, ${elements.length} éléments`}
      data-ambiance={ambiance}
    >
      <defs>
        <linearGradient id="ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: haut }} />
          <stop offset="1" style={{ stopColor: bas }} />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={1600} height={900} fill="url(#ciel)" />
      {elements.map(({ id, Component }) => (
        <g key={id} data-element={id} className={id === newestId ? 'element is-new' : 'element'}>
          <Component />
        </g>
      ))}
    </svg>
  );
}
