// Shape mirrors the backend Order model as it is serialized over the wire by
// GET /api/user/orders (see backend src/models/Order.ts + orderController.ts).
// Money is stored in major units (e.g. 59.99), currency is an ISO code like "usd".

export type OrderStatus = "pending" | "paid" | "failed";

export type OrderItem = {
  gameId: string;
  title: string;
  price: number; // price actually charged for this item (after discount)
};

export type Order = {
  _id: string;
  items: OrderItem[];
  amount: number; // total charged for the order
  currency: string;
  status: OrderStatus;
  createdAt: string; // ISO date string
};

// Sample purchase history (newest first, matching the backend's sort order).
export const ORDERS: Order[] = [
  {
    _id: "ord_8f1c2a",
    status: "paid",
    currency: "usd",
    createdAt: "2026-05-28T14:32:00.000Z",
    items: [
      { gameId: "1", title: "Neon Drift: Hyperion", price: 35.99 },
      { gameId: "9", title: "Helix Protocol", price: 31.49 },
    ],
    amount: 67.48,
  },
  {
    _id: "ord_5b7e90",
    status: "paid",
    currency: "usd",
    createdAt: "2026-05-12T09:05:00.000Z",
    items: [{ gameId: "6", title: "Frostline: Last Watch", price: 59.49 }],
    amount: 59.49,
  },
  {
    _id: "ord_3a0d44",
    status: "pending",
    currency: "usd",
    createdAt: "2026-05-03T19:48:00.000Z",
    items: [{ gameId: "2", title: "Ashen Crown", price: 37.49 }],
    amount: 37.49,
  },
  {
    _id: "ord_19c7f2",
    status: "failed",
    currency: "usd",
    createdAt: "2026-04-21T11:20:00.000Z",
    items: [
      { gameId: "8", title: "Iron Sigil", price: 11.99 },
      { gameId: "5", title: "Paper Engine", price: 9.99 },
    ],
    amount: 21.98,
  },
];
