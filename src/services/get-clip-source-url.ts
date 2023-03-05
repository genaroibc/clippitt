import { ClipID, ClipSourceURL, KnownResponse } from "@/types";
import { isAPIError } from "@/utils/is-api-error";
import axios, { isAxiosError } from "axios";

type Params = {
  clipID: ClipID;
};

const getEnvVariables = () => {
  const CLIP_SOURCE_API_URL = process.env.NEXT_PUBLIC_CLIP_SOURCE_API_URL;

  if (!CLIP_SOURCE_API_URL) {
    throw new Error(
      "'NEXT_PUBLIC_CLIP_SOURCE_API_URL' env variable is not defined"
    );
  }

  return {
    CLIP_SOURCE_API_URL,
  };
};

export async function getClipSourceURL({
  clipID,
}: Params): Promise<KnownResponse<ClipSourceURL>> {
  const { CLIP_SOURCE_API_URL } = getEnvVariables();
  try {
    const response = await axios.get(CLIP_SOURCE_API_URL, {
      params: { clipID },
    });

    return { ok: true, data: response.data };
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
