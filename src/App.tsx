import { useState } from 'react';
import { AGENDA, EVENT, seatsLeft } from './event';

const CAPACITY = 120;
const ALREADY_REGISTERED = 87;

export default function App() {
  const [registered, setRegistered] = useState(false);
  const left = seatsLeft(CAPACITY, ALREADY_REGISTERED + (registered ? 1 : 0));

  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">{EVENT.edition}</p>
        <h1>
          {EVENT.name}
          <span className="dot">.</span>
        </h1>
        <p className="lead">
          {EVENT.date} · {EVENT.hours} · {EVENT.place}
        </p>

        {registered ? (
          <p className="confirm" role="status">
            Merci, à jeudi ! 🎉
          </p>
        ) : (
          <button type="button" className="cta" onClick={() => setRegistered(true)}>
            Je m'inscris au Saegup
          </button>
        )}
        <p className="seats">{left} places restantes</p>
      </header>

      <section className="agenda" aria-label="Programme">
        <h2>Programme</h2>
        <ol>
          {AGENDA.map((item) => (
            <li key={item.time}>
              <span className="time">{item.time}</span>
              <span>{item.title}</span>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
