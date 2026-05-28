"use client";

import { useState } from "react";
import Link from "next/link";
import AuthCard from "@/components/cards/AuthCard";
import Inputfield from "@/components/form/Inputfield";
import CommonButton from "@/components/buttons/CommonButton";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue to GameVault."
      altLabel="New here?"
      altHref="/signup"
      altCta="Create an account"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPending(true);
          window.setTimeout(() => setPending(false), 900);
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
          required
        />
        <Inputfield
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />
        <div className="flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-[11px] text-text-muted hover:text-cyan"
          >
            Forgot password?
          </Link>
        </div>
        <CommonButton
          text={pending ? "Signing in…" : "Sign in"}
          type="submit"
          loading={pending}
          variant="theme"
          className="h-11 w-full text-sm"
        />
      </form>
    </AuthCard>
  );
}
