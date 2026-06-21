import Link from "next/link";
import type { Game } from "@/constants";
import { cn } from "@/utils/cn";
import CardBadge from "./CardBadge";
import PriceTag from "./PriceTag";

type Props = {
  game: Game;
  tagline?: string;
  className?: string;
};

export default function DealCard({ game, tagline = "Deal of the day", className }: Props) {
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
          <span className="text-[11px] uppercase tracking-wider text-text-muted">{tagline}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{game.title}</h3>
        <p className="mt-2 max-w-md text-sm text-text-secondary line-clamp-2">{game.description}</p>
        <PriceTag game={game} size="lg" className="mt-4" />
      </div>
    </Link>
  );
}
