"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

interface MagneticProps {
  children: ReactNode;
  /** Maximum travel in px. Keep it small — 4–8px reads as weight, not gimmick. */
  strength?: number;
  className?: string;
}

/**
 * Gives a control a slight pull towards the cursor. Applied only to the two
 * primary calls to action, not to every clickable thing on the page.
 */
export function Magnetic({ children, strength = 6, className }: MagneticProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 240, damping: 22, mass: 0.4 });
  const y = useSpring(0, { stiffness: 240, damping: 22, mass: 0.4 });

  if (reduceMotion) {
    return <span className={cn("inline-block", className)}>{children}</span>;
  }

  const clamp = (value: number) => Math.max(-1, Math.min(1, value)) * strength;

  const handleMove = (event: ReactPointerEvent<HTMLSpanElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    x.set(clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)));
    y.set(clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </motion.span>
  );
}
