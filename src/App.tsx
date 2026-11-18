import { IdeaBanner } from './ideas/IdeaBanner';
import { CityScene } from './scene/CityScene';
import { ELEMENTS, newestElement } from './scene/registry';
import type { CityElement } from './scene/types';

export default function App({ elements = ELEMENTS }: { elements?: CityElement[] }) {
  // Seuls les éléments nés d'un ticket sont mis en avant : la ville de départ reste neutre.
  const newest = newestElement(elements.filter((e) => e.ticket));

  return (
    <main className="page">
      <CityScene elements={elements} newestId={newest?.id} />

      {newest ? (
        <aside className="latest" aria-label="Dernier ajout" key={newest.id}>
          <p className="latest-label">Dernier ajout</p>
          <p className="latest-name">{newest.nom}</p>
          <p className="latest-meta">
            {newest.ticket}
            {newest.proposePar && <> · proposé par {newest.proposePar}</>}
          </p>
        </aside>
      ) : (
        <aside className="latest" aria-label="Dernier ajout">
          <p className="latest-label">Ville de départ</p>
          <p className="latest-name">À vous de construire</p>
          <p className="latest-meta">La première idée apparaîtra ici.</p>
        </aside>
      )}

      <IdeaBanner />
    </main>
  );
}
