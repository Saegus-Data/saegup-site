import type { CSSProperties, ReactNode } from 'react';
import { P } from './palette';

/**
 * Repère de l'île : les éléments du décor sont dessinés dans les coordonnées de l'illustration
 * d'origine (1600 × 893), puis réduits et recentrés dans la scène. Un point (x, y) de l'île
 * s'affiche en (112 + 0,86·x, 110 + 0,86·y) dans la scène.
 */
export function Ile({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <g transform="translate(112 110) scale(0.86)" className={className}>
      {children}
    </g>
  );
}

/** Contour commun aux dessins (trait brun « illustration »). */
export const TRAIT: CSSProperties = { stroke: P.contour, strokeWidth: 2, strokeLinejoin: 'round' };

/** Un arbre rond qui se balance doucement (pied en x, y). */
export function Arbre({ x, y, r, delai }: { x: number; y: number; r: number; delai: number }) {
  return (
    <g className="anim-arbre" style={{ animationDelay: `${delai}s` }}>
      <path
        d={`M${x - r * 0.14},${y} L${x - r * 0.1},${y - r * 1.1} L${x + r * 0.1},${y - r * 1.1} L${x + r * 0.14},${y} Z`}
        style={{ fill: P.tronc, ...TRAIT }}
      />
      <circle cx={x} cy={y - r * 1.55} r={r} style={{ fill: P.herbeSombre, ...TRAIT }} />
      <circle cx={x - r * 0.45} cy={y - r * 1.45} r={r * 0.6} style={{ fill: P.herbe }} />
      <circle cx={x + r * 0.2} cy={y - r * 1.95} r={r * 0.55} style={{ fill: P.herbe }} />
      <circle cx={x - r * 0.3} cy={y - r * 2} r={r * 0.28} style={{ fill: P.herbeClaire }} />
    </g>
  );
}

interface HaussmannProps {
  /** Coin bas gauche de la façade. */
  x: number;
  y: number;
  /** Largeur de la façade, profondeur du pignon, hauteur des murs. */
  w: number;
  d: number;
  h: number;
  /** Nombre de fenêtres par étage (façade) et d'étages. */
  cols: number;
  rows: number;
  /** Couleur du store de la boutique au rez-de-chaussée. */
  store: string;
}

/** Un immeuble haussmannien : façade en pierre, toit mansardé en ardoise, cheminées. */
export function Haussmann({ x, y, w, d, h, cols, rows, store }: HaussmannProps) {
  const k = d * 0.35;
  const toit = h * 0.42;
  const pas = w / cols;
  const etage = (h - 34) / rows;
  const fenetres = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      fenetres.push(
        <rect
          key={`${r}-${c}`}
          x={x + c * pas + pas * 0.28}
          y={y - h + 8 + r * etage}
          width={pas * 0.44}
          height={etage * 0.62}
          rx={2}
          style={{ fill: P.vitre, stroke: P.blanc, strokeWidth: 2 }}
        />,
      );
    }
  }
  return (
    <g>
      {/* Pignon (côté droit, dans l'ombre) */}
      <polygon
        points={`${x + w},${y} ${x + w},${y - h} ${x + w + d},${y - h - k} ${x + w + d},${y - k}`}
        style={{ fill: P.pierreSombre, ...TRAIT }}
      />
      {/* Façade */}
      <rect x={x} y={y - h} width={w} height={h} style={{ fill: P.pierre, ...TRAIT }} />
      {fenetres}
      {/* Balcon filant */}
      <rect x={x - 2} y={y - h + etage - 2} width={w + 4} height={4} style={{ fill: P.contour }} />
      {/* Boutique et son store rayé */}
      <rect x={x + w * 0.15} y={y - 26} width={w * 0.7} height={26} style={{ fill: P.vitre, ...TRAIT }} />
      <path
        d={`M${x + w * 0.1},${y - 34} L${x + w * 0.9},${y - 34} L${x + w * 0.95},${y - 22} L${x + w * 0.05},${y - 22} Z`}
        style={{ fill: store, ...TRAIT }}
      />
      {[0.25, 0.5, 0.75].map((t) => (
        <rect key={t} x={x + w * t - 4} y={y - 33} width={8} height={10} style={{ fill: P.blanc }} />
      ))}
      {/* Toit mansardé */}
      <polygon
        points={`${x - 6},${y - h} ${x + w + 6},${y - h} ${x + w + d},${y - h - k} ${x + w + d - 8},${y - h - k - toit} ${x + 10},${y - h - toit}`}
        style={{ fill: P.ardoise, ...TRAIT }}
      />
      <polygon
        points={`${x + 10},${y - h - toit} ${x + w + d - 8},${y - h - k - toit} ${x + w + d - 14},${y - h - k - toit - 8} ${x + 16},${y - h - toit - 8}`}
        style={{ fill: P.ardoiseClaire, ...TRAIT }}
      />
      {/* Lucarnes */}
      {Array.from({ length: cols }, (_, c) => (
        <g key={c}>
          <path
            d={`M${x + c * pas + pas * 0.22},${y - h - 6} L${x + c * pas + pas * 0.22},${y - h - toit * 0.6} L${x + c * pas + pas * 0.5},${y - h - toit * 0.85} L${x + c * pas + pas * 0.78},${y - h - toit * 0.6} L${x + c * pas + pas * 0.78},${y - h - 6} Z`}
            style={{ fill: P.pierre, ...TRAIT }}
          />
          <rect
            x={x + c * pas + pas * 0.33}
            y={y - h - toit * 0.55}
            width={pas * 0.34}
            height={toit * 0.42}
            style={{ fill: P.vitre }}
          />
        </g>
      ))}
      {/* Cheminées */}
      {[0.3, 0.75].map((t) => (
        <g key={t}>
          <rect x={x + w * t} y={y - h - toit - 30} width={16} height={26} style={{ fill: P.brique, ...TRAIT }} />
          <rect x={x + w * t - 3} y={y - h - toit - 34} width={22} height={6} style={{ fill: P.brique, ...TRAIT }} />
        </g>
      ))}
    </g>
  );
}

