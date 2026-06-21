// Axios client for the GameVault backend. Every backend response is shaped
// { success, message, data? } (see backend src/utils/responses.ts). Helpers below
// return `data` on success and throw an ApiError carrying the backend's message.

import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { API_URLS } from "./AllAPIUrls";

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

// `withCredentials: true` makes the browser send our httpOnly auth cookies on
// every request (and keep any cookies the backend sets back). We never read or
// store the tokens in JS — that's what keeps them safe from XSS.
export const api = axios.create({ baseURL: API_URL, withCredentials: true });

// Auth endpoints where a 401 just means "wrong credentials / not logged in".
// There's nothing to refresh for these, so don't try.
const NO_REFRESH = [
  API_URLS.auth.signin,
  API_URLS.auth.signup,
  API_URLS.auth.refresh,
];

// On a 401 (the access cookie expired), try ONE silent refresh — the refresh
// cookie rides along automatically — then replay the original request.
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const url = original?.url ?? "";
    const skip = NO_REFRESH.some((path) => url.includes(path));

    if (error.response?.status === 401 && original && !original._retry && !skip) {
      original._retry = true;
      try {
        await api.post(API_URLS.auth.refresh); // sets a new access cookie
        return api(original); // replay the original request
      } catch {
        // refresh failed → fall through and reject below
      }
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
