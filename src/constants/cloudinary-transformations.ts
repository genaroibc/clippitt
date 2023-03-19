import { VideoConfig } from "@/types";
import { CloudinaryVideo, Transformation } from "@cloudinary/url-gen";
import { blur } from "@cloudinary/url-gen/actions/effect";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { crop, fill } from "@cloudinary/url-gen/actions/resize";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { Position } from "@cloudinary/url-gen/qualifiers";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { video } from "@cloudinary/url-gen/qualifiers/source";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

if (!CLOUD_NAME) {
  throw new Error(
    "'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME' env variable is not defined"
  );
}

export const getCameraRoundedURL = ({
  cldVideoPublicID,
  videoConfig,
}: {
  videoConfig: VideoConfig;
  cldVideoPublicID: string;
}) => {
  const videoWidth = videoConfig.camera.size.width;
  const videoHeight = Math.floor(videoConfig.camera.size.width * 1.778); // aspect ratio 9:16

  const cldVideoURL = new CloudinaryVideo(cldVideoPublicID, {
    cloudName: CLOUD_NAME,
  })
    .effect(blur().strength(500))
    .resize(fill().width(videoWidth).height(videoHeight))
    .overlay(
      source(
        video(cldVideoPublicID).transformation(
          new Transformation()
            .resize(
              crop()
                .width(videoConfig.content.size.width)
                .height(videoConfig.content.size.height)
                .x(videoConfig.content.coords.x)
                .y(videoConfig.content.coords.y)
            )
            .resize(
              fill()
                .width(videoWidth)
                .height(Math.floor(videoHeight / 2))
            )
        )
      ).position(new Position().gravity(compass("south")))
    )
    .overlay(
      source(
        video(cldVideoPublicID).transformation(
          new Transformation()
            .resize(
              crop()
                .width(videoConfig.camera.size.height)
                .height(videoConfig.camera.size.height)
                .x(videoConfig.camera.coords.x)
                .y(videoConfig.camera.coords.y)
            )
            .resize(
              fill()
                .width(Math.floor(videoWidth * 0.9))
                .height(Math.floor(videoHeight / 2))
            )
            .roundCorners(max())
        )
      ).position(new Position().gravity(compass("north")))
    )
    .toURL();

  return cldVideoURL;
};

export const getTransformedVideoURL = ({
  cldVideoPublicID,
  videoConfig,
}: {
  videoConfig: VideoConfig;
  cldVideoPublicID: string;
}) => {
  const videoWidth = videoConfig.camera.size.width;
  const videoHeight = Math.floor(videoConfig.camera.size.width * 1.778); // aspect ratio 9:16

  const cldVideoURL = new CloudinaryVideo(cldVideoPublicID, {
    cloudName: CLOUD_NAME,
  })
    .resize(fill().width(videoWidth).height(videoHeight))
    .overlay(
      source(
        video(cldVideoPublicID).transformation(
          new Transformation()
            .resize(
              crop()
                .width(videoConfig.content.size.width)
                .height(videoConfig.content.size.height)
                .x(videoConfig.content.coords.x)
                .y(videoConfig.content.coords.y)
            )
            .resize(
              fill()
                .width(videoWidth)
                .height(Math.floor(videoHeight / 2))
            )
        )
      ).position(new Position().gravity(compass("south")))
    )
    .overlay(
      source(
        video(cldVideoPublicID).transformation(
          new Transformation()
            .resize(
              crop()
                .width(videoConfig.camera.size.width)
                .height(videoConfig.camera.size.height)
                .x(videoConfig.camera.coords.x)
                .y(videoConfig.camera.coords.y)
            )
            .resize(
              fill()
                .width(videoWidth)
                .height(Math.floor(videoHeight / 2))
            )
        )
      ).position(new Position().gravity(compass("north")))
    )
    .toURL();

  return cldVideoURL;
};

export const getCameraTopVideoURL = ({
  cldVideoPublicID,
  videoConfig,
}: {
  videoConfig: VideoConfig;
  cldVideoPublicID: string;
}) => {
  const videoWidth = videoConfig.camera.size.width;
  const videoHeight = Math.floor(videoConfig.camera.size.width * 1.778); // aspect ratio 9:16

  const cldVideoURL = new CloudinaryVideo(cldVideoPublicID, {
    cloudName: CLOUD_NAME,
  })
    .resize(fill().width(videoWidth).height(videoHeight))
    .overlay(
      source(
        video(cldVideoPublicID).transformation(
          new Transformation()
            .resize(
              crop()
                .width(videoConfig.content.size.width)
                .height(videoConfig.content.size.height)
                .x(videoConfig.content.coords.x)
                .y(videoConfig.content.coords.y)
            )
            .resize(fill().width(videoWidth).height(Math.floor(videoHeight)))
        )
      ).position(new Position().gravity(compass("south")))
    )
    .overlay(
      source(
        video(cldVideoPublicID).transformation(
          new Transformation()
            .resize(
              crop()
                .width(videoConfig.camera.size.width)
                .height(videoConfig.camera.size.height)
                .x(videoConfig.camera.coords.x)
                .y(videoConfig.camera.coords.y)
            )
            .resize(
              fill()
                .width(videoWidth / 2)
                .height(Math.floor(videoHeight / 4))
            )
        )
      ).position(new Position().gravity(compass("north")))
    )
    .toURL();

  return cldVideoURL;
};

export const getCameraBottomVideoURL = ({
  cldVideoPublicID,
  videoConfig,
}: {
  videoConfig: VideoConfig;
  cldVideoPublicID: string;
}) => {
  const videoWidth = videoConfig.camera.size.width;
  const videoHeight = Math.floor(videoConfig.camera.size.width * 1.778); // aspect ratio 9:16

  const cldVideoURL = new CloudinaryVideo(cldVideoPublicID, {
    cloudName: CLOUD_NAME,
  })
    .resize(fill().width(videoWidth).height(videoHeight))
    .overlay(
      source(
        video(cldVideoPublicID).transformation(
          new Transformation()
            .resize(
              crop()
                .width(videoConfig.content.size.width)
                .height(videoConfig.content.size.height)
                .x(videoConfig.content.coords.x)
                .y(videoConfig.content.coords.y)
            )
            .resize(fill().width(videoWidth).height(Math.floor(videoHeight)))
        )
      ).position(new Position().gravity(compass("south")))
    )
    .overlay(
      source(
        video(cldVideoPublicID).transformation(
          new Transformation()
            .resize(
              crop()
                .width(videoConfig.camera.size.width)
                .height(videoConfig.camera.size.height)
                .x(videoConfig.camera.coords.x)
                .y(videoConfig.camera.coords.y)
            )
            .resize(
              fill()
                .width(videoWidth / 2)
                .height(Math.floor(videoHeight / 4))
            )
        )
      ).position(new Position().gravity(compass("south")))
    )
    .toURL();

  return cldVideoURL;
};
