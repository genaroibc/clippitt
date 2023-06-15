import { useCallback, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { RotatingGradientButton } from "./RotatingGradientButton";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: React.ReactNode;
}

export function ConfettiButton({ onClick, children, ...props }: Props) {
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
      <RotatingGradientButton
        {...props}
        onClick={() => {
          fireConfetti();
          onClick();
        }}
      >
        {children}
      </RotatingGradientButton>
    </>
  );
}
