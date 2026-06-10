import HomeView from "@/views/HomeView";
import { getGames } from "@/services/games";

export default async function Page() {
  const games = await getGames();
  return <HomeView initialGames={games} />;
}
