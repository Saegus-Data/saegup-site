import type { CityElement } from '../types';
import { P } from '../palette';
import { Ile, TRAIT } from '../draw';

/** L'Arc de Triomphe, sa grande arche, ses bas-reliefs et sa frise. */
function ArcDeTriomphe() {
  return (
    <Ile>
      {/* Flanc dans l'ombre, percé d'une petite arche */}
      <polygon points="1180,290 1214,274 1214,410 1180,426" style={{ fill: P.pierreSombre, ...TRAIT }} />
      <path d="M1190,421 L1190,372 Q1197,358 1204,368 L1204,414 Z" style={{ fill: P.contour, opacity: 0.55 }} />
      {/* Façade et grande arche */}
      <rect x={1064} y={290} width={116} height={136} style={{ fill: P.pierre, ...TRAIT }} />
      <path d="M1098,426 L1098,358 A24,24 0 0 1 1146,358 L1146,426 Z" style={{ fill: P.contour, opacity: 0.55 }} />
      <path d="M1098,358 A24,24 0 0 1 1146,358" style={{ fill: 'none', ...TRAIT, strokeWidth: 3 }} />
      {/* Bas-reliefs */}
      <rect x={1071} y={336} width={20} height={44} style={{ fill: P.pierreSombre, ...TRAIT }} />
      <rect x={1153} y={336} width={20} height={44} style={{ fill: P.pierreSombre, ...TRAIT }} />
      {/* Attique et frise */}
      <polygon points="1182,262 1216,248 1216,276 1182,292" style={{ fill: P.pierreSombre, ...TRAIT }} />
      <rect x={1060} y={262} width={122} height={30} style={{ fill: P.pierre, ...TRAIT }} />
      <rect x={1056} y={286} width={128} height={7} style={{ fill: P.pierreSombre, ...TRAIT }} />
      <rect x={1058} y={256} width={126} height={7} style={{ fill: P.pierreSombre, ...TRAIT }} />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={1066 + i * 9.5} y={269} width={5} height={10} style={{ fill: P.pierreSombre }} />
      ))}
    </Ile>
  );
}

const element: CityElement = {
  id: 'arc-de-triomphe',
  nom: "L'Arc de Triomphe",
  layer: 'ville',
  ajouteLe: '2026-11-01T09:13:00',
  Component: ArcDeTriomphe,
};
export default element;