/** Un pont de pierre en dos d'âne, posé de (x1, y1) à (x2, y2). */
export function Pont({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const e = 26;
  return (
    <g>
      <path
        d={`M${x1},${y1} Q${mx},${my - 30} ${x2},${y2} L${x2},${y2 + e} L${x2 - 10},${y2 + e}
            Q${mx},${my - 6} ${x1 + 10},${y1 + e} L${x1},${y1 + e} Z`}
        style={{ fill: P.roche, ...TRAIT }}
      />
      <path d={`M${x1},${y1} Q${mx},${my - 30} ${x2},${y2}`} style={{ fill: 'none', stroke: P.rocheSombre, strokeWidth: 8 }} />
      <path
        d={`M${x1},${y1 - 8} Q${mx},${my - 40} ${x2},${y2 - 8}`}
        style={{ fill: 'none', stroke: P.roche, strokeWidth: 6, strokeLinecap: 'round' }}
      />
      <path d={`M${x1},${y1} Q${mx},${my - 30} ${x2},${y2}`} style={{ fill: 'none', ...TRAIT }} />
    </g>
  );
}

/** Une tente canadienne (pied avant en x, y). */
export function Tente({ x, y, w, couleur }: { x: number; y: number; w: number; couleur: string }) {
  const h = w * 0.75;
  return (
    <g>
      <polygon points={`${x},${y} ${x + w * 0.5},${y - h} ${x + w * 1.1},${y - h - 8} ${x + w * 0.75},${y - 6}`} style={{ fill: couleur, ...TRAIT }} />
      <polygon points={`${x},${y} ${x + w * 0.5},${y - h} ${x + w},${y}`} style={{ fill: couleur, ...TRAIT }} />
      <polygon points={`${x + w * 0.35},${y} ${x + w * 0.5},${y - h * 0.55} ${x + w * 0.65},${y}`} style={{ fill: P.contour, opacity: 0.6 }} />
    </g>
  );
}

/** Un réverbère parisien (pied en x, y). */
export function Lampadaire({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 3} y={y - 60} width={6} height={60} style={{ fill: P.navy }} />
      <rect x={x - 7} y={y - 6} width={14} height={6} style={{ fill: P.navy }} />
      <path d={`M${x - 10},${y - 60} L${x + 10},${y - 60} L${x + 7},${y - 78} L${x - 7},${y - 78} Z`} style={{ fill: P.jaune, ...TRAIT }} />
      <path d={`M${x - 11},${y - 78} L${x + 11},${y - 78} L${x},${y - 88} Z`} style={{ fill: P.navy }} />
    </g>
  );
}

/** Un nuage moelleux (centre en x, y), avec son ombre douce. */
export function Nuage({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={14} rx={150} ry={34} style={{ fill: P.nuageOmbre }} />
      <ellipse cx={-80} cy={0} rx={70} ry={42} style={{ fill: P.blanc }} />
      <ellipse cx={-10} cy={-30} rx={80} ry={62} style={{ fill: P.blanc }} />
      <ellipse cx={75} cy={-8} rx={62} ry={46} style={{ fill: P.blanc }} />
      <ellipse cx={10} cy={12} rx={140} ry={26} style={{ fill: P.blanc }} />
    </g>
  );
}
