import { ClipID, ClipURL } from "@/types";

type Params = {
  clipURL: ClipURL;
};

export function getTwitchClipID({ clipURL }: Params): ClipID | null {
  if (!clipURL.includes("/")) return null;

  const clipID = clipURL.split("/").at(-1)?.replaceAll(/\?.*/g, "").trim();

  return clipID ?? null;
}
