import Hero from "@/components/sections/Hero";
import GameRow from "@/components/sections/GameRow";
import Reveal from "@/components/common/Reveal";
import CategoryCard from "@/components/cards/CategoryCard";
import GameCard from "@/components/cards/GameCard";
import DealCard from "@/components/cards/DealCard";
import { GAMES, CATEGORIES } from "@/constants/game";
import { byDiscountDesc, byReleaseDesc, byReviewsDesc } from "@/utils/sort";
import { cn } from "@/utils/cn";

const CATEGORY_LAYOUT = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
];

export default function HomeView() {
  const hero = GAMES[0];
  const trending = [...GAMES].sort(byReviewsDesc).slice(0, 8);
  const free = GAMES.filter((g) => g.free);
  const newReleases = [...GAMES].sort(byReleaseDesc).slice(0, 8);
  const discounted = GAMES.filter((g) => (g.discount ?? 0) > 0).sort(byDiscountDesc);
  const [deal, ...sideDeals] = discounted;

  return (
    <div className="-mt-16 flex flex-col gap-14 pb-20 sm:gap-16">
      <Hero game={hero} />
      <Reveal>
        <GameRow title="Trending Now" games={trending} viewAllHref="/browse?sort=trending" />
      </Reveal>
      <Reveal>
        <GameRow title="Free to Play" games={free} viewAllHref="/browse?filter=free" />
      </Reveal>
      <Reveal>
        <GameRow title="New Releases" games={newReleases} viewAllHref="/browse?sort=new" />
      </Reveal>

      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-end justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">Categories</h2>
              <p className="text-xs text-text-muted">Explore by genre</p>
            </div>
            <div className="grid auto-rows-[120px] grid-cols-2 gap-3 sm:auto-rows-[140px] sm:grid-cols-4 lg:auto-rows-[160px]">
              {CATEGORIES.map((c, i) => (
                <CategoryCard
                  key={c.slug}
                  name={c.name}
                  image={c.image}
                  href={`/browse?cat=${c.slug}`}
                  className={CATEGORY_LAYOUT[i % CATEGORY_LAYOUT.length]}
                />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {deal && (
        <Reveal>
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-4 flex items-end justify-between gap-4">
                <h2 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">Featured Discounts</h2>
                <p className="text-xs text-text-muted">Limited-time savings</p>
              </div>
              <div className="grid auto-rows-[180px] grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-2">
                <DealCard game={deal} className={cn("col-span-1 md:col-span-2 md:row-span-2")} />
                {sideDeals.slice(0, 4).map((g) => (
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
