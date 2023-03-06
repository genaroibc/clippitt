import { ClipInput } from "@/components/ClipInput";
import { FinalVideo } from "@/components/FinalVideo";
import { Hero } from "@/components/Hero";
import { SemanticHead } from "@/components/SemanticHead";
import { VideoCropper } from "@/components/VideoCropper";
import { uploadVideo } from "@/services/upload-video";
import { VideoConfig } from "@/types";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [clipURL, setClipURL] = useState("");
  const [videoConfig, setVideoConfig] = useState<VideoConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [clipPublicID, setClipPublicID] = useState<string | null>(null);
  const lastClipURL = useRef("");

  useEffect(() => {
    const handleUploadVideo = async () => {
      const videoResponse = await uploadVideo({ videoURL: clipURL });
      if (!videoResponse.ok) return setError(videoResponse.error);

      const cldVideoPublicID = videoResponse.data.uploadedVideoPublicID;
      setClipPublicID(cldVideoPublicID);
    };

    const trimmedClipURL = clipURL.trim();

    if (trimmedClipURL && trimmedClipURL !== lastClipURL.current?.trim()) {
      handleUploadVideo();
      lastClipURL.current = trimmedClipURL;
    }
  }, [clipURL]);
  const handleOnVideoConfig = (config: VideoConfig) => {
    setVideoConfig(config);
  };

  return (
    <>
      <SemanticHead
        description="Make shorts for TikTok and YouTube from a Twitch clip"
        title="Clippitt"
      />
      <main>
        <Hero />

        <ClipInput onClipURL={(newURL) => setClipURL(newURL)} />

        {clipURL && (
          <VideoCropper
            onVideoConfig={handleOnVideoConfig}
            videoSrc={clipURL}
          />
        )}

        {videoConfig && clipPublicID && (
          <FinalVideo videoConfig={videoConfig} videoPublicID={clipPublicID} />
        )}
        {error && <p className="text-red-400 text-xl">{error}</p>}
      </main>
    </>
  );
}
