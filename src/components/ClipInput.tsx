import { getTwitchClipID } from "@/utils/get-twitch-clip-id";
import { ClipURL } from "@/types";
import { useState } from "react";
import { getClipSourceURL } from "@/services/get-clip-source-url";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onClipURL: (newURL: string) => void;
};

export function ClipInput({ onClipURL }: Props) {
  const [rawClipURL, setRawClipURL] = useState<ClipURL>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const clipID = getTwitchClipID({ clipURL: rawClipURL });

    if (!clipID) {
      return setError("Invalid Twitch clip URL");
    }

    const clipURLResponse = await getClipSourceURL({
      clipID,
    });

    if (!clipURLResponse.ok) {
      return setError(clipURLResponse.error);
    }

    const clipURL = clipURLResponse.data;
    onClipURL(clipURL);
    setError(null);
  };

  const handleRawClipURLInputChange = (e: any) => {
    const newRawClipURL = e.target.value;
    setRawClipURL(newRawClipURL);
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-md">
      <form
        className="flex flex-col justify-center gap-4"
        onSubmit={handleSubmit}
      >
        <label htmlFor="clipUrl" className="text-xl font-bold">
          Enter your Twitch clip URL
        </label>
        <div className="flex gap-4 justify-start items-center">
          <input
            type="text"
            name="clipUrl"
            id="clipUrl"
            value={rawClipURL}
            onChange={handleRawClipURLInputChange}
            className="bg-gray-800 text-white px-3 py-2 rounded-md w-full"
            placeholder="clips.twitch.tv"
          />
          <button className="min-w-fit px-4 py-2 ">Clip it!</button>
        </div>
        {error && <p className="text-red-400">{error}</p>}
      </form>
    </div>
  );
}
