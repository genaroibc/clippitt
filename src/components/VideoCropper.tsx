import { useCallback, useEffect, useState } from "react";
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
      if (nextStep > TOTAL_STEPS + 1) return currentStep;
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
            disabled={step === 0}
            onClick={handleGoToPrevStep}
            className="bg-blue-400 text-white rounded py-2 px-4"
          >
            PREV
          </button>
          <button
            disabled={step === TOTAL_STEPS + 1}
            onClick={handleGoToNextStep}
            className="bg-blue-400 text-white rounded py-2 px-4"
          >
            {step === TOTAL_STEPS ? "CREATE CLIP" : "NEXT"}
          </button>
        </nav>
        <code className="bg-slate-900 p-4 flex flex-col gap-4">
          <span>
            Step <span className="text-green-600">{step}</span>
          </span>
          <span>
            videoConfig{" "}
            <span className="text-green-600">
              {JSON.stringify(videoConfig)}
            </span>
          </span>
          <span>
            finalVideoConfig{" "}
            <span className="text-green-600">
              {JSON.stringify(finalVideoConfig)}
            </span>
          </span>
        </code>
        ;
      </div>
    </section>
  );
}
