import { Box, ChakraProvider, Heading, Link } from "@chakra-ui/react"
import { Helmet } from "react-helmet";
import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

import "@fontsource/orbitron/700.css"
import PlexFontTheme from "./plexFontTheme"

interface LayoutProps {
    pageTitle?: string
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = (props) => {
    const {children} = props
    const metaQuery: GatsbyTypes.LayoutMetaQuery = useStaticQuery(graphql `
query LayoutMeta {
  site {
    siteMetadata {
      title
    }
  }
}
    `)

    const title = metaQuery.site?.siteMetadata?.title
    let titleShown = title
    if (props.pageTitle) {
        titleShown = `${props.pageTitle} - ${title}`
    }

    return (
        <ChakraProvider theme={PlexFontTheme}>
            <Helmet title={titleShown} htmlAttributes={{lang: 'ja'}}>
            </Helmet>
            <Box as="main" maxW={{base: "container.sm", lg: "container.lg", xl: "container.xl"}} mx="auto" mt="2" mb="2">
                {/* TODO: 更新通知実装したときは pb=36 入れる */}
                <Box as="aside" float="left" d={{base: "none", md: "block"}}>
                    <StaticImage src="../images/elecwarn_icon.png" alt="From Electricity Warning Project" width={48} />
                </Box>
                <Box as="header">
                    <Heading
                        as="h1"
                        size="xl"
                        fontFamily="Orbitron, sans-serif"
                        my="2"
                        pb="2"
                        borderBottom="2px"
                        borderBottomColor="gray"
                        textAlign="center"
                    >
                        Japan Electricity Dashboard
                    </Heading>
                </Box>
                <Box>
                    {children}
                </Box>
                <Box as="address" fontStyle="normal" mx="2" mt="5">
                    Copyright &copy; <Link href="https://kuropen.org/" rel="author">Kuropen</Link>. 
                    Licensed under <Link href="https://creativecommons.org/licenses/by-nc-sa/4.0/" rel="license">Creative Commons Attribution-NonCommercial-ShareAlike 4.0</Link> License.<br />
                    Electricity Warning Project Icon is provided by <Link href="https://twitter.com/haretter">Hareta</Link> and 
                    licensed under <Link href="https://creativecommons.org/licenses/by-nc-sa/3.0/">Creative Commons Attribution-NonCommercial-ShareAlike 3.0</Link> License.
                </Box>
            </Box>
        </ChakraProvider>
    )
}

export default Layout
