import { Layout } from "@/types";
import { v4 as uuid } from "uuid";

export const LAYOUTS: { url: string; id: string; layout: Layout }[] = [
  { url: "/rounded.webp", id: uuid(), layout: "rounded" },
  { url: "/normal.webp", id: uuid(), layout: "normal" },
  { url: "/camera-top.webp", id: uuid(), layout: "camera-top" },
  { url: "/camera-bottom.webp", id: uuid(), layout: "camera-bottom" },
];
