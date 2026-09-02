"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, TerminalSquare } from "lucide-react";

import { profile } from "@/data/profile";
import { projectCount } from "@/data/projects";
import { technologyCount } from "@/data/skills";
import { learningCount } from "@/data/learning";
import { Counter } from "@/components/ui/Counter";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { ResumeButton } from "@/components/ui/ResumeButton";
import { SocialIconLinks } from "@/components/ui/SocialLinks";
import { fadeUp, riseIn, staggerChildren } from "@/lib/motion";
import { requestTerminal } from "@/lib/terminal-events";

import { CodeWindow } from "./CodeWindow";

/** "Yadev Singh Nishad" → ["Yadev", "Singh Nishad"] so the name can break well. */
function splitName(name: string): string[] {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return [name];
  return [parts[0] as string, parts.slice(1).join(" ")];
}

const nameLines = splitName(profile.name);
/** The two claims beyond the primary role, shown as quiet chips. */
const secondaryIdentity = profile.identity.filter((item) => item !== profile.role);

export function Hero() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? "show" : "hidden";

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative isolate scroll-mt-24 pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-32 lg:pt-40"
    >
      <div aria-hidden="true" className="ambient animate-drift" />

      <div className="shell relative">
        <motion.div
          variants={staggerChildren(0.07, 0.05)}
          initial={initial}
          animate="show"
          className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-14"
        >
          <div className="min-w-0">
            <motion.p variants={fadeUp} className="text-[13px] text-haze">
              {profile.role} at {profile.university}
            </motion.p>

            <h1
              id="home-heading"
              className="mt-5 font-display text-display-xl text-paper"
            >
              {nameLines.map((line, index) => (
                <span
                  key={line}
                  className="-mb-[0.14em] block overflow-hidden pb-[0.14em]"
                >
                  <motion.span
                    variants={riseIn}
                    className={index === nameLines.length - 1 ? "block text-paper-dim" : "block"}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-[42ch] text-[17px] leading-relaxed text-paper-dim sm:text-lg"
            >
              {profile.tagline}
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-2">
              {secondaryIdentity.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/[0.08] px-3 py-1.5 text-[12.5px] text-haze"
                >
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <ButtonLink href="#projects" variant="accent">
                  View projects
                </ButtonLink>
              </Magnetic>
              <Magnetic>
                <ButtonLink href="#contact" variant="outline">
                  Contact me
                </ButtonLink>
              </Magnetic>
              <ResumeButton variant="ghost" label="Download resume" />
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex items-center gap-5">
              <SocialIconLinks />
              <span aria-hidden="true" className="h-px flex-1 bg-white/[0.07]" />
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="min-w-0">
            <CodeWindow />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={requestTerminal}
                className="inline-flex items-center gap-2 text-[12.5px] text-haze transition-colors duration-300 hover:text-saffron"
              >
                <TerminalSquare aria-hidden="true" className="h-3.5 w-3.5" />
                Or browse this site as a terminal
              </button>
              <a
                href="#about"
                className="inline-flex items-center gap-2 text-[12.5px] text-haze transition-colors duration-300 hover:text-paper"
              >
                Keep reading
                <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/[0.07] pt-9 sm:mt-20 sm:grid-cols-4 sm:gap-x-8">
          <Fact label="Projects built" value={projectCount} />
          <Fact label="Technologies used" value={technologyCount} />
          <Fact label="Conferences & workshops" value={learningCount} />
          <Fact label="Expected graduation" text={String(profile.graduationYear)} />
        </dl>
      </div>
    </section>
  );
}

interface FactProps {
  label: string;
  /** Counts up when it scrolls into view. Only ever a real, derived number. */
  value?: number;
  /** A value that shouldn't animate, like a year. */
  text?: string;
}

function Fact({ label, value, text }: FactProps) {
  return (
    // Reversed so the DOM keeps the required <dt> → <dd> order while the number
    // still reads above its label.
    <div className="flex flex-col-reverse">
      <dt className="mt-3 text-[12.5px] leading-snug text-haze">{label}</dt>
      <dd className="font-display text-[2rem] leading-none tabular-nums text-paper sm:text-[2.25rem]">
        {typeof value === "number" ? <Counter value={value} /> : text}
      </dd>
    </div>
  );
}
