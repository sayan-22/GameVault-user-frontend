"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Game } from "@/constants/game";
import { discountedPrice, formatPrice } from "@/utils/price";
import PriceTag from "@/components/cards/PriceTag";
import CartSummary from "./cart/CartSummary";
import EmptyCart from "./cart/EmptyCart";

export default function CartView({ initialItems }: { initialItems: Game[] }) {
  const [items, setItems] = useState<Game[]>(initialItems);
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = useMemo(() => items.reduce((s, g) => s + discountedPrice(g), 0), [items]);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = Math.max(0, subtotal - discount + tax);

  if (items.length === 0) return <EmptyCart />;

  const remove = (id: string) => setItems((xs) => xs.filter((g) => g.id !== id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 animate-fade-up">
        <p className="text-xs uppercase tracking-widest text-cyan">Checkout</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">Your cart</h1>
        <p className="mt-1 text-sm text-text-secondary">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <ul className="flex flex-col gap-3">
          {items.map((g) => (
            <CartItem key={g.id} game={g} onRemove={() => remove(g.id)} />
          ))}
        </ul>
        <CartSummary
          subtotal={subtotal}
          discount={discount}
          tax={tax}
          total={total}
          promoApplied={promoApplied}
          onPromoApply={(code) => {
            if (code.trim().toUpperCase() === "GAMEVAULT10") setPromoApplied(true);
          }}
        />
      </div>
    </div>
  );
}

function CartItem({ game, onRemove }: { game: Game; onRemove: () => void }) {
  return (
    <li className="group flex gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-cyan-border">
      <Link href={`/game/${game.id}`} className="flex-none">
        <span
          className="block h-24 w-20 rounded-lg bg-cover bg-center ring-1 ring-border sm:h-28 sm:w-24"
          style={{ backgroundImage: `url(${game.cover})` }}
        />
      </Link>
      <div className="min-w-0 flex-1">
        <Link
          href={`/game/${game.id}`}
          className="line-clamp-1 text-sm font-semibold text-text transition-colors hover:text-cyan sm:text-base"
        >
          {game.title}
        </Link>
        <p className="mt-0.5 text-xs text-text-muted">{game.tags.slice(0, 2).join(" • ")}</p>
        <PriceTag game={game} size="sm" className="mt-3" />
        <p className="sr-only">{formatPrice(discountedPrice(game))}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${game.title}`}
        className="grid h-8 w-8 place-items-center self-start rounded-lg text-text-muted transition-colors hover:bg-bg-secondary hover:text-danger"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
          <path d="M3 6h18M8 6V4h8v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14M10 11v6M14 11v6" />
        </svg>
      </button>
    </li>
  );
}
