import { memo } from "react";
import { cn } from "@/utils/cn";
import { discountedPrice, formatPrice } from "@/utils/price";
import type { Game } from "@/constants/game";

type Props = {
  game: Pick<Game, "price" | "discount" | "free">;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE = {
  sm: { final: "text-sm", strike: "text-[11px]", badge: "text-[10px] px-1.5 py-0.5", free: "text-sm" },
  md: { final: "text-base", strike: "text-xs", badge: "text-[11px] px-2 py-1", free: "text-base" },
  lg: { final: "text-2xl", strike: "text-sm", badge: "text-xs px-2 py-1", free: "text-2xl" },
};

function PriceTag({ game, size = "sm", className }: Props) {
  const s = SIZE[size];
  const final = discountedPrice(game);

  if (game.free) {
    return (
      <div className={cn("flex items-baseline gap-2", className)}>
        <span className={cn("font-bold text-cyan", s.free)}>Free</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      {game.discount ? (
        <>
          <span
            className={cn(
              "rounded bg-success/15 font-bold text-success-light",
              s.badge,
            )}
          >
            -{game.discount}%
          </span>
          <span className={cn("text-text-muted line-through", s.strike)}>
            {formatPrice(game.price)}
          </span>
          <span className={cn("font-bold text-text", s.final)}>{formatPrice(final)}</span>
        </>
      ) : (
        <span className={cn("font-bold text-text", s.final)}>{formatPrice(game.price)}</span>
      )}
    </div>
  );
}

export default memo(PriceTag);
