"use client";

import Link from "next/link";
import { forwardRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type IconButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent) => void;
  className?: string; // size + colors live here so each control keeps its look
  ariaLabel?: string;
  ariaExpanded?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
};

// Icon-only button primitive. Renders a Next <Link> when `href` is given,
// otherwise a <button> (with ref forwarding for popover triggers).
const BASE = "grid place-items-center rounded-lg border";

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { children, href, onClick, className, ariaLabel, ariaExpanded, type = "button", disabled },
    ref,
  ) {
    const classes = cn(BASE, className);

    if (href) {
      return (
        <Link href={href} aria-label={ariaLabel} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        className={classes}
      >
        {children}
      </button>
    );
  },
);

export default IconButton;
