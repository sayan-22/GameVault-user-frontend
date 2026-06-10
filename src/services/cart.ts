import type { Game } from "@/constants/game";
import { apiGet, apiPost, apiDelete } from "@/utils/api";
import { mapGame, type ApiGame } from "./games";

// All cart endpoints are protected (the axios client attaches the access token):
//   GET    /user/cart            -> cart with populated games
//   POST   /user/cart {gameId}   -> add, returns updated cart
//   DELETE /user/cart/:gameId    -> remove, returns updated cart
//   POST   /user/checkout        -> { url } Stripe Checkout session
type ApiCart = { _id: string; userId: string; games: ApiGame[] };

export async function getCart(): Promise<Game[]> {
  const cart = await apiGet<ApiCart>("/user/cart");
  return (cart?.games ?? []).map(mapGame);
}

export async function addToCart(gameId: string): Promise<Game[]> {
  const cart = await apiPost<ApiCart>("/user/cart", { gameId });
  return (cart?.games ?? []).map(mapGame);
}

export async function removeFromCart(gameId: string): Promise<Game[]> {
  const cart = await apiDelete<ApiCart>(`/user/cart/${gameId}`);
  return (cart?.games ?? []).map(mapGame);
}

// Returns the Stripe Checkout URL to redirect the browser to.
export async function startCheckout(): Promise<string> {
  const data = await apiPost<{ url: string }>("/user/checkout");
  if (!data?.url) throw new Error("Could not start checkout");
  return data.url;
}

// Confirm a finished checkout (called from the success page with Stripe's
// session_id). Marks the order paid + clears the cart server-side.
export async function confirmCheckout(sessionId: string): Promise<void> {
  await apiPost("/user/checkout/confirm", { sessionId });
}
