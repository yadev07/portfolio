import type { SkillTone } from "@/data/skills";
import { cn } from "@/lib/utils";

const TONE_DOT: Record<SkillTone, string> = {
  saffron: "bg-saffron/80",
  indigo: "bg-[#7C9CE0]/75",
  teal: "bg-[#5FA79A]/80",
  neutral: "bg-haze/60",
};

interface TechBadgeProps {
  label: string;
  tone?: SkillTone;
  /** Drops the coloured dot — used inside dense project rows. */
  bare?: boolean;
  className?: string;
}

/**
 * A technology chip. No percentage, no star rating, no progress bar — those
 * numbers would be invented, and technical readers discount them anyway.
 */
export function TechBadge({ label, tone = "neutral", bare = false, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-white/[0.07] bg-white/[0.02] px-2.5 py-1.5 text-[12.5px] leading-none text-paper-dim transition-colors duration-300 hover:border-saffron/40 hover:text-paper sm:text-[13px]",
        className,
      )}
    >
      {bare ? null : (
        <span
          aria-hidden="true"
          className={cn("h-1.5 w-1.5 shrink-0 rounded-full", TONE_DOT[tone])}
        />
      )}
      {label}
    </span>
  );
}
