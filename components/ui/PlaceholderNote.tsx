import { PencilLine } from "lucide-react";

import { cn } from "@/lib/utils";

interface PlaceholderNoteProps {
  /** What is missing, e.g. "Problem — to be written". */
  label: string;
  /** How to fill it in, in plain language. */
  hint: string;
  /** The exact file and field to edit, e.g. "data/projects.ts → problem". */
  path?: string;
  className?: string;
}

/**
 * An honest empty state.
 *
 * Used everywhere information was not supplied. It says what belongs here and
 * exactly where to add it, so a gap never reads as a bug — and nothing has to
 * be invented to fill the layout.
 */
export function PlaceholderNote({ label, hint, path, className }: PlaceholderNoteProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-dashed border-ink-600 bg-ink-800/40 p-4 sm:p-5",
        className,
      )}
    >
      <p className="flex items-center gap-2 text-[13px] font-medium text-paper-dim">
        <PencilLine aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-saffron/70" />
        {label}
      </p>
      <p className="mt-2 max-w-prose text-[13px] leading-relaxed text-haze">{hint}</p>
      {path ? (
        <code className="mt-3 inline-block rounded bg-ink-950/60 px-2 py-1 font-mono text-[11.5px] text-saffron/85">
          {path}
        </code>
      ) : null}
    </div>
  );
}

interface PendingChipProps {
  children: string;
  className?: string;
}

/** Inline version of the above, for a single missing value like a date. */
export function PendingChip({ children, className }: PendingChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border border-dashed border-ink-600 px-2 py-0.5 font-sans text-[11.5px] text-haze",
        className,
      )}
    >
      {children}
    </span>
  );
}
