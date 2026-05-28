import Reveal from "@/components/common/Reveal";

type Review = { author: string; rating: number; date: string; body: string };

export default function ReviewsList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {reviews.map((r, i) => (
        <Reveal key={`${r.author}-${r.date}`} delay={i * 80}>
          <article className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-cyan-border">
            <header className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-bg-secondary text-xs font-bold text-cyan">
                  {r.author.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <p className="text-sm font-medium text-text">{r.author}</p>
                  <p className="text-[11px] text-text-muted">{r.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-cyan">
                <Star /> {r.rating.toFixed(1)}
              </div>
            </header>
            <p className="text-sm text-text-secondary">{r.body}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
    </svg>
  );
}
