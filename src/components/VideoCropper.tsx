import { useCallback, useEffect, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { VideoConfig } from "@/types";
import { TOTAL_STEPS } from "@/constants/steps";
import { VideoCropperNavbar } from "./VideoCropperNavbar";

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
      setTimeout(() => {
        setStep(0);
      }, 500);
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
    setZoom(1);
  };

  const handleGoToPrevStep = () => {
    setStep((currentStep) => {
      const prevStep = currentStep - 1;

      if (prevStep < 0) return currentStep;

      return prevStep;
    });
    setZoom(1);
  };

  return (
    <section className="grid grid-cols-1 place-content-center xl:grid-cols-2 bg-violet-900 md:px-4 py-8">
      <div className="relative w-full h-[300px] md:w-[600px] md:h-[400px] flex gap-4 flex-grow mx-auto ">
        <Cropper
          style={{
            containerStyle: {
              maxWidth: "100vw",
            },
          }}
          video={videoSrc}
          crop={crop}
          zoom={zoom}
          showGrid
          restrictPosition={true}
          aspect={1 / 0.9}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      <div className="flex flex-col justify-center gap-8 p-8 mx-auto xl:w-full">
        <VideoCropperNavbar
          step={step}
          handleGoToPrevStep={handleGoToPrevStep}
          handleGoToNextStep={handleGoToNextStep}
        />
      </div>
    </section>
  );
}
