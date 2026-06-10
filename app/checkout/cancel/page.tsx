import Link from "next/link";

export default function Page() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl border border-border bg-card text-text-muted">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </span>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-text">
        Checkout canceled
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        No payment was taken. Your cart is still saved — you can pick up where
        you left off whenever you&apos;re ready.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/cart"
          className="rounded-lg bg-cyan px-5 py-2.5 text-sm font-semibold text-bg shadow-[0_0_24px_-4px_rgba(0,217,255,0.6)]"
        >
          Back to cart
        </Link>
        <Link
          href="/browse"
          className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-cyan-border hover:text-text"
        >
          Keep browsing
        </Link>
      </div>
    </div>
  );
}
