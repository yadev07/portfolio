import { ImageOff } from "lucide-react";
import Image from "next/image";

import type { Screenshot } from "@/data/projects";
import { cn } from "@/lib/utils";

const ASPECT = {
  wide: "aspect-[16/10]",
  video: "aspect-video",
  tall: "aspect-[4/3]",
} as const;

interface MockupFrameProps {
  screenshot?: Screenshot | null;
  /** Shown in the frame's title bar. */
  title: string;
  /** Where the image should be dropped, shown in the empty state. */
  hintPath: string;
  aspect?: keyof typeof ASPECT;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * A framed slot for a project screenshot. When no image exists it renders a
 * labelled empty frame telling you exactly which file to add, rather than a
 * stock photo or a grey box.
 */
export function MockupFrame({
  screenshot,
  title,
  hintPath,
  aspect = "wide",
  className,
  sizes = "(min-width: 1024px) 640px, 100vw",
  priority = false,
}: MockupFrameProps) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-card border border-white/[0.07] bg-ink-800/60 shadow-panel",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-2.5">
        <span className="truncate font-mono text-[11.5px] text-haze">{title}</span>
        <span aria-hidden="true" className="shrink-0 font-mono text-[11px] text-haze-dim">
          {screenshot ? "screenshot" : "1600 × 1000"}
        </span>
      </div>

      <div className={cn("relative w-full", ASPECT[aspect])}>
        {screenshot ? (
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <div className="frame-empty absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <ImageOff aria-hidden="true" className="h-5 w-5 text-haze-dim" />
            <p className="text-[13px] text-haze">No screenshot yet</p>
            <code className="max-w-full truncate rounded bg-ink-950/60 px-2 py-1 font-mono text-[11px] text-saffron/80">
              {hintPath}
            </code>
          </div>
        )}
      </div>
    </figure>
  );
}
