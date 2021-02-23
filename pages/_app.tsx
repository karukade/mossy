import { AppProps } from "next/app"
import "../styles/globals.css"
import "ress/dist/ress.min.css"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
