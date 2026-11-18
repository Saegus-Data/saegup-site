# Saegus City

La ville du Saegup, construite ticket après ticket par la boucle ITSM du Vibe Office.

1. Quelqu'un propose une idée depuis le bandeau (« Une idée pour la ville ? »).
2. L'idée arrive en ticket ITSM dans AI Studio.
3. Le ticket accepté part à la routine Claude Code, qui ajoute l'élément et ouvre une PR.
4. On teste la PR dans la VM (bouton « Tester » du ticket) : le nouvel élément brille à l'écran.

```bash
npm install
npm run dev        # http://localhost:5173
```

Qualité : `npm run lint`, `npm run typecheck`, `npm test -- --coverage` (cliquet à 100 %).
Hébergement : Vercel (production sur `main`, https://saegup-site.vercel.app). Chaque PR se teste
dans la VM GitHub Codespaces (bouton « Tester » du ticket).

## Architecture

| Chemin | Rôle |
| --- | --- |
| `src/scene/elements/*.tsx` | Un fichier = un élément de la ville, découvert automatiquement |
| `src/scene/registry.ts` | Chargement, tri par plan, élément le plus récent, contributeurs |
| `src/scene/CityScene.tsx` | Le SVG plein écran (1600 × 900) |
| `src/scene/ambiance.ts` | Jour / crépuscule / nuit |
| `src/ideas/IdeaBanner.tsx` | Bandeau et formulaire d'idée |
| `src/server/idea.ts` | Idée → ticket ITSM (secret côté serveur) |
| `api/idea.ts` | Fonction Vercel `POST /api/idea` |
| `vite.config.ts` | Sert la même route `POST /api/idea` en dev (poste, VM de test) |
| `.devcontainer/` | VM de test GitHub Codespaces (port 5173) |

## Variables d'environnement (Vercel ; `.env.local` en dev, ignoré par git)

| Variable | Rôle |
| --- | --- |
| `ITSM_INTAKE_URL` | `https://aistudio.saegus.com/api/itsm/reports` |
| `ITSM_INTAKE_SECRET` | Secret partagé avec AI Studio |
| `ITSM_PROJECT` | Nom du projet au catalogue ITSM |
| `ITSM_URGENCE` | Facultatif : `critique` déclenche une synthèse éclair (démo) ; défaut `normale` |

Sans ces variables, le bandeau répond « non branché » (cas de la VM de test).

Recette de la démo : [`docs/demo-saegup.md`](docs/demo-saegup.md).
