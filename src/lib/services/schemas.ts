import { z } from "zod";

// Zod schemas mirroring the backend's serialized shapes (gamevault-backend).
// Services .parse() responses with these, so a malformed payload fails fast and
// loudly here instead of crashing deep in the UI. Unknown keys are stripped.

const reviewSchema = z.object({
  author: z.string(),
  rating: z.number(),
  date: z.string(),
  body: z.string(),
});

// Raw game document as it arrives over the wire (Mongo `_id`, optional fields).
// mapGame() in services/games.ts turns this into the UI `Game` shape.
export const gameSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string().default(""),
  cover: z.string().default(""),
  banner: z.string().default(""),
  trailer: z.string().default(""),
  heroVideo: z.string().optional(),
  price: z.number().default(0),
  discount: z.number().optional(),
  free: z.boolean().optional(),
  tags: z.array(z.string()).default([]),
  description: z.string().default(""),
  developer: z.string().default(""),
  publisher: z.string().default(""),
  releaseDate: z.string().default(""),
  updatedAt: z.string().optional(),
  heroVideoUpdatedAt: z.string().optional(),
  screenshots: z.array(z.string()).default([]),
  trending: z.boolean().optional(),
  rating: z.number().default(0),
  reviewCount: z.number().default(0),
  systemRequirements: z
    .object({
      minimum: z.record(z.string(), z.string()).optional(),
      recommended: z.record(z.string(), z.string()).optional(),
    })
    .optional(),
  reviews: z.array(reviewSchema).optional(),
});
export type ApiGame = z.infer<typeof gameSchema>;

// GET/POST/DELETE /user/cart -> a cart with its populated games.
export const cartSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  games: z.array(gameSchema).default([]),
});

// POST /user/checkout -> the Stripe Checkout URL.
export const checkoutSchema = z.object({ url: z.string() });

const orderItemSchema = z.object({
  gameId: z.string(),
  title: z.string(),
  price: z.number(),
});

// GET /user/orders -> already matches the UI Order shape (no mapping needed).
export const orderSchema = z.object({
  _id: z.string(),
  items: z.array(orderItemSchema).default([]),
  amount: z.number(),
  currency: z.string().default("usd"),
  status: z.enum(["pending", "paid", "failed"]),
  createdAt: z.string(),
});
