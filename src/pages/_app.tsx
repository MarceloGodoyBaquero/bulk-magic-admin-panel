import "@/styles/globals.css"
import type {AppProps} from "next/app"
import {NextUIProvider} from "@nextui-org/react"
import {Toaster} from "react-hot-toast"

export default function App({Component, pageProps}: AppProps) {
  return (
    <NextUIProvider>
      <Toaster position={"top-center"} containerStyle={{zIndex: '10000'}}/>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}
