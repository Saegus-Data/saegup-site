export const EVENT = {
  name: 'Saegup',
  edition: 'Novembre 2026',
  date: 'Jeudi 26 novembre',
  hours: '18h30 – 20h00',
  place: 'Saegus · Paris',
};

export const AGENDA = [
  { time: '18h30', title: 'Accueil & actus du mois' },
  { time: '18h50', title: 'Vibe Office : la boucle ITSM en live' },
  { time: '19h20', title: 'Retours de missions' },
  { time: '19h40', title: 'Apéro' },
];

export function seatsLeft(capacity: number, registered: number): number {
  return Math.max(0, capacity - registered);
}
