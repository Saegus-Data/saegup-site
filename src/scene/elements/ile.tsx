import type { CityElement } from '../types';
import { P } from '../palette';
import { Ile, TRAIT } from '../draw';

const RACINES = [
  'M230,560 C240,590 230,610 250,630', 'M300,600 C310,630 300,650 320,665', 'M420,640 C430,665 420,680 440,695',
  'M500,640 C515,670 505,690 520,710', 'M660,700 C670,740 660,760 680,790', 'M740,730 C735,770 750,790 745,820',
  'M860,740 C870,770 860,790 875,810', 'M940,700 C930,730 945,750 935,775', 'M1100,640 C1110,670 1100,690 1115,710',
  'M1200,610 C1190,640 1205,660 1195,680', 'M1300,560 C1310,590 1300,610 1315,625', 'M1390,520 C1385,545 1395,560 1388,580',
];

/** [x, y, rayon horizontal, rayon vertical] des rochers pris dans la terre. */
const ROCHERS = [
  [320, 615, 24, 14], [470, 660, 18, 11], [1230, 645, 28, 16], [1395, 572, 16, 10], [760, 800, 12, 8],
  [905, 798, 22, 13], [245, 585, 11, 7], [1140, 690, 14, 9], [650, 745, 10, 7],
];

/** L'île flottante : socle de terre, racines, rochers et pelouse. */
function IleFlottante() {
  return (
    <Ile>
      {/* Socle de terre, éclairé à gauche, dans l'ombre à droite */}
      <polygon
        points="152,462 562,600 562,700 520,735 470,705 420,700 380,688 330,650 290,640 240,600 200,590 170,540"
        style={{ fill: P.terre, ...TRAIT }}
      />
      <polygon points="606,628 792,700 795,858 740,842 700,818 650,800 610,770" style={{ fill: P.terre, ...TRAIT }} />
      <polygon
        points="792,700 1002,640 1002,760 960,790 900,822 850,846 795,858"
        style={{ fill: P.terreSombre, ...TRAIT }}
      />
      <polygon
        points="1046,612 1454,462 1450,540 1400,580 1350,620 1300,642 1250,680 1180,702 1120,730 1046,748"
        style={{ fill: P.terreSombre, ...TRAIT }}
      />
      {RACINES.map((d) => (
        <path key={d} d={d} style={{ fill: 'none', stroke: P.racine, strokeWidth: 3, strokeLinecap: 'round' }} />
      ))}
      {ROCHERS.map(([x, y, rx, ry]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={rx} ry={ry} style={{ fill: P.roche, ...TRAIT }} />
      ))}
      {/* Bord de pelouse qui déborde sur la terre */}
      <polygon points="150,455 562,596 562,618 152,476" style={{ fill: P.herbeSombre, ...TRAIT }} />
      <polygon points="606,622 792,694 792,716 606,642" style={{ fill: P.herbeSombre, ...TRAIT }} />
      <polygon points="792,694 1002,634 1002,654 792,716" style={{ fill: P.herbeSombre, ...TRAIT }} />
      <polygon points="1046,604 1454,455 1454,476 1046,626" style={{ fill: P.herbeSombre, ...TRAIT }} />
      {/* Pelouse */}
      <polygon
        points="150,455 240,330 330,270 640,190 880,190 1000,262 1240,270 1390,330 1454,455 1046,606 1002,600 1002,636 792,696 606,624 606,600 562,598"
        style={{ fill: P.herbe, ...TRAIT }}
      />
      {/* Rochers posés sur l'herbe */}
      <ellipse cx={262} cy={442} rx={30} ry={20} style={{ fill: P.roche, ...TRAIT }} />
      <ellipse cx={240} cy={452} rx={18} ry={12} style={{ fill: P.rocheSombre, ...TRAIT }} />
    </Ile>
  );
}

const element: CityElement = {
  id: 'ile',
  nom: "L'île flottante",
  layer: 'fond',
  ajouteLe: '2026-11-01T09:02:00',
  Component: IleFlottante,
};
export default element;
