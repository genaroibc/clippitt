export function Hero() {
  return (
    <h1 className="text-center font-bold text-4xl my-6">
      Convert your <span className="text-violet-700">Twitch</span> Clips to{" "}
      <span className="relative text-black z-10 before:-z-10 before:absolute before:-top-1 before:-left-1 before:rounded before:skew-x-12 before:-bottom-1 before:-right-1 before:content-[''] before:bg-white ">
        TikTok
      </span>
      , <span className="text-pink-600">Reels</span> and{" "}
      <span className="text-red-500">Youtube shorts</span>{" "}
    </h1>
  );
}
