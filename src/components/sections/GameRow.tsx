"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import GameCard from "@/components/cards/GameCard";
import type { Game } from "@/constants/game";

type Props = {
  title: string;
  games: Game[];
  viewAllHref?: string;
};

export default function GameRow({ title, games, viewAllHref }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    update();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">{title}</h2>
          <div className="flex items-center gap-2">
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="hidden text-xs font-medium text-text-secondary transition-colors hover:text-cyan sm:inline-flex"
              >
                View all →
              </Link>
            )}
            <div className="hidden items-center gap-1 md:flex">
              <ArrowButton dir="left" onClick={() => scrollBy(-1)} disabled={!canPrev} />
              <ArrowButton dir="right" onClick={() => scrollBy(1)} disabled={!canNext} />
            </div>
          </div>
        </div>
        <div
          ref={scrollerRef}
          className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          {games.map((g, i) => (
            <div key={g.id} className="w-55 flex-none snap-start sm:w-60">
              <GameCard game={g} variant="vertical" priority={i < 3} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowButton({ dir, onClick, disabled }: { dir: "left" | "right"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      aria-label={`Scroll ${dir}`}
      disabled={disabled}
      onClick={onClick}
      className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-card/60 text-text-secondary transition-all hover:border-cyan-border hover:text-cyan disabled:opacity-40"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}
