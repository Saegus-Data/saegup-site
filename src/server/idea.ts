/**
 * Côté serveur (middleware `/api/idea` de `vite.config.ts`) : transforme une idée de la page en ticket ITSM d'AI Studio. Le secret ne quitte
 * jamais le serveur.
 *
 * Variables : `ITSM_INTAKE_URL` (POST /api/itsm/reports d'AI Studio),
 * `ITSM_INTAKE_SECRET`, `ITSM_PROJECT` (nom du projet au catalogue ITSM),
 * `ITSM_URGENCE` (facultatif ; `critique` déclenche une synthèse éclair, utile en démo).
 */

export const URGENCES = ['basse', 'normale', 'haute', 'critique'] as const;
export type Urgence = (typeof URGENCES)[number];

export interface IdeaEnv {
  ITSM_INTAKE_URL?: string;
  ITSM_INTAKE_SECRET?: string;
  ITSM_PROJECT?: string;
  ITSM_URGENCE?: string;
}

export interface Idea {
  idee: string;
  prenom: string;
}

export interface ItsmReport {
  project: string;
  titre: string;
  description: string;
  urgence: Urgence;
  tags: string[];
}

const IDEA_MIN = 10;
const IDEA_MAX = 1000;
const PRENOM_MAX = 40;
const TITRE_MAX = 90;

type Parsed = { ok: true; value: Idea } | { ok: false; error: string };

export function parseIdea(body: unknown): Parsed {
  if (typeof body !== 'object' || body === null) return { ok: false, error: 'Corps invalide' };
  const { idee, prenom } = body as Record<string, unknown>;
  if (typeof idee !== 'string' || idee.trim().length < IDEA_MIN) {
    return { ok: false, error: `Décris ton idée en au moins ${IDEA_MIN} caractères.` };
  }
  if (idee.length > IDEA_MAX) return { ok: false, error: `Idée trop longue (max ${IDEA_MAX} caractères).` };
  const name = typeof prenom === 'string' ? prenom.trim().slice(0, PRENOM_MAX) : '';
  return { ok: true, value: { idee: idee.trim(), prenom: name } };
}

function urgence(raw: string | undefined): Urgence {
  return (URGENCES as readonly string[]).includes(raw ?? '') ? (raw as Urgence) : 'normale';
}

/** Le ticket tel que l'agent le lira : la demande, puis la consigne de construction. */
export function buildItsmReport(idea: Idea, env: IdeaEnv): ItsmReport {
  const firstLine = idea.idee.split('\n')[0];
  const titre = firstLine.length > TITRE_MAX ? `${firstLine.slice(0, TITRE_MAX - 1)}…` : firstLine;
  const auteur = idea.prenom || 'Anonyme';
  return {
    project: env.ITSM_PROJECT!.trim(),
    titre: `Ville du Saegup : ${titre}`,
    description: [
      `Idée proposée par ${auteur} depuis le bandeau de Saegus City :`,
      '',
      idea.idee,
      '',
      `Réalisation : ajouter (ou modifier) un élément dans src/scene/elements/ en suivant CLAUDE.md, avec proposePar: '${auteur}' et la référence de ce ticket.`,
    ].join('\n'),
    urgence: urgence(env.ITSM_URGENCE),
    tags: ['saegup', 'ville'],
  };
}

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export async function handleIdea(request: Request, env: IdeaEnv, fetchFn: typeof fetch = fetch): Promise<Response> {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'Méthode non autorisée' });
  if (!env.ITSM_INTAKE_URL || !env.ITSM_INTAKE_SECRET || !env.ITSM_PROJECT?.trim()) {
    return json(503, { ok: false, error: "Le dépôt d'idées n'est pas branché sur cet environnement." });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, error: 'Corps JSON invalide' });
  }
  const parsed = parseIdea(body);
  if (!parsed.ok) return json(400, { ok: false, error: parsed.error });

  try {
    const res = await fetchFn(env.ITSM_INTAKE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.ITSM_INTAKE_SECRET}` },
      body: JSON.stringify(buildItsmReport(parsed.value, env)),
      signal: AbortSignal.timeout(15_000),
      // Une redirection (page de connexion) suivie en silence ressemblerait à un succès.
      redirect: 'error',
    });
    if (!res.ok) {
      console.error(`[idea] AI Studio a refusé le ticket (${res.status})`);
      return json(502, { ok: false, error: "AI Studio n'a pas accepté l'idée, réessaie." });
    }
    const data = (await res.json()) as { reference?: string };
    return json(201, { ok: true, reference: data.reference });
  } catch (err) {
    console.error('[idea] AI Studio injoignable', err);
    return json(502, { ok: false, error: 'AI Studio est injoignable pour le moment.' });
  }
}
