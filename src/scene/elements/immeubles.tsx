import type { CityElement } from '../types';
import { P } from '../palette';
import { Haussmann, Ile } from '../draw';

/** Les immeubles haussmanniens, toits d'ardoise et boutiques à stores rayés. */
function Immeubles() {
  return (
    <Ile>
      <Haussmann x={398} y={470} w={104} d={56} h={118} cols={3} rows={3} store={P.corail} />
      <Haussmann x={908} y={538} w={94} d={58} h={150} cols={3} rows={4} store={P.herbeSombre} />
      <Haussmann x={1228} y={468} w={86} d={56} h={148} cols={3} rows={4} store={P.rose} />
    </Ile>
  );
}

const element: CityElement = {
  id: 'immeubles',
  nom: 'Les immeubles haussmanniens',
  layer: 'ville',
  ajouteLe: '2026-11-01T09:15:00',
  Component: Immeubles,
};
export default element;
