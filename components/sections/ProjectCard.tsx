import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { Project } from "@/data/projects";
import { MockupFrame } from "@/components/ui/MockupFrame";
import { PendingChip } from "@/components/ui/PlaceholderNote";
import { TechBadge } from "@/components/ui/TechBadge";
import { cn } from "@/lib/utils";

/** Stack if it was recorded, otherwise the domain topics. Never invented. */
export function projectTags(project: Project): string[] {
  if (project.stack.length > 0) return project.stack;
  return project.topics ?? [];
}

function TagRow({ project, limit }: { project: Project; limit: number }) {
  const tags = projectTags(project);
  if (tags.length === 0) return null;

  const shown = tags.slice(0, limit);
  const remaining = tags.length - shown.length;

  return (
    <ul className="flex flex-wrap gap-2">
      {shown.map((tag) => (
        <li key={tag}>
          <TechBadge label={tag} bare />
        </li>
      ))}
      {remaining > 0 ? (
        <li className="self-center text-[12.5px] text-haze">+{remaining} more</li>
      ) : null}
    </ul>
  );
}

const CARD_BASE =
  "group block rounded-card border border-white/[0.07] bg-ink-850/50 transition-colors duration-500 ease-smooth hover:border-saffron/30";

interface FeaturedProjectCardProps {
  project: Project;
  /** "lg" is the single wide lead tile; "md" sits in a two-up row. */
  size?: "lg" | "md";
  priority?: boolean;
}

export function FeaturedProjectCard({
  project,
  size = "md",
  priority = false,
}: FeaturedProjectCardProps) {
  const large = size === "lg";
  const screenshot = project.screenshots[0] ?? null;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(CARD_BASE, "overflow-hidden", large ? null : "h-full")}
      aria-label={`${project.title} — open project details`}
    >
      <div
        className={cn(
          large
            ? "grid items-center gap-8 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 lg:p-8"
            : "flex h-full flex-col gap-6 p-5 sm:p-6",
        )}
      >
        <div className={cn("min-w-0", large ? null : "order-2 flex flex-1 flex-col")}>
          <div className="flex flex-wrap items-center gap-3">
            {project.category ? (
              <p className="text-[12.5px] text-saffron/90">{project.category}</p>
            ) : (
              <PendingChip>Category to be added</PendingChip>
            )}
          </div>

          <h3
            className={cn(
              "mt-3 font-display text-paper transition-colors duration-500 group-hover:text-saffron-soft",
              large ? "text-display-sm" : "text-[1.5rem] leading-tight",
            )}
          >
            {project.title}
          </h3>

          <p
            className={cn(
              "mt-3 max-w-prose leading-relaxed text-haze",
              large ? "text-[15px] sm:text-base" : "text-[14.5px]",
            )}
          >
            {project.summary}
          </p>

          <div className={cn("mt-6", large ? null : "mt-auto pt-6")}>
            <TagRow project={project} limit={large ? 6 : 4} />

            <p className="mt-6 inline-flex items-center gap-2 text-[13px] text-paper-dim transition-colors duration-500 group-hover:text-saffron">
              {project.detailsPending ? "Open project" : "Read the case study"}
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-500 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </p>
          </div>
        </div>

        <div className={cn("min-w-0", large ? null : "order-1")}>
          <MockupFrame
            screenshot={screenshot}
            title={`${project.slug}.png`}
            hintPath={`public/projects/${project.slug}.png`}
            aspect={large ? "wide" : "video"}
            priority={priority}
            sizes={large ? "(min-width: 1024px) 620px, 100vw" : "(min-width: 1024px) 460px, 100vw"}
          />
        </div>
      </div>
    </Link>
  );
}

/** Dense row used for the remaining projects. */
export function ProjectRow({ project }: { project: Project }) {
  const tags = projectTags(project).slice(0, 3);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-2 py-5 transition-colors duration-500 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto] sm:gap-x-8"
    >
      <div className="min-w-0">
        <h3 className="truncate font-display text-[1.15rem] text-paper transition-colors duration-500 group-hover:text-saffron-soft">
          {project.title}
        </h3>
        <p className="mt-1 text-[12.5px] text-haze sm:hidden">
          {project.category ?? "Category to be added"}
        </p>
      </div>

      <div className="hidden min-w-0 sm:block">
        <p className="truncate text-[13.5px] text-haze">{project.summary}</p>
        {tags.length > 0 ? (
          <p className="mt-1.5 truncate font-mono text-[11.5px] text-haze">
            {tags.join(" / ")}
          </p>
        ) : null}
      </div>

      <ArrowUpRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-haze transition-all duration-500 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-saffron"
      />
    </Link>
  );
}
