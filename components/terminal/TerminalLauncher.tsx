"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";

import { profile } from "@/data/profile";
import { DURATION, EASE } from "@/lib/motion";
import { TERMINAL_OPEN_EVENT } from "@/lib/terminal-events";
import {
  WELCOME,
  completeCommand,
  runCommand,
} from "@/lib/terminal-commands";
import type { LineKind, TerminalLine } from "@/lib/terminal-commands";
import { cn } from "@/lib/utils";

const LINE_CLASS: Record<LineKind, string> = {
  heading: "text-paper font-medium",
  text: "text-paper-dim",
  muted: "text-haze",
  accent: "text-saffron",
  error: "text-red-300",
  prompt: "text-paper",
};

const FOCUSABLE = 'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * The one interactive extra: a small terminal that answers questions from the
 * site's own data. Opened from the navbar, from the hero, or with Ctrl/⌘ + `.
 * Entirely optional — nothing on the page depends on it.
 */
export function TerminalLauncher() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME);
  const [value, setValue] = useState("");
  const [entered, setEntered] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  // Triggers: the custom event from the navbar/hero, plus a keyboard shortcut.
  useEffect(() => {
    const onRequest = () => setOpen(true);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "`" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    };

    window.addEventListener(TERMINAL_OPEN_EVENT, onRequest);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener(TERMINAL_OPEN_EVENT, onRequest);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // While open: lock the page, remember where focus came from, take focus.
  useEffect(() => {
    if (!open) return;

    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      restoreFocusTo.current?.focus?.();
    };
  }, [open]);

  // Keep the newest output in view.
  useEffect(() => {
    const node = outputRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [lines, open]);

  function submit(raw: string) {
    const input = raw.trim();
    const { lines: output, action } = runCommand(input);

    if (input.length > 0) {
      setEntered((previous) => [...previous, input]);
    }
    setCursor(null);
    setValue("");

    if (action?.type === "clear") {
      setLines([]);
      return;
    }

    setLines((previous) => [
      ...previous,
      { kind: "prompt", text: input },
      ...output,
    ]);

    if (action?.type === "close") {
      setOpen(false);
      return;
    }
    if (action?.type === "navigate") {
      setOpen(false);
      router.push(action.href);
    }
  }

  function onInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (entered.length === 0) return;
      const next = cursor === null ? entered.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(entered[next] ?? "");
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (cursor === null) return;
      const next = cursor + 1;
      if (next >= entered.length) {
        setCursor(null);
        setValue("");
        return;
      }
      setCursor(next);
      setValue(entered[next] ?? "");
      return;
    }

    if (event.key === "Tab") {
      const completion = completeCommand(value);
      if (completion) {
        event.preventDefault();
        setValue(completion);
      }
    }
  }

  // Small focus trap: the panel only holds the close button and the input.
  function onPanelKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusable.length === 0) return;

    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="terminal"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : DURATION.fast, ease: EASE }}
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
        >
          <button
            type="button"
            aria-label="Close terminal"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-default bg-ink-950/75 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${profile.shortName}'s portfolio terminal`}
            onKeyDown={onPanelKeyDown}
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: reduceMotion ? 0 : DURATION.base, ease: EASE }}
            className="relative flex h-[76dvh] w-full flex-col overflow-hidden rounded-t-card border border-white/[0.09] bg-ink-950/95 shadow-lift sm:h-[30rem] sm:max-w-2xl sm:rounded-card"
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/[0.07] px-4 py-2.5">
              <p className="truncate font-mono text-[11.5px] text-haze">
                {profile.shortName.toLowerCase()}@portfolio — terminal
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close terminal"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/[0.09] text-haze transition-colors duration-300 hover:border-saffron/50 hover:text-saffron"
              >
                <X aria-hidden="true" className="h-3.5 w-3.5" />
              </button>
            </div>

            <div
              ref={outputRef}
              aria-live="polite"
              className="scroll-thin min-h-0 flex-1 overflow-y-auto px-4 py-4 font-mono text-[12.5px] leading-[1.7]"
            >
              {lines.map((entry, index) => (
                <p
                  key={`${index}-${entry.text.slice(0, 12)}`}
                  className={cn("whitespace-pre-wrap break-words", LINE_CLASS[entry.kind])}
                >
                  {entry.kind === "prompt" ? (
                    <>
                      <span className="text-saffron">$ </span>
                      {entry.text}
                    </>
                  ) : (
                    entry.text || " "
                  )}
                </p>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                submit(value);
              }}
              className="flex shrink-0 items-center gap-2 border-t border-white/[0.07] px-4 py-3"
            >
              <span aria-hidden="true" className="font-mono text-[12.5px] text-saffron">
                $
              </span>
              <input
                ref={inputRef}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={onInputKeyDown}
                aria-label="Terminal command"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder="help"
                className="min-w-0 flex-1 bg-transparent font-mono text-[12.5px] text-paper placeholder:text-haze-dim focus:outline-none"
              />
              <span className="hidden font-mono text-[11px] text-haze sm:block">
                ↑ history / Tab completes / Esc closes
              </span>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
