import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import areaListQuery, { AreaListQueryResponse } from "../queries/areaListQuery";
import areaQuery, { AreaQueryParams, AreaQueryResponse, AreaQueryResponseMaybeDynamic, areaStaticQuery, AreaStaticQueryResponse, buildAreaQueryParams } from "../queries/areaQuery";
import client from "../utilities/apollo-client";
import moment from "moment-timezone"
import { useColorModeValue } from "@chakra-ui/color-mode";
import React from "react";
import DemandStat from "../components/demandStat";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, Flex, Heading, LinkBox, LinkOverlay, Spacer, StatGroup, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import getProgressColor from "../utilities/getProgressColor";
import Layout from "../components/layout";
import LastUpdateBox from "../components/lastUpdateBox";
import NextLink from 'next/link'
import { LinkIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import loadingBox from "../components/loadingBox";
import { useQuery } from "@apollo/client";

interface AreaPageProps {
    areaInfo?: AreaQueryResponseMaybeDynamic,
}

interface AreaPageParams {
    [code: string]: string,
}

const AreaPage: NextPage<AreaPageProps> = (props) => {
    const statFontColor = useColorModeValue("black", "gray.200")
    const statBgColor = useColorModeValue("white", "gray.900")
    const clientQueryResult = useQuery<AreaQueryResponse, AreaQueryParams>(areaQuery, {
        variables: buildAreaQueryParams({
            code: props.areaInfo?.areaByCode.code || ''
        })
    })

    if (props.areaInfo === undefined) {
        return null
    }

    const {loading, error, refetch} = clientQueryResult

    const data = clientQueryResult.data || props.areaInfo
    if (data === undefined) {
        return (
            <Layout>
                {loadingBox}
            </Layout>
        )
    }
    let lastUpdateTimeCandidate: Array<number> = []
    if (data.hourlyDemand && data.hourlyDemand.length > 0) {
        lastUpdateTimeCandidate.push(new Date(data.hourlyDemand[0].createdAt).getTime())
    }
    // TODO fiveMinDemand

    const lastUpdateTime = lastUpdateTimeCandidate.sort((a, b) => (b - a))[0] || new Date().getTime()
    const lastUpdateDate = moment(new Date(lastUpdateTime)).tz("Asia/Tokyo").format("YYYY年MM月DD日 HH時mm分")
    const area = data.areaByCode

    let statsZone = loadingBox
    
    if (error) {
        statsZone = (
            <Alert status="error">
                <AlertIcon />
                <AlertTitle mr="2">読み込みエラーが発生しました。</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
            </Alert>
        )
    }

    if (data.peakElectricity && data.hourlyDemand) {
        const demandStats = data.peakElectricity.map((peak) => {
            const label = (peak.type === "AMOUNT") ? "予想最大電力" : "予想ピーク使用率"
            return (
                <DemandStat key={peak.type} headTagName="h3" percentage={peak.percentage} amount={peak.amount} supply={peak.supply}>
                    <Text d={{base: 'block', md: 'inline'}}>{label}</Text>
                    <Text d={{base: 'block', md: 'inline'}}>({peak.expectedHour})</Text>
                </DemandStat>
            )
        })

        const hourlyDemandTables = data.hourlyDemand?.map((hourly) => {
            const timeShown = moment(hourly.absTime).tz("Asia/Tokyo").format("MM月DD日 H時台")
            const color = getProgressColor(hourly.percentage || 0)
            return (
                <Tr key={`hourly_${hourly?.hour}`}>
                    <Td>{timeShown}</Td>
                    <Td>{hourly?.amount} / {hourly?.supply} 万kW</Td>
                    <Td color={color}>{hourly?.percentage}%</Td>
                </Tr>
            )
        })

        statsZone = (
            <Box as="article">
                <Box as="section">
                    <StatGroup>
                        {demandStats}
                    </StatGroup>
                </Box>
                <Box as="section" border="2px" borderColor="gray.400" borderRadius="lg" my="2">
                    <Accordion allowToggle>
                        <AccordionItem>
                            <h3>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        最近の1時間使用率
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h3>
                            <AccordionPanel pb={4}>
                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th>時間帯</Th>
                                            <Th>消費電力 / 供給力</Th>
                                            <Th>使用率</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {hourlyDemandTables}
                                    </Tbody>
                                </Table>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>
            </Box>
        )
    }

    return (
        <Layout>
            <LastUpdateBox loading={loading} lastUpdate={lastUpdateDate} updateAction={() => refetch()} />
            <Box key={area.code} my="2" p="2" borderRadius="lg" boxShadow="lg" bg={statBgColor} color={statFontColor} maxWidth="3xl" mx={{base: "2", md: "auto"}}>
                <Heading as="h2" size="lg" textAlign="center" borderBottom="1px" borderBottomColor="gray.200" pb="3" mb="3">
                    {area.name}エリア
                </Heading>
                {statsZone}
                <Center as="nav" mt="8">
                    <LinkBox>
                        <Button colorScheme="blue" leftIcon={<LinkIcon />}>
                            <LinkOverlay isExternal href={area.officialWeb}>
                                {area.longName}のサイトへ
                            </LinkOverlay>
                        </Button>
                    </LinkBox>
                </Center>
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

export default AreaPage

export const getStaticProps: GetStaticProps<AreaPageProps, AreaPageParams> = async ({params}) => {
    let props = {}
    let notFound = false
    if (params === undefined) {
        notFound = true
    } else { 
        const areaQueryParams = buildAreaQueryParams({
            code: params.code,
        })
        const {data} = await client.query<AreaQueryResponse>({
            query: areaStaticQuery,
            variables: areaQueryParams,
        })
        props = {
            areaInfo: data
        }
    }
    return {
        props: props,
        notFound: notFound
    }
}

export const getStaticPaths: GetStaticPaths<AreaPageParams> = async () => {
    const {data} = await client.query<AreaListQueryResponse>({
        query: areaListQuery,
    })

    const availablePaths = data.allArea.map((area) => ({
        params: {
            code: area.code,
        }
    }))

    return {
        paths: availablePaths,
        fallback: false,
    }
}