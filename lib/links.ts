/**
 * Placeholder-aware link helpers.
 *
 * Every URL in `data/` that has not been supplied yet holds a value starting
 * with `PLACEHOLDER_`. Rather than shipping dead links, components ask these
 * helpers whether a value is real and fall back to a labelled, non-clickable
 * state when it is not.
 */

export const PLACEHOLDER_PREFIX = "PLACEHOLDER_";

export function isPlaceholder(value: string | null | undefined): boolean {
  if (!value) return true;
  return value.trim().length === 0 || value.startsWith(PLACEHOLDER_PREFIX);
}

/** Returns the href, or null when the value is still a placeholder. */
export function resolveHref(value: string | null | undefined): string | null {
  return isPlaceholder(value) ? null : (value as string);
}

/** Builds a mailto: href, or null when no email has been set. */
export function mailtoHref(
  email: string | null | undefined,
  subject?: string,
  body?: string,
): string | null {
  if (isPlaceholder(email)) return null;
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${email as string}${query ? `?${query}` : ""}`;
}

/** github.com/handle — for display next to a social icon. */
export function prettyUrl(value: string): string {
  return value.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
