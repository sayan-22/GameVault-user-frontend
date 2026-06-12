import { cn } from "@/utils/cn";

// Non-breaking space keeps word gaps from collapsing between inline-block letters.
const NBSP = String.fromCharCode(160);

// "Zero Gravity: Bouncy Words" — renders each character in its own span with a
// staggered animation-delay so the letters bounce in a floating wave.
export default function BouncyText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={cn("bouncy-words", className)} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden style={{ animationDelay: `${i * 0.07}s` }}>
          {ch === " " ? NBSP : ch}
        </span>
      ))}
    </span>
  );
}
