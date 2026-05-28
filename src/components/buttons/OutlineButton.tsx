"use client";

import { memo, type ComponentType } from "react";
import { cn } from "@/utils/cn";

const NOOP = () => {};

type Variant = "theme" | "success" | "danger" | "dark" | "neutral" | "simple";

const VARIANTS: Record<Variant, { base: string; active: string }> = {
  theme: {
    base: "border-cyan-border text-cyan hover:bg-cyan hover:text-bg",
    active: "bg-cyan text-bg",
  },
  success: {
    base: "border-success text-success hover:bg-success hover:text-bg",
    active: "bg-success text-bg",
  },
  danger: {
    base: "border-danger text-danger hover:bg-danger hover:text-text",
    active: "bg-danger text-text",
  },
  dark: {
    base: "border-text text-text bg-text-muted/[0.08] hover:bg-text hover:text-bg",
    active: "bg-text text-bg",
  },
  neutral: {
    base: "border-text-muted text-text-muted bg-text-muted/[0.08] hover:bg-text-muted hover:text-bg",
    active: "bg-text-muted text-bg",
  },
  simple: {
    base: "border-border text-text hover:border-cyan-border hover:text-cyan",
    active: "bg-cyan text-bg border-cyan-border",
  },
};

type IconProps = { className?: string };

type OutlineButtonProps = {
  text: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
  Icon?: ComponentType<IconProps>;
  variant?: Variant;
  iconPosition?: "left" | "right";
  type?: "button" | "submit";
  disabled?: boolean;
};

function OutlineButton({
  text,
  onClick = NOOP,
  active,
  className = "h-10 w-fit text-sm px-4",
  Icon,
  variant = "theme",
  iconPosition = "right",
  type = "button",
  disabled,
}: OutlineButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center gap-2 border rounded-lg duration-300 ease-out",
        "font-semibold truncate capitalize bg-transparent",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        VARIANTS[variant].base,
        active ? VARIANTS[variant].active : "",
        className,
      )}
    >
      {Icon && iconPosition === "left" ? <Icon className="h-4 w-4" /> : null}
      {text}
      {Icon && iconPosition === "right" ? <Icon className="h-4 w-4" /> : null}
    </button>
  );
}

export default memo(OutlineButton);
