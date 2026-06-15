import CommonButton from "@/components/buttons/CommonButton";

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
      <CommonButton
        href="/browse"
        text="Browse games"
        variant="theme"
        className="mx-auto mt-6 w-fit px-5 py-2.5 text-sm"
      />
    </div>
  );
}
