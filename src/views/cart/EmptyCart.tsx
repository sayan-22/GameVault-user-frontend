import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-border bg-card text-cyan">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 4h2l2.6 11.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="17" cy="20" r="1.5" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-text">Your cart is empty</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Find your next favorite game and we&apos;ll keep your library ready.
      </p>
      <Link
        href="/browse"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan px-5 py-2.5 text-sm font-semibold text-bg shadow-[0_0_24px_-4px_rgba(0,217,255,0.6)]"
      >
        Browse games
      </Link>
    </div>
  );
}
