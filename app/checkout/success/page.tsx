import CheckoutSuccess from "@/views/checkout/CheckoutSuccess";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  return <CheckoutSuccess sessionId={session_id} />;
}
