"use client";

import Link from "next/link";
import Hero from "@/components/sections/Hero";
import GameRow from "@/components/sections/GameRow";
import Reveal from "@/components/common/Reveal";
import CategoryCard from "@/components/cards/CategoryCard";
import BouncyText from "@/components/common/BouncyText";
import GameCard from "@/components/cards/GameCard";
import DealCard from "@/components/cards/DealCard";
import { type Game } from "@/constants/game";
import { deriveCategories } from "@/services/games";
import { byDiscountDesc, byReleaseDesc } from "@/utils/sort";
import { cn } from "@/utils/cn";
import { useAppSelector } from "@/store/hooks";
import { useGamesPolling } from "@/hooks/useGamesPolling";

export default function HomeView({ initialGames }: { initialGames: Game[] }) {
  useGamesPolling(initialGames);
  const loaded = useAppSelector((s) => s.games.loaded);
  const storeGames = useAppSelector((s) => s.games.items);
  // SSR + first hydration use the server data; once seeded, the live store drives.
  const games = loaded ? storeGames : initialGames;

  // Feature the game with an uploaded Hero Auto-Play video; fall back to the first game.
  const hero = games.find((g) => g.heroVideo) ?? games[0];
  // Trending is admin-curated: a game shows here only when its `trending` flag is on.
  const trending = games.filter((g) => g.trending).slice(0, 8);
  const free = games.filter((g) => g.free);
  const newReleases = [...games].sort(byReleaseDesc).slice(0, 8);
  const discounted = games.filter((g) => (g.discount ?? 0) > 0).sort(byDiscountDesc);
  const [deal, ...sideDeals] = discounted;
  // Top 4 genres only, so the section stays one fixed row as more genres appear.
  const categories = deriveCategories(games).slice(0, 4);

  if (!hero) return <EmptyStore />;

  return (
    <div className="flex flex-col gap-14 pb-20 sm:gap-16">
      <Hero game={hero} />
      {trending.length > 0 && (
        <Reveal>
          <GameRow title="Trending Now" games={trending} viewAllHref="/browse?sort=trending" sparkle />
        </Reveal>
      )}
      {free.length > 0 && (
        <Reveal>
          <GameRow title="Free to Play" games={free} viewAllHref="/browse?filter=free" bouncy />
        </Reveal>
      )}
      <Reveal>
        <GameRow title="New Releases" games={newReleases} viewAllHref="/browse?sort=new" bouncy />
      </Reveal>

      {categories.length > 0 && (
        <Reveal>
          <section>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-4 flex items-end justify-between gap-4">
                <h2 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
                  <BouncyText text="Categories" />
                </h2>
                <Link
                  href="/browse"
                  className="text-xs font-medium text-text-muted transition-colors hover:text-cyan"
                >
                  Explore by genre →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {categories.map((c) => (
                  <CategoryCard
                    key={c.slug}
                    name={c.name}
                    image={c.image}
                    count={c.count}
                    href={`/browse?cat=${c.name}`}
                  />
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {deal && (
        <Reveal>
          <section>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-4 flex items-end justify-between gap-4">
                <h2 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
                  <BouncyText text="Featured Discounts" />
                </h2>
              </div>
              <div className="grid auto-rows-[180px] grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-2">
                <DealCard game={deal} className={cn("col-span-1 md:col-span-2 md:row-span-2")} />
                {sideDeals.slice(0, 2).map((g) => (
                  <GameCard key={g.id} game={g} variant="compact" />
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}
    </div>
  );
}

function EmptyStore() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold tracking-tight text-text">
        No games yet
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        The catalog is empty right now. Once games are published they&apos;ll
        appear here.
      </p>
    </div>
  );
}
