import { VideoConfig } from "@/types";
import { CloudinaryVideo, Transformation } from "@cloudinary/url-gen";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { crop } from "@cloudinary/url-gen/actions/resize";
import { Position } from "@cloudinary/url-gen/qualifiers";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { video } from "@cloudinary/url-gen/qualifiers/source";
import { useEffect, useState } from "react";

type Props = {
  videoPublicID: string;
  videoConfig: VideoConfig;
};

const getTransformedVideoURL = ({
  cldVideoPublicID,
  videoConfig,
}: {
  videoConfig: VideoConfig;
  cldVideoPublicID: string;
}) => {
  const cldVideoURL = new CloudinaryVideo(cldVideoPublicID, {
    cloudName: "shape-snap",
  })
    .resize(
      crop()
        .width(videoConfig.content.size.width)
        .height(videoConfig.content.size.height * 2)
    )
    .overlay(
      source(
        video(cldVideoPublicID).transformation(
          new Transformation().resize(
            crop()
              .width(videoConfig.content.size.width)
              .height(videoConfig.content.size.height)
              .x(videoConfig.content.coords.x)
              .y(videoConfig.content.coords.y)
          )
        )
      ).position(new Position().gravity(compass("south")))
    )
    .overlay(
      source(
        video(cldVideoPublicID).transformation(
          new Transformation().resize(
            crop()
              .width(videoConfig.camera.size.width)
              .height(videoConfig.camera.size.height)
              .x(videoConfig.camera.coords.x)
              .y(videoConfig.camera.coords.y)
          )
        )
      ).position(new Position().gravity(compass("north")))
    )
    .toURL();

  return cldVideoURL;
};

export function FinalVideo({ videoPublicID, videoConfig }: Props) {
  const [transformedVideoURL, seTransformedVideoURL] = useState<string | null>(
    null
  );
  useEffect(() => {
    const cldTransformedVideoURL = getTransformedVideoURL({
      cldVideoPublicID: videoPublicID,
      videoConfig,
    });

    seTransformedVideoURL(cldTransformedVideoURL);
  }, [videoPublicID, videoConfig]);
  return (
    <section id="final-video-section">
      <h3 className="font-bold text-center text-4xl my-4">Final Video</h3>

      {transformedVideoURL && (
        <div className="flex flex-col gap-4 items-center">
          <video
            autoPlay
            controls
            className="max-w-xl mx-auto p-2 rounded-2xl bg-black shadow-2xl"
            src={transformedVideoURL}
          ></video>

          <nav className="flex gap-4 justify-between p-4">
            <a
              target="_blank"
              className="flex gap-2"
              download
              href={transformedVideoURL}
            >
              Download
              <svg
                className="w-4"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
              </svg>
            </a>
          </nav>
        </div>
      )}
    </section>
  );
}
