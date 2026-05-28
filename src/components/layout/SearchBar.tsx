"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GAMES, type Game } from "@/constants/game";
import Inputfield from "@/components/form/Inputfield";
import Popover from "@/components/popover/Popover";

const DEBOUNCE_MS = 220;

function searchGames(q: string): Game[] {
  if (!q) return [];
  const needle = q.toLowerCase();
  return GAMES.filter(
    (g) =>
      g.title.toLowerCase().includes(needle) ||
      g.tags.some((t) => t.toLowerCase().includes(needle)) ||
      g.developer.toLowerCase().includes(needle),
  ).slice(0, 6);
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setDebounced("");
      setLoading(false);
      return;
    }
    setLoading(true);
    const id = window.setTimeout(() => {
      setDebounced(query.trim());
      setLoading(false);
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [query]);

  const results = searchGames(debounced);
  const panelOpen = open && query.trim().length > 0;

  return (
    <div ref={triggerRef} className="relative w-full">
      <Inputfield
        name="navbar-search"
        type="search"
        value={query}
        placeholder="Search games, genres, studios"
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="h-10 pl-9"
      />
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
        fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>

      <Popover
        open={panelOpen}
        onClose={() => setOpen(false)}
        triggerRef={triggerRef}
        placement="bottom"
      >
        {loading && <div className="px-4 py-3 text-xs text-text-muted">Searching…</div>}
        {!loading && results.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-text-muted">
            No results for <span className="text-text">&ldquo;{debounced}&rdquo;</span>
          </div>
        )}
        {!loading && results.length > 0 && (
          <ul className="max-h-80 overflow-auto p-1">
            {results.map((g) => (
              <li key={g.id}>
                <Link
                  href={`/game/${g.id}`}
                  className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-card"
                  onClick={() => setOpen(false)}
                >
                  <span
                    className="h-12 w-9 flex-none rounded-md bg-cover bg-center ring-1 ring-border"
                    style={{ backgroundImage: `url(${g.cover})` }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-text">{g.title}</span>
                    <span className="block truncate text-xs text-text-muted">
                      {g.tags.slice(0, 2).join(" • ")}
                    </span>
                  </span>
                  <span className="text-xs font-medium text-cyan">
                    {g.free ? "Free" : `$${g.price.toFixed(2)}`}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Popover>
    </div>
  );
}
