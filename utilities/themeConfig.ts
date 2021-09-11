import { Theme } from "@chakra-ui/theme"

const PLEX_FONT_CONFIG = "'IBM Plex Sans JP', 'IBM Plex Sans', sans-serif"
const PLEX_MONO_CONFIG = "'IBM Plex Mono', monospace"

const themeConfig: Pick<Theme, "fonts" | "config"> = {
    fonts: {
        heading: PLEX_FONT_CONFIG,
        body: PLEX_FONT_CONFIG,
        mono: PLEX_MONO_CONFIG,
    },
    config: {
        initialColorMode: "light",
        useSystemColorMode: true,
    }
}

export default themeConfig
