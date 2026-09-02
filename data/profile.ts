/**
 * Core identity and contact details.
 *
 * Anything whose value starts with `PLACEHOLDER_` has not been supplied yet.
 * The UI detects these automatically (see `lib/links.ts`) and renders an
 * honest "not linked yet" state instead of a broken link, so you can publish
 * the site before every profile exists.
 *
 * Replace the placeholders below and nothing else needs to change.
 */

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
}

export const links: SocialLinks = {
  github: "https://github.com/yadev07",
  linkedin: "https://www.linkedin.com/in/yadev07",
  email: "yadevsingh.nishad@gmail.com",
};

/**
 * Drop your PDF at `public/resume.pdf`, then flip `available` to true.
 * While it is false the buttons stay visible but explain that the file is
 * missing rather than sending visitors to a 404.
 */
export const resume = {
  href: "/resume.pdf",
  available: false,
};

export interface Profile {
  name: string;
  shortName: string;
  monogram: string;
  role: string;
  identity: string[];
  tagline: string;
  degree: string;
  university: string;
  universityShort: string;
  campus: string;
  graduationYear: number;
  /** Paragraphs for the About section, in order. */
  about: string[];
  /** Areas his learning and project work covers. Facts, not marketing. */
  focusAreas: string[];
}

export const profile: Profile = {
  name: "Yadev Singh Nishad",
  shortName: "Yadev",
  monogram: "Y",
  role: "BCA Computer Science Student",
  identity: [
    "BCA Computer Science Student",
    "Full-Stack Developer",
    "AI & Technology Enthusiast",
  ],
  tagline:
    "Building web applications, exploring AI, and turning ideas into practical software.",
  degree: "Bachelor of Computer Applications (BCA) — Computer Science",
  university: "Dev Sanskriti Vishwavidyalaya",
  universityShort: "DSVV",
  campus: "Shantikunj, Haridwar",
  graduationYear: 2027,
  about: [
    "I'm a BCA Computer Science student at Dev Sanskriti Vishwavidyalaya in Haridwar. I like building practical software applications with modern web technologies, and I'm interested in what AI can add to them.",
    "My learning and project work so far covers frontend development, backend development, databases, AI and NLP, data science, and computer vision. I learn a technology best by building something with it, so most of what I know sits in the projects below rather than in a certificate.",
    "I enjoy the part where a rough idea turns into something that actually runs — and the part right after, where I find out what I got wrong and fix it.",
  ],
  focusAreas: [
    "Frontend development",
    "Backend development",
    "Databases",
    "AI & NLP",
    "Data science",
    "Computer vision",
  ],
};

/**
 * Public origin of the deployed site. Set NEXT_PUBLIC_SITE_URL in .env.local
 * before deploying — it drives metadataBase, sitemap.xml and robots.txt.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
