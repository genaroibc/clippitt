const PUBLIC_VAR_PREFIX = "NEXT_PUBLIC_";
const ENV = {
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  NEXT_PUBLIC_UPLOAD_VIDEO_API_URL:
    process.env.NEXT_PUBLIC_UPLOAD_VIDEO_API_URL!,
  NEXT_PUBLIC_CLIP_SOURCE_API_URL: process.env.NEXT_PUBLIC_CLIP_SOURCE_API_URL!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
  TWITCH_ACCESS_TOKEN_API_URL: process.env.TWITCH_ACCESS_TOKEN_API_URL!,
  TWITCH_APP_CLIENT_ID: process.env.TWITCH_APP_CLIENT_ID!,
  TWITCH_APP_CLIENT_SECRET: process.env.TWITCH_APP_CLIENT_SECRET!,
  TWITCH_CLIPS_API_URL: process.env.TWITCH_CLIPS_API_URL!,
  TWITCH_API_ACCESS_TOKEN: process.env.TWITCH_API_ACCESS_TOKEN!,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL!,
};

const envEntries = Object.entries(ENV);
const isServer = typeof window !== "undefined";

let envVars = envEntries;

if (isServer) {
  envVars = envEntries.filter(([name]) => name.includes(PUBLIC_VAR_PREFIX));
}

envVars.forEach(([name, value]) => {
  if (value === undefined) {
    throw new Error(`'${name}' env variable is not defined`);
  }
});

export default ENV;
