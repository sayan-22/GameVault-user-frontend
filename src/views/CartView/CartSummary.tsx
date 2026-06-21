"use client";

import { formatPrice } from "@/utils/price";
import { CommonButton, LinkButton } from "@/components/buttons";

type Props = {
  subtotal: number;
  total: number;
  count: number;
  checkingOut: boolean;
  error?: string | null;
  onCheckout: () => void;
};

export default function CartSummary({
  subtotal,
  total,
  count,
  checkingOut,
  error,
  onCheckout,
}: Props) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="overflow-hidden rounded-2xl border border-border glass p-5 shadow-card">
        <h2 className="text-base font-semibold text-text">Order summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <Row
            label={`Subtotal (${count} ${count === 1 ? "item" : "items"})`}
            value={formatPrice(subtotal)}
          />
          <div className="my-3 h-px bg-border-soft" />
          <Row label="Total" value={formatPrice(total)} bold />
        </dl>

        {error ? (
          <p className="mt-4 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-xs text-danger">
            {error}
          </p>
        ) : null}

        <CommonButton
          text={checkingOut ? "Redirecting…" : "Checkout"}
          variant="theme"
          loading={checkingOut}
          disabled={count === 0}
          onClick={onCheckout}
          className="mt-5 h-12 w-full text-sm"
          Icon={ArrowRightIcon}
        />

        <div className="mt-3 text-center">
          <LinkButton href="/browse" text="Continue shopping" />
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-text-muted">
          You&apos;ll be redirected to Stripe to complete your purchase securely.
        </p>
      </div>
    </aside>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div
      className={`flex justify-between ${
        bold ? "text-base font-semibold text-text" : "text-text-secondary"
      }`}
    >
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
