import Link from "next/link";

import { SocialIconLinks } from "@/components/ui/SocialLinks";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.07] bg-ink-950">
      <div className="shell py-14 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-2xl tracking-[-0.015em] text-paper">
              {profile.name}
            </p>
            <p className="mt-1.5 text-[13px] text-haze">{profile.role}</p>
            <p className="mt-4 text-[13px] leading-relaxed text-haze">
              {profile.universityShort} — {profile.campus}. Expected {profile.graduationYear}.
            </p>
            <SocialIconLinks className="mt-6" />
          </div>

          <nav aria-label="Footer" className="md:pt-2">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.id === "home" ? "/" : `/#${item.id}`}
                    className="text-[13.5px] text-haze transition-colors duration-300 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/projects"
                  className="text-[13.5px] text-haze transition-colors duration-300 hover:text-paper"
                >
                  All projects
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/[0.06] pt-6 text-[12.5px] text-haze sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}
          </p>
          <p>Built with Next.js, TypeScript and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
