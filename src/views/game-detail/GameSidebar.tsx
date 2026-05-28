"use client";

import Link from "next/link";
import { useState } from "react";
import type { Game } from "@/constants/game";
import PriceTag from "@/components/cards/PriceTag";
import CommonButton from "@/components/buttons/CommonButton";

export default function GameSidebar({ game }: { game: Game }) {
  const [added, setAdded] = useState(false);
  const onAdd = () => {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <aside className="animate-fade-up lg:sticky lg:top-24 lg:self-start">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div
          className="aspect-3/4 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${game.cover})` }}
        />
        <div className="space-y-4 p-5">
          <PriceTag game={game} size="lg" />
          <CommonButton
            text={added ? "Added to cart" : "Add to cart"}
            onClick={onAdd}
            variant={added ? "success" : "theme"}
            className="h-11 w-full text-sm"
            Icon={added ? CheckIcon : CartIcon}
          />
          <Link
            href="/cart"
            className="block rounded-lg border border-border bg-bg-secondary/60 px-4 py-2.5 text-center text-sm font-medium text-text-secondary transition-colors hover:border-cyan-border hover:text-text"
          >
            View cart
          </Link>
          <div className="flex items-center gap-2 border-t border-border-soft pt-4 text-xs text-text-muted">
            <StarIcon /> {game.rating.toFixed(1)} · {game.reviewCount.toLocaleString()} reviews
          </div>
        </div>
      </div>
    </aside>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
    </svg>
  );
}
function CartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 4h2l2.6 11.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
    </svg>
  );
}
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}
