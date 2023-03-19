import axios from "axios";
import { KnownResponse, VideoID, VideoURL } from "@/types/index";
import ENV from "@/constants/env-vars";

type Params = {
  videoURL: VideoURL;
  videoID: VideoID;
  // eslint-disable-next-line no-unused-vars
  onProgress?: (progress: number) => void;
};

export async function uploadVideo({
  videoURL,
  videoID,
  onProgress,
}: Params): Promise<KnownResponse<{ uploadedVideoPublicID: string }>> {
  try {
    const response = await axios.post(
      ENV.NEXT_PUBLIC_UPLOAD_VIDEO_API_URL,
      { videoURL, videoID },
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
