/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
import {
    ChakraProvider,
    cookieStorageManager,
    extendTheme,
    localStorageManager
} from "@chakra-ui/react"
import { ChakraProviderProps } from "@chakra-ui/provider"
import { PropsWithChildren } from "react"
import themeConfig from "./themeConfig"

interface ChakraProviderWithColorModePropsElements {
    cookies?: string
}

type ChakraProviderWithColorModeProps = ChakraProviderProps & ChakraProviderWithColorModePropsElements

export const ChakraProviderWithColorModeProps: React.FC<PropsWithChildren<ChakraProviderWithColorModeProps>> = (props) => {
    const cookies = props.cookies
    const colorModeManager = cookies ? cookieStorageManager(cookies) : localStorageManager
    const customTheme = extendTheme(themeConfig)
    return (
        <ChakraProvider {...props} colorModeManager={colorModeManager} theme={customTheme} />
    )
}
