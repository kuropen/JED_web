import { ArrowLeftIcon } from "@chakra-ui/icons"
import { Box, Flex, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout"
import { Table, Td, Th, Tr } from "@chakra-ui/table"
import { graphql, Link, PageProps } from "gatsby"
import Markdown from "markdown-to-jsx"
import * as React from "react"
import Layout from "../components/layout"

const AboutPage: React.FC<PageProps<GatsbyTypes.AboutQuery>> = ({data}) => {
    const mdContent = data.markdownRemark?.html || ''
    return (
        <Layout>
            <Box as="section" maxW="container.md" mx="auto">
                <Box as="article">
                    <Markdown options={{
                        overrides: {
                            h2: {
                                component: Heading,
                                props: {
                                    as: "h2"
                                }
                            },
                            table: {
                                component: Table
                            },
                            tr: {
                                component: Tr
                            },
                            th: {
                                component: Th
                            },
                            td: {
                                component: Td
                            },
                            p: {
                                component: Text,
                                props: {
                                    my: 2
                                }
                            }
                        }
                    }}>
                        {mdContent}
                    </Markdown>
                </Box>
                <LinkBox as={Flex} align="center">
                    <ArrowLeftIcon />
                    <Text><LinkOverlay as={Link} to="/">トップページに戻る</LinkOverlay></Text>
                </LinkBox>
            </Box>
        </Layout>
    )
}

export const AboutQuery = graphql`
query About {
  markdownRemark(frontmatter: {slug: {eq: "about"}}) {
    html
  }
}
`

export default AboutPage
