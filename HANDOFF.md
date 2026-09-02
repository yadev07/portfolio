# Build report & handoff

Written at the end of the build. Everything here is verifiable against the files
in this repository — no claims about work that wasn't done.

---

## 1. Status

The project is **complete and ready to run locally**. 66 files were written,
5,051 lines of TypeScript/TSX across 53 source modules.

What could **not** be done from the build environment, and what you must run
once yourself:

```bash
npm install
npm run dev      # http://localhost:3000
npm run check    # tsc --noEmit && next lint
```

The build sandbox had no access to the npm registry (HTTP 403) and no browser,
so `npm install`, `next build`, `tsc --noEmit`, `next lint` and screenshots were
impossible there. Instead the code was checked statically with a purpose-written
Node verifier covering: every import resolving to a real file, every named
import matching an actual export, every package imported being declared in
`package.json`, every Tailwind class referencing a token that exists in
`tailwind.config.ts` or `globals.css`, every nav id matching a section id, every
`#anchor` having a target, `"use client"` present on every file using hooks or
browser APIs, and no unreferenced modules. Result: **no problems found**. A
second pass checked delimiter balance in all 53 files — clean apart from two
known false positives where the checker misreads regex literals
(`lib/highlight.ts:26`, `lib/links.ts:38`).

Treat `npm run check` as the real gate. If it reports anything, it will be
small and local, not structural.

---

## 2. What was built

**Framework** Next.js 15 App Router, React 19, TypeScript in `strict` mode.

**Dependencies** — 5 runtime, nothing speculative:

| Package | Why it's here |
| --- | --- |
| `next`, `react`, `react-dom` | the framework |
| `framer-motion` | the hero sequence, filter transitions, terminal panel |
| `lucide-react` | icons |

Dev: `typescript`, `tailwindcss`, `postcss`, `autoprefixer`, `eslint`,
`eslint-config-next`, `@types/*`. No syntax-highlighting library (hand-rolled
tokeniser), no UI kit, no animation helper libraries, no icon font, no
analytics.

**Pages** 4 routes — `/` (the one-page portfolio), `/projects` (filterable
index), `/projects/[slug]` (8 statically generated case studies),
`/api/contact`. Plus `robots.ts`, `sitemap.ts`, a generated
`opengraph-image.tsx`, an SVG favicon and a custom `not-found.tsx`.

**Sections** Home, About, Skills, Projects, Experience, Education,
Achievements, Learning, Contact — matching the requested navigation exactly.

