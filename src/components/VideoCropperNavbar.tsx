import { STEPS_LIST, TOTAL_STEPS } from "@/constants/steps";
import { ConfettiButton } from "./shared/ConfettiButton";

type Props = {
  step: number;
  handleGoToPrevStep: () => void;
  handleGoToNextStep: () => void;
};

export function VideoCropperNavbar({
  step,
  handleGoToPrevStep,
  handleGoToNextStep,
}: Props) {
  return (
    <>
      <h4 className="text-3xl font-bold">
        {STEPS_LIST[step < TOTAL_STEPS ? step : TOTAL_STEPS]?.title}
      </h4>
      <p className="text-xl">
        {STEPS_LIST[step < TOTAL_STEPS ? step : TOTAL_STEPS]?.subtitle}
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
        {step >= TOTAL_STEPS ? (
          <ConfettiButton
            className="hover:scale-110 hover:shadow-2xl"
            onClick={() => {
              handleGoToNextStep();
              setTimeout(() => {
                document
                  .getElementById("final-video-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }, 150);
            }}
          >
            <span className="min-w-fit">CREATE CLIP</span>
            <svg
              className="fill-white w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z" />
            </svg>
          </ConfettiButton>
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
    </>
  );
}
