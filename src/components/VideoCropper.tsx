import { useCallback, useEffect, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { VideoConfig } from "@/types";
import { CreateClipButton } from "./CreateClipButton";

const STEPS = [
  {
    title: "😀 Select the webcam area",
    subtitle: "Zoom in/out to crop the desired area",
  },
  {
    title: "💻 Select the main content area",
    subtitle: "Zoom in/out to crop the desired area",
  },
  {
    title: "You did it! 🥳",
    subtitle: "Click below to see magic happen",
  },
];

const TOTAL_STEPS = STEPS.length - 1;

type Props = {
  videoSrc: string;
  // eslint-disable-next-line no-unused-vars
  onVideoConfig: (config: VideoConfig) => void;
};

export function VideoCropper({ videoSrc, onVideoConfig }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [step, setStep] = useState<number>(0);
  const [videoConfig, setVideoConfig] = useState<VideoConfig>({
    camera: { coords: { x: 0, y: 0 }, size: { width: 0, height: 0 } },
    content: { coords: { x: 0, y: 0 }, size: { width: 0, height: 0 } },
  });
  const [finalVideoConfig, setFinalVideoConfig] = useState<VideoConfig>({
    camera: { coords: { x: 0, y: 0 }, size: { width: 0, height: 0 } },
    content: { coords: { x: 0, y: 0 }, size: { width: 0, height: 0 } },
  });

  useEffect(() => {
    if (step === TOTAL_STEPS + 1) {
      onVideoConfig(finalVideoConfig);
    }
  }, [step, onVideoConfig, finalVideoConfig]);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      const { height, width, x, y } = croppedAreaPixels;

      const cameraConfig = {
        coords: {
          x,
          y,
        },
        size: {
          height,
          width,
        },
      };

      const contentConfig = {
        coords: {
          x,
          y,
        },
        size: {
          height,
          width,
        },
      };

      const updatedVideoConfig = {
        camera: cameraConfig,
        content: contentConfig,
      };

      setVideoConfig(updatedVideoConfig);
    },
    []
  );

  useEffect(() => {
    setStep(0);
  }, [videoSrc]);

  const handleGoToNextStep = () => {
    setStep((currentStep) => {
      if (currentStep === 0) {
        setFinalVideoConfig((currentConfig) => ({
          ...currentConfig,
          camera: videoConfig.camera,
        }));
      }

      if (currentStep === 1) {
        setFinalVideoConfig((currentConfig) => {
          const finalConfig = {
            ...currentConfig,
            content: videoConfig.content,
          };

          return finalConfig;
        });
      }

      const nextStep = currentStep + 1;
      if (nextStep > TOTAL_STEPS + 1) {
        return currentStep;
      }
      return nextStep;
    });
  };

  const handleGoToPrevStep = () => {
    setStep((currentStep) => {
      const prevStep = currentStep - 1;

      if (prevStep < 0) return currentStep;

      return prevStep;
    });
  };

  return (
    <section className="grid grid-cols-1 place-content-center xl:grid-cols-2 bg-violet-900 px-4 py-8">
      <div className="relative w-[600px] h-[400px] flex gap-4 flex-grow mx-auto">
        <Cropper
          video={videoSrc}
          crop={crop}
          zoom={zoom}
          showGrid
          restrictPosition={true}
          aspect={1}
          cropSize={{ height: 300, width: 300 }}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      <div className="flex flex-col justify-center gap-8 p-8 mx-auto xl:w-full">
        <h4 className="text-3xl font-bold">
          {STEPS[step < TOTAL_STEPS ? step : TOTAL_STEPS]?.title}
        </h4>
        <p className="text-xl">
          {STEPS[step < TOTAL_STEPS ? step : TOTAL_STEPS]?.subtitle}
        </p>
        <nav className="flex gap-4 items-center">
          <button
            disabled={step === 0}
            onClick={handleGoToPrevStep}
            className="bg-blue-500 text-white rounded py-2 px-4"
          >
            <span className="flex gap-2 items-center">
              <svg
                className="w-3 rotate-180"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 512"
              >
                <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
              </svg>
              PREV
            </span>
          </button>
          {step === TOTAL_STEPS ? (
            <CreateClipButton
              className="bg-blue-500 text-white rounded py-2 px-4"
              onClick={() => {
                handleGoToNextStep();
                document
                  .getElementById("final-video-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          ) : (
            <button
              disabled={step === TOTAL_STEPS + 1}
              onClick={handleGoToNextStep}
              className="bg-blue-500 text-white rounded py-2 px-4"
            >
              <span className="flex gap-2 items-center">
                NEXT
                <svg
                  className="w-3"
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 512"
                >
                  <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
              </span>
            </button>
          )}
        </nav>

        <div className="flex justify-end gap-4">
          {step === 0 ? (
            <svg
              className="fill-violet-400 w-16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM96.8 314.1c-3.8-13.7 7.4-26.1 21.6-26.1H393.6c14.2 0 25.5 12.4 21.6 26.1C396.2 382 332.1 432 256 432s-140.2-50-159.2-117.9zM144.4 192a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg>
          ) : (
            <svg
              className="fill-violet-400 w-16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64H240l-10.7 32H160c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H346.7L336 416H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM512 64V352H64V64H512z" />
            </svg>
          )}

          <svg
            className="fill-violet-500 w-16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
          </svg>
        </div>
      </div>
    </section>
  );
}
