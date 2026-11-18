import { useState, type FormEvent } from 'react';

/** Même plancher que la déclaration d'un ticket dans AI Studio. */
export const IDEA_MIN = 10;
export const IDEA_MAX = 1000;

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent'; reference?: string }
  | { kind: 'error'; message: string };

/**
 * Bandeau du bas : propose une idée pour la ville. L'idée part en ticket ITSM dans
 * AI Studio (via `/api/idea`, qui garde le secret côté serveur).
 */
export function IdeaBanner() {
  const [open, setOpen] = useState(false);
  const [idee, setIdee] = useState('');
  const [prenom, setPrenom] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const tooShort = idee.trim().length < IDEA_MIN;

  function close() {
    setOpen(false);
    setStatus({ kind: 'idle' });
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('/api/idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idee: idee.trim(), prenom: prenom.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as { reference?: string; error?: string };
      if (!res.ok) {
        setStatus({ kind: 'error', message: data.error ?? "L'idée n'a pas pu être envoyée." });
        return;
      }
      setStatus({ kind: 'sent', reference: data.reference });
      setIdee('');
    } catch {
      setStatus({ kind: 'error', message: 'Réseau indisponible, réessaie dans un instant.' });
    }
  }

  return (
    <>
      <div className="banner" role="region" aria-label="Proposer une idée">
        <span className="banner-text">
          <span className="banner-dot" aria-hidden="true">
            ◆
          </span>
          <strong>Une idée pour la ville ?</strong>
          <span className="banner-sub">Claude la construit, en direct.</span>
        </span>
        <button type="button" className="cta" onClick={() => setOpen(true)}>
          Proposer
        </button>
      </div>

      {open && (
        <div className="modal-backdrop">
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="idea-title">
            <h2 id="idea-title">Que doit-on construire ?</h2>

            {status.kind === 'sent' ? (
              <div className="modal-body">
                <p role="status" className="sent">
                  Idée reçue{status.reference ? ` (${status.reference})` : ''} ! Elle arrive dans AI Studio. 🚀
                </p>
                <button type="button" className="cta" onClick={close}>
                  Fermer
                </button>
              </div>
            ) : (
              <form className="modal-body" onSubmit={submit}>
                <label>
                  Ton idée
                  <textarea
                    value={idee}
                    onChange={(e) => setIdee(e.target.value)}
                    maxLength={IDEA_MAX}
                    rows={4}
                    placeholder="Ex. : une fusée qui décolle du toit de la tour Saegus"
                    required
                  />
                </label>
                <label>
                  Ton prénom <span className="optional">(facultatif)</span>
                  <input value={prenom} onChange={(e) => setPrenom(e.target.value)} maxLength={40} />
                </label>
                {status.kind === 'error' && (
                  <p role="alert" className="error">
                    {status.message}
                  </p>
                )}
                <div className="actions">
                  <button type="button" className="ghost" onClick={close}>
                    Annuler
                  </button>
                  <button type="submit" className="cta" disabled={tooShort || status.kind === 'sending'}>
                    {status.kind === 'sending' ? 'Envoi…' : 'Envoyer'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
