import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "accent" | "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-[10px] font-sans font-medium transition-colors duration-300 ease-smooth disabled:cursor-not-allowed disabled:opacity-50";

const VARIANTS: Record<ButtonVariant, string> = {
  accent: "bg-saffron text-ink-950 hover:bg-saffron-soft",
  solid: "bg-paper text-ink-900 hover:bg-white",
  outline:
    "border border-white/[0.12] text-paper hover:border-saffron/50 hover:bg-white/[0.03]",
  ghost: "text-haze hover:text-paper",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-sm",
};

export function buttonClass(
  variant: ButtonVariant = "outline",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({ variant, size, className, children, ...rest }: ButtonProps) {
  return (
    <button type="button" className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Renders a download anchor (used for the resume PDF). */
  download?: boolean;
  ariaLabel?: string;
}

export function ButtonLink({
  href,
  children,
  variant,
  size,
  className,
  download = false,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = buttonClass(variant, size, className);

  if (download) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel} download>
        {children}
      </a>
    );
  }

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  );
}
