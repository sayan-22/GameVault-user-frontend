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
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-text">{title}</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
