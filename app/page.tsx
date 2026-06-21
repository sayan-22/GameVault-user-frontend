import HomeView from "@/views/HomeView";
import { getGames } from "@/lib/services/games";

export default async function HomePage() {
  const games = await getGames();
  return <HomeView initialGames={games} />;
}
