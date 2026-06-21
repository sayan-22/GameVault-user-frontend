"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { Order, OrderStatus } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchOrders } from "@/lib/store/ordersSlice";
import { CommonButton } from "@/components/buttons";

const STATUS_STYLES: Record<OrderStatus, string> = {
  paid: "border-success/40 bg-success/10 text-success",
  pending: "border-cyan-border bg-cyan/10 text-cyan",
  failed: "border-danger/40 bg-danger/10 text-danger",
};

function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

export default function OrderHistoryView() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const authLoading = useAppSelector((s) => s.auth.loading);
  const orders = useAppSelector((s) => s.orders.items);
  const loading = useAppSelector((s) => s.orders.loading);
  const error = useAppSelector((s) => s.orders.error);

  const userId = user?.id;
  useEffect(() => {
    if (authLoading || !userId) return;
    dispatch(fetchOrders());
  }, [authLoading, userId, dispatch]);

  if (!authLoading && !user) return <SignInPrompt />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 animate-fade-up">
        <p className="text-xs uppercase tracking-widest text-cyan">Account</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Order history
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          {loading
            ? "Loading…"
            : `${orders.length} ${orders.length === 1 ? "order" : "orders"}`}
        </p>
      </header>

      {error ? (
        <p className="rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      ) : loading ? (
        <OrdersLoading />
      ) : orders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <ul className="flex flex-col gap-4">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </ul>
      )}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <li className="rounded-2xl border border-border bg-card p-5 transition-all hover:border-cyan-border">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border-soft pb-4">
        <div>
          <p className="font-mono text-xs text-text-muted">
            #{order._id}
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {formatDate(order.createdAt)}
          </p>
        </div>
        <span
          className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${STATUS_STYLES[order.status]}`}
        >
          {order.status}
        </span>
      </div>

      <ul className="divide-y divide-border-soft">
        {order.items.map((item) => (
          <li
            key={item.gameId}
            className="flex items-center justify-between gap-4 py-3"
          >
            <Link
              href={`/game/${item.gameId}`}
              className="line-clamp-1 text-sm font-medium text-text transition-colors hover:text-cyan"
            >
              {item.title}
            </Link>
            <span className="flex-none text-sm text-text-secondary">
              {formatMoney(item.price, order.currency)}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-border-soft pt-4">
        <span className="text-xs uppercase tracking-widest text-text-muted">
          Total
        </span>
        <span className="text-base font-bold text-text">
          {formatMoney(order.amount, order.currency)}
        </span>
      </div>
    </li>
  );
}

function OrdersLoading() {
  return (
    <ul className="flex flex-col gap-4">
      {[0, 1, 2].map((i) => (
        <li
          key={i}
          className="h-40 animate-pulse rounded-2xl border border-border bg-card"
        />
      ))}
    </ul>
  );
}

function SignInPrompt() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <h1 className="text-2xl font-bold text-text">Sign in to see your orders</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Your order history is tied to your account. Sign in to view your
        purchases and their status.
      </p>
      <CommonButton
        href="/login"
        text="Sign in"
        variant="theme"
        className="mx-auto mt-6 w-fit px-5 py-2.5 text-sm"
      />
    </div>
  );
}

function EmptyOrders() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-16 text-center animate-fade-up">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-cyan/10 text-cyan">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
        </svg>
      </span>
      <h2 className="mt-4 text-lg font-semibold text-text">No orders yet</h2>
      <p className="mt-1 max-w-sm text-sm text-text-secondary">
        When you buy a game it&apos;ll show up here with its receipt and status.
      </p>
      <CommonButton
        href="/browse"
        text="Browse games"
        variant="theme"
        className="mx-auto mt-6 w-fit px-5 py-2.5 text-sm"
      />
    </div>
  );
}
