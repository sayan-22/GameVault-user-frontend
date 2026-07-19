"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Game } from "@/constants";
import { PriceTag } from "@/components/cards";
import { CommonButton, OutlineButton } from "@/components/buttons";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addItem } from "@/lib/store/cartSlice";
import { fetchOrders } from "@/lib/store/ordersSlice";

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
    (o) => o.status === "paid" && o.items.some((i) => i.gameId === game.id),
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

  // Owned games open the admin-provided third-party link in a new tab so the
  // user can download and play the game.
  const onPlay = () => {
    if (game.downloadUrl) {
      window.open(game.downloadUrl, "_blank", "noopener,noreferrer");
    }
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
              text={
                game.downloadUrl
                  ? "Download and Play"
                  : "Download link coming soon"
              }
              onClick={onPlay}
              disabled={!game.downloadUrl}
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
              <OutlineButton
                href="/cart"
                text="View cart"
                className="w-full rounded-lg bg-bg-secondary/60 px-4 py-2.5 text-sm"
              />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v12" />
      <path d="m7 12 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}
function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 4h2l2.6 11.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
    </svg>
  );
}
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}
