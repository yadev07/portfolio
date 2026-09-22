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
    slug: "personal-developer-portfolio",
    title: "Personal Developer Portfolio Web App",
    category: "Next.js / Full Stack",
    summary:
      "A data-driven developer portfolio built with Next.js, React, TypeScript and Tailwind CSS.",
    overview:
      "A modular portfolio web application presenting profile information, skills, projects, experience, education, achievements and learning activities.",
    problem:
      "A developer portfolio needs a maintainable way to present changing personal and project information across responsive pages.",
    solution:
      "Built a data-driven Next.js App Router application with reusable components, dynamic project case-study routes, automated SEO metadata, server-side contact processing and an interactive terminal interface.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    features: [
      "Data-driven modular portfolio sections.",
      "Dynamic project case-study routes.",
      "Automated SEO metadata and generated Open Graph image.",
      "Server-side contact form processing.",
      "Interactive portfolio terminal interface.",
    ],
    architecture:
      "Next.js App Router pages compose reusable React components and read portfolio content from typed modules in data/. The contact form uses a server-side API route, while project pages are generated from project slugs.",
    challenges:
      "Designing a reusable content model that keeps visible sections, project pages, terminal responses and SEO metadata consistent.",
    screenshots: [
      {
        src: "/projects/personal-developer-portfolio.png",
        alt: "Personal Developer Portfolio web application",
      },
    ],
    github: "PLACEHOLDER_GITHUB_URL",
    demo: "PLACEHOLDER_DEMO_URL",
    featured: true,
  },
  {
    slug: "gita-path-chatbot",
    title: "Gita Path Chatbot",
    category: "AI / NLP / Full Stack",
    summary:
      "An AI and NLP based chatbot built around the Bhagavad Gita, giving users an interactive way to explore the text and ask questions.",
    overview:
      "An NLP-powered chatbot interface that retrieves and displays relevant Bhagavad Gita verses based on user queries.",
    problem:
      "Users need a conversational way to explore the Bhagavad Gita and find relevant verses from their questions.",
    solution:
      "Built a Flask API backed by MongoDB and NLP matching techniques, including sentence representations, to retrieve and deliver relevant text responses.",
    stack: ["Python", "Flask", "MongoDB", "NLP", "TF-IDF", "Sentence Transformers"],
    features: [
      "Query-based retrieval of relevant Bhagavad Gita verses.",
      "Flask API for serving chatbot responses.",
      "MongoDB storage for text data and responses.",
    ],
    architecture: "A Python Flask API connects the chatbot interface and NLP matching logic with MongoDB for storing and retrieving text responses.",
    challenges: "Matching natural-language user queries with relevant text responses using NLP techniques.",
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
      "An e-commerce web application with product browsing and cart state management.",
    overview:
      "A full-stack e-commerce application for listing and browsing products and managing cart state.",
    problem: "Users need a simple way to browse available products and manage items selected for purchase.",
    solution: "Built a React frontend with backend endpoints connected to MongoDB for reading and writing product information.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    features: ["Product listing", "Product browsing", "Cart state management", "Product data persistence"],
    architecture: "A React frontend communicates with Node.js and Express.js backend endpoints, which read and write product data in MongoDB.",
    challenges: "Connecting product browsing and cart interactions with backend product data persistence.",
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
    stack: ["React.js", "Node.js", "Express.js", "MySQL"],
    features: ["CRUD functionality for appointment schedules", "Appointment record management", "User detail management"],
    architecture: "A React frontend communicates with Node.js and Express.js backend APIs connected to relational MySQL tables for appointments and user details.",
    challenges: "Designing relational tables and connecting appointment records and user details with backend APIs.",
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
