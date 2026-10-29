import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { readFileSync } from 'node:fs';
import App from './App';
import { seatsLeft } from './event';

const css = readFileSync('src/App.css', 'utf-8');

describe('App', () => {
  it("affiche le bouton d'inscription et le programme", () => {
    render(<App />);
    expect(screen.getByRole('button', { name: "Je m'inscris au Saegup" })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Programme' })).toBeInTheDocument();
    expect(screen.getByText('33 places restantes')).toBeInTheDocument();
  });

  it("confirme l'inscription et décompte une place", async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: "Je m'inscris au Saegup" }));
    expect(screen.getByRole('status')).toHaveTextContent('Merci, à jeudi !');
    expect(screen.getByText('32 places restantes')).toBeInTheDocument();
  });
});

describe('styles du bouton', () => {
  const rule = (selector: string) =>
    css.match(new RegExp(`^${selector.replace('.', '\\.')}\\s*\\{([^}]*)\\}`, 'm'))?.[1] ?? '';

  it('utilise les tokens CTA, lisibles (fond violet, texte blanc)', () => {
    const cta = rule('.cta');
    expect(cta).toMatch(/background:\s*var\(--cta-bg\)/);
    expect(cta).toMatch(/color:\s*var\(--cta-text\)/);
  });

  it('passe en navy au survol', () => {
    expect(rule('.cta:hover')).toMatch(/background:\s*var\(--cta-bg-hover\)/);
  });
});

describe('seatsLeft', () => {
  it('ne descend jamais sous zéro', () => {
    expect(seatsLeft(10, 3)).toBe(7);
    expect(seatsLeft(10, 12)).toBe(0);
  });
});
