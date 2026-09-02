"use client";

import { Download, FileText } from "lucide-react";
import { useState } from "react";

import { resume } from "@/data/profile";
import { cn } from "@/lib/utils";

import { Button, ButtonLink } from "./Button";
import type { ButtonSize, ButtonVariant } from "./Button";

interface ResumeButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  label?: string;
}

/**
 * Resume control.
 *
 * While `resume.available` is false the button stays where recruiters expect it
 * but explains that the PDF has not been added instead of sending them to a
 * 404. Drop `public/resume.pdf` in place and flip the flag in
 * `data/profile.ts` — this becomes a real download link with no other changes.
 */
export function ResumeButton({
  variant = "outline",
  size = "md",
  className,
  label = "Resume",
}: ResumeButtonProps) {
  const [showNotice, setShowNotice] = useState(false);

  if (resume.available) {
    return (
      <ButtonLink href={resume.href} variant={variant} size={size} className={className} download>
        <Download aria-hidden="true" className="h-4 w-4" />
        {label}
      </ButtonLink>
    );
  }

  return (
    <span className="relative inline-block">
      <Button
        variant={variant}
        size={size}
        className={className}
        aria-expanded={showNotice}
        onClick={() => setShowNotice((open) => !open)}
      >
        <FileText aria-hidden="true" className="h-4 w-4" />
        {label}
      </Button>

      {showNotice ? (
        <span
          role="status"
          className={cn(
            "absolute left-0 top-full z-30 mt-2 block w-[min(20rem,78vw)] rounded-lg border border-white/10 bg-ink-800 p-3.5 text-left text-[12.5px] leading-relaxed text-haze shadow-lift",
          )}
        >
          The PDF has not been added yet. Put your file at{" "}
          <code className="font-mono text-[11.5px] text-saffron/90">public/resume.pdf</code> and set{" "}
          <code className="font-mono text-[11.5px] text-saffron/90">resume.available = true</code> in{" "}
          <code className="font-mono text-[11.5px] text-saffron/90">data/profile.ts</code>.
        </span>
      ) : null}
    </span>
  );
}
