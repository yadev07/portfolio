import { Award, ChevronDown } from "lucide-react";

import { achievementSlots, achievements } from "@/data/achievements";
import { PendingChip, PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeading
        id="achievements"
        title="Achievements"
        lead="Only what is confirmed. The categories at the bottom are placeholders I can fill in as things happen."
        meta={achievements.length === 1 ? "1 recorded" : `${achievements.length} recorded`}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {achievements.map((achievement) => (
          <Reveal key={achievement.id}>
            <article className="panel flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-3 py-1.5 text-[11.5px] text-haze">
                  <Award aria-hidden="true" className="h-3.5 w-3.5 text-saffron/80" />
                  {achievement.kind}
                </span>
                {achievement.result ? (
                  <p className="text-right font-display text-[1.25rem] leading-none text-saffron">
                    {achievement.result}
                  </p>
                ) : null}
              </div>

              <h3 className="mt-6 font-display text-[1.625rem] leading-tight text-paper">
                {achievement.title}
              </h3>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px] text-haze">
                {achievement.organiser ? (
                  <span>{achievement.organiser}</span>
                ) : (
                  <PendingChip>Organiser to be added</PendingChip>
                )}
                {achievement.date ? (
                  <span className="tabular-nums">{achievement.date}</span>
                ) : (
                  <PendingChip>Date to be added</PendingChip>
                )}
              </div>

              {achievement.description ? (
                <p className="mt-5 text-[14.5px] leading-relaxed text-haze">
                  {achievement.description}
                </p>
              ) : (
                <PlaceholderNote
                  className="mt-6"
                  label="What you built — to be written"
                  hint="A couple of sentences on the problem, what you built and who you worked with reads much stronger than the placing alone."
                  path="data/achievements.ts → organiser, date, description"
                />
              )}
            </article>
          </Reveal>
        ))}
      </div>

      {achievementSlots.length > 0 ? (
        <Reveal className="mt-10">
          <details className="group rounded-card border border-dashed border-ink-600 bg-ink-800/30">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[13.5px] text-haze transition-colors duration-300 hover:text-paper-dim sm:px-6 [&::-webkit-details-marker]:hidden">
              <span>
                Space reserved for {achievementSlots.length} more categories — certifications,
                hackathons, academics and workshops
              </span>
              <ChevronDown
                aria-hidden="true"
                className="h-4 w-4 shrink-0 transition-transform duration-300 group-open:rotate-180"
              />
            </summary>

            <ul className="divide-y divide-white/[0.05] border-t border-white/[0.06]">
              {achievementSlots.map((slot) => (
                <li key={slot.id} className="px-5 py-4 sm:px-6">
                  <p className="text-[13.5px] font-medium text-paper-dim">{slot.label}</p>
                  <p className="mt-1.5 max-w-prose text-[13px] leading-relaxed text-haze">
                    {slot.hint}
                  </p>
                </li>
              ))}
            </ul>
          </details>
        </Reveal>
      ) : null}
    </Section>
  );
}
