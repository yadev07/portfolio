import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Same id as the parent <Section>; produces `${id}-heading`. */
  id: string;
  title: string;
  /** One supporting sentence. Optional — silence is fine. */
  lead?: string;
  /**
   * A fact about the content, right-aligned against the title: "8 projects",
   * "41 technologies". Information, not decoration — leave it out otherwise.
   */
  meta?: string;
  className?: string;
}

export function SectionHeading({ id, title, lead, meta, className }: SectionHeadingProps) {
  return (
    <header className={cn("mb-10 sm:mb-14", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h2 id={`${id}-heading`} className="font-display text-display-md text-paper">
          {title}
        </h2>
        {meta ? (
          <p className="font-sans text-[13px] tabular-nums text-haze">{meta}</p>
        ) : null}
      </div>
      <div
        aria-hidden="true"
        className="mt-5 h-px w-full bg-gradient-to-r from-ink-600 via-ink-700 to-transparent"
      />
      {lead ? (
        <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-haze sm:text-base">
          {lead}
        </p>
      ) : null}
    </header>
  );
}
