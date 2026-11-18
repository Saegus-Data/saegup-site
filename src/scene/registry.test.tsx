import { contributorCount, ELEMENTS, loadElements, newestElement, sortElements } from './registry';
import { LAYERS, type CityElement } from './types';

const el = (over: Partial<CityElement>): CityElement => ({
  id: 'x',
  nom: 'X',
  layer: 'ville',
  ajouteLe: '2026-11-01T09:00:00',
  Component: () => <g />,
  ...over,
});

describe('registre des éléments', () => {
  it('découvre tous les fichiers de elements/', () => {
    expect(ELEMENTS.length).toBeGreaterThanOrEqual(8);
  });

  it("chaque élément respecte le contrat (id unique = nom du fichier, plan connu, date ISO)", () => {
    const modules = import.meta.glob<{ default: CityElement }>('./elements/*.tsx', { eager: true });
    for (const [path, mod] of Object.entries(modules)) {
      const e = mod.default;
      expect(path).toBe(`./elements/${e.id}.tsx`);
      expect(e.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(LAYERS).toContain(e.layer);
      expect(Number.isNaN(Date.parse(e.ajouteLe))).toBe(false);
      expect(e.nom.trim()).not.toBe('');
    }
    const ids = ELEMENTS.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('range par plan, puis par date, puis par id', () => {
    const sorted = sortElements([
      el({ id: 'b', layer: 'rue' }),
      el({ id: 'z', layer: 'ciel' }),
      el({ id: 'c', layer: 'rue', ajouteLe: '2026-12-01T00:00:00' }),
      el({ id: 'a', layer: 'rue' }),
    ]);
    expect(sorted.map((e) => e.id)).toEqual(['z', 'a', 'b', 'c']);
  });

  it("met en avant l'ajout le plus récent", () => {
    expect(newestElement([el({ id: 'a' }), el({ id: 'b', ajouteLe: '2026-11-26T19:00:00' })])?.id).toBe('b');
    expect(newestElement([el({ id: 'b' }), el({ id: 'a' })])?.id).toBe('a');
    expect(newestElement([])).toBeUndefined();
  });

  it('compte les contributeurs distincts', () => {
    expect(
      contributorCount([el({ proposePar: 'Léa' }), el({ proposePar: ' léa ' }), el({ proposePar: 'Tom' }), el({})]),
    ).toBe(2);
  });

  it('charge des modules', () => {
    expect(loadElements({ a: { default: el({ id: 'a' }) } }).map((e) => e.id)).toEqual(['a']);
  });
});
