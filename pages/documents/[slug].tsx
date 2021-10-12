/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
import { ArrowLeftIcon } from "@chakra-ui/icons"
import { Box, Flex, LinkBox, LinkOverlay, Spacer, Text } from "@chakra-ui/layout"
import NextLink from "next/link"
import ReactMarkdown from "react-markdown"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import * as React from "react"
import Layout from "../../components/layout"
import {readdir, readFile} from "fs/promises"
import path from "path"
import frontmatter, { FrontMatterResult } from "front-matter"
import remarkFn from "remark-footnotes"
import remarkGfm from "remark-gfm"
import { useColorModeValue } from "@chakra-ui/system"

interface DocumentPageParams {
    [slug: string]: string,
}

interface DocumentPageProps {
    body: string,
    title: string,
}

interface DocumentFrontmatterAttributes {
    title: string,
}

const DocumentPage: NextPage<Partial<DocumentPageProps>> = (props) => {
    const statFontColor = useColorModeValue("black", "gray.200")
    const statBgColor = useColorModeValue("white", "gray.900")
    if (props.body === undefined || props.title === undefined) {
        return null
    }
    return (
        <Layout pageTitle={props.title}>
            <Box my="2" p="2" borderRadius="lg" boxShadow="lg" bg={statBgColor} color={statFontColor} maxWidth="3xl" mx={{base: "2", md: "auto"}}>
                <Box as="section">
                    <ReactMarkdown components={ChakraUIRenderer()} plugins={[remarkGfm, remarkFn]}>
                        {props.body}
                    </ReactMarkdown>
                </Box>
                <LinkBox as="nav" borderTop="1px" borderTopColor="gray.200" pt="3" mt="3">
                    <Flex align="center">
                        <ArrowLeftIcon />
                        <Text ml="2">
                            <LinkOverlay as={NextLink} href="/">トップページに戻る</LinkOverlay>
                        </Text>
                        <Spacer />
                    </Flex>
                </LinkBox>
            </Box>
        </Layout>
    )
}

export default DocumentPage

export const getStaticProps: GetStaticProps<Partial<DocumentPageProps>, DocumentPageParams> = async ({params}) => {
    let props = {}
    let notFound = false
    if (params === undefined) {
        notFound = true
    } else {
        const slug = params?.slug || ''
        const filePath = path.join(process.cwd(), `documents/${slug}.md`)
        const fileContent = await readFile(filePath, 'utf8')
        const mdContent: FrontMatterResult<DocumentFrontmatterAttributes> = frontmatter(fileContent)
        props = {
            body: mdContent.body,
            title: mdContent.attributes.title,
        }
    } 
    return {
        props: props,
        notFound: notFound,
    }
}

export const getStaticPaths: GetStaticPaths<DocumentPageParams> = async () => {
    const documents = await readdir(path.join(process.cwd(), 'documents'))
    const availablePaths = documents.map((document) => {
        const plainFileName = document.split('.')[0]
        return {
            params: {
                slug: plainFileName
            }
        }
    })
    return {
        paths: availablePaths,
        fallback: false,
    }
}
