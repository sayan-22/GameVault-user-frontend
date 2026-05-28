"use client";

import { useState, type ChangeEvent, type ComponentType, type Ref } from "react";
import { cn } from "@/utils/cn";

const NOOP = () => {};

type IconProps = { className?: string };

type InputfieldProps = {
  label?: string;
  name: string;
  inputId?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password" | "number" | "tel" | "search" | "url";
  max?: number | string;
  min?: number | string;
  maxLength?: number;
  minLength?: number;
  message?: string;
  placeholder?: string;
  Icon?: ComponentType<IconProps>;
  className?: string;
  labelClass?: string;
  optionalText?: string;
  onClickIcon?: () => void;
  required?: boolean;
  error?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  readOnly?: boolean;
  autoComplete?: string;
  ref?: Ref<HTMLInputElement>;
};

const BASE_INPUT =
  "h-11 w-full rounded-lg border border-border bg-bg-secondary/70 px-3 text-sm text-text " +
  "placeholder:text-text-muted outline-none transition-all " +
  "focus:border-cyan-border focus:shadow-[0_0_0_3px_rgba(0,217,255,0.12)] " +
  "read-only:opacity-70";

export default function Inputfield({
  label,
  name,
  inputId,
  value,
  onChange,
  type = "text",
  max,
  min,
  maxLength = 120,
  minLength,
  message,
  placeholder,
  Icon,
  className,
  labelClass = "text-xs font-medium text-text-secondary",
  optionalText,
  onClickIcon = NOOP,
  required = false,
  error,
  onFocus = NOOP,
  onBlur = NOOP,
  readOnly,
  autoComplete,
  ref,
}: InputfieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const resolvedId = inputId || name;
  const resolvedType = type === "password" ? (showPassword ? "text" : "password") : type;
  const padRight = type === "password" && Icon ? "pr-20" : type === "password" || Icon ? "pr-10" : "";

  return (
    <div className="w-full relative">
      {label ? (
        <div className="mb-1.5 flex items-center justify-between">
          <label
            htmlFor={resolvedId}
            className={cn(labelClass, error && "!text-danger")}
            title={message}
          >
            {label}
            {required ? <span className="text-danger pl-0.5">*</span> : null}
            {optionalText || error ? (
              <span className="pl-1 text-[11px] font-medium text-text-muted">
                {optionalText} {error ? `(${error})` : null}
              </span>
            ) : null}
          </label>
        </div>
      ) : null}
      <input
        ref={ref}
        id={resolvedId}
        name={name}
        className={cn(BASE_INPUT, padRight, error && "!border-danger placeholder:text-danger/70", className)}
        type={resolvedType}
        value={value}
        onChange={onChange}
        max={max}
        min={min}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        required={required || undefined}
        onFocus={onFocus}
        onBlur={onBlur}
        readOnly={readOnly}
        autoComplete={autoComplete}
      />
      {Icon ? (
        <button
          type="button"
          onClick={onClickIcon}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-cyan transition-colors"
          tabIndex={-1}
        >
          <Icon className="h-4 w-4" />
        </button>
      ) : null}
      {type === "password" ? (
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 text-text-muted hover:text-cyan transition-colors",
            Icon ? "right-10" : "right-3",
          )}
          tabIndex={-1}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      ) : null}
    </div>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17.94 17.94A10 10 0 0 1 12 19c-7 0-11-7-11-7a18 18 0 0 1 5.06-5.94M9.9 5a10 10 0 0 1 2.1-.22c7 0 11 7 11 7a18 18 0 0 1-3 4.2M1 1l22 22" />
    </svg>
  );
}
