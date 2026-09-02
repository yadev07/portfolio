import { GraduationCap, MapPin } from "lucide-react";

import { education } from "@/data/education";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Education() {
  return (
    <Section id="education">
      <SectionHeading id="education" title="Education" />

      <div className="space-y-6">
        {education.map((entry) => (
          <Reveal key={entry.id}>
            <article className="panel overflow-hidden">
              <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12 lg:p-10">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-3 py-1.5 text-[12px] text-haze">
                      <GraduationCap aria-hidden="true" className="h-3.5 w-3.5 text-saffron/80" />
                      {entry.status}
                    </span>
                    <span className="text-[12.5px] text-haze">{entry.field}</span>
                  </div>

                  <h3 className="mt-5 font-display text-display-sm text-paper">
                    {entry.degree}
                  </h3>

                  <p className="mt-4 text-[15px] text-paper-dim sm:text-base">
                    {entry.institution}{" "}
                    <span className="text-haze">({entry.institutionShort})</span>
                  </p>

                  <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-haze">
                    <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-haze-dim" />
                    {entry.location}
                  </p>
                </div>

                <div className="lg:border-l lg:border-white/[0.07] lg:pl-12">
                  <p className="font-display text-[3.5rem] leading-none tabular-nums text-saffron sm:text-[4.5rem]">
                    {entry.expectedGraduation}
                  </p>
                  <p className="mt-3 text-[12.5px] text-haze">Expected graduation</p>
                </div>
              </div>

              <div className="border-t border-white/[0.06] p-6 sm:p-8 lg:p-10">
                {entry.highlights.length > 0 ? (
                  <>
                    <h4 className="text-[13px] font-medium text-paper">Coursework highlights</h4>
                    <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {entry.highlights.map((item) => (
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
                  </>
                ) : (
                  <PlaceholderNote
                    className="max-w-xl"
                    label="Coursework highlights — optional"
                    hint="If you want to list subjects, electives or academic highlights, add them as strings and this block replaces itself with the list."
                    path="data/education.ts → highlights"
                  />
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
