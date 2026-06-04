const BASE_URL =
process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

console.log("HTTP BASE_URL =", BASE_URL);

export class HttpError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
  }
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  body?: Record<string, unknown> | FormData;
  headers?: Record<string, string>;
  timeoutMs?: number;
};

export async function http<T>(
  endpoint: string,
  {
    method = "GET",
    body,
    headers: customHeaders = {},
    timeoutMs = 10000,
  }: RequestOptions = {}
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  const headers: Record<string, string> = {
    ...customHeaders,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type") || "";
    const retryAfter = response.headers.get("retry-after");

    let data: unknown = undefined;

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = text || undefined;
    }

    if (!response.ok) {
      if (response.status === 429) {
        throw new HttpError(
          retryAfter
            ? `Muitas requisições. Tente novamente em ${retryAfter}s.`
            : "Muitas requisições. Tente novamente em instantes.",
          429,
          data
        );
      }

      throw new HttpError(`HTTP ${response.status} em ${endpoint}`, response.status, data);
    }

    return data as T;
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Request timeout");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}