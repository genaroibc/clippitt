import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${syne.className} flex flex-col min-h-screen justify-between`}
    >
      <Component {...pageProps} />
    </div>
  );
}
