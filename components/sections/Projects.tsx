import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { featuredProjects, otherProjects, projectCount } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { FeaturedProjectCard, ProjectRow } from "./ProjectCard";

const [leadProject, ...supportingProjects] = featuredProjects;

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        id="projects"
        title="Projects"
        lead="Work from coursework and my own experiments. The detailed write-ups are still going in — each project page shows what is confirmed so far and marks what is not."
        meta={`${projectCount} projects`}
      />

      {leadProject ? (
        <Reveal>
          <FeaturedProjectCard project={leadProject} size="lg" priority />
        </Reveal>
      ) : null}

      {supportingProjects.length > 0 ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {supportingProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06} className="h-full">
              <FeaturedProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      ) : null}

      {otherProjects.length > 0 ? (
        <Reveal className="mt-16 sm:mt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h3 className="font-display text-[1.375rem] text-paper">Other work</h3>
            <p className="text-[13px] tabular-nums text-haze">
              {otherProjects.length} more
            </p>
          </div>

          <div className="mt-4 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {otherProjects.map((project) => (
              <ProjectRow key={project.slug} project={project} />
            ))}
          </div>

          <Link
            href="/projects"
            className="mt-8 inline-flex items-center gap-2 text-[13.5px] text-paper-dim transition-colors duration-300 hover:text-saffron"
          >
            Browse every project on one page
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Reveal>
      ) : null}
    </Section>
  );
}
