import { Building2, MapPin } from "lucide-react";

import { experience } from "@/data/experience";
import { PendingChip, PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        id="experience"
        title="Experience"
        lead="One internship so far. The role title, dates and the work itself are marked as pending rather than guessed — I'll fill them in from my own records."
      />

      <div className="relative pl-7 sm:pl-10">
        <div
          aria-hidden="true"
          className="spine absolute left-[3px] top-1 h-full w-px sm:left-[5px]"
        />

        <ol className="space-y-12">
          {experience.map((entry) => (
            <li key={entry.id} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-7 top-2 h-[7px] w-[7px] rounded-full border border-saffron/60 bg-ink-900 sm:-left-10"
              />

              <Reveal>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h3 className="font-display text-[1.5rem] leading-tight text-paper">
                    {entry.organisation}
                  </h3>
                  <span className="rounded-full border border-saffron/40 bg-saffron/[0.08] px-2.5 py-1 text-[11.5px] text-saffron-soft">
                    {entry.kind}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-haze">
                  {entry.location ? (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-haze-dim" />
                      {entry.location}
                    </span>
                  ) : null}

                  {entry.role ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 aria-hidden="true" className="h-3.5 w-3.5 text-haze-dim" />
                      {entry.role}
                    </span>
                  ) : (
                    <PendingChip>Role title to be added</PendingChip>
                  )}

                  {entry.period ? (
                    <span className="tabular-nums">{entry.period}</span>
                  ) : (
                    <PendingChip>Dates to be added</PendingChip>
                  )}
                </div>

                {entry.summary ? (
                  <p className="mt-5 max-w-prose text-[15px] leading-relaxed text-paper-dim">
                    {entry.summary}
                  </p>
                ) : null}

                {entry.responsibilities.length > 0 ? (
                  <ul className="mt-5 space-y-2.5">
                    {entry.responsibilities.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[14.5px] leading-relaxed text-haze"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-saffron/60"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {entry.stack.length > 0 ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {entry.stack.map((tech) => (
                      <li key={tech}>
                        <TechBadge label={tech} />
                      </li>
                    ))}
                  </ul>
                ) : null}

                {!entry.summary && entry.responsibilities.length === 0 ? (
                  <PlaceholderNote
                    className="mt-6 max-w-xl"
                    label="Internship experience — details to be updated"
                    hint="Add the role title, the dates, a short summary of what you built, the main responsibilities and the technologies you used. Each one appears here as soon as it has a value."
                    path="data/experience.ts → role, period, summary, responsibilities, stack"
                  />
                ) : null}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
