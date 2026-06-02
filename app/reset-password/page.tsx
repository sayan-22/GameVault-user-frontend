import ResetPasswordView from "@/views/ResetPasswordView";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return <ResetPasswordView token={token} />;
}
