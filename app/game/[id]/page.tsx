import { notFound } from "next/navigation";
import GameDetailView from "@/views/GameDetailView";
import { getGame } from "@/lib/services/games";

export default async function GameDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = await getGame(id);
  if (!game) notFound();
  return <GameDetailView initialGame={game} />;
}
