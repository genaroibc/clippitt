import { type APIError } from "@/types/api";
import { AxiosError } from "axios";

export function isAPIError(error: unknown): error is APIError {
  const castedError = error as Record<string, unknown>;

  const isAPIError =
    castedError?.ok === false && typeof castedError?.error === "string";

  return isAPIError;
}

export function isTwitchUnauthorizedError(error: unknown): boolean {
  try {
    const errorData = error as AxiosError;

    return errorData.response?.status === 401
  } catch (error) {
    return false;
  }
}