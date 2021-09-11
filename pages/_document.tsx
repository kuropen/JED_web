// pages/_document.js
import { ColorModeScript } from "@chakra-ui/react"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import themeConfig from "../utilities/themeConfig"
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <ColorModeScript initialColorMode={themeConfig.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}