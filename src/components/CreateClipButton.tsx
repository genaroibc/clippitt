import { useCallback, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

type Props = {
  onClick: () => void;
  className: string;
};

export function CreateClipButton({ onClick, className }: Props) {
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeConfettiShot = useCallback((particleRatio: number, opts: {}) => {
    const animationInstace = refAnimationInstance.current as unknown as (
      // eslint-disable-next-line no-unused-vars
      opts: any
    ) => void;

    refAnimationInstance.current &&
      animationInstace({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fireConfetti = useCallback(() => {
    makeConfettiShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeConfettiShot(0.2, {
      spread: 60,
    });

    makeConfettiShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeConfettiShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeConfettiShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeConfettiShot]);

  return (
    <>
      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      />
      <button
        className={className}
        onClick={() => {
          fireConfetti();
          onClick();
        }}
      >
        <span className="flex gap-2">
          <span className="min-w-fit">CREATE CLIP</span>
          <svg
            className="fill-white w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z" />
          </svg>
        </span>
      </button>
    </>
  );
}
