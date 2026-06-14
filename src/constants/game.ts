// The storefront Game shape. Real data comes from the backend via
// src/services/games.ts (mapGame). No mock/hardcoded games live here.
export type Game = {
  id: string;
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
  updatedAt?: string;
  heroVideoUpdatedAt?: string;
  screenshots: string[];
  trending?: boolean;
  rating: number;
  reviewCount: number;
  systemRequirements: {
    minimum: Record<string, string>;
    recommended: Record<string, string>;
  };
  reviews: Array<{ author: string; rating: number; date: string; body: string }>;
};
