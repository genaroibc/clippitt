export function Hero() {
  return (
    <h1 className="text-center font-bold text-3xl md:text-5xl md:max-w-2xl mx-auto my-6">
      Convert your{" "}
      <span className="leading-relaxed inline-block animate-shine hover:brightness-125 transition-colors duration-300 hover:[text-shadow:2px_2px_20px_currentColor] text-violet-700">
        Twitch
      </span>{" "}
      Clips to{" "}
      <span className="leading-relaxed inline-block animate-shine hover:brightness-125 transition-colors duration-300 hover:[text-shadow:2px_2px_20px_currentColor]">
        TikToks
      </span>
      ,{" "}
      <span className="leading-relaxed inline-block animate-shine hover:brightness-125 transition-colors duration-300 hover:[text-shadow:2px_2px_20px_currentColor] text-pink-600">
        Reels
      </span>{" "}
      and{" "}
      <span className="leading-relaxed inline-block animate-shine hover:brightness-125 transition-colors duration-300 hover:[text-shadow:2px_2px_20px_currentColor] text-red-600">
        Youtube shorts
      </span>{" "}
    </h1>
  );
}
