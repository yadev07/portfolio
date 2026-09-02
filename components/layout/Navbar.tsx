"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, SquareTerminal, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { ResumeButton } from "@/components/ui/ResumeButton";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { DURATION, EASE } from "@/lib/motion";
import { requestTerminal } from "@/lib/terminal-events";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

/** Stable reference — the scroll-spy observer is rebuilt if this changes. */
const SECTION_IDS = navItems.map((item) => item.id);

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reduceMotion = useReducedMotion();
  const activeSection = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock the page behind the mobile menu and allow Escape to dismiss it.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const hrefFor = useCallback(
    (id: string) => {
      if (id === "home") return isHome ? "#home" : "/";
      return isHome ? `#${id}` : `/#${id}`;
    },
    [isHome],
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-smooth",
        scrolled || menuOpen
          ? "border-b border-white/[0.07] bg-ink-900/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav aria-label="Primary" className="shell flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5"
          aria-label={`${profile.name} — home`}
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-saffron/35 font-display text-[15px] leading-none text-saffron transition-colors duration-300 group-hover:border-saffron/70"
          >
            {profile.monogram}
          </span>
          <span className="hidden truncate font-display text-[15px] tracking-[-0.01em] text-paper sm:block">
            {profile.name}
          </span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = isHome && activeSection === item.id;
            return (
              <li key={item.id} className="relative">
                <Link
                  href={hrefFor(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative block px-2.5 py-2 text-[13px] transition-colors duration-300",
                    isActive ? "text-paper" : "text-haze hover:text-paper",
                  )}
                >
                  {item.label}
                </Link>
                {isActive ? (
                  <motion.span
                    layoutId="nav-active-indicator"
                    aria-hidden="true"
                    className="absolute inset-x-2.5 -bottom-0.5 h-px bg-saffron"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: DURATION.base, ease: EASE }
                    }
                  />
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={requestTerminal}
            aria-label="Open the interactive terminal"
            className="hidden h-9 w-9 items-center justify-center rounded-[10px] border border-white/[0.1] text-haze transition-colors duration-300 hover:border-saffron/50 hover:text-saffron-soft sm:inline-flex"
          >
            <SquareTerminal aria-hidden="true" className="h-4 w-4" />
          </button>

          <div className="hidden xl:block">
            <ResumeButton size="sm" />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/[0.1] text-paper transition-colors duration-300 hover:border-saffron/50 lg:hidden"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Menu aria-hidden="true" className="h-4 w-4" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : DURATION.fast, ease: EASE }}
            className="lg:hidden"
          >
            <div className="shell max-h-[calc(100dvh-4rem)] overflow-y-auto pb-8 pt-2">
              <ul className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : DURATION.base,
                      ease: EASE,
                      delay: reduceMotion ? 0 : 0.03 * index,
                    }}
                  >
                    <Link
                      href={hrefFor(item.id)}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-3.5 font-display text-lg text-paper"
                    >
                      {item.label}
                      <span aria-hidden="true" className="text-sm text-haze-dim">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <ResumeButton size="sm" />
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    requestTerminal();
                  }}
                  className="inline-flex h-9 items-center gap-2 rounded-[10px] border border-white/[0.12] px-3.5 text-[13px] text-paper transition-colors duration-300 hover:border-saffron/50"
                >
                  <SquareTerminal aria-hidden="true" className="h-4 w-4" />
                  Terminal
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
