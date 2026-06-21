"use client";

import { useState } from "react";
import { AuthCard } from "@/components/cards";
import { Inputfield } from "@/components/form";
import { CommonButton } from "@/components/buttons";
import { apiPost } from "@/lib/services/authAxios";
import { API_URLS } from "@/lib/services/AllAPIUrls";

// Mirrors the backend contract: POST /api/user/auth/reset-password { token, password }.
// The token arrives in the reset link the backend emails (…/reset-password?token=…)
// and is single-use, valid for 30 minutes. Password must be at least 6 characters.
const MIN_PASSWORD = 6;

export default function ResetPasswordView({ token }: { token?: string }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  // No token in the link → nothing we can reset against.
  if (!token) {
    return (
      <AuthCard
        title="Link not valid"
        subtitle="This password reset link is missing or malformed. Request a fresh one and try again."
        altLabel="Need a new link?"
        altHref="/forgot-password"
        altCta="Resend reset email"
      >
        <CommonButton
          text="Request a new link"
          variant="theme"
          className="h-11 w-full text-sm"
          onClick={() => {
            window.location.href = "/forgot-password";
          }}
        />
      </AuthCard>
    );
  }

  if (done) {
    return (
      <AuthCard
        title="Password updated"
        subtitle="Your password has been changed. You can now sign in with it."
        altLabel="All set?"
        altHref="/login"
        altCta="Back to sign in"
      >
        <CommonButton
          text="Continue to sign in"
          variant="theme"
          className="h-11 w-full text-sm"
          onClick={() => {
            window.location.href = "/login";
          }}
        />
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Choose a new password"
      subtitle="Pick a strong password you don't use elsewhere. This reset link works only once."
      altLabel="Remembered it?"
      altHref="/login"
      altCta="Back to sign in"
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (password.length < MIN_PASSWORD) {
            setError(`Password must be at least ${MIN_PASSWORD} characters`);
            return;
          }
          if (password !== confirm) {
            setError("Passwords do not match");
            return;
          }
          setError(null);
          setPending(true);
          try {
            // POST /api/user/auth/reset-password — sets the new password.
            await apiPost(API_URLS.auth.resetPassword, { token, password });
            setDone(true);
          } catch (err) {
            setError(
              err instanceof Error ? err.message : "Something went wrong."
            );
          } finally {
            setPending(false);
          }
        }}
        className="space-y-4"
      >
        <Inputfield
          label="New password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="new-password"
          minLength={MIN_PASSWORD}
          required
        />
        <Inputfield
          label="Confirm password"
          name="confirm"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="••••••••"
          autoComplete="new-password"
          minLength={MIN_PASSWORD}
          error={error ?? undefined}
          required
        />
        <CommonButton
          text={pending ? "Updating…" : "Reset password"}
          type="submit"
          loading={pending}
          variant="theme"
          className="h-11 w-full text-sm"
        />
      </form>
    </AuthCard>
  );
}
