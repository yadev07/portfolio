/**
 * Conferences, events and workshops — learning that happened outside coursework.
 *
 * Dates and certificates were not supplied and remain `null`.
 *
 * Note on the "Faith & Future" conference: you mentioned it may have been held
 * in the run-up to the AI Impact Summit 2026. That association is not confirmed
 * here, so it is left out of the page. If it is accurate, set `context` to
 * something like "Held as a pre-summit event for the AI Impact Summit 2026" and
 * it will render as a line under the entry.
 */

export interface LearningEntry {
  id: string;
  title: string;
  /** e.g. "International conference", "Workshop". */
  kind: string;
  host: string | null;
  location: string | null;
  /** Free text, e.g. "February 2026". */
  date: string | null;
  /** Optional extra line of verified context. */
  context: string | null;
}

export const learning: LearningEntry[] = [
  {
    id: "faith-and-future",
    title: "Faith & Future: Integrating AI with Spirituality",
    kind: "International conference",
    host: "Dev Sanskriti Vishwavidyalaya",
    location: "Haridwar",
    date: null,
    context: "Attended the international conference.",
  },
  {
    id: "be10x-ai-workshop",
    title: "Be10x AI Workshop",
    kind: "Workshop",
    host: "Be10x",
    location: null,
    date: null,
    context: "Attended the AI workshop.",
  },
];

export const learningCount: number = learning.length;
