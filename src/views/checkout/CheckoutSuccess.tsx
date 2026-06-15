"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { confirmCheckout, fetchCart } from "@/store/cartSlice";
import CommonButton from "@/components/buttons/CommonButton";
import OutlineButton from "@/components/buttons/OutlineButton";

export default function CheckoutSuccess({ sessionId }: { sessionId?: string }) {
  const dispatch = useAppDispatch();
  const [confirming, setConfirming] = useState(true);

  // Confirm the payment with the backend (marks the order paid, clears the cart),
  // then re-sync the cart. Works without a Stripe webhook.
  useEffect(() => {
    let active = true;
    (async () => {
      if (sessionId) await dispatch(confirmCheckout(sessionId));
      await dispatch(fetchCart());
      if (active) setConfirming(false);
    })();
    return () => {
      active = false;
    };
  }, [dispatch, sessionId]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl border border-success/40 bg-success/10 text-success">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 12l5 5L20 7" />
        </svg>
      </span>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-text">
        Payment successful
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        {confirming
          ? "Confirming your order…"
          : "Thanks for your purchase! Your order is now in your order history."}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <CommonButton
          href="/order-history"
          text="View order history"
          variant="theme"
          className="w-full px-5 py-2.5 text-sm sm:w-fit"
        />
        <OutlineButton
          href="/browse"
          text="Keep browsing"
          className="w-full rounded-lg bg-card px-5 py-2.5 text-sm sm:w-fit"
        />
      </div>
    </div>
  );
}
