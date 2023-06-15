import { ClipInput } from "@/components/ClipInput";
import { FinalVideo } from "@/components/FinalVideo";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { SemanticHead } from "@/components/SemanticHead";
import { VideoCropper } from "@/components/VideoCropper";
import { uploadVideo } from "@/services/upload-video";
import { Clip, ClipURL, VideoConfig } from "@/types";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [clip, setClip] = useState<Clip>({ url: "", id: "" });
  const [videoConfig, setVideoConfig] = useState<VideoConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [clipPublicID, setClipPublicID] = useState<string | null>(null);
  const lastClipURL = useRef<ClipURL>("");

  useEffect(() => {
    const handleUploadVideo = async () => {
      const videoResponse = await uploadVideo({
        videoURL: clip.url,
        videoID: clip.id,
      });
      if (!videoResponse.ok) return setError(videoResponse.error);

      const cldVideoPublicID = videoResponse.data.uploadedVideoPublicID;
      setClipPublicID(cldVideoPublicID);
    };

    const trimmedClipURL = clip.url.trim();

    if (trimmedClipURL && trimmedClipURL !== lastClipURL.current?.trim()) {
      handleUploadVideo();
      setVideoConfig(null);
      lastClipURL.current = trimmedClipURL;
    }
  }, [clip]);

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

          <ClipInput onClip={(clip) => setClip(clip)} />
        </section>

        <div className="bg-violet-900">
          {clip.id && clip.url && (
            <VideoCropper
              onVideoConfig={handleOnVideoConfig}
              videoSrc={clip.url}
            />
          )}
        </div>

        <section
          id="final-video-section"
          className="bg-violet-900/50 flex flex-col gap-4"
        >
          {videoConfig && clipPublicID && (
            <FinalVideo
              videoConfig={videoConfig}
              videoPublicID={clipPublicID}
            />
          )}
          {error && (
            <p className="text-red-400 text-center text-2xl my-8 max-w-prose mx-auto">
              {error}
            </p>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
