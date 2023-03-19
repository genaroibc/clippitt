const ENV = {
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
  NEXT_PUBLIC_UPLOAD_VIDEO_API_URL:
    process.env.NEXT_PUBLIC_UPLOAD_VIDEO_API_URL!,
  NEXT_PUBLIC_CLIP_SOURCE_API_URL: process.env.NEXT_PUBLIC_CLIP_SOURCE_API_URL!,
  TWITCH_ACCESS_TOKEN_API_URL: process.env.TWITCH_ACCESS_TOKEN_API_URL!,
  TWITCH_APP_CLIENT_ID: process.env.TWITCH_APP_CLIENT_ID!,
  TWITCH_APP_CLIENT_SECRET: process.env.TWITCH_APP_CLIENT_SECRET!,
  TWITCH_CLIPS_API_URL: process.env.TWITCH_CLIPS_API_URL!,
  TWITCH_API_ACCESS_TOKEN: process.env.TWITCH_API_ACCESS_TOKEN!,
};

Object.entries(ENV).forEach(([name, value]) => {
  if (!value === undefined) {
    throw new Error(`'${name}' env variable is not defined`);
  }
});

export default ENV;
