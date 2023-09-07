import { type GetServerSideProps } from "next";

export default function VideoIDPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { src } = query;

  const encodedVideoURL = (Array.isArray(src) ? src[0] : src) ?? "";
  const decodedVideoURL = globalThis.decodeURIComponent(globalThis.atob(encodedVideoURL));

  return {
    redirect: {
      destination: decodedVideoURL,
      permanent: true,
    },
    props: {},
  };
};
