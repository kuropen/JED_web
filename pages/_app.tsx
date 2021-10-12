/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
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
