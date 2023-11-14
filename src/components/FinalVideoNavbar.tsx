import ENV from "@/constants/env-vars";
import { IconBrandTwitter, IconDownload } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { CopyToClipboardButton } from "@/components/shared/CopyToClipboardButton";

type Props = {
  downloadURL: string;
};

const getShareOnTwitterLink = ({ videoURL = "" }) => {
  return `https://twitter.com/intent/tweet?text=Check%20out%20the%20amazing%20video%20I%20created%20using%20Clippitt!%0A&url=${encodeURIComponent(
    videoURL
  )}`;
};

export function FinalVideoNavbar({ downloadURL }: Props) {
  const [videoHash, setVideoHash] = useState<string | null>(null);

  const videoURL = `/v?src=${videoHash}`;

  useEffect(() => {
    const generateVideoHash = async () => {
      const response = await fetch(
        `${ENV.NEXT_PUBLIC_BASE_URL}/api/video-hash`,
        {
          method: "POST",
          body: JSON.stringify({
            videoURL: downloadURL,
          }),
        }
      );

      const { id } = await response.json();

      setVideoHash(id);
    };

    generateVideoHash();
  }, [ downloadURL ]);

  const clippittVideoURL = `${ENV.NEXT_PUBLIC_BASE_URL}${videoURL}`;

  return (
    <nav className="flex flex-col sm:flex-row items-center gap-8 justify-center p-4">
      <a
        target="_blank"
        className="text-center hover:no-underline relative z-10 overflow-hidden bg-blue-600 group hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full shadow-lg transform hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out flex justify-center gap-2 items-center hover:shadow-2xl"
        download
        href={downloadURL}
      >
        <span className="absolute -rotate-45 scale-150 -z-10 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-500 top-0 left-0 right-0 h-2/4 bg-gradient-to-t from-white to-transparent opacity-50"></span>
        Download
        <IconDownload />
      </a>
      <a
        target="_blank"
        className="text-center hover:no-underline relative z-10 overflow-hidden bg-[rgb(29,155,240)] group hover:brightness-105 text-white font-bold py-4 px-6 rounded-full shadow-lg transform hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out flex justify-center gap-2 items-center hover:shadow-2xl"
        href={getShareOnTwitterLink({
          videoURL: clippittVideoURL,
        })}
      >
        <span className="absolute -rotate-45 scale-150 -z-10 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-500 top-0 left-0 right-0 h-2/4 bg-gradient-to-t from-white to-transparent opacity-50"></span>
        Tweet
        <IconBrandTwitter />
      </a>

      <CopyToClipboardButton
        textToCopy={clippittVideoURL}
        title="Copy video link to clipboard"
        className="text-center hover:no-underline relative z-10 overflow-hidden bg-slate-900 group hover:bg-slate-950 text-white font-bold py-4 px-6 rounded-full shadow-lg transform hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out flex flex-row-reverse justify-center gap-2 items-center hover:shadow-2xl"
      >
        <span className="absolute -rotate-45 scale-150 -z-10 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-500 top-0 left-0 right-0 h-2/4 bg-gradient-to-t from-white to-transparent opacity-50"></span>
        Copy link
      </CopyToClipboardButton>
    </nav>
  );
}
