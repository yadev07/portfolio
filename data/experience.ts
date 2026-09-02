/**
 * Experience.
 *
 * The entry below is based on the supplied internship certificate.
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
    organisation: "Aradhya Technologies and Skill Development Pvt Ltd",
    kind: "Internship",
    location: "Varanasi",
    role: "Full Stack Web Development Intern",
    period: "June 2, 2025 — June 30, 2025 (100 hours)",
    summary:
      "Completed an offline internship program in full stack web development using the MERN stack.",
    responsibilities: [
      "Gained hands-on practice building full-stack web applications with HTML, CSS, JavaScript, Tailwind CSS, React JS, Node JS, Express JS and MongoDB.",
      "Assisted with frontend and backend web development tasks and gained practical exposure to full-stack application development.",
      "Participated in application testing, debugging, troubleshooting and implementation of web application features.",
    ],
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Tailwind CSS",
      "React JS",
      "Node JS",
      "Express JS",
      "MongoDB",
    ],
  },
];

export const experienceCount: number = experience.length;
