import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Game } from "@/constants";
import { apiGet } from "@/lib/services/authAxios";
import { API_URLS } from "@/lib/services/AllAPIUrls";
import { parseGames, parseGame } from "@/lib/services/games";

// Live (re-)fetch used by the storefront pollers. Uses axios (apiGet), which
// THROWS on error — so a transient failure rejects the thunk and we keep the
// last good data instead of blanking the catalog. parseGames/parseGame validate
// the payload with zod before it reaches the store.
export const fetchGames = createAsyncThunk("games/fetchAll", async () => {
  return parseGames(await apiGet(API_URLS.games.list));
});

export const fetchGame = createAsyncThunk(
  "games/fetchOne",
  async (idOrSlug: string) => {
    const data = await apiGet(API_URLS.games.byId(idOrSlug));
    return data ? parseGame(data) : null;
  }
);

interface GamesState {
  items: Game[];
  current: Game | null;
  loaded: boolean; // true once the client store has been seeded/fetched
}

const initialState: GamesState = { items: [], current: null, loaded: false };

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    // Seed the store from the server-rendered initial data (no flash on load).
    setGames: (state, action: PayloadAction<Game[]>) => {
      state.items = action.payload;
      state.loaded = true;
    },
    setCurrentGame: (state, action: PayloadAction<Game | null>) => {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchGame.fulfilled, (state, action) => {
        // Keep the last known game if a poll briefly returns nothing.
        if (action.payload) state.current = action.payload;
      });
    // Rejected cases intentionally do nothing — keep prior data on transient errors.
  },
});

export const { setGames, setCurrentGame } = gamesSlice.actions;
export default gamesSlice.reducer;
