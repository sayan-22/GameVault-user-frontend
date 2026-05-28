import GameDetailView from "@/views/GameDetailView";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <GameDetailView id={id} />;
}
