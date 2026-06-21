import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet, apiPost, apiDelete, ApiError } from "@/lib/services/authAxios";
import { API_URLS } from "@/lib/services/AllAPIUrls";

// Shape returned by the backend's toPublicUser() (authService).
export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

const errMessage = (e: unknown) =>
  e instanceof ApiError ? e.message : "Something went wrong. Please try again.";

// Hydrate the current user on load. The auth cookie (if any) is httpOnly, so JS
// can't peek at it — just ask /me; the cookie rides along, and the axios client
// auto-refreshes an expired access token before this gives up.
export const fetchMe = createAsyncThunk("auth/fetchMe", async () => {
  try {
    const me = await apiGet<AuthUser>(API_URLS.auth.me);
    return me ?? null;
  } catch {
    return null;
  }
});

export const login = createAsyncThunk<
  AuthUser,
  { email: string; password: string; remember?: boolean },
  { rejectValue: string }
>("auth/login", async (creds, { rejectWithValue }) => {
  try {
    // The backend sets the auth cookies itself; the body is just the user.
    const user = await apiPost<AuthUser>(API_URLS.auth.signin, creds);
    if (!user) return rejectWithValue("Login failed");
    return user;
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
    const user = await apiPost<AuthUser>(API_URLS.auth.signup, creds);
    if (!user) return rejectWithValue("Signup failed");
    return user;
  } catch (e) {
    return rejectWithValue(errMessage(e));
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  // The backend clears the cookies; we just call the endpoint.
  try {
    await apiDelete(API_URLS.auth.logout);
  } catch {
    // Even if the server call fails, treat the user as logged out.
  }
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
