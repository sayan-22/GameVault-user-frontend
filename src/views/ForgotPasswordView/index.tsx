"use client";

import { useState } from "react";
import { AuthCard } from "@/components/cards";
import { Inputfield } from "@/components/form";
import { CommonButton } from "@/components/buttons";
import { apiPost } from "@/lib/services/authAxios";
import { API_URLS } from "@/lib/services/AllAPIUrls";

export default function ForgotPasswordView() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendResetLink = async () => {
    if (!email.trim()) return;
    setError(null);
    setPending(true);
    try {
      // POST /api/user/auth/forgot-password — backend emails a reset link.
      await apiPost(API_URLS.auth.forgotPassword, { email: email.trim() });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthCard
      title={sent ? "Check your inbox" : "Forgot password?"}
      subtitle={
        sent
          ? `If an account exists for ${email}, a reset link is on its way.`
          : "Enter the email associated with your GameVault account. We'll send a reset link."
      }
      altLabel="Remembered it?"
      altHref="/login"
      altCta="Back to sign in"
    >
      {sent ? (
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-xl border border-cyan-border bg-cyan/5 p-4">
            <span className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full bg-cyan/15 text-cyan">
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              </svg>
            </span>
            <p className="text-xs text-text-secondary">
              The link expires in 30 minutes. If you don&apos;t see it, check
              your spam folder.
            </p>
          </div>
          <CommonButton
            text={pending ? "Resending…" : "Resend link"}
            variant="default"
            loading={pending}
            className="h-11 w-full text-sm"
            onClick={sendResetLink}
          />
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void sendResetLink();
          }}
          className="space-y-4"
        >
          <Inputfield
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            error={error ?? undefined}
            required
          />
          <CommonButton
            text={pending ? "Sending…" : "Send reset link"}
            type="submit"
            loading={pending}
            variant="theme"
            className="h-11 w-full text-sm"
          />
        </form>
      )}
    </AuthCard>
  );
}
