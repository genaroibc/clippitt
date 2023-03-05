import { type APIError } from "@/types/api";

export function isAPIError(error: unknown): error is APIError {
  const castedError = error as Record<string, unknown>;

  const isAPIError =
    castedError?.ok === false && typeof castedError?.error === "string";

  return isAPIError;
}
