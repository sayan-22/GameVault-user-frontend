import { z } from "zod";
import type { Order } from "@/constants";
import { apiGet } from "@/lib/services/authAxios";
import { API_URLS } from "@/lib/services/AllAPIUrls";
import { orderSchema } from "@/lib/services/schemas";

// GET /user/orders (protected) — this user's orders, newest first.
// The backend shape already matches the frontend Order type, so we just validate
// it (gameId/_id arrive as strings over the wire).
export async function getOrders(): Promise<Order[]> {
  return z.array(orderSchema).parse((await apiGet(API_URLS.orders.list)) ?? []);
}
