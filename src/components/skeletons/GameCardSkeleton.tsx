export default function GameCardSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-card">
      <div className="aspect-3/4 w-full skeleton" />
      <div className="space-y-2 p-3">
        <div className="h-3 w-20 rounded skeleton" />
        <div className="h-4 w-3/4 rounded skeleton" />
        <div className="h-4 w-16 rounded skeleton" />
      </div>
    </div>
  );
}

export function GameRowSkeleton({ title }: { title: string }) {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-text">{title}</h2>
        </div>
        <div className="scrollbar-hide -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-55 flex-none sm:w-60">
              <GameCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
