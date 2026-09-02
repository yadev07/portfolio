import type { Metadata, Viewport } from "next";
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

const title = `${profile.name} — ${profile.role}`;
const description = `Portfolio of ${profile.name}, a BCA Computer Science student at ${profile.university}, ${profile.campus} (expected ${profile.graduationYear}). Full-stack web development, AI and NLP project work.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description,
  applicationName: `${profile.name} — Portfolio`,
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: [
    profile.name,
    "BCA student portfolio",
    "full-stack developer",
    "Next.js developer",
    "AI and NLP projects",
    "Dev Sanskriti Vishwavidyalaya",
    ...allTechnologies.slice(0, 12),
  ],
  alternates: { canonical: "/" },
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
    googleBot: { index: true, follow: true },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#0E1320",
};

/**
 * Structured data. Deliberately conservative: no job title, no employer, no
 * awards that were not confirmed. `sameAs` only appears once a real profile
 * URL has been added to data/profile.ts.
 */
function buildPersonSchema() {
  const sameAs = [links.github, links.linkedin].filter((value) => !isPlaceholder(value));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    description,
    url: siteUrl,
    knowsAbout: allTechnologies,
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

export default function RootLayout({ children }: { children: ReactNode }) {
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
          // Static, generated from local data — no user input is interpolated.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPersonSchema()) }}
        />
      </body>
    </html>
  );
}
