import type { Variants } from "framer-motion";

/**
 * Shared motion vocabulary.
 *
 * Two rules keep the page from feeling like an animation showreel:
 * 1. There is exactly ONE non-user-triggered sequence — the hero on first load.
 * 2. Everything else is a short, quiet response to scroll, hover or a click.
 *
 * Components read `useReducedMotion()` and render the final state directly when
 * the visitor has asked for less motion.
 */

/** A calm ease-out. Used everywhere so timings feel like one system. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.25,
  base: 0.5,
  slow: 0.7,
} as const;

/** Reveal-on-scroll defaults: fire once, slightly before the block is centred. */
export const viewportOnce = { once: true, margin: "-72px 0px -72px 0px" };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE } },
};

/** Parent variant that walks its children in. */
export function staggerChildren(stagger = 0.06, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Hero words rising from the baseline — the one orchestrated load sequence. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: "0.4em" },
  show: {
    opacity: 1,
    y: "0em",
    transition: { duration: 0.9, ease: EASE },
  },
};

/** Mobile menu panel. */
export const panelIn: Variants = {
  hidden: { opacity: 0, y: -8 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: DURATION.fast, ease: "easeIn" } },
};
