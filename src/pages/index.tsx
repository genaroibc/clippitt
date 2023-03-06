import { ClipInput } from "@/components/ClipInput";
import { FinalVideo } from "@/components/FinalVideo";
import { Footer } from "@/components/Footer";
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
      <main className="py-12 flex flex-col">
        <section className="max-w-4xl mx-auto my-12">
          <Hero />

          <ClipInput onClipURL={(newURL) => setClipURL(newURL)} />
        </section>

        {clipURL && (
          <VideoCropper
            onVideoConfig={handleOnVideoConfig}
            videoSrc={clipURL}
          />
        )}

        <section className="bg-violet-900/50 flex flex-col gap-4">
          {videoConfig && clipPublicID && (
            <FinalVideo
              videoConfig={videoConfig}
              videoPublicID={clipPublicID}
            />
          )}
          {error && (
            <p className="text-red-400 text-center text-2xl my-8">{error}</p>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
