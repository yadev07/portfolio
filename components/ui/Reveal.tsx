"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { DURATION, EASE, viewportOnce } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Use sparingly — long chains of delays feel sluggish. */
  delay?: number;
}

/**
 * Quiet scroll reveal. Renders the final state immediately when the visitor
 * prefers reduced motion, so nothing depends on the animation running.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: DURATION.slow, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
