import type { Game } from "@/constants/game";

export const byReviewsDesc = (a: Game, b: Game) => b.reviewCount - a.reviewCount;
export const byReleaseDesc = (a: Game, b: Game) => b.releaseDate.localeCompare(a.releaseDate);
export const byDiscountDesc = (a: Game, b: Game) => (b.discount ?? 0) - (a.discount ?? 0);
export const byPriceAsc = (a: Game, b: Game) => a.price - b.price;
export const byPriceDesc = (a: Game, b: Game) => b.price - a.price;
