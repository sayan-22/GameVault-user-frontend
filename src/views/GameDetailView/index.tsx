"use client";

import type { ReactNode } from "react";
import type { Game } from "@/constants";
import { GameTrailer, ScreenshotGallery } from "@/components/sections";
import { Reveal } from "@/components/common";
import GameSidebar from "./GameSidebar";
import RequirementsCard from "./RequirementsCard";
import { useAppSelector } from "@/lib/store/hooks";
import { useGamePolling } from "@/lib/hooks/useGamesPolling";

export default function GameDetailView({ initialGame }: { initialGame: Game }) {
  useGamePolling(initialGame.id);
  const current = useAppSelector((s) => s.games.current);
  // Use the live store value only when it's this page's game; else the SSR data.
  const game = current && current.id === initialGame.id ? current : initialGame;

  return (
    <div className="flex flex-col gap-12 pb-20">
      <section className="relative isolate w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl"
          style={{ backgroundImage: `url(${game.banner})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-linear-to-b from-bg/60 via-bg/80 to-bg" />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pt-28 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8 lg:pt-32">
          <div className="animate-fade-up">
            <GameTrailer src={game.trailer} poster={game.banner} />
            <div className="mt-8">
              <div className="mb-2 flex flex-wrap gap-2">
                {game.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] text-text-secondary"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
                {game.title}
              </h1>
              <p className="mt-3 text-sm text-text-secondary">
                {game.developer} • {game.publisher} • Released{" "}
                {new Date(game.releaseDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <GameSidebar game={game} />
        </div>
      </section>

      <Reveal>
        <Section title="About">
          <p className="max-w-3xl text-base leading-relaxed text-text-secondary">{game.description}</p>
        </Section>
      </Reveal>

      {game.screenshots.length > 0 && (
        <Reveal>
          <Section title="Screenshots">
            <ScreenshotGallery shots={game.screenshots} />
          </Section>
        </Reveal>
      )}

      {(Object.keys(game.systemRequirements.minimum).length > 0 ||
        Object.keys(game.systemRequirements.recommended).length > 0) && (
        <Reveal>
          <Section title="System Requirements">
            <div className="grid gap-4 sm:grid-cols-2">
              <RequirementsCard label="Minimum" data={game.systemRequirements.minimum} />
              <RequirementsCard label="Recommended" data={game.systemRequirements.recommended} accent />
            </div>
          </Section>
        </Reveal>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-text sm:text-2xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}
