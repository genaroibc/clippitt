import { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { VideoConfig } from "@/types";

const STEPS = [
  {
    title: "Select the webcam area",
    subtitle: "Zoom in/out to crop the desired area",
  },
  {
    title: "Select the main content area",
    subtitle: "Zoom in/out to crop the desired area",
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

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      console.log({ crop, croppedArea, croppedAreaPixels });
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
    [crop]
    // [crop, onVideoCameraCoords] try this!
  );

  const handleGoToNextStep = () => {
    setStep((currentStep) => {
      const nextStep = currentStep + 1;

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

          onVideoConfig(finalConfig);

          return finalConfig;
        });
      }

      if (nextStep > TOTAL_STEPS) return currentStep;
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
    <section className="grid grid-cols-2 gap-4 bg-violet-900 p-4">
      <div className="relative w-[600px] h-[400px] flex gap-4 flex-grow">
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

      <div className="flex flex-col gap-8 p-4">
        <h4 className="text-3xl font-bold">{STEPS[step]?.title}</h4>
        <p className="text-xl">{STEPS[step]?.subtitle}</p>

        <nav className="flex gap-4 items-center">
          <button
            onClick={handleGoToPrevStep}
            className="bg-blue-400 text-white rounded py-2 px-4"
          >
            PREV
          </button>
          <button
            onClick={handleGoToNextStep}
            className="bg-blue-400 text-white rounded py-2 px-4"
          >
            NEXT
          </button>
        </nav>
      </div>
    </section>
  );
}
