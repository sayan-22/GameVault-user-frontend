import BrowseView from "@/views/BrowseView";
import { getGames } from "@/lib/services/games";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; filter?: string; sort?: string }>;
}) {
  const [filters, games] = await Promise.all([searchParams, getGames()]);
  return <BrowseView initialGames={games} filters={filters} />;
}
