/**
 * Projects.
 *
 * Only confirmed information is filled in. Every field that was not supplied is
 * `null` or an empty array, and the UI renders a clearly labelled "to be
 * written" block for it — nothing here is invented.
 *
 * To flesh out a case study, replace a `null` with real text. The placeholder
 * disappears on its own.
 */

export interface Screenshot {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  /** e.g. "AI / NLP / Full Stack". null when not decided yet. */
  category: string | null;
  /** One or two sentences. Shown on cards and as the page intro. */
  summary: string;
  /** Longer framing. Falls back to `summary` when null. */
  overview: string | null;
  problem: string | null;
  solution: string | null;
  /** Concrete technologies. Empty array means "not recorded yet". */
  stack: string[];
  /** Domain/context tags, for projects described by focus rather than tooling. */
  topics?: string[];
  features: string[];
  architecture: string | null;
  challenges: string | null;
  /** Add files to public/projects/ and reference them here. */
  screenshots: Screenshot[];
  github: string;
  demo: string;
  featured: boolean;
  /** Marks a project whose write-up hasn't started, so the UI can say so once. */
  detailsPending?: boolean;
}

export const projects: Project[] = [
  {
    slug: "gita-path-chatbot",
    title: "Gita Path Chatbot",
    category: "AI / NLP / Full Stack",
    summary:
      "An AI and NLP based chatbot built around the Bhagavad Gita, giving users an interactive way to explore the text and ask questions.",
    overview: null,
    problem: null,
    solution: null,
    stack: ["Python", "Flask", "MongoDB", "NLP", "TF-IDF", "Sentence Transformers"],
    features: [],
    architecture: null,
    challenges: null,
    screenshots: [],
    github: "PLACEHOLDER_GITHUB_URL",
    demo: "PLACEHOLDER_DEMO_URL",
    featured: true,
  },
  {
    slug: "realedge-ai",
    title: "RealEdge AI",
    category: "AI / Web Development",
    summary: "An AI-powered real-estate search portal.",
    overview: null,
    problem: null,
    solution: null,
    stack: [],
    topics: ["AI", "Web development", "Search", "Full-stack"],
    features: [],
    architecture: null,
    challenges: null,
    screenshots: [],
    github: "PLACEHOLDER_GITHUB_URL",
    demo: "PLACEHOLDER_DEMO_URL",
    featured: true,
  },
  {
    slug: "eventsphere",
    title: "EventSphere",
    category: "Web Development / Full Stack",
    summary: "A university event portal for managing and presenting university events.",
    overview: null,
    problem: null,
    solution: null,
    stack: [],
    features: [],
    architecture: null,
    challenges: null,
    screenshots: [],
    github: "PLACEHOLDER_GITHUB_URL",
    demo: "PLACEHOLDER_DEMO_URL",
    featured: true,
  },
  {
    slug: "shopease",
    title: "ShopEase",
    category: "Database / DBMS",
    summary:
      "A DBMS-focused project built around an e-commerce and shop-management concept.",
    overview: null,
    problem: null,
    solution: null,
    stack: [],
    features: [],
    architecture: null,
    challenges: null,
    screenshots: [],
    github: "PLACEHOLDER_GITHUB_URL",
    demo: "PLACEHOLDER_DEMO_URL",
    featured: false,
  },
  {
    slug: "smartsbm",
    title: "SmartSBM",
    category: null,
    summary: "Project details coming soon.",
    overview: null,
    problem: null,
    solution: null,
    stack: [],
    features: [],
    architecture: null,
    challenges: null,
    screenshots: [],
    github: "PLACEHOLDER_GITHUB_URL",
    demo: "PLACEHOLDER_DEMO_URL",
    featured: false,
    detailsPending: true,
  },
  {
    slug: "appointment-booking-system",
    title: "Appointment Booking System",
    category: "MERN / Full Stack",
    summary: "A full-stack appointment booking application.",
    overview: null,
    problem: null,
    solution: null,
    stack: ["MongoDB", "Express.js", "React", "Node.js"],
    features: [],
    architecture: null,
    challenges: null,
    screenshots: [],
    github: "PLACEHOLDER_GITHUB_URL",
    demo: "PLACEHOLDER_DEMO_URL",
    featured: false,
  },
  {
    slug: "weather-app",
    title: "Weather App",
    category: "Frontend / React",
    summary: "A weather application built with React.",
    overview: null,
    problem: null,
    solution: null,
    stack: ["React"],
    features: [],
    architecture: null,
    challenges: null,
    screenshots: [],
    github: "PLACEHOLDER_GITHUB_URL",
    demo: "PLACEHOLDER_DEMO_URL",
    featured: false,
  },
  {
    slug: "todo-app",
    title: "To-Do App",
    category: "Full Stack",
    summary: "A to-do application built on the MERN stack.",
    overview: null,
    problem: null,
    solution: null,
    stack: ["MongoDB", "Express.js", "React", "Node.js"],
    features: [],
    architecture: null,
    challenges: null,
    screenshots: [],
    github: "PLACEHOLDER_GITHUB_URL",
    demo: "PLACEHOLDER_DEMO_URL",
    featured: false,
  },
];

export const projectCount: number = projects.length;

export const featuredProjects: Project[] = projects.filter((project) => project.featured);

export const otherProjects: Project[] = projects.filter((project) => !project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Every category that is actually in use, for the projects page filter. */
export const projectCategories: string[] = Array.from(
  new Set(projects.map((project) => project.category).filter((c): c is string => Boolean(c))),
);

export function getAdjacentProjects(slug: string): {
  previous: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? (projects[index - 1] as Project) : null,
    next: index < projects.length - 1 ? (projects[index + 1] as Project) : null,
  };
}
