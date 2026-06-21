import type { Game } from "@/constants";
import { apiGet, apiPost, apiDelete } from "@/lib/services/authAxios";
import { API_URLS } from "@/lib/services/AllAPIUrls";
import { mapGame } from "./games";
import { cartSchema, checkoutSchema } from "@/lib/services/schemas";

// All cart endpoints are protected (the auth cookie rides along automatically):
//   GET    /user/cart            -> cart with populated games
//   POST   /user/cart {gameId}   -> add, returns updated cart
//   DELETE /user/cart/:gameId    -> remove, returns updated cart
//   POST   /user/checkout        -> { url } Stripe Checkout session

export async function getCart(): Promise<Game[]> {
  const cart = cartSchema.parse(await apiGet(API_URLS.cart.root));
  return cart.games.map(mapGame);
}

export async function addToCart(gameId: string): Promise<Game[]> {
  const cart = cartSchema.parse(await apiPost(API_URLS.cart.root, { gameId }));
  return cart.games.map(mapGame);
}

export async function removeFromCart(gameId: string): Promise<Game[]> {
  const cart = cartSchema.parse(await apiDelete(API_URLS.cart.item(gameId)));
  return cart.games.map(mapGame);
}

// Returns the Stripe Checkout URL to redirect the browser to.
export async function startCheckout(): Promise<string> {
  const data = checkoutSchema.parse(await apiPost(API_URLS.checkout.start));
  return data.url;
}

// Confirm a finished checkout (called from the success page with Stripe's
// session_id). Marks the order paid + clears the cart server-side.
export async function confirmCheckout(sessionId: string): Promise<void> {
  await apiPost(API_URLS.checkout.confirm, { sessionId });
}
