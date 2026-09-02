import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70dvh] flex-col justify-center py-32">
      <p className="font-mono text-[13px] text-saffron">404</p>
      <h1 className="mt-4 max-w-xl font-display text-display-lg text-paper">
        That page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-haze">
        The link may be out of date, or the project you were looking for hasn&apos;t been
        published yet.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink href="/" variant="accent">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to the portfolio
        </ButtonLink>
        <ButtonLink href="/projects" variant="outline">
          Browse all projects
        </ButtonLink>
      </div>
    </div>
  );
}
