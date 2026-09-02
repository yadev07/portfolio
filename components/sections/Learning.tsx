import { learning } from "@/data/learning";
import { PendingChip } from "@/components/ui/PlaceholderNote";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Learning() {
  if (learning.length === 0) return null;

  return (
    <Section id="learning" tight>
      <SectionHeading
        id="learning"
        title="Learning beyond the syllabus"
        lead="Conferences and workshops I have attended. Dates are left blank until I check them against my certificates."
        meta={`${learning.length} events`}
      />

      <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {learning.map((entry) => (
          <li key={entry.id}>
            <Reveal>
              <div className="grid gap-x-8 gap-y-3 py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                <div className="min-w-0">
                  <p className="text-[12.5px] text-saffron/90">{entry.kind}</p>
                  <h3 className="mt-2 text-[17px] leading-snug text-paper sm:text-[18px]">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] text-haze">
                    {[entry.host, entry.location].filter(Boolean).join(", ") || "Host to be added"}
                  </p>
                  {entry.context ? (
                    <p className="mt-2 max-w-prose text-[13px] leading-relaxed text-haze">
                      {entry.context}
                    </p>
                  ) : null}
                </div>

                <div className="sm:pt-6 sm:text-right">
                  {entry.date ? (
                    <span className="text-[13px] tabular-nums text-haze">{entry.date}</span>
                  ) : (
                    <PendingChip>Date to be added</PendingChip>
                  )}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
