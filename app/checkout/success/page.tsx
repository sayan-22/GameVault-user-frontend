import CheckoutSuccess from "@/views/CheckoutSuccess";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  return <CheckoutSuccess sessionId={session_id} />;
}
