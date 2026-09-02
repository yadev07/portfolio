"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy for the navbar indicator.
 *
 * `ids` must be a stable reference (define it at module scope) — the observer
 * is rebuilt whenever it changes.
 */
export function useActiveSection(ids: string[], topOffset = 96): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      {
        rootMargin: `-${topOffset}px 0px -50% 0px`,
        threshold: [0.05, 0.2, 0.5, 0.8],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids, topOffset]);

  return active;
}
