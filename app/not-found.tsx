import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="relative isolate flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,217,255,0.10),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(33,199,229,0.06),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-bg/0 via-bg/60 to-bg" />

      <div className="max-w-lg text-center animate-fade-up">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan">Error 404</p>
        <h1 className="mt-4 text-balance text-5xl font-bold leading-[1.05] tracking-tight text-text sm:text-6xl">
          Page not found
        </h1>
        <p className="mt-4 text-balance text-sm text-text-secondary sm:text-base">
          The page you&apos;re looking for has drifted off the map. It may have been moved, renamed, or never existed.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan px-5 py-2.5 text-sm font-semibold text-bg shadow-[0_0_24px_-4px_rgba(0,217,255,0.6)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_-2px_rgba(0,217,255,0.85)]"
          >
            Back to home
          </Link>
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg-secondary/60 px-5 py-2.5 text-sm font-medium text-text-secondary backdrop-blur transition-colors hover:border-cyan-border hover:text-text"
          >
            Browse games
          </Link>
        </div>
      </div>
    </div>
  );
}
