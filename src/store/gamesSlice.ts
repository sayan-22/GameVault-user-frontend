import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Game } from "@/constants/game";
import { apiGet } from "@/utils/api";
import { mapGame, type ApiGame } from "@/services/games";

// Live (re-)fetch used by the storefront pollers. Uses axios (apiGet), which
// THROWS on error — so a transient failure rejects the thunk and we keep the
// last good data instead of blanking the catalog.
export const fetchGames = createAsyncThunk("games/fetchAll", async () => {
  const data = await apiGet<ApiGame[]>("/user/games");
  return (data ?? []).map(mapGame);
});

export const fetchGame = createAsyncThunk(
  "games/fetchOne",
  async (idOrSlug: string) => {
    const data = await apiGet<ApiGame>(
      `/user/games/${encodeURIComponent(idOrSlug)}`
    );
    return data ? mapGame(data) : null;
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
