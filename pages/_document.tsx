import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head />
        <meta name="robots" content="noindex"></meta>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
