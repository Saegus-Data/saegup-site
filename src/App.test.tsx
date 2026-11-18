import { render, screen } from '@testing-library/react';
import App from './App';
import { CityScene } from './scene/CityScene';
import { ELEMENTS } from './scene/registry';
import type { CityElement } from './scene/types';

const el = (over: Partial<CityElement>): CityElement => ({
  id: 'x',
  nom: 'X',
  layer: 'ville',
  ajouteLe: '2026-11-01T09:00:00',
  Component: () => <rect />,
  ...over,
});

describe('App', () => {
  it('dessine toute la ville et le bandeau', () => {
    const { container } = render(<App />);
    for (const e of ELEMENTS) expect(container.querySelector(`[data-element="${e.id}"]`)).not.toBeNull();
    expect(screen.getByRole('region', { name: 'Proposer une idée' })).toBeInTheDocument();
  });

  it("met en avant le dernier ajout et son ticket", () => {
    const { container } = render(
      <App
        elements={[
          el({ id: 'tour' }),
          el({ id: 'fusee', nom: 'La fusée', ajouteLe: '2026-11-26T19:00:00', ticket: 'BUG-0042', proposePar: 'Léa' }),
          el({ id: 'ballon', proposePar: 'Tom' }),
        ]}
      />,
    );
    const latest = screen.getByRole('complementary', { name: 'Dernier ajout' });
    expect(latest).toHaveTextContent('La fusée');
    expect(latest).toHaveTextContent('BUG-0042 · proposé par Léa');
    expect(container.querySelector('[data-element="fusee"]')).toHaveClass('is-new');
    expect(container.querySelector('[data-element="tour"]')).not.toHaveClass('is-new');
  });

  it('ville de départ : rien de mis en avant, on invite à construire', () => {
    const { container } = render(<App elements={[el({ id: 'tour', nom: 'La tour' })]} />);
    expect(screen.getByRole('complementary', { name: 'Dernier ajout' })).toHaveTextContent('À vous de construire');
    expect(container.querySelector('.is-new')).toBeNull();
  });

  it('ticket sans prénom : seule la référence est affichée', () => {
    render(<App elements={[el({ id: 'neige', nom: 'La neige', ticket: 'BUG-0043' })]} />);
    expect(screen.getByRole('complementary', { name: 'Dernier ajout' })).toHaveTextContent(/BUG-0043$/);
  });

  it("le ciel suit l'ambiance", () => {
    const { container } = render(<CityScene elements={[]} ambiance="nuit" />);
    expect(container.querySelector('svg')).toHaveAttribute('data-ambiance', 'nuit');
  });
});
