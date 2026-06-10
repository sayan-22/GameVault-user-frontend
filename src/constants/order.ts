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

