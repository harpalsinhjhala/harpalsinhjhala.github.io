"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, profile, site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`glass sticky top-0 z-50 border-b transition-colors ${scrolled || open ? "border-line" : "border-transparent"}`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="sr-only">{profile.name}, home</span>
          <span aria-hidden className="grid size-8 place-items-center rounded-md border border-line-strong bg-panel font-display text-sm font-semibold tracking-tight text-fg transition-colors group-hover:border-accent">
            {profile.initials}
          </span>
          <span aria-hidden className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-muted lg:inline">harpal_jhala</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={`/${item.href}`}
                className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={site.cvPath}
            download
            className="hidden items-center gap-2 whitespace-nowrap rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-accent-fg transition-transform hover:-translate-y-px sm:inline-flex"
          >
            <Icon name="download" />
            Download CV
          </a>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-lg border border-line text-muted md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-line px-4 pb-5 pt-2 md:hidden">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={`/${item.href}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-line py-3.5 text-base text-fg"
                >
                  {item.label}
                  <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={site.cvPath}
            download
            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-medium text-accent-fg"
          >
            <Icon name="download" />
            Download CV
          </a>
        </div>
      ) : null}
    </header>
  );
}
