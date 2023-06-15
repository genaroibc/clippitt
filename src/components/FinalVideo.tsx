import {
  getTransformedVideoURL,
  getCameraBottomVideoURL,
  getCameraRoundedURL,
  getCameraTopVideoURL,
} from "@/constants/cloudinary-transformations";
import { Layout, VideoConfig } from "@/types";
import { useEffect, useState } from "react";
import { ChooseLayouts } from "./ChooseLayouts";
import { FinalVideoNavbar } from "./FinalVideoNavbar";

type Props = {
  videoPublicID: string;
  videoConfig: VideoConfig;
};

export function FinalVideo({ videoPublicID, videoConfig }: Props) {
  const [transformedVideoURLs, setTransformedVideoURLs] = useState<{
    rounded: string;
    normal: string;
    "camera-top": string;
    "camera-bottom": string;
  } | null>(null);

  const [layout, setLayout] = useState<Layout>("normal");

  useEffect(() => {
    const cldTransformedVideoURL = getTransformedVideoURL({
      cldVideoPublicID: videoPublicID,
      videoConfig,
    });

    const cldCameraRoundedURL = getCameraRoundedURL({
      cldVideoPublicID: videoPublicID,
      videoConfig,
    });

    const cldCameraTopURL = getCameraTopVideoURL({
      cldVideoPublicID: videoPublicID,
      videoConfig,
    });

    const cldCameraBottomURL = getCameraBottomVideoURL({
      cldVideoPublicID: videoPublicID,
      videoConfig,
    });

    setTransformedVideoURLs({
      normal: cldTransformedVideoURL,
      rounded: cldCameraRoundedURL,
      "camera-top": cldCameraTopURL,
      "camera-bottom": cldCameraBottomURL,
    });
  }, [videoPublicID, videoConfig]);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h3 className="font-bold text-center text-3xl mt-12 mb-6">Final Video</h3>

      {transformedVideoURLs && (
        <div className="flex flex-col md:flex-row justify-between p-4 w-full gap-12">
          <div className="flex flex-col justify-center gap-12 shadow-2xl rounded">
            <video
              style={{
                maxWidth: "min(100vw, 400px)",
                aspectRatio: "9/16",
              }}
              autoPlay
              controls
              className="max-w-xl md:p-2 sm:w-screen rounded-2xl bg-black shadow-2xl"
              src={transformedVideoURLs[layout]}
            ></video>

            <FinalVideoNavbar downloadURL={transformedVideoURLs[layout]} />
          </div>

          <ChooseLayouts onNewLayout={(layout) => setLayout(layout)} />
        </div>
      )}
    </section>
  );
}
