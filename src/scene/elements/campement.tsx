import type { CityElement } from '../types';
import { P } from '../palette';
import { Ile, Tente } from '../draw';

/** Le petit campement de tentes colorées dans le parc. */
function Campement() {
  return (
    <Ile>
      <Tente x={742} y={326} w={40} couleur={P.rose} />
      <Tente x={372} y={496} w={54} couleur={P.jaune} />
      <Tente x={530} y={502} w={44} couleur={P.feuillage} />
      <Tente x={568} y={524} w={46} couleur={P.ardoiseClaire} />
    </Ile>
  );
}

const element: CityElement = {
  id: 'campement',
  nom: 'Le campement',
  layer: 'ville',
  ajouteLe: '2026-11-01T09:16:00',
  Component: Campement,
};
export default element;
