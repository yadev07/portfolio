import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ProjectsIndex } from "@/components/sections/ProjectsIndex";
import { profile } from "@/data/profile";
import { projectCount } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: `Every project built by ${profile.name} — ${projectCount} web, database and AI projects from coursework and self-directed work.`,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="pb-24 pt-28 sm:pb-32 sm:pt-32 lg:pt-40">
      <div className="shell">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] text-haze transition-colors duration-300 hover:text-paper"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          Back to the portfolio
        </Link>

        <header className="mt-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <h1 className="font-display text-display-lg text-paper">Projects</h1>
          <p className="text-[13px] tabular-nums text-haze">{projectCount} in total</p>
        </header>

        <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-haze sm:text-base">
          Coursework projects and things I built to learn a technology properly. The case-study
          write-ups are still being filled in — where a detail hasn&apos;t been confirmed, the page
          says so instead of guessing.
        </p>

        <div
          aria-hidden="true"
          className="mt-10 h-px w-full bg-gradient-to-r from-ink-600 via-ink-700 to-transparent"
        />

        <div className="mt-10">
          <ProjectsIndex />
        </div>
      </div>
    </div>
  );
}
