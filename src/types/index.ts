export interface KnownError {
  ok: false;
  error: string;
}

export interface KnownResult<T> {
  ok: true;
  data: T;
}

export type KnownResponse<T> = KnownResult<T> | KnownError;

export type VideoData = { src: string; title: string };

export type ClipURL = string;
export type ClipID = string;
export type ClipSourceURL = string;
