import { ClipInput } from "@/components/ClipInput";
import { FinalVideo } from "@/components/FinalVideo";
import { Hero } from "@/components/Hero";
import { SemanticHead } from "@/components/SemanticHead";
import { VideoCropper } from "@/components/VideoCropper";
import { VideoConfig } from "@/types";
import { useState } from "react";

export default function Home() {
  const [clipURL, setClipURL] = useState("");
  const [videoConfig, setVideoConfig] = useState<VideoConfig | null>(null);

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

        {videoConfig && (
          <FinalVideo videoConfig={videoConfig} videoSrc={clipURL} />
        )}
      </main>
    </>
  );
}
