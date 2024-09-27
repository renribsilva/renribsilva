import { Html, Head, Main, NextScript } from 'next/document'
import IBMPlexMono from '../components/IBMPlexMono'

export default function Document() {
  return (
    <Html>
      <Head>
        <IBMPlexMono />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}