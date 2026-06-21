"use client";

import { useEffect, useRef } from "react";
import type { Game } from "@/constants";
import { useAppDispatch } from "@/lib/store/hooks";
import { fetchGames, fetchGame, setGames } from "@/lib/store/gamesSlice";

// How often the storefront re-checks the backend for admin changes.
const POLL_MS = 15000;

// Seed the games list from SSR data, then keep it fresh: poll every POLL_MS and
// re-fetch whenever the tab regains focus. Makes admin add/edit/delete show up
// without a manual refresh.
export function useGamesPolling(initial: Game[]) {
  const dispatch = useAppDispatch();
  // Lazy ref captures the mount-time SSR data without writing during render.
  const seed = useRef(initial);

  useEffect(() => {
    dispatch(setGames(seed.current));
    // Skip the fetch while the tab is hidden — the focus refetch catches up.
    const tick = () => {
      if (!document.hidden) dispatch(fetchGames());
    };
    const interval = window.setInterval(tick, POLL_MS);
    window.addEventListener("focus", tick);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", tick);
    };
  }, [dispatch]);
}

// Poll a single game-detail page; re-polls when the route switches game id.
// The detail view falls back to its SSR game until a poll lands, so no seeding.
export function useGamePolling(id: string) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Skip the fetch while the tab is hidden — the focus refetch catches up.
    const tick = () => {
      if (!document.hidden) dispatch(fetchGame(id));
    };
    const interval = window.setInterval(tick, POLL_MS);
    window.addEventListener("focus", tick);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", tick);
    };
  }, [dispatch, id]);
}
