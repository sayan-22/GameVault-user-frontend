import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet, apiPost, apiDelete, ApiError } from "@/utils/api";
import {
  setTokens,
  clearTokens,
  getAccessToken,
  getRefreshToken,
} from "@/utils/auth";

// Shape returned by the backend's toPublicUser() (authService).
export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

type AuthTokens = { accessToken: string; refreshToken: string; user: AuthUser };

const errMessage = (e: unknown) =>
  e instanceof ApiError ? e.message : "Something went wrong. Please try again.";

// Hydrate the current user on load (the axios client auto-refreshes an expired
// access token before this gives up).
export const fetchMe = createAsyncThunk("auth/fetchMe", async () => {
  // Persist across restarts: revalidate if we hold either token. With only a
  // refresh token, the api client transparently refreshes on /me's 401.
  if (!getAccessToken() && !getRefreshToken()) return null;
  try {
    const me = await apiGet<AuthUser>("/user/auth/me");
    return me ?? null;
  } catch {
    clearTokens();
    return null;
  }
});

export const login = createAsyncThunk<
  AuthUser,
  { email: string; password: string; remember?: boolean },
  { rejectValue: string }
>("auth/login", async (creds, { rejectWithValue }) => {
  try {
    const data = await apiPost<AuthTokens>("/user/auth/signin", creds);
    if (!data) return rejectWithValue("Login failed");
    setTokens(data);
    return data.user;
  } catch (e) {
    return rejectWithValue(errMessage(e));
  }
});

export const signup = createAsyncThunk<
  AuthUser,
  { name: string; email: string; password: string },
  { rejectValue: string }
>("auth/signup", async (creds, { rejectWithValue }) => {
  try {
    const data = await apiPost<AuthTokens>("/user/auth/signup", creds);
    if (!data) return rejectWithValue("Signup failed");
    setTokens(data);
    return data.user;
  } catch (e) {
    return rejectWithValue(errMessage(e));
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await apiDelete("/user/auth/logout");
  } catch {
    // Even if the server call fails, drop local credentials.
  }
  clearTokens();
});

interface AuthState {
  user: AuthUser | null;
  loading: boolean; // initial /me hydration in flight
}

const initialState: AuthState = { user: null, loading: true };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
