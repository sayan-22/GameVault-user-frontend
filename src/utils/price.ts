import type { Game } from "@/constants";

export function discountedPrice(game: Pick<Game, "price" | "discount" | "free">): number {
  if (game.free) return 0;
  if (!game.discount) return game.price;
  return Math.round(game.price * (1 - game.discount / 100) * 100) / 100;
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}
