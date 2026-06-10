"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Game } from "@/constants/game";
import PriceTag from "@/components/cards/PriceTag";
import CommonButton from "@/components/buttons/CommonButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem } from "@/store/cartSlice";

export default function GameSidebar({ game }: { game: Game }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const items = useAppSelector((s) => s.cart.items);
  const pendingId = useAppSelector((s) => s.cart.pendingId);
  const already = items.some((g) => g.id === game.id);
  const pending = pendingId === game.id;

  const onAdd = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (already) {
      router.push("/cart");
      return;
    }
    dispatch(addItem(game.id));
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
            text={already ? "In cart" : pending ? "Adding…" : "Add to cart"}
            onClick={onAdd}
            loading={pending}
            variant={already ? "success" : "theme"}
            className="h-11 w-full text-sm"
            Icon={already ? CheckIcon : CartIcon}
          />
          <Link
            href="/cart"
            className="block rounded-lg border border-border bg-bg-secondary/60 px-4 py-2.5 text-center text-sm font-medium text-text-secondary transition-colors hover:border-cyan-border hover:text-text"
          >
            View cart
          </Link>
        </div>
      </div>
    </aside>
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
