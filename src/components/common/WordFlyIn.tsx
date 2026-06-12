import { Fragment } from "react";
import { cn } from "@/utils/cn";

// After Effects-style word-by-word animation: each word drifts up and fades in
// with a motion blur, staggered per word so they animate in sequence.
export default function WordFlyIn({
  text,
  className,
  delay = 0, // base delay (seconds) before the first word animates
  stagger = 0.22, // per-word delay (seconds)
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={cn("ae-words inline", className)} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span aria-hidden style={{ animationDelay: `${delay + i * stagger}s` }}>
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
