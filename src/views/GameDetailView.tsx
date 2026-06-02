import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { GAMES } from "@/constants/game";
import GameTrailer from "@/components/sections/GameTrailer";
import ScreenshotGallery from "@/components/sections/ScreenshotGallery";
import Reveal from "@/components/common/Reveal";
import GameSidebar from "./game-detail/GameSidebar";
import RequirementsCard from "./game-detail/RequirementsCard";

export default function GameDetailView({ id }: { id: string }) {
  const game = GAMES.find((g) => g.id === id);
  if (!game) notFound();

  return (
    <div className="-mt-16 flex flex-col gap-12 pb-20">
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

      <Reveal>
        <Section title="Screenshots">
          <ScreenshotGallery shots={game.screenshots} />
        </Section>
      </Reveal>

      <Reveal>
        <Section title="System Requirements">
          <div className="grid gap-4 sm:grid-cols-2">
            <RequirementsCard label="Minimum" data={game.systemRequirements.minimum} />
            <RequirementsCard label="Recommended" data={game.systemRequirements.recommended} accent />
          </div>
        </Section>
      </Reveal>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-text sm:text-2xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}
