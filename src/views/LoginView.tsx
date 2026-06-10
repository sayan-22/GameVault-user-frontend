"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/cards/AuthCard";
import Inputfield from "@/components/form/Inputfield";
import CommonButton from "@/components/buttons/CommonButton";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/authSlice";
import { loginSchema, fieldErrors } from "@/schemas/auth";

export default function LoginView() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setPending(true);
    const res = await dispatch(login(parsed.data));
    if (login.rejected.match(res)) {
      setFormError(res.payload ?? "Sign in failed");
      setPending(false);
      return;
    }
    router.push("/");
    router.refresh();
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue to GameVault."
      altLabel="New here?"
      altHref="/signup"
      altCta="Create an account"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {formError ? (
          <p className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-xs text-danger">
            {formError}
          </p>
        ) : null}
        <Inputfield
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email}
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
          error={errors.password}
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
