import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  /** Must match the matching entry in data/navigation.ts for scroll-spy. */
  id: string;
  children: ReactNode;
  className?: string;
  /** Pulls a section closer to the one above it when they belong together. */
  tight?: boolean;
}

export function Section({ id, children, className, tight = false }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "scroll-mt-24",
        tight ? "py-14 sm:py-16 lg:py-20" : "py-20 sm:py-28 lg:py-36",
        className,
      )}
    >
      <div className="shell">{children}</div>
    </section>
  );
}
