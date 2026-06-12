"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Game } from "@/constants/game";
import PriceTag from "@/components/cards/PriceTag";
import CommonButton from "@/components/buttons/CommonButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem } from "@/store/cartSlice";
import { fetchOrders } from "@/store/ordersSlice";

export default function GameSidebar({ game }: { game: Game }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const items = useAppSelector((s) => s.cart.items);
  const pendingId = useAppSelector((s) => s.cart.pendingId);
  const orders = useAppSelector((s) => s.orders.items);

  // Load this account's orders so we know whether the game is already owned.
  const userId = user?.id;
  useEffect(() => {
    if (userId) dispatch(fetchOrders());
  }, [userId, dispatch]);

  // Owned ONLY when the game is in a PAID order on this account.
  // Pending / failed orders do NOT count as owned.
  const owned = orders.some(
    (o) => o.status === "paid" && o.items.some((i) => i.gameId === game.id)
  );

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
          {!owned && <PriceTag game={game} size="lg" />}
          {owned ? (
            // Already purchased (paid) on this account — no re-buying, just play.
            <CommonButton
              text="Download and Play"
              variant="theme"
              className="h-11 w-full text-sm"
              Icon={DownloadIcon}
            />
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v12" />
      <path d="m7 12 5 5 5-5" />
      <path d="M5 21h14" />
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
