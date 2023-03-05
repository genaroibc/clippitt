import type { APIResponse, TwitchAPIAccessToken } from "@/types/api";
import { API_ERRORS } from "@/constants/error-messages";
import { type NextApiHandler } from "next";
import axios, { AxiosError } from "axios";

const getEnvVariables = () => {
  const TWITCH_ACCESS_TOKEN_API_URL = process.env.TWITCH_ACCESS_TOKEN_API_URL;
  if (!TWITCH_ACCESS_TOKEN_API_URL) {
    throw new Error(
      "'TWITCH_ACCESS_TOKEN_API_URL' env variable is not defined"
    );
  }

  const TWITCH_APP_CLIENT_ID = process.env.TWITCH_APP_CLIENT_ID;
  if (!TWITCH_APP_CLIENT_ID) {
    throw new Error("'TWITCH_APP_CLIENT_ID' env variable is not defined");
  }

  const TWITCH_APP_CLIENT_SECRET = process.env.TWITCH_APP_CLIENT_SECRET;
  if (!TWITCH_APP_CLIENT_SECRET) {
    throw new Error("'TWITCH_APP_CLIENT_SECRET' env variable is not defined");
  }

  const TWITCH_CLIPS_API_URL = process.env.TWITCH_CLIPS_API_URL;
  if (!TWITCH_CLIPS_API_URL) {
    throw new Error("'TWITCH_CLIPS_API_URL' env variable is not defined");
  }

  return {
    TWITCH_ACCESS_TOKEN_API_URL,
    TWITCH_APP_CLIENT_ID,
    TWITCH_APP_CLIENT_SECRET,
    TWITCH_CLIPS_API_URL,
  };
};

const handler: NextApiHandler<APIResponse<TwitchAPIAccessToken>> = async (
  req,
  res
) => {
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
    TWITCH_ACCESS_TOKEN_API_URL,
    TWITCH_APP_CLIENT_ID,
    TWITCH_APP_CLIENT_SECRET,
    TWITCH_CLIPS_API_URL,
  } = getEnvVariables();

  try {
    const accessTokenResponse = await axios.post(
      TWITCH_ACCESS_TOKEN_API_URL,
      null,
      {
        params: {
          client_id: TWITCH_APP_CLIENT_ID,
          client_secret: TWITCH_APP_CLIENT_SECRET,
          grant_type: "client_credentials",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = accessTokenResponse?.data?.access_token;

    if (!accessToken) {
      return res
        .status(404)
        .json({ ok: false, error: API_ERRORS.NO_TOKEN_FOUND });
    }

    const clipDataResponse = await axios.get(TWITCH_CLIPS_API_URL, {
      params: {
        id: clipID,
      },
      headers: {
        "Client-ID": TWITCH_APP_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const clipSourceURL =
      clipDataResponse?.data?.data?.[0]?.thumbnail_url?.replace(
        "-preview-480x272.jpg",
        ".mp4"
      );

    if (!clipSourceURL) {
      return res
        .status(404)
        .json({ ok: false, error: API_ERRORS.NO_CLIP_FOUND });
    }

    return res.status(200).json(clipSourceURL);
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