**The one interactive feature** A terminal (`Ctrl`/`⌘` + `` ` ``, the navbar
icon, or the hero link) that answers 13 commands from the same `data/` modules
the page renders, so it can never disagree with the site. History with `↑`,
`Tab` completion, `Esc` to close, focus trap, `aria-live` output.

**Hero visual** An editor window that renders the site's real data files
through the tokeniser — the panel is generated from `data/`, so it stays true as
you edit content.

---

## 3. Nothing was fabricated

This was the hard constraint, and it shaped the architecture. Every unconfirmed
field is `null` or `[]` in `data/`, and each one renders as a designed empty
state that names the exact file and field to edit:

- `PlaceholderNote` — a dashed panel with a label, a hint, and the path
  (`data/experience.ts → role, period, summary`).
- `PendingChip` — inline "Date to be added" where a value belongs in a row.
- `MockupFrame` empty state — labelled with the filename it expects
  (`public/projects/gita-path-chatbot.png`).

No invented job titles, dates, statistics, percentages, links or URLs. Skill
levels are shown as grouped lists, never as fake proficiency bars. The counters
in the hero count real array lengths (`projectCount`, `technologyCount`,
`learningCount`) — they cannot drift from the data. Placeholder links are
sentinel constants (`PLACEHOLDER_GITHUB_URL`) that render as a non-clickable
"not linked yet" chip rather than a dead link. The AI Impact Summit 2026
association was left off the page entirely because it wasn't confirmed.

**Security** No key is ever referenced in client code. `app/api/contact/route.ts`
runs on the Node runtime, validates server-side, rate-limits per instance, and
reads credentials only from `process.env`. With nothing configured it returns
`{ ok: false, code: "NOT_CONFIGURED" }` and the form says plainly that nothing
was sent, offering a direct mail link — an honest failure instead of a fake
success. Error logging records status codes only, never response bodies.

---

## 4. Accessibility

Skip link, semantic landmarks, one `<h1>` per page, every section labelled via
`aria-labelledby`. Filter chips use `aria-pressed`, nav links `aria-current`,
the terminal `role="dialog"` with a focus trap and focus restore, form errors
`role="alert"` with `aria-invalid`/`aria-describedby`, form and terminal output
in `aria-live` regions. Icons are `aria-hidden` with text alternatives beside
them. Visible saffron focus rings throughout. All motion is disabled under
`prefers-reduced-motion: reduce`, both globally in `globals.css` and per
component via `useReducedMotion`.

Two validity bugs were found and fixed during review: a `<dl>` emitting `dd`
before `dt` (fixed with correct DOM order plus `flex-col-reverse`), and the
Safari `<summary>` marker (`[&::-webkit-details-marker]:hidden`).

---

## 5. Performance

Server components by default — only 7 modules are client components, each for a
concrete reason (motion, filters, form state, terminal, scroll spy). Fonts load
through `next/font` as variable fonts with `display: swap` and no extra weights.
The OG image is generated, not shipped as a binary. `next/image` with explicit
`sizes` on every image and `priority` only on the single above-the-fold tile.
Layout shift is guarded by fixed aspect ratios on all image frames and
`tabular-nums` on animated counters. `overflow-x: clip` on `html`/`body` so
ambient effects can't create a horizontal scrollbar.

---

## 6. Self-review — what I changed after a critical pass

- Removed three middle-dot meta strings (`DSVV · Class of 2027`, tag joins,
  terminal hint) — a recognisable AI-default tell. Now plain prose and `/`.
- No ALL-CAPS eyebrow labels above headings, for the same reason.
- Cards in two-up grids had unequal heights; added `h-full` through the
  `Link` → wrapper chain.
- Animated hero name lines clipped their descenders inside `overflow-hidden`;
  fixed with `pb-[0.14em] -mb-[0.14em]`.
- Dropped `haze-dim` for any meaningful text — it failed contrast. It survives
  only for decorative rules.
- Relaxed `noUncheckedIndexedAccess` / `noUnusedLocals` /
  `noUnusedParameters` while keeping `strict`, so a first `npm run check`
  doesn't drown you in noise from generated data lookups.

---

## 7. What's left for you

Nothing blocks the site from running. These are content gaps, each already
visible in the UI as a labelled placeholder:

1. `data/profile.ts` — replace `PLACEHOLDER_GITHUB_URL`,
   `PLACEHOLDER_LINKEDIN_URL`, `PLACEHOLDER_EMAIL`.
2. `public/resume.pdf` — add the file, then set `resume.available = true`.
3. `data/experience.ts` — the Aradhya Technologies internship needs `role`,
   `period`, `summary`, `responsibilities`, `stack`.
4. `data/projects.ts` — case-study prose (`problem`, `solution`, `features`,
   `architecture`, `challenges`), repo and demo links, and `stack` for the
   projects where none was recorded. SmartSBM is intentionally marked
   `detailsPending`.
5. `public/projects/*.png` — screenshots, ~1600×1000.
6. `data/achievements.ts` — Logicthon organiser, date and description.
7. `data/learning.ts` — conference and workshop dates.
8. `.env.local` — `NEXT_PUBLIC_SITE_URL`, and optionally
   `CONTACT_WEBHOOK_URL` or the Resend variables to turn the contact form on.

**Assumptions made, so you can overrule them:** the JSON-LD `Person` schema
sets `addressCountry: "IN"`, inferred from Haridwar; the site is described in
metadata only with your own words from the brief, with no professional claims
added; the hero's four figures are labelled as counts of what's on the site
rather than as achievements.
