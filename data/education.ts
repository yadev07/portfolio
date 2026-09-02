/** Education. */

export interface EducationEntry {
  id: string;
  degree: string;
  field: string;
  institution: string;
  institutionShort: string;
  location: string;
  /** Expected, not awarded. */
  expectedGraduation: number;
  status: "In progress" | "Completed";
  /** Coursework, electives or academic highlights. Empty until you add some. */
  highlights: string[];
}

export const education: EducationEntry[] = [
  {
    id: "bca-dsvv",
    degree: "Bachelor of Computer Applications (BCA)",
    field: "Computer Science",
    institution: "Dev Sanskriti Vishwavidyalaya",
    institutionShort: "DSVV",
    location: "Shantikunj, Haridwar",
    expectedGraduation: 2027,
    status: "In progress",
    highlights: [],
  },
];
