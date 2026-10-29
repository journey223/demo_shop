"use client";

import { useEffect, useMemo, useState } from "react";
import { formatPrice, products, type Product } from "@/lib/products";

type Cart = Record<string, number>;
type Order = {
  number: string;
  message: string;
  lines: { product: Product; qty: number }[];
  total: number;
};

const toastLines = [
  "Gute Wahl! Euer Finanzberater weint leise.",
  "Ab in den Warenkorb – zurück gibt's nicht.",
  "Wow, Geschmack habt ihr ja.",
  "Der Algorithmus ist stolz auf euch.",
  "Noch eins und ihr bekommt einen imaginären Rabatt.",
];

const checkoutLines = [
  "Bestellung erfolgreich! Lieferung erfolgt voraussichtlich nie.",
  "Keine Sorge: Echtes Geld wurde dabei nicht ausgegeben.",
  "Zahlung akzeptiert in Demo-Dollar. Kurs: unbezahlbar.",
];

export default function Shop() {
  const [cart, setCart] = useState<Cart>({});
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [done, setDone] = useState<Order | null>(null);
  const [jokes, setJokes] = useState(0);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setDone(null);
      setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const items = useMemo(
    () =>
      products
        .filter((p) => cart[p.id])
        .map((p) => ({ product: p, qty: cart[p.id] })),
    [cart],
  );
  const count = items.reduce((n, i) => n + i.qty, 0);
  const total = items.reduce((n, i) => n + i.qty * i.product.price, 0);

  function add(p: Product) {
    setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + 1 }));
    setToast(toastLines[jokes % toastLines.length]);
    setJokes((n) => n + 1);
  }

  function change(id: string, delta: number) {
    setCart((c) => {
      const qty = (c[id] ?? 0) + delta;
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }

  function checkout() {
    if (items.length === 0) return;
    setDone({
      number: `DEMO-${String(4711 + jokes * 37).padStart(5, "0")}`,
      message: checkoutLines[jokes % checkoutLines.length],
      lines: items,
      total,
    });
    setJokes((n) => n + 1);
    setCart({});
    setOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-30 border-b-4 border-black bg-yellow-300">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#" className="text-xl font-black tracking-tight">
            🛒 Demo-Markt
          </a>
          <button
            onClick={() => setOpen(true)}
            className="relative rounded-full border-2 border-black bg-white px-4 py-2 font-bold shadow-[3px_3px_0_#000] transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
          >
            Warenkorb
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full border-2 border-black bg-pink-500 px-1 text-xs text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-14 pb-10 text-center">
        <p className="mx-auto mb-4 inline-block -rotate-2 rounded-md border-2 border-black bg-pink-400 px-3 py-1 text-sm font-bold text-white shadow-[3px_3px_0_#000]">
          ⚠️ Achtung: Nichts hier ist echt
        </p>
        <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-7xl">
          Das ist eure
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">Demo-Seite.</span>
            <span className="absolute inset-x-0 bottom-1 z-0 h-4 -rotate-1 bg-yellow-300 sm:h-6" />
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-700">
          Herzlichen Glückwunsch, sie funktioniert! Damit ihr nicht nur auf eine
          leere Seite starrt, gibt&apos;s hier einen kleinen Shop mit Produkten,
          die niemand braucht.
        </p>
        <a
          href="#shop"
          className="mt-8 inline-block rounded-xl border-2 border-black bg-black px-6 py-3 font-bold text-white shadow-[4px_4px_0_#f472b6] transition hover:-translate-y-0.5"
        >
          Sinnlos einkaufen →
        </a>
      </section>

      <div className="overflow-hidden border-y-4 border-black bg-black py-2 text-yellow-300">
        <div className="marquee flex w-max gap-8 whitespace-nowrap font-mono text-sm font-bold">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-8">
              <span>✦ KOSTENLOSER VERSAND IN DIE CLOUD</span>
              <span>✦ 0 % ECHTE PRODUKTE</span>
              <span>✦ 100 % DEMO</span>
              <span>✦ KEIN RÜCKGABERECHT, WEIL KEINE WARE</span>
              <span>✦ IT WORKS ON MY MACHINE</span>
              <span>✦ JETZT MIT NOCH MEHR PLATZHALTERN</span>
            </span>
          ))}
        </div>
      </div>

      <main id="shop" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-14">
        <h2 className="mb-8 text-3xl font-black">Unser Sortiment</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[5px_5px_0_#000] transition hover:-translate-y-1"
            >
              <div
                className={`relative grid h-40 place-items-center border-b-2 border-black ${p.color}`}
              >
                <span className="text-7xl transition group-hover:scale-110 group-hover:-rotate-6">
                  {p.emoji}
                </span>
                {p.badge && (
                  <span className="absolute left-3 top-3 rotate-[-4deg] rounded-md border-2 border-black bg-white px-2 py-0.5 text-xs font-bold">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-bold leading-snug">{p.name}</h3>
                <p className="mt-1 flex-1 text-sm text-neutral-600">
                  {p.tagline}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-black">
                    {formatPrice(p.price)}
                  </span>
                  <button
                    onClick={() => add(p)}
                    className="rounded-lg border-2 border-black bg-yellow-300 px-3 py-1.5 text-sm font-bold shadow-[2px_2px_0_#000] transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  >
                    + In den Korb
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs text-neutral-500">
          * Gratis bezieht sich nur auf Geld, nicht auf Lebenszeit.
        </p>
      </main>

      <footer className="mt-auto border-t-4 border-black bg-white py-6 text-center text-sm text-neutral-600">
        Gebaut mit Next.js, Tailwind und einer gesunden Portion Unsinn. © Demo
        GmbH (nicht eingetragen)
      </footer>

      {/* Cart drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col border-l-4 border-black bg-white transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="flex items-center justify-between border-b-4 border-black bg-yellow-300 p-4">
          <h2 className="text-xl font-black">Euer Warenkorb</h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md border-2 border-black bg-white px-2 font-bold"
            aria-label="Schließen"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="mt-16 text-center text-neutral-500">
              <div className="text-6xl">🦗</div>
              <p className="mt-3">Hier zirpen nur die Grillen.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map(({ product: p, qty }) => (
                <li
                  key={p.id}
                  className="flex items-center gap-3 rounded-xl border-2 border-black p-2"
                >
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-black text-2xl ${p.color}`}
                  >
                    {p.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{p.name}</p>
                    <p className="text-xs text-neutral-500">
                      {formatPrice(p.price * qty)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => change(p.id, -1)}
                      className="h-7 w-7 rounded-md border-2 border-black font-bold"
                      aria-label="Weniger"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-bold">
                      {qty}
                    </span>
                    <button
                      onClick={() => change(p.id, 1)}
                      className="h-7 w-7 rounded-md border-2 border-black font-bold"
                      aria-label="Mehr"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t-4 border-black p-4">
          <div className="mb-3 flex justify-between text-lg font-black">
            <span>Summe</span>
            <span>{formatPrice(total)}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={checkout}
            className="w-full rounded-xl border-2 border-black bg-pink-500 py-3 font-bold text-white shadow-[4px_4px_0_#000] transition active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-40"
          >
            Jetzt kostenpflichtig nicht bestellen
          </button>
        </div>
      </aside>

      {/* Toast */}
      <div
        className={`pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border-2 border-black bg-white px-4 py-3 text-sm font-bold shadow-[4px_4px_0_#000] transition-all ${toast ? "opacity-100" : "translate-y-4 opacity-0"}`}
        role="status"
      >
        {toast}
      </div>

      {/* Checkout modal */}
      {done && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4"
          onClick={() => setDone(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-title"
            onClick={(e) => e.stopPropagation()}
            className="pop w-full max-w-md rounded-2xl border-4 border-black bg-white p-8 text-center shadow-[8px_8px_0_#000]"
          >
            <div className="text-7xl">🎉</div>
            <h2 id="order-title" className="mt-4 text-2xl font-black">
              Danke für eure Bestellung!
            </h2>
            <p className="mt-1 font-mono text-xs text-neutral-500">
              Bestellnr. {done.number}
            </p>
            <ul className="mt-5 space-y-1 border-y-2 border-dashed border-black py-3 text-left text-sm">
              {done.lines.map(({ product: p, qty }) => (
                <li key={p.id} className="flex justify-between gap-3">
                  <span className="truncate">
                    {qty}× {p.emoji} {p.name}
                  </span>
                  <span className="shrink-0 font-bold">
                    {formatPrice(p.price * qty)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex justify-between text-left font-black">
              <span>Gesamt</span>
              <span>{formatPrice(done.total)}</span>
            </div>
            <p className="mt-4 text-neutral-700">{done.message}</p>
            <button
              autoFocus
              onClick={() => setDone(null)}
              className="mt-6 rounded-xl border-2 border-black bg-yellow-300 px-5 py-2 font-bold shadow-[3px_3px_0_#000]"
            >
              Weiter sinnlos shoppen
            </button>
          </div>
        </div>
      )}
    </>
  );
}
