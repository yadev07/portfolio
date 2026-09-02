/**
 * Achievements.
 *
 * Confirmed competition, volunteering and learning activities are listed here
 * without adding dates or organisers that were not supplied.
 *
 * `achievementSlots` are the categories you asked to leave room for. They are
 * shown as an intentionally quiet, collapsed list of empty states — visible to
 * you as a reminder, not shouted at visitors. Add a real entry to
 * `achievements` and it appears above them.
 */

export interface Achievement {
  id: string;
  title: string;
  /** e.g. "3rd position". */
  result: string | null;
  /** e.g. "Competition", "Certification", "Hackathon". */
  kind: string;
  organiser: string | null;
  /** Free text, e.g. "March 2025". */
  date: string | null;
  description: string | null;
}

export const achievements: Achievement[] = [
  {
    id: "logicthon",
    title: "Logicthon",
    result: "3rd position",
    kind: "Competition",
    organiser: "Computer Science Department, DSVV",
    date: null,
    description: "Secured 3rd position in the coding competition.",
  },
  {
    id: "university-volunteering",
    title: "University Volunteering",
    result: null,
    kind: "Activity",
    organiser: "Computer Science Department, DSVV",
    date: null,
    description: "Managed data and supported coordination of university-level events.",
  },
];

export interface AchievementSlot {
  id: string;
  label: string;
  hint: string;
}

export const achievementSlots: AchievementSlot[] = [
  {
    id: "certifications",
    label: "Certifications",
    hint: "Add each certification to `achievements` in data/achievements.ts with kind: \"Certification\".",
  },
  {
    id: "hackathons",
    label: "Hackathons",
    hint: "Add hackathon results with kind: \"Hackathon\" — include the team, the build and the placing.",
  },
  {
    id: "academic",
    label: "Academic achievements",
    hint: "Semester distinctions, scholarships or subject prizes go here with kind: \"Academic\".",
  },
  {
    id: "workshops-conferences",
    label: "Workshops & conferences",
    hint: "Already covered in the Learning section below — add new ones to data/learning.ts.",
  },
];
