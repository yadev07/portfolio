import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const [lead, ...rest] = profile.about;

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        id="about"
        title="About"
        meta={`Expected graduation ${profile.graduationYear}`}
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <Reveal className="min-w-0">
          {lead ? (
            <p className="max-w-prose text-[17px] leading-relaxed text-paper-dim sm:text-lg">
              {lead}
            </p>
          ) : null}

          {rest.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mt-6 max-w-prose text-[15px] leading-relaxed text-haze sm:text-base"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.08} className="min-w-0">
          <div className="panel p-6 sm:p-7">
            <h3 className="text-[13px] font-medium text-paper">What my work covers</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-haze">
              Areas my coursework and projects have taken me through so far.
            </p>

            <ul className="mt-6 divide-y divide-white/[0.06] border-t border-white/[0.06]">
              {profile.focusAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-3 py-3 text-[14.5px] text-paper-dim"
                >
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 shrink-0 rounded-full bg-saffron/70"
                  />
                  {area}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[13px] leading-relaxed text-haze">
              Currently studying {profile.degree} at {profile.university},{" "}
              {profile.campus}.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
