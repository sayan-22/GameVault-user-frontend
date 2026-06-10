import type { Order } from "@/constants/order";
import { apiGet } from "@/utils/api";

// GET /user/orders (protected) — this user's orders, newest first.
// The backend shape already matches the frontend Order type, so this is a
// straight passthrough (gameId/_id arrive as strings over the wire).
export async function getOrders(): Promise<Order[]> {
  const orders = await apiGet<Order[]>("/user/orders");
  return orders ?? [];
}
