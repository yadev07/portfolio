import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { links } from "@/data/profile";
import { isPlaceholder, mailtoHref, prettyUrl, resolveHref } from "@/lib/links";
import { cn } from "@/lib/utils";

interface SocialEntry {
  key: string;
  label: string;
  icon: LucideIcon;
  href: string | null;
  /** What to show next to the label in the list view. */
  value: string;
}

function buildEntries(): SocialEntry[] {
  return [
    {
      key: "github",
      label: "GitHub",
      icon: Github,
      href: resolveHref(links.github),
      value: isPlaceholder(links.github) ? "Not linked yet" : prettyUrl(links.github),
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      href: resolveHref(links.linkedin),
      value: isPlaceholder(links.linkedin) ? "Not linked yet" : prettyUrl(links.linkedin),
    },
    {
      key: "email",
      label: "Email",
      icon: Mail,
      href: mailtoHref(links.email),
      value: isPlaceholder(links.email) ? "Not added yet" : links.email,
    },
  ];
}

const ICON_BASE =
  "inline-flex h-10 w-10 items-center justify-center rounded-[10px] border transition-colors duration-300";

/** Compact icon row. Used in the hero and the footer. */
export function SocialIconLinks({ className }: { className?: string }) {
  const entries = buildEntries();

  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {entries.map(({ key, label, icon: Icon, href }) => (
        <li key={key}>
          {href ? (
            <a
              href={href}
              className={cn(
                ICON_BASE,
                "border-white/[0.08] text-haze hover:border-saffron/50 hover:text-saffron-soft",
              )}
              target={key === "email" ? undefined : "_blank"}
              rel={key === "email" ? undefined : "noreferrer noopener"}
              aria-label={label}
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
            </a>
          ) : (
            <span
              className={cn(ICON_BASE, "cursor-not-allowed border-dashed border-ink-600 text-haze-dim")}
              aria-disabled="true"
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
              <span className="sr-only">{label} — link not added yet</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/** Labelled rows. Used in the contact section where there is room to be clear. */
export function SocialList({ className }: { className?: string }) {
  const entries = buildEntries();

  return (
    <ul className={cn("divide-y divide-white/[0.06] border-y border-white/[0.06]", className)}>
      {entries.map(({ key, label, icon: Icon, href, value }) => (
        <li key={key}>
          {href ? (
            <a
              href={href}
              className="group flex items-center gap-4 py-4 transition-colors duration-300 hover:text-paper"
              target={key === "email" ? undefined : "_blank"}
              rel={key === "email" ? undefined : "noreferrer noopener"}
            >
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-haze transition-colors duration-300 group-hover:text-saffron" />
              <span className="w-20 shrink-0 text-[13px] text-haze">{label}</span>
              <span className="min-w-0 flex-1 truncate text-sm text-paper-dim group-hover:text-paper">
                {value}
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-haze-dim transition-colors duration-300 group-hover:text-saffron"
              />
            </a>
          ) : (
            <div className="flex items-center gap-4 py-4">
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-haze-dim" />
              <span className="w-20 shrink-0 text-[13px] text-haze">{label}</span>
              <span className="min-w-0 flex-1 truncate text-sm text-haze">{value}</span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
