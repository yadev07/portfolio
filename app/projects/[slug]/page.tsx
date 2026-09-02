import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MockupFrame } from "@/components/ui/MockupFrame";
import { PendingChip, PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Reveal } from "@/components/ui/Reveal";
import { TechBadge } from "@/components/ui/TechBadge";
import { profile } from "@/data/profile";
import { getAdjacentProjects, getProject, projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { isPlaceholder, resolveHref } from "@/lib/links";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found", robots: { index: false, follow: false } };
  }

  return {
    title: project.title,
    description: `${project.summary} A project by ${profile.name}.`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${profile.name}`,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
  };
}

/** A prose block that either has real content or says what is missing. */
function TextBlock({
  title,
  body,
  placeholderLabel,
  hint,
  path,
}: {
  title: string;
  body: string | null;
  placeholderLabel: string;
  hint: string;
  path: string;
}) {
  return (
    <section>
      <h2 className="font-display text-[1.5rem] text-paper">{title}</h2>
      {body ? (
        <div className="mt-4 space-y-4">
          {body.split("\n\n").map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="max-w-prose text-[15px] leading-relaxed text-haze sm:text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : (
        <PlaceholderNote
          className="mt-4 max-w-xl"
          label={placeholderLabel}
          hint={hint}
          path={path}
        />
      )}
    </section>
  );
}

function LinkRow({ project }: { project: Project }) {
  const repo = resolveHref(project.github);
  const demo = resolveHref(project.demo);

  const base =
    "inline-flex h-10 items-center gap-2 rounded-[10px] border px-4 text-[13.5px] transition-colors duration-300";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {repo ? (
        <a
          href={repo}
          target="_blank"
          rel="noreferrer noopener"
          className={cn(base, "border-white/[0.12] text-paper hover:border-saffron/50")}
        >
          <Github aria-hidden="true" className="h-4 w-4" />
          Source code
        </a>
      ) : (
        <span
          aria-disabled="true"
          className={cn(base, "cursor-not-allowed border-dashed border-ink-600 text-haze")}
        >
          <Github aria-hidden="true" className="h-4 w-4 text-haze-dim" />
          Repository link to be added
        </span>
      )}

      {demo ? (
        <a
          href={demo}
          target="_blank"
          rel="noreferrer noopener"
          className={cn(base, "border-saffron/50 bg-saffron/[0.08] text-saffron-soft hover:bg-saffron/[0.14]")}
        >
          <ExternalLink aria-hidden="true" className="h-4 w-4" />
          Live demo
        </a>
      ) : (
        <span
          aria-disabled="true"
          className={cn(base, "cursor-not-allowed border-dashed border-ink-600 text-haze")}
        >
          <ExternalLink aria-hidden="true" className="h-4 w-4 text-haze-dim" />
          Live demo to be added
        </span>
      )}
    </div>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);
  const heroShot = project.screenshots[0] ?? null;
  const extraShots = project.screenshots.slice(1);
  const hasStack = project.stack.length > 0;
  const topics = project.topics ?? [];

  return (
    <div className="pb-24 pt-28 sm:pt-32 lg:pt-40">
      <article className="shell">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[13px] text-haze transition-colors duration-300 hover:text-paper"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          All projects
        </Link>

        <header className="mt-8">
          {project.category ? (
            <p className="text-[13px] text-saffron/90">{project.category}</p>
          ) : (
            <PendingChip>Category to be added</PendingChip>
          )}

          <h1 className="mt-4 max-w-3xl font-display text-display-lg text-paper">
            {project.title}
          </h1>

          <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-paper-dim sm:text-lg">
            {project.summary}
          </p>

          <div className="mt-8">
            <LinkRow project={project} />
          </div>
        </header>

        <Reveal className="mt-12">
          <MockupFrame
            screenshot={heroShot}
            title={`${project.slug}.png`}
            hintPath={`public/projects/${project.slug}.png`}
            aspect="wide"
            priority
            sizes="(min-width: 1024px) 900px, 100vw"
          />
        </Reveal>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-16">
          <div className="min-w-0 space-y-14">
            {project.detailsPending ? (
              <PlaceholderNote
                className="max-w-xl"
                label="Write-up coming"
                hint="This project's details have not been shared yet, so nothing has been written for it. Fill in the summary, problem, solution, stack and features and this page fills itself out."
                path="data/projects.ts → the smartsbm entry"
              />
            ) : (
              <>
                <TextBlock
                  title="Overview"
                  body={project.overview}
                  placeholderLabel="Overview — to be written"
                  hint="A short paragraph on what the project is and who it is for. Two or three sentences is plenty."
                  path="data/projects.ts → overview"
                />

                <TextBlock
                  title="The problem"
                  body={project.problem}
                  placeholderLabel="Problem — to be written"
                  hint="What was awkward, slow or missing before this existed? Write it plainly, from your own experience of building it."
                  path="data/projects.ts → problem"
                />

                <TextBlock
                  title="The solution"
                  body={project.solution}
                  placeholderLabel="Solution — to be written"
                  hint="How the project answers the problem, and any decision you made that you would defend in an interview."
                  path="data/projects.ts → solution"
                />

                <section>
                  <h2 className="font-display text-[1.5rem] text-paper">Key features</h2>
                  {project.features.length > 0 ? (
                    <ul className="mt-4 space-y-2.5">
                      {project.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex gap-3 text-[15px] leading-relaxed text-haze"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-saffron/70"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <PlaceholderNote
                      className="mt-4 max-w-xl"
                      label="Features — to be listed"
                      hint="List what a user can actually do. Only real features — an empty list is better than an invented one."
                      path="data/projects.ts → features"
                    />
                  )}
                </section>

                <TextBlock
                  title="Architecture"
                  body={project.architecture}
                  placeholderLabel="Architecture — to be described"
                  hint="How the pieces fit together: client, server, database, any model or API in between. A few sentences, or a short list."
                  path="data/projects.ts → architecture"
                />

                <TextBlock
                  title="Challenges & learnings"
                  body={project.challenges}
                  placeholderLabel="Challenges — to be written"
                  hint="What broke, what you had to read up on, what you would do differently. This is usually the most convincing part of a student project."
                  path="data/projects.ts → challenges"
                />
              </>
            )}

            <section>
              <h2 className="font-display text-[1.5rem] text-paper">Screenshots</h2>
              {extraShots.length > 0 ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {extraShots.map((shot) => (
                    <MockupFrame
                      key={shot.src}
                      screenshot={shot}
                      title={shot.src.split("/").pop() ?? "screenshot"}
                      hintPath={shot.src}
                      aspect="video"
                      sizes="(min-width: 640px) 420px, 100vw"
                    />
                  ))}
                </div>
              ) : (
                <PlaceholderNote
                  className="mt-4 max-w-xl"
                  label="Screenshots — to be added"
                  hint="Drop PNG or JPG files into public/projects/ and list them in the project's screenshots array with a short alt description each."
                  path="data/projects.ts → screenshots"
                />
              )}
            </section>
          </div>

          <aside className="min-w-0 space-y-8 lg:sticky lg:top-28 lg:h-fit">
            <div className="panel p-5 sm:p-6">
              <h2 className="text-[13px] font-medium text-paper">
                {hasStack ? "Technologies" : "Focus areas"}
              </h2>

              {hasStack ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <TechBadge label={tech} />
                    </li>
                  ))}
                </ul>
              ) : topics.length > 0 ? (
                <>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {topics.map((topic) => (
                      <li key={topic}>
                        <TechBadge label={topic} bare />
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[12.5px] leading-relaxed text-haze">
                    The exact stack for this project hasn&apos;t been recorded yet — add it to{" "}
                    <code className="font-mono text-[11.5px] text-saffron/85">stack</code> and it
                    replaces this note.
                  </p>
                </>
              ) : (
                <PlaceholderNote
                  className="mt-4"
                  label="Stack — to be recorded"
                  hint="List the languages, frameworks and databases you actually used."
                  path="data/projects.ts → stack"
                />
              )}
            </div>

            <div className="panel p-5 sm:p-6">
              <h2 className="text-[13px] font-medium text-paper">Links</h2>
              <ul className="mt-4 space-y-2 text-[13px]">
                <li className="flex items-center justify-between gap-3">
                  <span className="text-haze">Repository</span>
                  {isPlaceholder(project.github) ? (
                    <PendingChip>to be added</PendingChip>
                  ) : (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-saffron hover:underline hover:underline-offset-4"
                    >
                      GitHub
                    </a>
                  )}
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-haze">Live demo</span>
                  {isPlaceholder(project.demo) ? (
                    <PendingChip>to be added</PendingChip>
                  ) : (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-saffron hover:underline hover:underline-offset-4"
                    >
                      Open
                    </a>
                  )}
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <nav
          aria-label="Other projects"
          className="mt-20 grid gap-4 border-t border-white/[0.07] pt-8 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              className="group panel p-5 transition-colors duration-500 hover:border-saffron/30"
            >
              <span className="inline-flex items-center gap-2 text-[12.5px] text-haze">
                <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
                Previous
              </span>
              <p className="mt-2 font-display text-[1.15rem] text-paper transition-colors duration-500 group-hover:text-saffron-soft">
                {previous.title}
              </p>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group panel p-5 text-right transition-colors duration-500 hover:border-saffron/30 sm:col-start-2"
            >
              <span className="inline-flex items-center gap-2 text-[12.5px] text-haze">
                Next
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </span>
              <p className="mt-2 font-display text-[1.15rem] text-paper transition-colors duration-500 group-hover:text-saffron-soft">
                {next.title}
              </p>
            </Link>
          ) : null}
        </nav>
      </article>
    </div>
  );
}
