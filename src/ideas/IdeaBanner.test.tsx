import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IdeaBanner } from './IdeaBanner';

const IDEE = 'Une fusée qui décolle de la tour';

function mockFetch(impl: () => Promise<Partial<Response>>) {
  const fn = vi.fn(impl);
  vi.stubGlobal('fetch', fn);
  return fn;
}

async function openAndType(text = IDEE, prenom = '') {
  const user = userEvent.setup();
  render(<IdeaBanner />);
  await user.click(screen.getByRole('button', { name: 'Proposer' }));
  await user.type(screen.getByLabelText('Ton idée'), text);
  if (prenom) await user.type(screen.getByLabelText(/Ton prénom/), prenom);
  return user;
}

afterEach(() => vi.unstubAllGlobals());

describe('IdeaBanner', () => {
  it('ouvre puis ferme le formulaire', async () => {
    const user = await openAndType('court');
    expect(screen.getByRole('button', { name: 'Envoyer' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Annuler' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it("envoie l'idée et affiche la référence du ticket", async () => {
    const fetchMock = mockFetch(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ reference: 'BUG-0042' }) }));
    const user = await openAndType(IDEE, 'Léa');
    await user.click(screen.getByRole('button', { name: 'Envoyer' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Idée reçue (BUG-0042)');
    const init = (fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1];
    expect(JSON.parse(init.body as string)).toEqual({ idee: IDEE, prenom: 'Léa' });
    await user.click(screen.getByRole('button', { name: 'Fermer' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('confirme même sans référence', async () => {
    mockFetch(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));
    const user = await openAndType();
    await user.click(screen.getByRole('button', { name: 'Envoyer' }));
    expect(await screen.findByRole('status')).toHaveTextContent(/^Idée reçue !/);
  });

  it("affiche l'erreur renvoyée par le serveur", async () => {
    mockFetch(() => Promise.resolve({ ok: false, json: () => Promise.resolve({ error: 'Pas branché' }) }));
    const user = await openAndType();
    await user.click(screen.getByRole('button', { name: 'Envoyer' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Pas branché');
  });

  it('erreur générique si la réponse est illisible', async () => {
    mockFetch(() => Promise.resolve({ ok: false, json: () => Promise.reject(new Error('html')) }));
    const user = await openAndType();
    await user.click(screen.getByRole('button', { name: 'Envoyer' }));
    expect(await screen.findByRole('alert')).toHaveTextContent("L'idée n'a pas pu être envoyée.");
  });

  it('erreur réseau, avec état « Envoi… » pendant la requête', async () => {
    let reject!: (e: Error) => void;
    mockFetch(() => new Promise((_, r) => (reject = r)));
    const user = await openAndType();
    await user.click(screen.getByRole('button', { name: 'Envoyer' }));
    expect(screen.getByRole('button', { name: 'Envoi…' })).toBeDisabled();
    reject(new Error('offline'));
    expect(await screen.findByRole('alert')).toHaveTextContent('Réseau indisponible');
  });
});
