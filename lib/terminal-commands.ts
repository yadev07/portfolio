/**
 * The terminal's command set.
 *
 * Kept as a pure function so the UI component stays thin and every answer is
 * generated from the same `data/` modules the rest of the site renders. Nothing
 * here has its own copy of the content, so the terminal cannot go out of date.
 */

import { achievements } from "@/data/achievements";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { learning } from "@/data/learning";
import { links, profile, resume } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories, technologyCount } from "@/data/skills";
import { isPlaceholder } from "@/lib/links";

export type LineKind = "heading" | "text" | "muted" | "accent" | "error" | "prompt";

export interface TerminalLine {
  kind: LineKind;
  text: string;
}

export type TerminalAction =
  | { type: "clear" }
  | { type: "close" }
  | { type: "navigate"; href: string };

export interface CommandResult {
  lines: TerminalLine[];
  action?: TerminalAction;
}

const line = (kind: LineKind, text: string): TerminalLine => ({ kind, text });
const blank = (): TerminalLine => line("text", "");

export const COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "achievements",
  "learning",
  "contact",
  "resume",
  "open",
  "clear",
  "exit",
] as const;

export const WELCOME: TerminalLine[] = [
  line("accent", `${profile.name} — portfolio terminal`),
  line("muted", "Everything below is read from this site's own data files."),
  line("muted", "Type `help` to see what you can ask. Esc closes."),
];

function helpLines(): TerminalLine[] {
  const rows: [string, string][] = [
    ["help", "list these commands"],
    ["about", "who I am, in my own words"],
    ["skills", "technologies grouped by what they're for"],
    ["projects", "every project, with its slug"],
    ["experience", "internship record"],
    ["education", "degree and university"],
    ["achievements", "confirmed achievements"],
    ["learning", "conferences and workshops"],
    ["contact", "how to reach me"],
    ["resume", "resume availability"],
    ["open <slug>", "open a project page"],
    ["clear", "clear the screen"],
    ["exit", "close the terminal"],
  ];

  return [
    line("heading", "Commands"),
    ...rows.map(([name, description]) =>
      line("text", `  ${name.padEnd(14, " ")}${description}`),
    ),
  ];
}

function aboutLines(): TerminalLine[] {
  return [
    line("heading", profile.name),
    line("muted", profile.identity.join("  /  ")),
    blank(),
    ...profile.about.flatMap((paragraph) => [line("text", paragraph), blank()]),
    line("muted", `${profile.degree}, ${profile.university} (${profile.campus}).`),
    line("muted", `Expected graduation ${profile.graduationYear}.`),
  ];
}

function skillsLines(): TerminalLine[] {
  return [
    line("heading", `Skills — ${technologyCount} technologies across ${skillCategories.length} areas`),
    ...skillCategories.flatMap((category) => [
      blank(),
      line("accent", category.label),
      line("text", `  ${category.items.join(", ")}`),
    ]),
  ];
}

function projectsLines(): TerminalLine[] {
  return [
    line("heading", `Projects — ${projects.length}`),
    ...projects.map((project) =>
      line("text", `  ${project.slug.padEnd(28, " ")}${project.title}`),
    ),
    blank(),
    line("muted", "Use `open <slug>` to read a project page."),
  ];
}

function experienceLines(): TerminalLine[] {
  return [
    line("heading", "Experience"),
    ...experience.flatMap((entry) => [
      line("accent", `${entry.organisation}${entry.location ? ` — ${entry.location}` : ""}`),
      line("text", `  ${entry.kind}`),
      line("muted", `  Role: ${entry.role ?? "to be added"}`),
      line("muted", `  Dates: ${entry.period ?? "to be added"}`),
      ...(entry.summary ? [line("text", `  ${entry.summary}`)] : []),
    ]),
  ];
}

