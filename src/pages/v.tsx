import ENV from "@/constants/env-vars";
import { type GetServerSideProps } from "next";

export default function VideoIDPage() {
  return (
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam unde
      aliquam veritatis perspiciatis est explicabo itaque, impedit sint
      cupiditate deserunt adipisci tenetur atque laudantium eum repellendus
      dolore quidem dolor corrupti.
    </p>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { src: videoHash } = query;

  if (!videoHash) {
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }

  const { videoURL } = await fetch(
    `${ENV.NEXT_PUBLIC_BASE_URL}/api/video-hash?hash=${videoHash}`
  ).then((res) => res.json());

  return {
    redirect: {
      destination: videoURL,
      permanent: true,
    },
    props: {},
  };
};
