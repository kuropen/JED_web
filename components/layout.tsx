import { Box, extendTheme, Flex, Heading, IconButton, Link, LinkBox, LinkOverlay, Menu, MenuButton, MenuDivider, MenuItem, MenuList, useColorMode, VisuallyHidden } from "@chakra-ui/react"
import Head from 'next/head'
import Image from 'next/image'
import NextLink from 'next/link'
import * as React from "react"

import themeConfig from "../utilities/themeConfig";

import "@fontsource/orbitron/700.css"
import "@ibm/plex/css/ibm-plex-sans-jp.css"
import "@ibm/plex/css/ibm-plex.css"

import elecwarnLogo from "../images/elecwarn_icon.png"

import { ExternalLinkIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"
import { useRouter } from "next/dist/client/router"

interface LayoutProps {
    pageTitle?: string
}

interface MenuItemForDocumentProps {
    href: string,
}

const MenuItemForDocument: React.FC<React.PropsWithChildren<MenuItemForDocumentProps>> = ({children, href}) => {
    const router = useRouter()
    const handleClick = (e: Pick<Event, "preventDefault">) => {
        e.preventDefault()
        router.push(href)
    }
    return (
        <MenuItem key={href} onClick={handleClick}>
            <Link as={NextLink} href={href}>
                {children}
            </Link>
        </MenuItem>
    )
} 

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = (props) => {
    const {children} = props

    const title = 'Japan Electricity Dashboard'
    let titleShown = title
    if (props.pageTitle) {
        titleShown = `${props.pageTitle} - ${title}`
    }

    const customTheme = extendTheme(themeConfig)
    const { colorMode, setColorMode } = useColorMode()

    const darkModeConfig = process.browser ? (
        <>
            <MenuItem icon={<MoonIcon />} onClick={() => setColorMode('dark')} display={colorMode === 'dark' ? 'none' : 'block'}>
                ダークモードにする
            </MenuItem>
            <MenuItem icon={<SunIcon />} onClick={() => setColorMode('light')} display={colorMode === 'light' ? 'none' : 'block'}>
                ダークモード解除
            </MenuItem>
            <MenuDivider />
        </>
    ) : null

    return (
        <Box as="main" maxW={{base: "container.sm", lg: "container.lg", xl: "container.xl"}} mx="auto" mt="2" mb="2">
            {/* TODO: 更新通知実装したときは pb=36 入れる */}
            <Head>
                <title>{titleShown}</title>
                <link rel="icon" type="image/png" href={elecwarnLogo.src} />
            </Head>
            <Flex
                my="2"
                pb="2"
                borderBottom="2px"
                borderBottomColor="gray"
                as="header"
                align="center"
            >
                <LinkBox as="nav" d={{base: "none", md: "block"}}>
                    <Image src={elecwarnLogo} alt="Electricity Warning Project" width="48" height="48" />
                    <LinkOverlay as={NextLink} href="/"><VisuallyHidden>トップページに戻る</VisuallyHidden></LinkOverlay>
                </LinkBox>
                <Heading
                    as="h1"
                    size="xl"
                    fontFamily="Orbitron, sans-serif"
                    textAlign="center"
                    flex="1"
                >
                    <Link as={NextLink} href="/">
                        Japan Electricity Dashboard
                    </Link>
                </Heading>
                <Box mr="2">
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<HamburgerIcon />}
                            variant="outline"
                        />
                        <MenuList>
                            <MenuItemForDocument href="/">
                                トップページ
                            </MenuItemForDocument>
                            <MenuDivider />
                            <MenuItemForDocument href="/documents/about">
                                はじめに
                            </MenuItemForDocument>
                            <MenuItemForDocument href="/documents/disclaimers">
                                免責事項
                            </MenuItemForDocument>
                            <MenuDivider />
                            {darkModeConfig}
                            <MenuItem icon={<ExternalLinkIcon />} onClick={() => window.open('https://penguinone.kuropen.org/')}>
                                運営者Webサイト
                            </MenuItem>
                            <MenuItem onClick={() => window.open('https://penguinone.kuropen.org/privacy')}>
                                プライバシーポリシー
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Flex>
            <Box>
                {children}
            </Box>
            <Box as="address" fontStyle="normal" mx="2" mt="5">
                Copyright &copy; <Link href="https://kuropen.org/" rel="author" isExternal>Kuropen</Link>. 
                Electricity Warning Project Icon is provided by <Link href="https://twitter.com/haretter" isExternal>Hareta</Link> and 
                licensed under <Link href="https://creativecommons.org/licenses/by-nc-sa/3.0/" isExternal>Creative Commons Attribution-NonCommercial-ShareAlike 3.0</Link> License.
            </Box>
        </Box>
    )
}

export default Layout
