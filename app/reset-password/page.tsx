import ResetPasswordView from "@/views/ResetPasswordView";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-4rem)] grid place-items-center">Loading...</div>}>
      <ResetPasswordView />
    </Suspense>
  );
}
