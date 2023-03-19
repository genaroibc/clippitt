import ENV from "@/constants/env-vars";
import { Clip, ClipID, KnownResponse } from "@/types";
import { isAPIError } from "@/utils/is-api-error";
import axios, { isAxiosError } from "axios";

type Params = {
  clipID: ClipID;
};

export async function getClipSourceURL({
  clipID,
}: Params): Promise<KnownResponse<Clip>> {
  try {
    const response = await axios.get(ENV.NEXT_PUBLIC_CLIP_SOURCE_API_URL, {
      params: { clipID },
    });

    const clipData = response.data?.data;

    return { ok: true, data: clipData };
  } catch (error) {
    if (!isAxiosError(error)) {
      return { ok: false, error: "There was an error, please try again" };
    }

    const errorData = error.response?.data;
    if (!isAPIError(errorData)) {
      return { ok: false, error: "There was an error, please try again" };
    }

    return { ok: false, error: errorData.error };
  }
}
