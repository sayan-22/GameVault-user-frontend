"use client";

import { useEffect, useRef, useState } from "react";
import type { Game } from "@/constants/game";
import PriceTag from "@/components/cards/PriceTag";
import WordFlyIn from "@/components/common/WordFlyIn";
import CommonButton from "@/components/buttons/CommonButton";
import OutlineButton from "@/components/buttons/OutlineButton";

export default function Hero({ game }: { game: Game }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const play = () => v.play().catch(() => {});
    if (v.readyState >= 2) play();
    else v.addEventListener("loadeddata", play, { once: true });
  }, []);

  return (
    <section className="relative isolate w-full overflow-hidden">
      <div className="relative aspect-video max-h-[80vh] min-h-120 w-full">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{ backgroundImage: `url(${game.banner})`, opacity: ready ? 0 : 1 }}
        />
        {game.heroVideo && (
          <video
            ref={videoRef}
            src={game.heroVideo}
            poster={game.banner}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setReady(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/60 to-bg/20" />
        <div className="absolute inset-0 bg-linear-to-r from-bg/85 via-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,217,255,0.08),transparent_60%)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
          <div className="max-w-2xl animate-fade-up">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-cyan-border bg-cyan/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan">
                Featured
              </span>
              {game.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-bg-secondary/60 px-3 py-1 text-[11px] text-text-secondary backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-text sm:text-5xl lg:text-6xl">
              <WordFlyIn text={game.title} />
            </h1>
            <p className="mt-4 max-w-xl text-balance text-base text-text-secondary sm:text-lg">
              <WordFlyIn text={game.description} delay={0.8} stagger={0.07} />
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
              <CommonButton
                href={`/game/${game.id}`}
                text={game.free ? "Play Free" : "Buy Now"}
                variant="theme"
                Icon={PlayIcon}
                className="px-6 py-3 text-sm"
              />
              <OutlineButton
                href={`/game/${game.id}`}
                text="More info"
                className="rounded-lg bg-bg-secondary/60 px-6 py-3 text-sm backdrop-blur"
              />
              {!game.free && <PriceTag game={game} size="md" className="pl-2" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
