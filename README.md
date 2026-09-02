# Yadev Singh Nishad — Portfolio

Personal developer portfolio. Next.js 15 (App Router), TypeScript (strict), Tailwind CSS, Framer Motion, Lucide icons.

All portfolio content lives in `data/` as typed objects. **You should never need to edit a component to change your content.**

---

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
npm run build        # production build
npm run check        # typecheck + lint
```

Requires Node 18.18 or newer.

---

## Fill in your details (start here)

Everything below is a real, deliberate placeholder. Search the project for
`PLACEHOLDER_` to find all of them at once — nothing was invented on your behalf.

### 1. Links and email — `data/profile.ts`

```ts
export const links = {
  github: "PLACEHOLDER_GITHUB_URL",     // e.g. https://github.com/yourhandle
  linkedin: "PLACEHOLDER_LINKEDIN_URL", // e.g. https://www.linkedin.com/in/yourhandle
  email: "PLACEHOLDER_EMAIL",           // e.g. you@example.com
};
```

Any link still holding a `PLACEHOLDER_` value renders as a non-clickable chip
labelled "not linked yet" instead of a broken link, so you can ship the site
before every profile exists.

### 2. Resume — `public/resume.pdf`

Drop your PDF at `public/resume.pdf`, then in `data/profile.ts` set:

```ts
export const resume = { href: "/resume.pdf", available: true };
```

While `available` is `false`, the Resume buttons stay visible but explain that
the file has not been added yet rather than 404-ing.

### 3. Projects — `data/projects.ts`

Each project has `problem`, `solution`, `features`, `architecture` and
`challenges`. Where the information was not supplied, the value is `null` and
the project page renders a labelled "to be written" block. Replace `null` with
real text and the block turns into content automatically.

`stack: []` means no confirmed tech stack was recorded yet.

### 4. Project screenshots — `public/projects/`

Add images and reference them from the project's `screenshots` array:

```ts
screenshots: [{ src: "/projects/gita-path-chatbot-home.png", alt: "Chat interface" }],
```

Recommended: 1600×1000 PNG or WebP. Until a screenshot exists, a labelled empty
frame is shown.

### 5. Experience — `data/experience.ts`

The Aradhya Technologies internship is recorded with only what was confirmed
(organisation and location). `role`, `period` and `summary` are `null` and
render as "to be updated" chips. Fill them in when you're ready.

### 6. Deployment origin — `.env.local`

```bash
cp .env.example .env.local
# NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Used by `metadataBase`, `sitemap.xml`, `robots.txt` and Open Graph URLs.

### 7. Contact form delivery — optional

`app/api/contact/route.ts` validates the submission server-side and then looks
for a delivery provider. Until you configure one it returns
`{ ok: false, code: "NOT_CONFIGURED" }` and the form says plainly that nothing
was sent, offering a direct mail link instead — no silent failures, no exposed
keys, no fake success message.

To enable real delivery, set either `CONTACT_WEBHOOK_URL` or the Resend
variables in `.env.local`. The exact integration point is marked in the route
with `// --- INTEGRATION POINT ---`.

---

## Project structure

```
app/
  layout.tsx              fonts, metadata, JSON-LD, chrome
  page.tsx                the one-page portfolio (composes sections)
  globals.css             design tokens, base styles, reduced-motion rules
  icon.svg                favicon (monogram)
  opengraph-image.tsx     generated OG/Twitter image (no binary asset)
  robots.ts / sitemap.ts  generated from data
  not-found.tsx
  projects/page.tsx       all projects, filterable
  projects/[slug]/page.tsx  per-project case study
  api/contact/route.ts    contact form endpoint
components/
  layout/                 Navbar, Footer, ScrollProgress
  sections/               Hero, CodeWindow, About, Skills, Projects,
                          ProjectCard, ProjectsIndex, Experience,
                          Education, Achievements, Learning, Contact
  terminal/               the optional interactive terminal
  ui/                     Section, SectionHeading, Reveal, Button,
                          Magnetic, TechBadge, MockupFrame, Counter,
                          PlaceholderNote, ResumeButton, SocialLinks
data/                     ALL content lives here
lib/                      cn(), motion variants, link helpers, code
                          highlighter, terminal commands
public/                   resume.pdf, projects/*.png
```

## The terminal

One optional extra: a small terminal that answers from the same `data/` modules
the page renders. Open it from the navbar icon, from the hero link, or with
<kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>`</kbd>. `help` lists the commands;
<kbd>↑</kbd> walks history, <kbd>Tab</kbd> completes, <kbd>Esc</kbd> closes.
Add a command in `lib/terminal-commands.ts` — the UI needs no changes.

## Design system

| Token | Value | Used for |
| --- | --- | --- |
| `ink-900` | `#0E1320` | page background |
| `ink-800` | `#151C2E` | raised surfaces, panels |
| `ink-700` | `#1E2740` | hairline borders |
| `paper` | `#E8E4DA` | primary text (warm, against cool ink) |
| `haze` | `#8A93A8` | secondary text |
| `saffron` | `#E0A458` | interaction, emphasis, focus rings |

Type: **Newsreader** for display, **Manrope** for UI and body, **JetBrains
Mono** restricted to the code window and terminal only.

Motion: one orchestrated hero sequence on load, then motion only in response to
what the visitor does. Every animation is disabled under
`prefers-reduced-motion: reduce`.

## Accessibility notes

Semantic landmarks, one `h1` per page, visible saffron focus rings, keyboard
paths through the nav / mobile menu / terminal / form, `aria-live` regions for
form and terminal output, and labelled placeholder states instead of empty
elements.

## Deploy

Push to GitHub, import the repo on Vercel or Netlify, set
`NEXT_PUBLIC_SITE_URL`, deploy. No other configuration is required.
