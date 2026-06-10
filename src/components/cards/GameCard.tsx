"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Game } from "@/constants/game";
import { cn } from "@/utils/cn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem } from "@/store/cartSlice";
import CardBadge from "./CardBadge";
import PriceTag from "./PriceTag";

type Variant = "vertical" | "compact" | "feature";

type Props = {
  game: Game;
  variant?: Variant;
  priority?: boolean;
  className?: string;
};

export default function GameCard({ game, variant = "vertical", priority, className }: Props) {
  if (variant === "compact") return <CompactCard game={game} className={className} />;
  if (variant === "feature") return <FeatureCard game={game} className={className} />;
  return <VerticalCard game={game} priority={priority} className={className} />;
}

function VerticalCard({ game, priority, className }: Pick<Props, "game" | "priority" | "className">) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const items = useAppSelector((s) => s.cart.items);
  const pendingId = useAppSelector((s) => s.cart.pendingId);
  const [hover, setHover] = useState(false);
  const [trailerReady, setTrailerReady] = useState(false);
  const added = items.some((g) => g.id === game.id);
  const pending = pendingId === game.id;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push("/login");
      return;
    }
    if (added || pending) return;
    dispatch(addItem(game.id));
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hover) {
      v.muted = true;
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
      setTrailerReady(false);
    }
  }, [hover]);

  return (
    <Link
      href={`/game/${game.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "group relative block h-full overflow-hidden rounded-xl",
        "border border-border bg-card shadow-card transition-all duration-300",
        "hover:scale-[1.04] hover:border-cyan-border hover:shadow-glow-cyan",
        className,
      )}
    >
      <div className="relative aspect-3/4 overflow-hidden">
        <img
          src={game.cover}
          alt={game.title}
          loading={priority ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <video
          ref={videoRef}
          src={game.trailer}
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setTrailerReady(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            hover && trailerReady ? "opacity-100" : "opacity-0",
          )}
        />
        <div className="absolute inset-0 bg-linear-to-t from-card via-card/30 to-transparent opacity-90" />
        <CardBadge free={game.free} discount={game.discount} className="absolute left-2 top-2" size="md" />
        <button
          type="button"
          aria-label={added ? "In cart" : "Add to cart"}
          onClick={onAdd}
          className={cn(
            "absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-lg border backdrop-blur-md transition-all duration-300",
            hover || added ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
            added
              ? "border-success bg-success/90 text-bg"
              : "border-cyan-border bg-bg/70 text-cyan hover:bg-cyan hover:text-bg",
          )}
        >
          {added ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12l5 5L20 7" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 5v14M5 12h14" />
            </svg>
          )}
        </button>
      </div>
      <div className="relative space-y-2 p-3">
        <p className="truncate text-[11px] uppercase tracking-wider text-text-muted">{game.tags[0]}</p>
        <h3 className="truncate text-sm font-semibold text-text">{game.title}</h3>
        <PriceTag game={game} size="sm" />
      </div>
    </Link>
  );
}

function CompactCard({ game, className }: Pick<Props, "game" | "className">) {
  return (
    <Link
      href={`/game/${game.id}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300",
        "hover:border-cyan-border hover:shadow-glow-cyan",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${game.banner})` }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/40 to-transparent" />
      <div className="relative flex h-full min-h-45 flex-col justify-end p-4">
        <CardBadge free={game.free} discount={game.discount} className="mb-1 self-start" />
        <h4 className="truncate text-sm font-semibold text-text">{game.title}</h4>
        <PriceTag game={game} size="sm" className="mt-1" />
      </div>
    </Link>
  );
}

function FeatureCard({ game, className }: Pick<Props, "game" | "className">) {
  return (
    <Link
      href={`/game/${game.id}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300",
        "hover:border-cyan-border hover:shadow-glow-cyan",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${game.banner})` }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-bg/70 via-transparent to-transparent" />
      <div className="relative flex h-full min-h-75 flex-col justify-end p-5 sm:p-7">
        <div className="mb-2 flex items-center gap-2">
          <CardBadge free={game.free} discount={game.discount} size="md" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{game.title}</h3>
        <p className="mt-2 max-w-md text-sm text-text-secondary line-clamp-2">{game.description}</p>
        <PriceTag game={game} size="md" className="mt-4" />
      </div>
    </Link>
  );
}
