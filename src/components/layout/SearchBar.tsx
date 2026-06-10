"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Game } from "@/constants/game";
import { searchGames } from "@/services/games";
import Inputfield from "@/components/form/Inputfield";
import Popover from "@/components/popover/Popover";

const DEBOUNCE_MS = 250;
const MAX_RESULTS = 6;

// Bold the matched part of a title (YouTube-style suggestion highlighting).
function highlight(title: string, query: string): ReactNode {
  const idx = title.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span className="font-semibold text-text">
        {title.slice(idx, idx + query.length)}
      </span>
      {title.slice(idx + query.length)}
    </>
  );
}

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Game[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1); // keyboard-highlighted row
  const triggerRef = useRef<HTMLDivElement | null>(null);

  // Debounced server search. Ignores stale responses if the query moved on.
  useEffect(() => {
    const q = query.trim();
    if (!q) return;
    let ignore = false;
    const handle = window.setTimeout(async () => {
      try {
        const games = await searchGames(q);
        if (!ignore) setResults(games.slice(0, MAX_RESULTS));
      } catch {
        if (!ignore) setResults([]);
      } finally {
        if (!ignore) {
          setLoading(false);
          setActive(-1);
        }
      }
    }, DEBOUNCE_MS);
    return () => {
      ignore = true;
      window.clearTimeout(handle);
    };
  }, [query]);

  const onChange = (value: string) => {
    setQuery(value);
    setOpen(true);
    if (value.trim()) {
      setLoading(true);
    } else {
      setResults([]);
      setLoading(false);
      setActive(-1);
    }
  };

  const panelOpen = open && query.trim().length > 0;

  const goTo = (game: Game) => {
    setOpen(false);
    setQuery("");
    setResults([]);
    router.push(`/game/${game.id}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!panelOpen || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = active >= 0 ? results[active] : results[0];
      if (pick) goTo(pick);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={triggerRef} onKeyDown={onKeyDown} className="relative w-full">
      <Inputfield
        name="navbar-search"
        type="search"
        value={query}
        placeholder="Search games, genres, studios"
        onChange={(e) => onChange(e.target.value)}
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
        {loading && results.length === 0 && (
          <div className="px-4 py-3 text-xs text-text-muted">Searching…</div>
        )}
        {!loading && results.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-text-muted">
            No results for <span className="text-text">&ldquo;{query.trim()}&rdquo;</span>
          </div>
        )}
        {results.length > 0 && (
          <ul className="max-h-80 overflow-auto p-1">
            {results.map((g, i) => (
              <li key={g.id}>
                <Link
                  href={`/game/${g.id}`}
                  onClick={() => goTo(g)}
                  onMouseEnter={() => setActive(i)}
                  aria-selected={active === i}
                  className={`flex items-center gap-3 rounded-lg p-2 transition-colors ${
                    active === i ? "bg-card" : "hover:bg-card"
                  }`}
                >
                  <span
                    className="h-12 w-9 flex-none rounded-md bg-cover bg-center ring-1 ring-border"
                    style={{ backgroundImage: `url(${g.cover})` }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-text-secondary">
                      {highlight(g.title, query.trim())}
                    </span>
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
