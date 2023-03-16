import type { APIResponse } from "@/types/api";
import { API_ERRORS } from "@/constants/error-messages";
import { type NextApiHandler } from "next";
import axios, { AxiosError } from "axios";
import { Clip } from "@/types";

const getEnvVariables = () => {
  // const TWITCH_ACCESS_TOKEN_API_URL = process.env.TWITCH_ACCESS_TOKEN_API_URL;
  // if (!TWITCH_ACCESS_TOKEN_API_URL) {
  //   throw new Error(
  //     "'TWITCH_ACCESS_TOKEN_API_URL' env variable is not defined"
  //   );
  // }

  const TWITCH_APP_CLIENT_ID = process.env.TWITCH_APP_CLIENT_ID;
  if (!TWITCH_APP_CLIENT_ID) {
    throw new Error("'TWITCH_APP_CLIENT_ID' env variable is not defined");
  }

  // const TWITCH_APP_CLIENT_SECRET = process.env.TWITCH_APP_CLIENT_SECRET;
  // if (!TWITCH_APP_CLIENT_SECRET) {
  //   throw new Error("'TWITCH_APP_CLIENT_SECRET' env variable is not defined");
  // }

  const TWITCH_CLIPS_API_URL = process.env.TWITCH_CLIPS_API_URL;
  if (!TWITCH_CLIPS_API_URL) {
    throw new Error("'TWITCH_CLIPS_API_URL' env variable is not defined");
  }

  const TWITCH_API_ACCESS_TOKEN = process.env.TWITCH_API_ACCESS_TOKEN;
  if (!TWITCH_API_ACCESS_TOKEN) {
    throw new Error("'TWITCH_API_ACCESS_TOKEN' env variable is not defined");
  }

  return {
    // TWITCH_ACCESS_TOKEN_API_URL,
    TWITCH_APP_CLIENT_ID,
    // TWITCH_APP_CLIENT_SECRET,
    TWITCH_CLIPS_API_URL,
    TWITCH_API_ACCESS_TOKEN,
  };
};

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

  const {
    // TWITCH_ACCESS_TOKEN_API_URL,
    TWITCH_APP_CLIENT_ID,
    // TWITCH_APP_CLIENT_SECRET,
    TWITCH_CLIPS_API_URL,
    TWITCH_API_ACCESS_TOKEN,
  } = getEnvVariables();

  try {
    // const accessTokenResponse = await axios.post(
    //   TWITCH_ACCESS_TOKEN_API_URL,
    //   null,
    //   {
    //     params: {
    //       client_id: TWITCH_APP_CLIENT_ID,
    //       client_secret: TWITCH_APP_CLIENT_SECRET,
    //       grant_type: "client_credentials",
    //     },
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   }
    // );

    // const TWITCH_API_ACCESS_TOKEN = accessTokenResponse?.data?.access_token;

    if (!TWITCH_API_ACCESS_TOKEN) {
      return res
        .status(500)
        .json({ ok: false, error: API_ERRORS.NO_TOKEN_FOUND });
    }

    const { data: clipData } = await axios.get(TWITCH_CLIPS_API_URL, {
      params: {
        id: clipID,
      },
      headers: {
        "Client-ID": TWITCH_APP_CLIENT_ID,
        Authorization: `Bearer ${TWITCH_API_ACCESS_TOKEN}`,
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
    if (error instanceof AxiosError) {
      return res
        .status(error.status ?? 500)
        .json({ ok: false, error: API_ERRORS.GENERIC_ERROR });
    }

    return res.status(500).json({ ok: false, error: API_ERRORS.SERVER_ERROR });
  }
};

export default handler;
