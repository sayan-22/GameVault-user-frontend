"use client";

import Link from "next/link";
import { memo, type ComponentType } from "react";
import { cn } from "@/utils/cn";

const NOOP = () => {};

type IconProps = { className?: string };

type LinkButtonProps = {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  Icon?: ComponentType<IconProps>;
  iconPosition?: "left" | "right";
};

// Inline link-style button: text + optional icon. Underlines on hover.
// Renders a Next <Link> when `href` is given, otherwise a <button>.
function LinkButton({
  text,
  href,
  onClick = NOOP,
  className,
  Icon,
  iconPosition = "right",
}: LinkButtonProps) {
  const classes = cn(
    "group inline-flex items-center gap-1 text-xs font-medium text-text-secondary transition-colors hover:text-cyan hover:underline",
    className,
  );

  const content = (
    <>
      {Icon && iconPosition === "left" ? <Icon className="h-4 w-4" /> : null}
      {text}
      {Icon && iconPosition === "right" ? <Icon className="h-4 w-4" /> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

export default memo(LinkButton);
