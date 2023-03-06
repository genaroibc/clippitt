import { VideoConfig } from "@/types";
import { CloudinaryVideo, Transformation } from "@cloudinary/url-gen";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { crop } from "@cloudinary/url-gen/actions/resize";
import { Position } from "@cloudinary/url-gen/qualifiers";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { video } from "@cloudinary/url-gen/qualifiers/source";

type Props = {
  videoSrc: string;
  videoConfig: VideoConfig;
};

export function FinalVideo({ videoSrc, videoConfig }: Props) {
  const cldVideoURL = new CloudinaryVideo(videoSrc, { cloudName: "shape-snap" })
    .resize(
      crop()
        .width(videoConfig.content.size.width)
        .height(videoConfig.content.size.height * 2)
    )
    .overlay(
      source(
        video(videoSrc).transformation(
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
        video(videoSrc).transformation(
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

  return (
    <>
      <h3 className="font-bold text-center text-4xl text-red-400  my-4">
        FinalVideo
      </h3>

      <video autoPlay controls className="max-w-md" src={cldVideoURL}></video>
    </>
  );
}
