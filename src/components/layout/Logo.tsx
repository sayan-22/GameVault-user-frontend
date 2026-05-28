import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-linear-to-br from-cyan to-cyan-glow text-bg shadow-[0_0_18px_-4px_rgba(0,217,255,0.6)] transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M3 7h13l5 5-5 5H3z" />
        </svg>
      </span>
      <span className="hidden sm:block text-lg font-semibold tracking-tight text-text">
        Game<span className="text-cyan">Vault</span>
      </span>
    </Link>
  );
}
