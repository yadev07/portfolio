"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

import { projectCategories, projects } from "@/data/projects";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { FeaturedProjectCard } from "./ProjectCard";

const ALL = "all";
const UNCATEGORISED = "To be categorised";

export function ProjectsIndex() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<string>(ALL);

  const filters = useMemo(() => {
    const hasUncategorised = projects.some((project) => !project.category);
    return [ALL, ...projectCategories, ...(hasUncategorised ? [UNCATEGORISED] : [])];
  }, []);

  const visible = useMemo(() => {
    if (active === ALL) return projects;
    if (active === UNCATEGORISED) return projects.filter((project) => !project.category);
    return projects.filter((project) => project.category === active);
  }, [active]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="scroll-thin -mx-1 flex gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0"
        >
          {filters.map((filter) => {
            const selected = filter === active;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(filter)}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors duration-300",
                  selected
                    ? "border-saffron/60 bg-saffron/10 text-paper"
                    : "border-white/[0.08] text-haze hover:border-white/20 hover:text-paper-dim",
                )}
              >
                {filter === ALL ? "All" : filter}
              </button>
            );
          })}
        </div>

        <p role="status" className="text-[13px] tabular-nums text-haze">
          {visible.length} of {projects.length} shown
        </p>
      </div>

      <motion.div layout={!reduceMotion} className="mt-8 grid items-start gap-4 lg:grid-cols-2">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.slug}
              layout={!reduceMotion}
              initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: DURATION.fast, ease: EASE }}
              className="h-full"
            >
              <FeaturedProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
