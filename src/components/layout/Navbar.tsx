"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import ProfileMenu from "./ProfileMenu";
import { IconButton } from "@/components/buttons";
import { useAppSelector } from "@/lib/store/hooks";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse", href: "/browse" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const cartCount = useAppSelector((s) => s.cart.items.length);

  return (
    <header className="relative z-50 border-b border-border/60 bg-transparent">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:gap-6 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-text" : "text-text-secondary hover:text-text",
                )}
              >
                {l.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-linear-to-r from-transparent via-cyan to-transparent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <div className="hidden max-w-md flex-1 sm:block">
            <SearchBar />
          </div>
          <IconButton
            href="/cart"
            ariaLabel="Cart"
            className="relative h-10 w-10 border-border bg-card/60 text-text-secondary transition-all hover:border-cyan-border hover:text-cyan hover:shadow-[0_0_18px_-6px_rgba(0,217,255,0.55)]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 4h2l2.6 11.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="17" cy="20" r="1.5" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-cyan px-1 text-[10px] font-semibold text-bg">
                {cartCount}
              </span>
            )}
          </IconButton>
          <ProfileMenu />
          <IconButton
            ariaLabel="Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="h-10 w-10 border-border bg-card/60 text-text-secondary md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
              {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </IconButton>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/60 glass-navbar px-4 pb-4 pt-3 sm:px-6 md:hidden">
          <div className="mb-3 sm:hidden">
            <SearchBar />
          </div>
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium",
                    active ? "bg-card text-text" : "text-text-secondary hover:bg-card hover:text-text",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
