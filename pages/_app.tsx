import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { memo } from 'react'

const App = memo(({ Component, pageProps }: AppProps)  => {
  //@ts-ignore
  return <Component {...pageProps} />
})

export default App;

App.displayName = 'App';
