// Thin client for the GameVault backend. Every backend response is shaped
// { success, message, data? } (see backend src/utils/responses.ts), so we
// surface `message` on failure and return `data` on success.

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiPost<T = unknown>(
  path: string,
  body: unknown
): Promise<T | undefined> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // Network/connection failure — backend down or unreachable.
    throw new ApiError(
      "Can't reach the server. Please check your connection and try again.",
      0
    );
  }

  let payload: ApiResponse<T> | null = null;
  try {
    payload = (await res.json()) as ApiResponse<T>;
  } catch {
    payload = null;
  }

  if (!res.ok || !payload?.success) {
    throw new ApiError(
      payload?.message ?? "Something went wrong. Please try again.",
      res.status
    );
  }

  return payload.data;
}
