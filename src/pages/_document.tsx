import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Umami Analytics script */}
        <script defer src="https://us.umami.is/script.js" data-website-id="b43029a9-b512-4a2a-b937-8d818766bbb9"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
