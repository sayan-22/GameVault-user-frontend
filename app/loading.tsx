import { GameRowSkeleton } from "@/components/skeletons";

export default function RootLoading() {
  return (
    <div className="flex flex-col gap-14 pb-20 sm:gap-16">
      <section className="relative aspect-video max-h-[80vh] min-h-120 w-full overflow-hidden">
        <div className="absolute inset-0 skeleton" />
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/60 to-bg/20" />
        <div className="absolute inset-0 bg-linear-to-r from-bg/85 via-bg/40 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
          <div className="space-y-4">
            <div className="h-4 w-24 rounded skeleton" />
            <div className="h-10 w-2/3 max-w-xl rounded skeleton" />
            <div className="h-4 w-full max-w-md rounded skeleton" />
            <div className="h-4 w-3/4 max-w-md rounded skeleton" />
            <div className="flex gap-3 pt-2">
              <div className="h-11 w-32 rounded-lg skeleton" />
              <div className="h-11 w-28 rounded-lg skeleton" />
            </div>
          </div>
        </div>
      </section>

      <GameRowSkeleton title="Trending Now" />
      <GameRowSkeleton title="Free to Play" />
      <GameRowSkeleton title="New Releases" />
    </div>
  );
}
