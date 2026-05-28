import { memo } from "react";
import { cn } from "@/utils/cn";

type Props = {
  free?: boolean;
  discount?: number;
  className?: string;
  size?: "sm" | "md";
};

function CardBadge({ free, discount, className, size = "sm" }: Props) {
  if (!free && !discount) return null;
  const pad = size === "md" ? "px-2 py-1 text-[11px]" : "px-1.5 py-0.5 text-[10px]";
  return (
    <span
      className={cn(
        "rounded-md font-bold shadow-md",
        pad,
        free ? "bg-cyan text-bg" : "bg-success text-bg",
        className,
      )}
    >
      {free ? "FREE" : `-${discount}%`}
    </span>
  );
}

export default memo(CardBadge);
