import axios from "axios";
import { KnownResponse, VideoURL } from "@/types/index";

type Params = {
  videoURL: VideoURL;
  // eslint-disable-next-line no-unused-vars
  onProgress?: (progress: number) => void;
};

const getEnvVariables = () => {
  const API_URL = process.env.NEXT_PUBLIC_UPLOAD_VIDEO_API_URL;
  if (!API_URL) {
    throw new Error(
      "'NEXT_PUBLIC_UPLOAD_VIDEO_API_URL' env variable is not defined"
    );
  }

  return {
    API_URL,
  };
};

export async function uploadVideo({
  videoURL,
  onProgress,
}: Params): Promise<KnownResponse<{ uploadedVideoPublicID: string }>> {
  const { API_URL } = getEnvVariables();

  try {
    const response = await axios.post(
      API_URL,
      { videoURL },
      {
        onUploadProgress: (event) => {
          const progress = (event.loaded / (event.total ?? 0)) * 100;
          onProgress?.(progress);
        },
      }
    );

    const uploadedVideoPublicID = response?.data?.data?.uploadedVideoPublicID;

    if (!uploadedVideoPublicID || typeof uploadedVideoPublicID !== "string") {
      return {
        ok: false,
        error: "There was an error uploading your video, please try again",
      };
    }

    return { ok: true, data: { uploadedVideoPublicID } };
  } catch (error) {
    return {
      ok: false,
      error: "There was an error uploading your video, please try again",
    };
  }
}
