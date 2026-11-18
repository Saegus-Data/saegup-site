import type { CityElement } from '../types';
import { P } from '../palette';
import { Ile, TRAIT } from '../draw';

const VAGUELETTES = [
  'M1050,300 C980,345 900,395 860,445 C835,480 830,520 860,540',
  'M1062,312 C1000,355 925,405 885,455 C860,495 875,530 930,552 C960,566 990,578 1025,598',
  'M1035,300 C960,345 880,395 840,440 C805,480 790,520 760,545 C720,570 660,585 590,600',
];

/** La Seine, qui traverse l'île et se jette dans le vide en cascades. */
function Seine() {
  return (
    <Ile>
      <path
        d="M1040,282 L1095,300 C1000,360 900,420 870,470 C845,510 860,540 930,562 C960,572 1000,588 1048,606 L1002,606 C940,588 870,566 795,562 C730,566 665,590 606,606 L562,598 C625,582 700,560 728,535 C758,500 770,450 830,405 C880,365 960,320 1040,282 Z"
        style={{ fill: P.eau, ...TRAIT }}
      />
      {VAGUELETTES.map((d, i) => (
        <path
          key={d}
          d={d}
          className="anim-courant"
          style={{
            fill: 'none',
            stroke: P.eauClaire,
            strokeWidth: 3,
            strokeLinecap: 'round',
            animationDelay: `${-i * 0.7}s`,
          }}
        />
      ))}
    </Ile>
  );
}

const element: CityElement = {
  id: 'seine',
  nom: 'La Seine',
  layer: 'fond',
  ajouteLe: '2026-11-01T09:05:00',
  Component: Seine,
};
export default element;
