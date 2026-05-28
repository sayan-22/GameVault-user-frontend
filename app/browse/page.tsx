import BrowseView from "@/views/BrowseView";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; filter?: string; sort?: string }>;
}) {
  const filters = await searchParams;
  return <BrowseView filters={filters} />;
}
