import { Layout, VideoConfig } from "@/types";
import { CloudinaryVideo, Transformation } from "@cloudinary/url-gen";
import { blur } from "@cloudinary/url-gen/actions/effect";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { crop, fill } from "@cloudinary/url-gen/actions/resize";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { Position } from "@cloudinary/url-gen/qualifiers";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { video } from "@cloudinary/url-gen/qualifiers/source";
import { useEffect, useState } from "react";
import { ChooseLayouts } from "./ChooseLayouts";

type Props = {
  videoPublicID: string;
  videoConfig: VideoConfig;
};

const getCameraRoundedURL = ({
  cldVideoPublicID,
  videoConfig,
}: {
  videoConfig: VideoConfig;
  cldVideoPublicID: string;
}) => {
  const videoWidth = videoConfig.camera.size.width;
  const videoHeight = Math.floor(videoConfig.camera.size.width * 1.778); // aspect ratio 9:16

  const cldVideoURL = new CloudinaryVideo(cldVideoPublicID, {
    cloudName: "shape-snap",
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

const getTransformedVideoURL = ({
  cldVideoPublicID,
  videoConfig,
}: {
  videoConfig: VideoConfig;
  cldVideoPublicID: string;
}) => {
  const videoWidth = videoConfig.camera.size.width;
  const videoHeight = Math.floor(videoConfig.camera.size.width * 1.778); // aspect ratio 9:16

  const cldVideoURL = new CloudinaryVideo(cldVideoPublicID, {
    cloudName: "shape-snap",
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

export function FinalVideo({ videoPublicID, videoConfig }: Props) {
  const [transformedVideoURLs, setTransformedVideoURLs] = useState<{
    rounded: string;
    normal: string;
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

    setTransformedVideoURLs({
      normal: cldTransformedVideoURL,
      rounded: cldCameraRoundedURL,
    });
  }, [videoPublicID, videoConfig]);
  return (
    <section id="final-video-section">
      <h3 className="font-bold text-center text-2xl my-12">Final Video</h3>

      {transformedVideoURLs && (
        <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
          <ChooseLayouts onNewLayout={(layout) => setLayout(layout)} />

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

          <nav className="flex flex-col sm:flex-row md:flex-col gap-8 justify-between p-4">
            <a
              target="_blank"
              className="text-center hover:no-underline relative z-10 overflow-hidden bg-blue-600 group hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full shadow-lg transform hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out flex justify-center gap-2 items-center"
              download
              href={transformedVideoURLs[layout]}
            >
              <span className="absolute -rotate-45 scale-150 -z-10 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-500 top-0 left-0 right-0 h-2/4 bg-gradient-to-t from-white to-transparent opacity-50"></span>
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
            <a
              target="_blank"
              className="text-center hover:no-underline relative z-10 overflow-hidden bg-blue-600 group hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full shadow-lg transform hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out flex justify-center gap-2 items-center"
              download
              href="https://github.com/genaroibc/clippitt"
            >
              <span className="absolute -rotate-45 scale-150 -z-10 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-500 top-0 left-0 right-0 h-2/4 bg-gradient-to-t from-white to-transparent opacity-50"></span>
              Star on GitHub
              <svg
                className="w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                viewBox="0 0 576 512"
              >
                <path d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z" />
              </svg>
            </a>
          </nav>
        </div>
      )}
    </section>
  );
}
