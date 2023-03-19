import { NextApiHandler } from "next";
import { v2 as Cloudinary } from "cloudinary";
import ENV from "@/constants/env-vars";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ ok: false, error: "Method not allowed on this resource" });
  }

  const { videoURL, videoID } = req.body;

  if (!videoURL || !videoID) {
    return res.status(400).json({
      ok: false,
      error: "Missing required parameters 'videoURL' and 'videoID'",
    });
  }

  try {
    Cloudinary.config({
      api_key: ENV.CLOUDINARY_API_KEY,
      api_secret: ENV.CLOUDINARY_API_SECRET,
      cloud_name: ENV.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    });

    const response = await Cloudinary.uploader.upload(videoURL, {
      resource_type: "video",
      // if exists, Cloudinary will return the URL to the existing video
      // instead of uploading it again
      public_id: videoID,
    });

    const uploadedVideoPublicID = response.public_id;

    if (!uploadedVideoPublicID || typeof uploadedVideoPublicID !== "string") {
      return res.status(404).json({
        ok: false,
        error: "There was an error uploading your video, please try again",
      });
    }

    return res.status(200).json({ ok: true, data: { uploadedVideoPublicID } });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error:
        "There was an error in the server uploading your video, please try again",
    });
  }
};

export default handler;
