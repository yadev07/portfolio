import { profile } from "@/data/profile";
import { projectCount, projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";

/**
 * The hero's code window shows the site's own data files.
 *
 * Nothing here is mock code: every string below is generated from the same
 * `data/` modules that render the rest of the page, so the panel cannot drift
 * out of sync with reality and nothing is fabricated for effect.
 *
 * Lines are kept short on purpose — the panel has to stay readable at 320px.
 */

export interface CodeTab {
  id: string;
  filename: string;
  code: string;
}

const quote = (value: string): string =>
  `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

const list = (values: string[]): string => `[${values.map(quote).join(", ")}]`;

function itemsOf(categoryId: string, count: number, fromEnd = false): string[] {
  const category = skillCategories.find((entry) => entry.id === categoryId);
  if (!category) return [];
  return fromEnd ? category.items.slice(-count) : category.items.slice(0, count);
}

const city = profile.campus.split(",").map((part) => part.trim()).pop() ?? profile.campus;

const shortFocus = profile.focusAreas
  .map((area) => area.replace(/\s*development$/i, ""))
  .filter((area) => area.length <= 10)
  .slice(0, 3);

const profileCode = [
  "export const profile = {",
  `  name: ${quote(profile.name)},`,
  `  role: ${quote(profile.role)},`,
  `  university: ${quote(`${profile.universityShort}, ${city}`)},`,
  `  graduating: ${profile.graduationYear},`,
  `  focus: ${list(shortFocus)},`,
  "};",
].join("\n");

const skillsCode = [
  "export const skills = {",
  `  frontend: ${list(itemsOf("frontend", 3, true))},`,
  `  backend: ${list(itemsOf("backend", 3))},`,
  `  databases: ${list(itemsOf("databases", 3))},`,
  `  ai: ${list(itemsOf("ai", 2))},`,
  `  vision: ${list(itemsOf("vision", 2))},`,
  "};",
].join("\n");

const shownProjects = projects.slice(0, 4);

const projectsCode = [
  "export const projects = [",
  ...shownProjects.map((project) => {
    const type = (project.category ?? "TBD").split("/")[0]?.trim() ?? "TBD";
    return `  { name: ${quote(project.title)}, type: ${quote(type)} },`;
  }),
  `  // + ${projectCount - shownProjects.length} more in data/projects.ts`,
  "];",
].join("\n");

export const codeTabs: CodeTab[] = [
  { id: "profile", filename: "profile.ts", code: profileCode },
  { id: "skills", filename: "skills.ts", code: skillsCode },
  { id: "projects", filename: "projects.ts", code: projectsCode },
];
