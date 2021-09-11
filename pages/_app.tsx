import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '../utilities/apollo-client'
import React from 'react'

import { ChakraProviderWithColorModeProps } from "../utilities/chakraColorModeManager"
import { extendTheme } from '@chakra-ui/react'
import themeConfig from '../utilities/themeConfig'

function MyApp({ Component, pageProps }: AppProps) {
  const customTheme = extendTheme(themeConfig)
  return (
    <ChakraProviderWithColorModeProps theme={customTheme}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProviderWithColorModeProps>
  )
}
export default MyApp
