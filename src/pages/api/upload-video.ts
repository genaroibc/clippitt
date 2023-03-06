import { NextApiHandler } from "next";
import { v2 as Cloudinary } from "cloudinary";

const getEnvVariables = () => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!CLOUD_NAME) {
    throw new Error(
      "'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME' env variable is not defined"
    );
  }

  const API_KEY = process.env.CLOUDINARY_API_KEY;
  if (!API_KEY) {
    throw new Error("'CLOUDINARY_API_KEY' env variable is not defined");
  }

  const API_SECRET = process.env.CLOUDINARY_API_SECRET;
  if (!API_SECRET) {
    throw new Error("'CLOUDINARY_API_SECRET' env variable is not defined");
  }

  return {
    CLOUD_NAME,
    API_KEY,
    API_SECRET,
  };
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ ok: false, error: "Method not allowed on this resource" });
  }

  const { videoURL } = req.body;

  if (!videoURL) {
    return res
      .status(400)
      .json({ ok: false, error: "Missing required parameter 'videoURL'" });
  }

  const { CLOUD_NAME, API_KEY, API_SECRET } = getEnvVariables();

  try {
    Cloudinary.config({
      api_key: API_KEY,
      api_secret: API_SECRET,
      cloud_name: CLOUD_NAME,
    });

    const response = await Cloudinary.uploader.upload(videoURL, {
      resource_type: "video",
    });

    const uploadedVideoPublicID = response.public_id;

    if (!uploadedVideoPublicID || typeof uploadedVideoPublicID !== "string") {
      return res.status(404).json({
        ok: false,
        error: "Clip not found, please try again",
      });
    }

    return res.status(200).json({ ok: true, data: { uploadedVideoPublicID } });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "There was an error uploading your video, please try again",
    });
  }
};

export default handler;
