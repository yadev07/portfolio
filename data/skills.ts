/**
 * Technical skills, grouped exactly as supplied.
 *
 * Deliberately no proficiency percentages — a number like "JavaScript 95%"
 * is unverifiable and reads as noise to anyone technical. The grouping and
 * the projects do the talking instead.
 *
 * The short line under each category describes the category, not a claim
 * about experience level.
 */

export type SkillTone = "saffron" | "indigo" | "teal" | "neutral";

export interface SkillCategory {
  id: string;
  label: string;
  /** One neutral line describing what this group of tools is for. */
  note: string;
  tone: SkillTone;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    note: "Interfaces, routing and client-side state.",
    tone: "saffron",
    items: ["HTML", "HTML5", "CSS", "CSS3", "Tailwind CSS", "JavaScript", "React", "Next.js", "TypeScript", "Responsive Web Design"],
  },
  {
    id: "backend",
    label: "Backend",
    note: "APIs, servers and application logic.",
    tone: "indigo",
    items: ["Node.js", "Express.js", "Flask", "RESTful APIs"],
  },
  {
    id: "databases",
    label: "Databases",
    note: "Relational, document and hosted data stores.",
    tone: "teal",
    items: ["MySQL", "MongoDB", "Supabase"],
  },
  {
    id: "programming",
    label: "Programming languages",
    note: "The languages the work above is written in.",
    tone: "neutral",
    items: ["JavaScript", "TypeScript", "Python", "SQL"],
  },
  {
    id: "ai",
    label: "AI, machine learning & NLP",
    note: "Text representation, retrieval and classical ML.",
    tone: "saffron",
    items: ["TF-IDF", "Sentence Transformers", "Scikit-learn", "Pandas", "NumPy"],
  },
  {
    id: "vision",
    label: "Computer vision",
    note: "Image processing and object detection.",
    tone: "indigo",
    items: ["OpenCV", "YOLO"],
  },
  {
    id: "visualisation",
    label: "Data visualisation",
    note: "Charts, spatial data and reporting.",
    tone: "teal",
    items: ["Matplotlib", "Seaborn", "GeoPandas", "Power BI"],
  },
  {
    id: "tools",
    label: "Tools & platforms",
    note: "Everyday environment, testing and deployment.",
    tone: "neutral",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "Jupyter Notebook",
      "Google Colab",
      "Power BI",
      "MySQL Workbench",
      "Postman",
      "WSL Ubuntu",
      "VirtualBox",
      "Termux",
      "Netlify",
      "Vercel",
    ],
  },
];

/** Distinct technologies across every category — a real number, safe to display. */
export const technologyCount: number = new Set(
  skillCategories.flatMap((category) => category.items),
).size;

/** Flat, de-duplicated list. Used by the terminal's `skills` command. */
export const allTechnologies: string[] = Array.from(
  new Set(skillCategories.flatMap((category) => category.items)),
).sort((a, b) => a.localeCompare(b));
