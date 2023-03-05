import { API_ERRORS } from "@/constants/error-messages";

export type APIError = { ok: false; error: API_ERRORS };
export type APIResult<T> = { ok: true; data: T };
export type APIResponse<T> = APIError | APIResult<T>;

export type TwitchAPIAccessToken = string;
