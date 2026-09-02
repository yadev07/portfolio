/** Tiny class-name joiner. Avoids pulling in clsx for a five-line function. */
export function cn(
  ...values: Array<string | number | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}

/** "Yadev Singh Nishad" -> "YSN". Used by the footer mark. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
