// Token storage for the storefront. The backend returns { accessToken, refreshToken }
// in the response body (not cookies), so we keep them in localStorage.
// Access token is short-lived (15m); the refresh token (7d/30d) mints new ones.

const ACCESS_KEY = "gv_access_token";
const REFRESH_KEY = "gv_refresh_token";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(REFRESH_KEY);
}

export function setTokens(tokens: {
  accessToken: string;
  refreshToken?: string;
}): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_KEY, tokens.accessToken);
  if (tokens.refreshToken) {
    window.localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
  }
}

export function setAccessToken(accessToken: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_KEY, accessToken);
}

export function clearTokens(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACCESS_KEY);
  window.localStorage.removeItem(REFRESH_KEY);
}
