import { kv } from "@vercel/kv";
import { NextApiHandler } from "next";
import { v4 as uuid } from "uuid";

const handler: NextApiHandler = async (req, res) => {
  const { method, body, query } = req;

  if (method === "GET") {
    const videoURL = await kv.get(query.hash as string);

    return res.status(200).json({ videoURL });
  } else if (method === "POST") {
    const id = uuid();

    const { videoURL } = JSON.parse(body);
    const data = await kv.set(id, videoURL);

    return res.status(201).json({ data, id });
  }

  return res.status(405).json("Invalid method on this endpoint");
};

export default handler;
