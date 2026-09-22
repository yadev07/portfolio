import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { JetBrains_Mono, Manrope, Newsreader } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { TerminalLauncher } from "@/components/terminal/TerminalLauncher";
import { links, profile, siteUrl } from "@/data/profile";
import { allTechnologies } from "@/data/skills";
import { isPlaceholder } from "@/lib/links";
import { cn } from "@/lib/utils";

import "./globals.css";

/** Display serif — editorial, used for names, headings and numerals. */
const display = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

/** UI and body sans. */
const sans = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

/** Mono, restricted to the code window and the terminal. */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

/**
 * Primary SEO identity.
 *
 * Keep the person's name and professional role together so search engines
 * can clearly understand the relationship:
 *
 * Yadev Singh Nishad → Full-Stack MERN Developer
 */
const title = `${profile.name} — ${profile.role}`;

const description = `Official portfolio of ${profile.name}, a Full-Stack MERN Developer and BCA Computer Science student at ${profile.university}, ${profile.campus}. Explore his web development, AI, NLP and software projects.`;

/**
 * SEO metadata.
 * These values affect search engines and link previews only.
 * They do not change the website's visual layout.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },

  description,

  verification: {
    google: "jVmAtMHro_9C0xCSibOp_RjVdO0hLlKRFZ09uztynZ4",
  },

  applicationName: `${profile.name} — Portfolio`,

  authors: [
    {
      name: profile.name,
      url: siteUrl,
    },
  ],

  creator: profile.name,
  publisher: profile.name,

  keywords: [
    // Identity
    profile.name,
    profile.shortName,
    "Yadev Singh Nishad",
    "Yadev",
    "Yadev Singh",
    "Yadev Singh Nishad portfolio",
    "Yadev Singh Nishad developer",

    // Professional identity
    profile.role,
    "MERN Stack Developer",
    "Full-Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",

    // Technologies
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "TypeScript",
    "JavaScript",

    // Education / entity association
    "BCA Computer Science",
    "BCA student",
    "BCA student portfolio",
    "Dev Sanskriti Vishwavidyalaya",
    "DSVV",
    "Haridwar",

    // Projects / interests
    "AI projects",
    "NLP projects",
    "full-stack web development",

    ...allTechnologies.slice(0, 12),
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: `${profile.name} — Portfolio`,
    title,
    description,
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};

/**
 * Viewport configuration.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#0E1320",
};

/**
 * Structured data.
 *
 * This establishes the relationship between:
 *
 * Yadev Singh Nishad
 *        ↓
 * Full-Stack MERN Developer
 *        ↓
 * Portfolio
 *        ↓
 * GitHub + LinkedIn
 */
function buildPersonSchema() {
  const sameAs = [
    links.github,
    links.linkedin,
  ].filter((value) => !isPlaceholder(value));

  return {
    "@context": "https://schema.org",
    "@type": "Person",

    name: profile.name,
    alternateName: profile.shortName,

    url: siteUrl,

    jobTitle: profile.role,

    description,

    knowsAbout: [
      "MERN Stack",
      "Web Development",
      "Full-Stack Development",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "TypeScript",
      "JavaScript",
      ...allTechnologies,
    ],

    affiliation: {
      "@type": "CollegeOrUniversity",
      name: profile.university,

      address: {
        "@type": "PostalAddress",
        addressLocality: "Haridwar",
        addressRegion: "Uttarakhand",
        addressCountry: "IN",
      },
    },

    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(display.variable, sans.variable, mono.variable)}
      suppressHydrationWarning
    >
      <body className="relative min-h-dvh bg-ink-900">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-900"
        >
          Skip to content
        </a>

        <div aria-hidden="true" className="grain-overlay" />

        <ScrollProgress />

        <Navbar />

        <main id="main" className="relative z-10">
          {children}
        </main>

        <Footer />

        <TerminalLauncher />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildPersonSchema()),
          }}
        />

        <Analytics />
      </body>
    </html>
  );
}
