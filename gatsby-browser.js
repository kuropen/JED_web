import * as React from "react"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import "@ibm/plex"

const PLEX_FONT_CONFIG = "'IBM Plex Sans JP', 'IBM Plex Sans', sans-serif"

const theme = extendTheme({
    fonts: {
        heading: PLEX_FONT_CONFIG,
        body: PLEX_FONT_CONFIG,
    },
    config: {
        useSystemColorMode: true,
    }
})

export const wrapRootElement = (bind) => {
    const {element} = bind
    return (
        <ChakraProvider theme={theme}>
            {element}
        </ChakraProvider>
    )
}