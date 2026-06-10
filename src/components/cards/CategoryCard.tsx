import Link from "next/link";
import { memo } from "react";
import { cn } from "@/utils/cn";

type Props = {
  name: string;
  image: string;
  href: string;
  count?: number;
  className?: string;
};

function CategoryCard({ name, image, href, count, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block aspect-[3/2] overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300",
        "hover:border-cyan-border hover:shadow-glow-cyan",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      {/* Consistent legibility wash so every tile reads the same regardless of art */}
      <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/70 to-bg/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,217,255,0.16),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col justify-end p-5">
        {typeof count === "number" && (
          <span className="mb-1 text-[11px] font-medium uppercase tracking-wider text-text-muted">
            {count} {count === 1 ? "game" : "games"}
          </span>
        )}
        <div className="flex items-end justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-text sm:text-xl">
            {name}
          </h3>
          <span className="grid h-9 w-9 flex-none translate-y-1 place-items-center rounded-full border border-border bg-bg/50 text-text-secondary opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:border-cyan-border group-hover:bg-cyan group-hover:text-bg group-hover:opacity-100">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default memo(CategoryCard);
