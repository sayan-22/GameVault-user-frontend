import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
  altLabel: string;
  altHref: string;
  altCta: string;
};

export default function AuthCard({
  title,
  subtitle,
  children,
  altLabel,
  altHref,
  altCta,
}: Props) {
  return (
    <div className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,217,255,0.10),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(33,199,229,0.06),transparent_50%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(18,18,18,0)_0%,rgba(18,18,18,0.6)_50%,rgba(18,18,18,1)_100%)]" />

      <div className="mx-auto flex max-w-md flex-col items-stretch px-4 py-16 sm:py-24">
        <div className="mb-8 text-center animate-fade-up">
          <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-text">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-linear-to-br from-cyan to-cyan-glow text-bg shadow-[0_0_18px_-4px_rgba(0,217,255,0.6)]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M3 7h13l5 5-5 5H3z" />
              </svg>
            </span>
            <span className="text-lg font-semibold tracking-tight text-text">
              Game<span className="text-cyan">Vault</span>
            </span>
          </Link>
        </div>

        <div className="rounded-2xl border border-border glass p-6 shadow-card animate-fade-up sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-text">{title}</h1>
          <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>

        <p className="mt-6 text-center text-sm text-text-secondary animate-fade-up">
          {altLabel}{" "}
          <Link href={altHref} className="font-medium text-cyan hover:underline">
            {altCta}
          </Link>
        </p>
      </div>
    </div>
  );
}
