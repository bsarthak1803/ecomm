import { Html, Head, Main, NextScript } from 'next/document'
import { memo } from 'react'

const Document = memo(() : React.ReactNode  => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
})

export default Document;

Document.displayName = 'HTML Document';
