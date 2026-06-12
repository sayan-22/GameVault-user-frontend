import Link from "next/link";
import GameCard from "@/components/cards/GameCard";
import BouncyText from "@/components/common/BouncyText";
import type { Game } from "@/constants/game";
import { cn } from "@/utils/cn";

type Props = {
  title: string;
  games: Game[];
  viewAllHref?: string;
  sparkle?: boolean; // sparkling gradient text on the title
  bouncy?: boolean; // zero-gravity bouncy words on the title
};

// One row of up to 4 cards in a grid (no horizontal scroller). The grid lets
// cards grow on hover without being clipped, and keeps a consistent 4-up layout.
export default function GameRow({ title, games, viewAllHref, sparkle, bouncy }: Props) {
  const shown = games.slice(0, 4);

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2
            className={cn(
              "text-xl font-semibold tracking-tight sm:text-2xl",
              sparkle ? "sparkle-text" : "text-text",
            )}
          >
            {bouncy ? <BouncyText text={title} /> : title}
          </h2>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-xs font-medium text-text-secondary transition-colors hover:text-cyan"
            >
              View all →
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((g, i) => (
            <GameCard key={g.id} game={g} variant="vertical" priority={i < 4} />
          ))}
        </div>
      </div>
    </section>
  );
}
