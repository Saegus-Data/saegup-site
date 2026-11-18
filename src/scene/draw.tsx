import { P } from './palette';

interface WindowsProps {
  x: number;
  y: number;
  cols: number;
  rows: number;
  /** Taille d'une fenêtre et espacement, en unités de la scène. */
  size?: number;
  gap?: number;
  color?: string;
}

/** Grille de fenêtres, réutilisable par tous les bâtiments. */
export function Windows({ x, y, cols, rows, size = 14, gap = 10, color = P.fenetre }: WindowsProps) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={x + c * (size + gap)}
          y={y + r * (size + gap)}
          width={size}
          height={size}
          rx={2}
          style={{ fill: color }}
        />,
      );
    }
  }
  return <g>{cells}</g>;
}
