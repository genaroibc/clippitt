import { ClipInput } from "@/components/ClipInput";
import { Hero } from "@/components/Hero";
import { SemanticHead } from "@/components/SemanticHead";

export default function Home() {
  return (
    <>
      <SemanticHead
        description="Make short for TikTok and YouTube from a Twitch clip"
        title="Clippitt"
      />
      <main>
        <Hero />

        <ClipInput />
      </main>
    </>
  );
}
