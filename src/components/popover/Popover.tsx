"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { cn } from "@/utils/cn";

type Placement =
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "top"
  | "top-start"
  | "top-end";

const PLACEMENT: Record<Placement, string> = {
  bottom: "top-full mt-2 left-0 right-0 origin-top",
  "bottom-start": "top-full mt-2 left-0 origin-top-left",
  "bottom-end": "top-full mt-2 right-0 origin-top-right",
  top: "bottom-full mb-2 left-0 right-0 origin-bottom",
  "top-start": "bottom-full mb-2 left-0 origin-bottom-left",
  "top-end": "bottom-full mb-2 right-0 origin-bottom-right",
};

type Props = {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLElement | null>;
  children: ReactNode;
  placement?: Placement;
  className?: string;
  closeOnEscape?: boolean;
  closeOnOutside?: boolean;
  panel?: boolean;
};

export default function Popover({
  open,
  onClose,
  triggerRef,
  children,
  placement = "bottom-end",
  className,
  closeOnEscape = true,
  closeOnOutside = true,
  panel = true,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open || !closeOnOutside) return;
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (ref.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      onClose();
    };
    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [open, closeOnOutside, onClose, triggerRef]);

  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeOnEscape, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      className={cn(
        "absolute z-50 animate-fade-up",
        PLACEMENT[placement],
        panel && "overflow-hidden rounded-xl border border-border glass shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}