function educationLines(): TerminalLine[] {
  return [
    line("heading", "Education"),
    ...education.flatMap((entry) => [
      line("accent", `${entry.degree} — ${entry.field}`),
      line("text", `  ${entry.institution} (${entry.institutionShort}), ${entry.location}`),
      line("muted", `  ${entry.status}, expected ${entry.expectedGraduation}`),
    ]),
  ];
}

function achievementsLines(): TerminalLine[] {
  return [
    line("heading", "Achievements"),
    ...achievements.flatMap((entry) => [
      line("accent", `${entry.title}${entry.result ? ` — ${entry.result}` : ""}`),
      line("muted", `  ${entry.kind}`),
      line("muted", `  Organiser: ${entry.organiser ?? "to be added"}`),
      line("muted", `  Date: ${entry.date ?? "to be added"}`),
    ]),
  ];
}

function learningLines(): TerminalLine[] {
  return [
    line("heading", "Conferences & workshops"),
    ...learning.flatMap((entry) => [
      line("accent", entry.title),
      line(
        "muted",
        `  ${[entry.kind, entry.host, entry.location].filter(Boolean).join(" — ")}`,
      ),
      line("muted", `  Date: ${entry.date ?? "to be added"}`),
    ]),
  ];
}

function contactLines(): TerminalLine[] {
  const value = (raw: string) => (isPlaceholder(raw) ? "not added yet" : raw);

  return [
    line("heading", "Contact"),
    line("text", `  email     ${value(links.email)}`),
    line("text", `  github    ${value(links.github)}`),
    line("text", `  linkedin  ${value(links.linkedin)}`),
    blank(),
    line("muted", "There is also a contact form in the Contact section of the page."),
  ];
}

function resumeLines(): TerminalLine[] {
  if (resume.available) {
    return [line("text", `Resume: ${resume.href}`)];
  }
  return [
    line("text", "The resume PDF has not been added to this site yet."),
    line("muted", "Nothing is invented here — when the file exists, this points to it."),
  ];
}

export function runCommand(raw: string): CommandResult {
  const input = raw.trim();
  if (input.length === 0) return { lines: [] };

  const [name = "", ...args] = input.split(/\s+/);
  const command = name.toLowerCase();

  switch (command) {
    case "help":
      return { lines: helpLines() };
    case "about":
      return { lines: aboutLines() };
    case "skills":
      return { lines: skillsLines() };
    case "projects":
      return { lines: projectsLines() };
    case "experience":
      return { lines: experienceLines() };
    case "education":
      return { lines: educationLines() };
    case "achievements":
      return { lines: achievementsLines() };
    case "learning":
      return { lines: learningLines() };
    case "contact":
      return { lines: contactLines() };
    case "resume":
      return { lines: resumeLines() };
    case "clear":
      return { lines: [], action: { type: "clear" } };
    case "exit":
    case "close":
      return { lines: [], action: { type: "close" } };
    case "open": {
      const slug = (args[0] ?? "").toLowerCase();
      if (!slug) {
        return {
          lines: [
            line("error", "open needs a project slug."),
            line("muted", "Run `projects` to see the available slugs."),
          ],
        };
      }
      const match = projects.find((project) => project.slug === slug);
      if (!match) {
        return {
          lines: [
            line("error", `No project with the slug "${slug}".`),
            line("muted", "Run `projects` to see the available slugs."),
          ],
        };
      }
      return {
        lines: [line("text", `Opening ${match.title}…`)],
        action: { type: "navigate", href: `/projects/${match.slug}` },
      };
    }
    default:
      return {
        lines: [
          line("error", `command not found: ${command}`),
          line("muted", "Type `help` for the list."),
        ],
      };
  }
}

/** Tab completion for command names. */
export function completeCommand(partial: string): string | null {
  const value = partial.trim().toLowerCase();
  if (value.length === 0 || value.includes(" ")) return null;
  const matches = COMMANDS.filter((command) => command.startsWith(value));
  return matches.length === 1 ? (matches[0] as string) : null;
}
