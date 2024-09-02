import type { APIResponse } from "@/types/api";
import { API_ERRORS } from "@/constants/error-messages";
import { type NextApiHandler } from "next";
import axios, { AxiosError } from "axios";
import { Clip } from "@/types";
import ENV from "@/constants/env-vars";
import { isTwitchUnauthorizedError } from "@/utils/is-api-error";

const handler: NextApiHandler<APIResponse<Clip>> = async (req, res) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ ok: false, error: API_ERRORS.METHOD_NOT_ALLOWED });
  }

  const { clipID } = req.query;

  const isEmptyClipID = clipID === undefined || clipID === null;
  if (isEmptyClipID) {
    return res
      .status(400)
      .json({ ok: false, error: API_ERRORS.MISSING_FIELDS });
  }

  try {
    // const accessTokenResponse = await axios.post(
    //   ENV.TWITCH_ACCESS_TOKEN_API_URL,
    //   null,
    //   {
    //     params: {
    //       client_id: ENV.TWITCH_APP_CLIENT_ID,
    //       client_secret: ENV.TWITCH_APP_CLIENT_SECRET,
    //       grant_type: "client_credentials",
    //     },
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   }
    // );

    // const TWITCH_API_ACCESS_TOKEN = accessTokenResponse?.data?.access_token;

    // ENV.TWITCH_API_ACCESS_TOKEN = TWITCH_API_ACCESS_TOKEN;
    // console.log({
    //   TWITCH_API_ACCESS_TOKEN,
    // });

    if (!ENV.TWITCH_API_ACCESS_TOKEN) {
      return res
        .status(500)
        .json({ ok: false, error: API_ERRORS.NO_TOKEN_FOUND });
    }

    const { data: clipData } = await axios.get(ENV.TWITCH_CLIPS_API_URL, {
      params: {
        id: clipID,
      },
      headers: {
        "Client-ID": ENV.TWITCH_APP_CLIENT_ID,
        Authorization: `Bearer ${ENV.TWITCH_API_ACCESS_TOKEN}`,
      },
    });

    const clip: Clip = {
      id: clipData.data?.[0]?.id,
      url: clipData.data?.[0]?.thumbnail_url?.replace(
        "-preview-480x272.jpg",
        ".mp4"
      ),
    };

    if (!clip.url || !clip.id) {
      return res
        .status(404)
        .json({ ok: false, error: API_ERRORS.NO_CLIP_FOUND });
    }

    return res.status(200).json({ ok: true, data: clip });
  } catch (error) {
    if (isTwitchUnauthorizedError(error)) {
      return res
        .status(401)
        .json({ ok: false, error: API_ERRORS.TWITCH_UNAUTHORIZED });
    }

    if (error instanceof AxiosError) {
      return res
        .status(error.status ?? 500)
        .json({ ok: false, error: API_ERRORS.GENERIC_ERROR });
    }

    return res.status(500).json({ ok: false, error: API_ERRORS.SERVER_ERROR });
  }
};

export default handler;
