export default function Loading() {
  return (
    <div className="flex flex-col gap-12 pb-20">
      <section className="relative overflow-hidden pt-28 lg:pt-32">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div>
            <div className="aspect-video w-full rounded-2xl skeleton" />
            <div className="mt-8 space-y-3">
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-6 w-20 rounded-full skeleton" />
                ))}
              </div>
              <div className="h-10 w-2/3 rounded skeleton" />
              <div className="h-4 w-1/3 rounded skeleton" />
            </div>
          </div>
          <aside>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="aspect-[3/4] w-full skeleton" />
              <div className="space-y-3 p-5">
                <div className="h-6 w-24 rounded skeleton" />
                <div className="h-11 w-full rounded-lg skeleton" />
                <div className="h-10 w-full rounded-lg skeleton" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section>
        <div className="mx-auto px-4 sm:px-6 lg:px-8max-w-7xl space-y-3">
          <div className="h-7 w-32 rounded skeleton" />
          <div className="h-4 w-full max-w-3xl rounded skeleton" />
          <div className="h-4 w-3/4 max-w-3xl rounded skeleton" />
        </div>
      </section>

      <section>
        <div className="mx-auto px-4 sm:px-6 lg:px-8grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <div className="aspect-video rounded-2xl skeleton lg:row-span-2 lg:aspect-auto" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-video rounded-xl skeleton" />
          ))}
        </div>
      </section>
    </div>
  );
}
