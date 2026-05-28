import Link from "next/link";
import { memo } from "react";
import { cn } from "@/utils/cn";

type Props = {
  name: string;
  image: string;
  href: string;
  className?: string;
};

function CategoryCard({ name, image, href, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden rounded-xl border border-border bg-card transition-all duration-300",
        "hover:border-cyan-border hover:shadow-glow-cyan hover:scale-[1.015]",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-bg/90 via-bg/40 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,217,255,0.18),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col justify-end p-4">
        <h3 className="text-base sm:text-lg font-semibold text-text">{name}</h3>
        <span className="mt-0.5 text-[11px] text-text-muted transition-colors group-hover:text-cyan">
          Browse →
        </span>
      </div>
    </Link>
  );
}

export default memo(CategoryCard);
