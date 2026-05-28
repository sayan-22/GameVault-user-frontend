"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/utils/price";
import Inputfield from "@/components/form/Inputfield";
import CommonButton from "@/components/buttons/CommonButton";
import OutlineButton from "@/components/buttons/OutlineButton";

type Props = {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  promoApplied: boolean;
  onPromoApply: (code: string) => void;
};

export default function CartSummary({ subtotal, discount, tax, total, promoApplied, onPromoApply }: Props) {
  const [promo, setPromo] = useState("");

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="overflow-hidden rounded-2xl border border-border glass p-5 shadow-card">
        <h2 className="text-base font-semibold text-text">Order summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <Row label="Subtotal" value={formatPrice(subtotal)} />
          {promoApplied && (
            <Row label="Promo (10% off)" value={`−${formatPrice(discount)}`} accent="text-success-light" />
          )}
          <Row label="Tax (est.)" value={formatPrice(tax)} />
          <div className="my-3 h-px bg-border-soft" />
          <Row label="Total" value={formatPrice(total)} bold />
        </dl>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onPromoApply(promo);
          }}
          className="mt-5 flex gap-2"
        >
          <Inputfield
            name="promo"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="Promo code"
            className="h-10"
          />
          <OutlineButton text="Apply" variant="simple" type="submit" className="h-10 px-3 text-xs" />
        </form>
        {promoApplied && (
          <p className="mt-2 text-[11px] text-success-light">Promo applied · GAMEVAULT10</p>
        )}

        <CommonButton
          text="Checkout"
          variant="theme"
          className="mt-5 h-12 w-full text-sm"
          Icon={ArrowRightIcon}
        />

        <Link href="/browse" className="mt-3 block text-center text-xs text-text-secondary hover:text-cyan">
          Continue shopping
        </Link>

        <p className="mt-4 text-[11px] leading-relaxed text-text-muted">
          By placing your order you agree to our terms. Try promo code{" "}
          <span className="rounded bg-bg-secondary px-1 font-mono text-text">GAMEVAULT10</span>.
        </p>
      </div>
    </aside>
  );
}

function Row({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: string }) {
  return (
    <div className={`flex justify-between ${bold ? "text-base font-semibold text-text" : accent ?? "text-text-secondary"}`}>
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
