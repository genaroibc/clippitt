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
export type VideoURL = string;

export type ClipURL = string;
export type ClipID = string;
export type ClipSourceURL = string;

export type Size = {
  width: number;
  height: number;
};

export type Coords = {
  x: number;
  y: number;
};

export type VideoConfig = {
  camera: { coords: Coords; size: Size };
  content: { coords: Coords; size: Size };
};

export type Layout = "normal" | "rounded" | "camera-top" | "camera-bottom";
