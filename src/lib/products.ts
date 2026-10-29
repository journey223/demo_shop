export type Product = {
  id: string;
  name: string;
  emoji: string;
  price: number;
  tagline: string;
  badge?: string;
  color: string;
};

export const products: Product[] = [
  {
    id: "pixel",
    name: "Ein Pixel (gebraucht)",
    emoji: "🟥",
    price: 0.99,
    tagline: "Leicht abgenutzt, aber leuchtet noch. Meistens.",
    badge: "Bestseller",
    color: "bg-rose-200",
  },
  {
    id: "socken",
    name: "404-Socke",
    emoji: "🧦",
    price: 12.0,
    tagline: "Die zweite Socke wurde leider nicht gefunden.",
    color: "bg-sky-200",
  },
  {
    id: "cloud",
    name: "Die Cloud im Glas",
    emoji: "☁️",
    price: 49.99,
    tagline: "Endlich wissen, wo eure Daten wirklich liegen.",
    badge: "Neu",
    color: "bg-indigo-200",
  },
  {
    id: "bugspray",
    name: "Bugfix-Spray",
    emoji: "🧴",
    price: 19.9,
    tagline: "Einfach auf den Bildschirm sprühen. Wirkt nicht in Produktion.",
    color: "bg-lime-200",
  },
  {
    id: "meeting",
    name: "Meeting, das eine Mail hätte sein können",
    emoji: "📅",
    price: 0,
    tagline: "Kostenlos. Kostet euch trotzdem 60 Minuten.",
    badge: "Gratis*",
    color: "bg-amber-200",
  },
  {
    id: "kaffee",
    name: "Deploy-am-Freitag-Kaffee",
    emoji: "☕",
    price: 6.66,
    tagline: "Extra stark. Für alle, die gerne am Wochenende arbeiten.",
    color: "bg-orange-200",
  },
  {
    id: "lorem",
    name: "Lorem-Ipsum-Duftkerze",
    emoji: "🕯️",
    price: 14.5,
    tagline: "Riecht nach Platzhalter mit einem Hauch von dolor sit amet.",
    color: "bg-fuchsia-200",
  },
  {
    id: "ente",
    name: "Senior-Debugging-Ente",
    emoji: "🦆",
    price: 999.0,
    tagline: "Hört zu. Urteilt nicht. Hat 10 Jahre Erfahrung.",
    badge: "Premium",
    color: "bg-yellow-200",
  },
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
