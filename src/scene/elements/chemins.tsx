import type { CityElement } from '../types';
import { P } from '../palette';
import { Ile } from '../draw';

const CHEMINS = [
  'M440,500 C470,470 540,450 600,430 C660,410 720,380 780,350 C820,330 860,318 885,315 L895,335 C860,342 820,355 790,372 C730,405 680,430 640,450 C590,470 560,490 565,525 C568,560 590,585 600,595 L560,598 C520,580 470,540 440,500 Z',
  'M860,470 C900,440 960,420 1050,420 C1120,425 1200,440 1300,478 L1290,500 C1200,470 1120,452 1052,445 C990,450 930,470 900,500 Z',
  'M650,598 C720,585 880,585 950,598 L945,616 C880,606 720,606 655,618 Z',
  'M560,398 L700,388 L720,412 L580,422 Z',
];

/** Les allées de sable qui serpentent entre les monuments. */
function Chemins() {
  return (
    <Ile>
      {CHEMINS.map((d) => (
        <path key={d} d={d} style={{ fill: P.chemin, stroke: P.pierreSombre, strokeWidth: 1.5 }} />
      ))}
    </Ile>
  );
}

const element: CityElement = {
  id: 'chemins',
  nom: 'Les allées',
  layer: 'fond',
  ajouteLe: '2026-11-01T09:04:00',
  Component: Chemins,
};
export default element;
