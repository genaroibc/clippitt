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
    <>
      <h3 className="font-bold text-center text-4xl text-red-400  my-4">
        FinalVideo
      </h3>

      {transformedVideoURL && (
        <video
          autoPlay
          controls
          className="max-w-md"
          src={transformedVideoURL}
        ></video>
      )}
    </>
  );
}
