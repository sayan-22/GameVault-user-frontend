import type { Game } from "@/constants/game";
import { apiGet } from "@/utils/api";

// Reads the public storefront endpoints (no auth):
//   GET /user/games            -> published games
//   GET /user/games/:idOrSlug  -> one published game
// and maps the backend document (gamevault-backend src/models/Game.ts) to the
// frontend Game shape the UI already expects.

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

type ApiEnvelope<T> = { success: boolean; message: string; data?: T };

// The backend game document, as serialized over the wire.
export type ApiGame = {
  _id: string;
  title: string;
  slug: string;
  cover: string;
  banner: string;
  trailer: string;
  heroVideo?: string;
  price: number;
  discount?: number;
  free?: boolean;
  tags: string[];
  description: string;
  developer: string;
  publisher: string;
  releaseDate: string;
  screenshots: string[];
  trending?: boolean;
  rating: number;
  reviewCount: number;
  systemRequirements?: {
    minimum?: Record<string, string>;
    recommended?: Record<string, string>;
  };
  reviews?: Array<{ author: string; rating: number; date: string; body: string }>;
};

// Placeholder art so cards never look broken when an admin saves a game
// without uploading a cover/banner yet.
const placeholder = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export function mapGame(g: ApiGame): Game {
  const seed = g.slug || g._id;
  return {
    id: g._id,
    title: g.title,
    slug: g.slug,
    cover: g.cover || placeholder(`${seed}-cover`, 600, 800),
    banner: g.banner || placeholder(`${seed}-banner`, 1600, 900),
    trailer: g.trailer || "",
    heroVideo: g.heroVideo || undefined,
    price: g.price,
    discount: g.discount,
    free: g.free,
    trending: g.trending ?? false,
    tags: g.tags ?? [],
    description: g.description,
    developer: g.developer,
    publisher: g.publisher,
    releaseDate: g.releaseDate,
    screenshots: g.screenshots ?? [],
    rating: g.rating,
    reviewCount: g.reviewCount,
    systemRequirements: {
      minimum: g.systemRequirements?.minimum ?? {},
      recommended: g.systemRequirements?.recommended ?? {},
    },
    reviews: g.reviews ?? [],
  };
}

// `no-store` so a newly admin-created game shows on the storefront immediately,
// instead of being served from a stale build/cache.
export async function getGames(): Promise<Game[]> {
  try {
    const res = await fetch(`${API_URL}/user/games`, { cache: "no-store" });
    if (!res.ok) return [];
    const body = (await res.json()) as ApiEnvelope<ApiGame[]>;
    return (body.data ?? []).map(mapGame);
  } catch {
    return [];
  }
}

// Server-side title search for the navbar typeahead — hits GET /user/games?search=
// so it searches the whole published catalog (via axios), not just loaded games.
export async function searchGames(query: string): Promise<Game[]> {
  const data = await apiGet<ApiGame[]>("/user/games", {
    params: { search: query },
  });
  return (data ?? []).map(mapGame);
}

export type Category = {
  name: string;
  slug: string;
  image: string;
  count: number;
};

// Build genre tiles from live games: group by tag, order by how many games each
// has, and give each tile a distinct game image where possible (so the grid
// doesn't repeat the same banner). Replaces the old hardcoded CATEGORIES.
export function deriveCategories(games: Game[], max = 8): Category[] {
  const byTag = new Map<string, { name: string; games: Game[] }>();
  for (const game of games) {
    for (const tag of game.tags) {
      const slug = tag.toLowerCase();
      const entry = byTag.get(slug) ?? { name: tag, games: [] };
      entry.games.push(game);
      byTag.set(slug, entry);
    }
  }

  const sorted = [...byTag.values()].sort(
    (a, b) => b.games.length - a.games.length
  );

  const usedImages = new Set<string>();
  const categories: Category[] = [];
  for (const { name, games: tagGames } of sorted) {
    if (categories.length >= max) break;
    const pick =
      tagGames.find((g) => g.banner && !usedImages.has(g.banner)) ?? tagGames[0];
    if (pick.banner) usedImages.add(pick.banner);
    categories.push({
      name,
      slug: name.toLowerCase(),
      image: pick.banner,
      count: tagGames.length,
    });
  }
  return categories;
}

export async function getGame(idOrSlug: string): Promise<Game | null> {
  try {
    const res = await fetch(
      `${API_URL}/user/games/${encodeURIComponent(idOrSlug)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const body = (await res.json()) as ApiEnvelope<ApiGame>;
    return body.data ? mapGame(body.data) : null;
  } catch {
    return null;
  }
}
