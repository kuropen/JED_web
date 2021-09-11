import {
    ChakraProvider,
    cookieStorageManager,
    extendTheme,
    localStorageManager
} from "@chakra-ui/react"
import { ChakraProviderProps } from "@chakra-ui/provider"
import { PropsWithChildren } from "react"
import themeConfig from "./themeConfig"
import { GetServerSideProps } from "next"
import { IncomingMessage } from "http"

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
