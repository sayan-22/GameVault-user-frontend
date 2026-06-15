"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Game } from "@/constants/game";
import { discountedPrice, formatPrice } from "@/utils/price";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeItem, checkout } from "@/store/cartSlice";
import PriceTag from "@/components/cards/PriceTag";
import CommonButton from "@/components/buttons/CommonButton";
import CartSummary from "./cart/CartSummary";
import EmptyCart from "./cart/EmptyCart";

export default function CartView() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const authLoading = useAppSelector((s) => s.auth.loading);
  const items = useAppSelector((s) => s.cart.items);
  const loading = useAppSelector((s) => s.cart.loading);
  const pendingId = useAppSelector((s) => s.cart.pendingId);
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = useMemo(
    () => items.reduce((s, g) => s + discountedPrice(g), 0),
    [items]
  );

  // Auth must resolve before we can tell signed-out from empty-cart.
  if (!authLoading && !user) return <SignInPrompt />;
  if ((authLoading || loading) && items.length === 0) return <CartLoading />;
  if (items.length === 0) return <EmptyCart />;

  const onCheckout = async () => {
    setError(null);
    setCheckingOut(true);
    const res = await dispatch(checkout());
    if (checkout.fulfilled.match(res)) {
      window.location.href = res.payload; // hand off to Stripe
    } else {
      setError(res.payload ?? "Checkout failed");
      setCheckingOut(false);
    }
  };

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
            <CartItem
              key={g.id}
              game={g}
              removing={pendingId === g.id}
              onRemove={() => dispatch(removeItem(g.id))}
            />
          ))}
        </ul>
        <CartSummary
          subtotal={subtotal}
          total={subtotal}
          count={items.length}
          checkingOut={checkingOut}
          error={error}
          onCheckout={onCheckout}
        />
      </div>
    </div>
  );
}

function CartItem({
  game,
  removing,
  onRemove,
}: {
  game: Game;
  removing: boolean;
  onRemove: () => void;
}) {
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
        disabled={removing}
        aria-label={`Remove ${game.title}`}
        className="grid h-8 w-8 place-items-center self-start rounded-lg text-text-muted transition-colors hover:bg-bg-secondary hover:text-danger disabled:opacity-50"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
          <path d="M3 6h18M8 6V4h8v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14M10 11v6M14 11v6" />
        </svg>
      </button>
    </li>
  );
}

function SignInPrompt() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <h1 className="text-2xl font-bold text-text">Sign in to view your cart</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Your cart is tied to your account. Sign in to add games and check out.
      </p>
      <CommonButton
        href="/login"
        text="Sign in"
        variant="theme"
        className="mx-auto mt-6 w-fit px-5 py-2.5 text-sm"
      />
    </div>
  );
}

function CartLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-10 w-48 animate-pulse rounded-lg bg-card" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl border border-border bg-card" />
          ))}
        </div>
        <div className="h-72 animate-pulse rounded-2xl border border-border bg-card" />
      </div>
    </div>
  );
}
