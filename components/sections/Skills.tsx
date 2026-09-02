"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { skillCategories, technologyCount } from "@/data/skills";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ALL = "all";

const TONE_DOT: Record<string, string> = {
  saffron: "bg-saffron/80",
  indigo: "bg-[#7C9CE0]/75",
  teal: "bg-[#5FA79A]/80",
  neutral: "bg-haze/60",
};

export function Skills() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(ALL);

  const showingAll = activeId === ALL;
  const visible = showingAll
    ? skillCategories
    : skillCategories.filter((category) => category.id === activeId);

  return (
    <Section id="skills">
      <SectionHeading
        id="skills"
        title="Skills"
        lead="Grouped by what I use them for. No self-scored percentages — the projects further down are the evidence."
        meta={`${technologyCount} technologies, ${skillCategories.length} areas`}
      />

      <div
        role="group"
        aria-label="Filter skills by area"
        className="scroll-thin -mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-2 sm:mb-10 sm:flex-wrap sm:overflow-visible"
      >
        {[{ id: ALL, label: "All" }, ...skillCategories].map((category) => {
          const selected = category.id === activeId;
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActiveId(category.id)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors duration-300",
                selected
                  ? "border-saffron/60 bg-saffron/10 text-paper"
                  : "border-white/[0.08] text-haze hover:border-white/20 hover:text-paper-dim",
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <motion.div
        layout={!reduceMotion}
        className={cn(
          "grid items-start gap-4",
          showingAll ? "sm:grid-cols-2 xl:grid-cols-3" : "max-w-2xl",
        )}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((category) => (
            <motion.article
              key={category.id}
              layout={!reduceMotion}
              initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: DURATION.fast, ease: EASE }}
              className={cn(
                "panel h-full p-5 sm:p-6",
                showingAll && category.items.length > 8 ? "sm:col-span-2 xl:col-span-1" : null,
              )}
            >
              <h3 className="flex items-center gap-2.5 text-[14.5px] font-medium text-paper">
                <span
                  aria-hidden="true"
                  className={cn("h-1.5 w-1.5 shrink-0 rounded-full", TONE_DOT[category.tone])}
                />
                {category.label}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-haze">{category.note}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li key={item}>
                    <TechBadge label={item} tone={category.tone} />
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
