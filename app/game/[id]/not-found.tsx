import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="text-xs uppercase tracking-widest text-cyan">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-text">Game not found</h1>
      <p className="mt-2 text-sm text-text-secondary">
        That title isn&apos;t in our library. It may have been delisted, or never existed.
      </p>
      <Link
        href="/browse"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan px-5 py-2.5 text-sm font-semibold text-bg shadow-[0_0_24px_-4px_rgba(0,217,255,0.6)] hover:shadow-[0_0_40px_-2px_rgba(0,217,255,0.85)]"
      >
        Browse all games
      </Link>
    </div>
  );
}
