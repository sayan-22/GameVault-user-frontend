"use client";

import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import CommonButton from "@/components/buttons/CommonButton";
import OutlineButton from "@/components/buttons/OutlineButton";

type Tone = "theme" | "danger" | "success";

const TONE_RING: Record<Tone, string> = {
  theme: "ring-1 ring-cyan-border bg-cyan/10 text-cyan",
  danger: "ring-1 ring-danger/40 bg-danger/10 text-danger",
  success: "ring-1 ring-success/40 bg-success/10 text-success-light",
};

type IconProps = { className?: string };

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  tone?: Tone;
  Icon?: ComponentType<IconProps>;
  loading?: boolean;
};

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  tone = "theme",
  Icon,
  loading = false,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, loading, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      className="fixed inset-0 z-[100] grid place-items-center p-4"
    >
      <div
        className="absolute inset-0 bg-bg/85 backdrop-blur-md animate-fade-up"
        onClick={() => !loading && onClose()}
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border glass shadow-card animate-fade-up">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          disabled={loading}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg text-text-muted transition-colors hover:bg-bg-secondary hover:text-text disabled:opacity-40"
        >
          <CloseIcon />
        </button>

        <div className="p-6 pb-4">
          {Icon && (
            <div className={cn("mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full", TONE_RING[tone])}>
              <Icon className="h-5 w-5" />
            </div>
          )}
          <h2 id="confirm-modal-title" className="text-center text-lg font-semibold tracking-tight text-text">
            {title}
          </h2>
          {message && (
            <div className="mt-2 text-center text-sm text-text-secondary">{message}</div>
          )}
        </div>

        <div className="flex gap-2 border-t border-border-soft bg-bg-secondary/40 p-4">
          <OutlineButton
            text={cancelText}
            onClick={onClose}
            disabled={loading}
            className="h-10 flex-1 rounded-lg px-4 text-sm"
          />
          <CommonButton
            text={confirmText}
            variant={tone}
            loading={loading}
            onClick={onConfirm}
            className="h-10 flex-1 text-sm"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
