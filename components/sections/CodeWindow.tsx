"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { codeTabs } from "@/lib/code-preview";
import { TOKEN_CLASS, tokenizeBlock } from "@/lib/highlight";
import { cn } from "@/lib/utils";

/**
 * The hero visual: an editor panel showing the site's own data files.
 *
 * It is not decorative mock code — `lib/code-preview.ts` generates these
 * strings from the same `data/` modules the rest of the page renders, so the
 * panel is always true and can never drift.
 *
 * On first load the first file types itself in once. Switching tabs shows the
 * file immediately; under reduced motion nothing types at all.
 */
export function CodeWindow({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const firstTab = codeTabs[0];
  const [activeId, setActiveId] = useState<string>(firstTab ? firstTab.id : "");
  const [typedCount, setTypedCount] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  const active = codeTabs.find((tab) => tab.id === activeId) ?? firstTab;

  useEffect(() => {
    const total = firstTab ? firstTab.code.length : 0;

    if (reduceMotion || total === 0) {
      setTypedCount(total);
      setTypingDone(true);
      return;
    }

    let frame = 0;
    const started = performance.now();
    const duration = Math.min(1500, Math.max(700, total * 5));

    const step = (now: number) => {
      const progress = Math.min(1, (now - started) / duration);
      setTypedCount(Math.round(total * progress));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setTypingDone(true);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, firstTab]);

  const isTypingThisTab =
    !typingDone && Boolean(firstTab) && Boolean(active) && active?.id === firstTab?.id;

  const source = active?.code ?? "";
  const visible = isTypingThisTab ? source.slice(0, typedCount) : source;
  const lines = useMemo(() => tokenizeBlock(visible), [visible]);

  if (!active) return null;

  return (
    <div className={cn("panel overflow-hidden shadow-panel", className)}>
      <div className="flex items-stretch border-b border-white/[0.07] bg-ink-850/70">
        <div
          role="tablist"
          aria-label="Portfolio data files"
          className="scroll-thin flex min-w-0 flex-1 overflow-x-auto"
        >
          {codeTabs.map((tab) => {
            const selected = tab.id === active.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`code-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls="code-panel"
                onClick={() => setActiveId(tab.id)}
                className={cn(
                  "relative shrink-0 px-3.5 py-2.5 font-mono text-[11.5px] transition-colors duration-300",
                  selected ? "text-paper" : "text-haze hover:text-paper-dim",
                )}
              >
                {tab.filename}
                {selected ? (
                  <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px bg-saffron" />
                ) : null}
              </button>
            );
          })}
        </div>
        <span className="hidden shrink-0 items-center px-4 font-mono text-[11px] text-haze sm:flex">
          read-only
        </span>
      </div>

      <div
        id="code-panel"
        role="tabpanel"
        aria-labelledby={`code-tab-${active.id}`}
        tabIndex={0}
        className="scroll-thin overflow-x-auto px-3 py-4 sm:px-4 sm:py-5"
      >
        <pre className="font-mono text-[11.5px] leading-[1.75] sm:text-[12.5px] md:text-[13px]">
          <code>
            {lines.map((tokens, lineIndex) => (
              <span
                key={lineIndex}
                className="grid grid-cols-[1.5rem_minmax(0,1fr)] sm:grid-cols-[2rem_minmax(0,1fr)]"
              >
                <span aria-hidden="true" className="select-none pr-3 text-right text-haze">
                  {lineIndex + 1}
                </span>
                <span className="whitespace-pre">
                  {tokens.map((token, tokenIndex) => (
                    <span key={tokenIndex} className={TOKEN_CLASS[token.kind]}>
                      {token.text}
                    </span>
                  ))}
                  {isTypingThisTab && lineIndex === lines.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="ml-px inline-block h-[0.95em] w-[0.5em] translate-y-[0.12em] animate-caret-blink bg-saffron/80"
                    />
                  ) : null}
                </span>
              </span>
            ))}
          </code>
        </pre>
      </div>

      <p className="border-t border-white/[0.07] px-4 py-2.5 text-[11.5px] text-haze">
        Rendered from this site&apos;s own data files — not a mock-up.
      </p>
    </div>
  );
}
