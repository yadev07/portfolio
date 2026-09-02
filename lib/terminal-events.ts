/**
 * The terminal lives at the root of the layout while its triggers live in the
 * navbar and the hero. Rather than threading a context provider through the
 * tree for one boolean, they communicate over a single custom event.
 */

export const TERMINAL_OPEN_EVENT = "portfolio:open-terminal";

export function requestTerminal(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(TERMINAL_OPEN_EVENT));
}
