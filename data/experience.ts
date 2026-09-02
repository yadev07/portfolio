/**
 * Experience.
 *
 * Only the organisation, its location and the fact that it was an internship
 * were confirmed. Role, dates, responsibilities and technologies are `null` /
 * empty on purpose — the timeline shows a "to be updated" chip for each rather
 * than inventing a job title or a date.
 *
 * Fill any of them in and the chip is replaced by the real content.
 */

export interface ExperienceEntry {
  id: string;
  organisation: string;
  /** e.g. "Internship". */
  kind: string;
  location: string | null;
  role: string | null;
  /** Free text, e.g. "Jun 2025 — Aug 2025". */
  period: string | null;
  summary: string | null;
  responsibilities: string[];
  stack: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "aradhya-technologies",
    organisation: "Aradhya Technologies",
    kind: "Internship",
    location: "Varanasi",
    role: "Full Stack Web Development Intern",
    period: null,
    summary: null,
    responsibilities: [],
    stack: [],
  },
];

export const experienceCount: number = experience.length;
