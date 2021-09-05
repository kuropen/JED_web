import { extendTheme } from "@chakra-ui/react"
import "@ibm/plex"

const PLEX_FONT_CONFIG = "'IBM Plex Sans JP', 'IBM Plex Sans'"

const theme = extendTheme({
    fonts: {
        heading: PLEX_FONT_CONFIG,
        body: PLEX_FONT_CONFIG,
    }
})

export default theme
