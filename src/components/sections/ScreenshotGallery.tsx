"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

export default function ScreenshotGallery({ shots }: { shots: string[] }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % shots.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + shots.length) % shots.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, shots.length]);

  if (shots.length === 0) return null;

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="group relative aspect-video overflow-hidden rounded-2xl border border-border bg-card lg:row-span-2 lg:aspect-auto"
        >
          <img
            src={shots[active]}
            alt={`Screenshot ${active + 1}`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-bg/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </button>

        {shots.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => setActive(i)}
            onDoubleClick={() => {
              setActive(i);
              setLightbox(true);
            }}
            className={cn(
              "relative aspect-video overflow-hidden rounded-xl border bg-card transition-all",
              i === active
                ? "border-cyan-border shadow-glow-cyan"
                : "border-border hover:border-cyan-border/70",
            )}
          >
            <img src={s} alt={`Thumbnail ${i + 1}`} className="absolute inset-0 h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 p-4 backdrop-blur-md animate-fade-up"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-lg border border-border bg-card/80 text-text-secondary hover:text-cyan"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <img
            src={shots[active]}
            alt=""
            className="max-h-[90vh] max-w-[95vw] rounded-2xl border border-border object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
