import Link from "next/link";
import GameCard from "@/components/cards/GameCard";
import Reveal from "@/components/common/Reveal";
import { GAMES, CATEGORIES, type Game } from "@/constants/game";
import { byPriceAsc, byPriceDesc, byReleaseDesc, byReviewsDesc } from "@/utils/sort";
import { cn } from "@/utils/cn";

export type BrowseFilters = {
  cat?: string;
  filter?: string;
  sort?: string;
};

function applyFilters({ cat, filter, sort }: BrowseFilters): Game[] {
  let list = [...GAMES];
  if (cat) list = list.filter((g) => g.tags.map((t) => t.toLowerCase()).includes(cat.toLowerCase()));
  if (filter === "free") list = list.filter((g) => g.free);
  if (filter === "discount") list = list.filter((g) => (g.discount ?? 0) > 0);
  if (sort === "new") list.sort(byReleaseDesc);
  if (sort === "trending") list.sort(byReviewsDesc);
  if (sort === "price-asc") list.sort(byPriceAsc);
  if (sort === "price-desc") list.sort(byPriceDesc);
  return list;
}

export default function BrowseView({ filters }: { filters: BrowseFilters }) {
  const { cat, filter, sort } = filters;
  const list = applyFilters(filters);
  const activeChip = cat ?? (filter === "free" ? "Free" : filter === "discount" ? "Deals" : sort ?? "All");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 animate-fade-up">
        <p className="text-xs uppercase tracking-widest text-cyan">Catalog</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">Browse Games</h1>
        <p className="mt-2 max-w-xl text-sm text-text-secondary">
          Filter by genre, discounts, or what&apos;s new. The full library, no fluff.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Chip href="/browse" label="All" active={!cat && !filter && !sort} />
        <Chip href="/browse?filter=free" label="Free" active={filter === "free"} />
        <Chip href="/browse?filter=discount" label="On Sale" active={filter === "discount"} />
        <Chip href="/browse?sort=new" label="New" active={sort === "new"} />
        <Chip href="/browse?sort=trending" label="Trending" active={sort === "trending"} />
        <span className="mx-2 h-5 w-px bg-border" />
        {CATEGORIES.map((c) => (
          <Chip
            key={c.slug}
            href={`/browse?cat=${c.name}`}
            label={c.name}
            active={cat?.toLowerCase() === c.name.toLowerCase()}
          />
        ))}
      </div>

      {list.length === 0 ? (
        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <p className="text-sm text-text-secondary">
              No games match <span className="text-text">{activeChip}</span>.
            </p>
            <Link href="/browse" className="mt-3 inline-block text-sm font-medium text-cyan">
              Clear filters
            </Link>
          </div>
        </Reveal>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {list.map((g, i) => (
            <Reveal key={g.id} delay={Math.min(i * 40, 320)}>
              <GameCard game={g} variant="vertical" priority={i < 5} className="w-full" />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
        active
          ? "border-cyan-border bg-cyan/15 text-cyan shadow-[0_0_18px_-6px_rgba(0,217,255,0.55)]"
          : "border-border bg-card/60 text-text-secondary hover:border-cyan-border hover:text-text",
      )}
    >
      {label}
    </Link>
  );
}
