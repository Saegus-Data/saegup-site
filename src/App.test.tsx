import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { seatsLeft } from './event';

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

describe('seatsLeft', () => {
  it('ne descend jamais sous zéro', () => {
    expect(seatsLeft(10, 3)).toBe(7);
    expect(seatsLeft(10, 12)).toBe(0);
  });
});
