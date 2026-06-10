"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/cards/AuthCard";
import Inputfield from "@/components/form/Inputfield";
import CommonButton from "@/components/buttons/CommonButton";
import { cn } from "@/utils/cn";
import { useAppDispatch } from "@/store/hooks";
import { signup } from "@/store/authSlice";
import { signupSchema, fieldErrors } from "@/schemas/auth";

function scorePassword(p: string): number {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

export default function SignupView() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!agree) return;

    const parsed = signupSchema.safeParse({ name, email, password });
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setPending(true);
    const res = await dispatch(signup(parsed.data));
    if (signup.rejected.match(res)) {
      setFormError(res.payload ?? "Sign up failed");
      setPending(false);
      return;
    }
    router.push("/");
    router.refresh();
  };

  const strength = scorePassword(password);
  const strengthClass = (i: number) => {
    if (i >= strength) return "bg-border-soft";
    if (strength <= 1) return "bg-danger";
    if (strength === 2) return "bg-cyan-soft";
    return "bg-success-light";
  };

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start your library. Email is all we need."
      altLabel="Already have an account?"
      altHref="/login"
      altCta="Sign in"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {formError ? (
          <p className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-xs text-danger">
            {formError}
          </p>
        ) : null}
        <Inputfield
          label="Display name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          autoComplete="name"
          error={errors.name}
          required
        />
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
        <div>
          <Inputfield
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            autoComplete="new-password"
            minLength={6}
            error={errors.password}
            required
          />
          <div className="mt-2 flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  strengthClass(i),
                )}
              />
            ))}
          </div>
        </div>

        <label className="flex items-start gap-2 text-xs text-text-secondary">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border bg-bg-secondary accent-cyan"
          />
          <span>
            I agree to the{" "}
            <a href="#" className="text-cyan hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-cyan hover:underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>

        <CommonButton
          text={pending ? "Creating account…" : "Create account"}
          type="submit"
          loading={pending}
          disabled={!agree}
          variant="theme"
          className="h-11 w-full text-sm"
        />
      </form>
    </AuthCard>
  );
}
