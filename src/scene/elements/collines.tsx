import type { CityElement } from '../types';
import { P } from '../palette';
import { Ile, TRAIT } from '../draw';

const COLLINES = [
  'M700,305 C700,190 750,135 800,138 C855,142 878,215 878,305 Z',
  'M628,300 C632,225 675,188 715,192 C752,198 762,250 765,300 Z',
  'M225,458 C230,360 290,300 340,302 C395,305 425,380 428,458 Z',
];

/** Les collines verdoyantes au fond de l'île. */
function Collines() {
  return (
    <Ile>
      {COLLINES.map((d) => (
        <path key={d} d={d} style={{ fill: P.herbe, ...TRAIT }} />
      ))}
      <ellipse cx={790} cy={175} rx={30} ry={14} style={{ fill: P.herbeClaire }} />
      <ellipse cx={700} cy={215} rx={20} ry={10} style={{ fill: P.herbeClaire }} />
      <ellipse cx={320} cy={335} rx={26} ry={12} style={{ fill: P.herbeClaire }} />
      <ellipse cx={300} cy={352} rx={16} ry={8} style={{ fill: P.herbeSombre }} />
    </Ile>
  );
}

const element: CityElement = {
  id: 'collines',
  nom: 'Les collines',
  layer: 'fond',
  ajouteLe: '2026-11-01T09:03:00',
  Component: Collines,
};
export default element;
