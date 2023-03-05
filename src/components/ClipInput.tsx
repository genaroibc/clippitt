import { getTwitchClipID } from "@/utils/get-twitch-clip-id";
import { UPLOAD_CLIP_ERR } from "@/constants/error-messages";
import { ClipID, ClipSourceURL, ClipURL } from "@/types";
import { useState } from "react";
import { getClipSourceURL } from "@/services/get-clip-source-url";

export function ClipInput() {
  const [clipURL, setClipURL] = useState<ClipURL>("");
  const [clipID, setClipID] = useState<ClipID | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [clipSourceURL, setClipSourceURL] = useState<ClipSourceURL | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const clipID = getTwitchClipID({ clipURL });

    if (!clipID) {
      return setError(UPLOAD_CLIP_ERR.MALFORMED_CLIP_URL);
    }

    const clipSourceResponse = await getClipSourceURL({
      clipID,
    });

    if (!clipSourceResponse.ok) {
      return setError(clipSourceResponse.error);
    }

    setClipID(clipID);
    setClipSourceURL(clipSourceResponse.data);
  };

  const handleClipURLInputChange = (e: any) => {
    const newClipURL = e.target.value;
    setClipURL(newClipURL);
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
            value={clipURL}
            onChange={handleClipURLInputChange}
            className="bg-gray-800 text-white px-3 py-2 rounded-md w-full"
            placeholder="clips.twitch.tv"
          />
          <button className="min-w-fit px-4 py-2 ">Clip it!</button>
        </div>
        <p className="text-red-400">{error}</p>
      </form>

      {clipID && (
        <p className="font-bold text-xl">
          <span>ClipID:</span>
          <span className="text-green-400">{clipID}</span>
        </p>
      )}

      {clipSourceURL && (
        <video
          autoPlay
          controls
          muted={false}
          className="max-w-xl mx-auto block m-12"
          src={clipSourceURL}
        ></video>
      )}
    </div>
  );
}
