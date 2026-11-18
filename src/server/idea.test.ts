import { buildItsmReport, handleIdea, parseIdea, type IdeaEnv } from './idea';

const ENV: IdeaEnv = {
  ITSM_INTAKE_URL: 'https://aistudio.example/api/itsm/reports',
  ITSM_INTAKE_SECRET: 's3cret',
  ITSM_PROJECT: ' Saegus City ',
  ITSM_URGENCE: 'critique',
};

const post = (body: unknown, raw = false) =>
  new Request('http://localhost/api/idea', { method: 'POST', body: raw ? (body as string) : JSON.stringify(body) });

const okFetch = () =>
  vi.fn(() => Promise.resolve(new Response(JSON.stringify({ ok: true, reference: 'BUG-0042' }), { status: 201 })));

beforeEach(() => vi.spyOn(console, 'error').mockImplementation(() => {}));
afterEach(() => vi.restoreAllMocks());

describe('parseIdea', () => {
  it('valide et nettoie', () => {
    expect(parseIdea({ idee: '  Une fusée sur la tour  ', prenom: ' Léa ' })).toEqual({
      ok: true,
      value: { idee: 'Une fusée sur la tour', prenom: 'Léa' },
    });
    expect(parseIdea({ idee: 'Une fusée sur la tour', prenom: 3 })).toMatchObject({ ok: true, value: { prenom: '' } });
  });

  it('refuse les corps invalides', () => {
    expect(parseIdea(null)).toMatchObject({ ok: false });
    expect(parseIdea('x')).toMatchObject({ ok: false });
    expect(parseIdea({ idee: 'court' })).toMatchObject({ ok: false, error: expect.stringContaining('10') });
    expect(parseIdea({ idee: 'x'.repeat(1001) })).toMatchObject({ ok: false, error: expect.stringContaining('1000') });
  });
});

describe('buildItsmReport', () => {
  it('titre court, consigne de réalisation et urgence configurée', () => {
    const r = buildItsmReport({ idee: 'Une fusée\nqui décolle', prenom: 'Léa' }, ENV);
    expect(r).toMatchObject({ project: 'Saegus City', titre: 'Ville du Saegup : Une fusée', urgence: 'critique', tags: ['saegup', 'ville'] });
    expect(r.description).toContain('proposée par Léa');
    expect(r.description).toContain("proposePar: 'Léa'");
    expect(r.description).toContain('src/scene/elements/');
  });

  it('tronque les titres longs, anonyme par défaut, urgence normale sinon', () => {
    const r = buildItsmReport({ idee: 'a'.repeat(200), prenom: '' }, { ...ENV, ITSM_URGENCE: 'n/a' });
    expect(r.titre).toHaveLength('Ville du Saegup : '.length + 90);
    expect(r.description).toContain('Anonyme');
    expect(r.urgence).toBe('normale');
    expect(buildItsmReport({ idee: 'a'.repeat(20), prenom: '' }, { ...ENV, ITSM_URGENCE: undefined }).urgence).toBe('normale');
  });
});

describe('handleIdea', () => {
  it('transmet le ticket à AI Studio avec le secret', async () => {
    const fetchFn = okFetch();
    const res = await handleIdea(post({ idee: 'Une fusée sur la tour' }), ENV, fetchFn as unknown as typeof fetch);
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ ok: true, reference: 'BUG-0042' });
    const [url, init] = fetchFn.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(ENV.ITSM_INTAKE_URL);
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer s3cret');
    expect(init.redirect).toBe('error');
  });

  it('405 hors POST', async () => {
    expect((await handleIdea(new Request('http://localhost/api/idea'), ENV)).status).toBe(405);
  });

  it('503 si non configuré', async () => {
    expect((await handleIdea(post({}), {})).status).toBe(503);
    expect((await handleIdea(post({}), { ...ENV, ITSM_PROJECT: '  ' })).status).toBe(503);
    expect((await handleIdea(post({}), { ...ENV, ITSM_INTAKE_SECRET: '' })).status).toBe(503);
  });

  it('400 sur corps invalide', async () => {
    expect((await handleIdea(post('{', true), ENV)).status).toBe(400);
    const res = await handleIdea(post({ idee: 'court' }), ENV);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain('10');
  });

  it('502 si AI Studio refuse ou est injoignable', async () => {
    const refuse = vi.fn(() => Promise.resolve(new Response('{}', { status: 404 })));
    expect((await handleIdea(post({ idee: 'Une fusée sur la tour' }), ENV, refuse as unknown as typeof fetch)).status).toBe(502);
    const down = vi.fn(() => Promise.reject(new Error('ECONNREFUSED')));
    expect((await handleIdea(post({ idee: 'Une fusée sur la tour' }), ENV, down as unknown as typeof fetch)).status).toBe(502);
  });
});
