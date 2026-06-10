// Axios client for the GameVault backend. Every backend response is shaped
// { success, message, data? } (see backend src/utils/responses.ts). Helpers below
// return `data` on success and throw an ApiError carrying the backend's message.

import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  clearTokens,
} from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

type ApiEnvelope<T> = { success: boolean; message: string; data?: T };

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const api = axios.create({ baseURL: API_URL });

// Attach the access token to every request.
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On a 401, try to mint a fresh access token once, then retry the original request.
let refreshing: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;
  try {
    // Use a bare axios call so this request skips the interceptors below.
    const res = await axios.post<ApiEnvelope<{ accessToken: string }>>(
      `${API_URL}/user/auth/refresh`,
      { refreshToken }
    );
    const accessToken = res.data?.data?.accessToken;
    if (!accessToken) return null;
    setAccessToken(accessToken);
    return accessToken;
  } catch {
    return null;
  }
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const isRefreshCall = original?.url?.includes("/user/auth/refresh");

    if (error.response?.status === 401 && original && !original._retry && !isRefreshCall) {
      original._retry = true;
      // Coalesce parallel 401s into a single refresh.
      refreshing = refreshing ?? refreshAccessToken();
      const newToken = await refreshing;
      refreshing = null;

      if (newToken) {
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      }
      clearTokens();
    }
    return Promise.reject(error);
  }
);

// Normalize any axios/network error into an ApiError with the backend's message.
function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const data = error.response.data as ApiEnvelope<unknown> | undefined;
      return new ApiError(
        data?.message ?? "Something went wrong. Please try again.",
        error.response.status
      );
    }
    return new ApiError(
      "Can't reach the server. Please check your connection and try again.",
      0
    );
  }
  return new ApiError("Something went wrong. Please try again.", 0);
}

export async function apiPost<T = unknown>(
  path: string,
  body?: unknown,
  config?: AxiosRequestConfig
): Promise<T | undefined> {
  try {
    const res = await api.post<ApiEnvelope<T>>(path, body, config);
    return res.data.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function apiGet<T = unknown>(
  path: string,
  config?: AxiosRequestConfig
): Promise<T | undefined> {
  try {
    const res = await api.get<ApiEnvelope<T>>(path, config);
    return res.data.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function apiDelete<T = unknown>(
  path: string,
  config?: AxiosRequestConfig
): Promise<T | undefined> {
  try {
    const res = await api.delete<ApiEnvelope<T>>(path, config);
    return res.data.data;
  } catch (error) {
    throw toApiError(error);
  }
}
