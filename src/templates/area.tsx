import { graphql, PageProps } from "gatsby"
import { Box, Center, Spacer, Text } from "@chakra-ui/layout"
import * as React from "react"
import moment from "moment-timezone"
import Layout from "../components/layout"
import LastUpdateBox from "../components/lastUpdateBox"
import { ArrowLeftIcon, LinkIcon } from "@chakra-ui/icons"
import { LinkBox, Flex, LinkOverlay, Heading, useColorModeValue, StatGroup, Button, Table, Th, Thead, Tr, Tbody, Td, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from "@chakra-ui/react"
import GatsbyLink from "gatsby-link"
import DemandStat from "../components/demandStat"
import { PeakElectricityDefaultValues } from "../utilities/defaultValues"
import getProgressColor from "../utilities/getProgressColor"

const AreaPage: React.FC<PageProps<GatsbyTypes.AreaPageQuery>> = ({data}) => {
    let lastUpdateTimeCandidate: Array<number> = []
    if (data.jedGraph.hourlyDemand && data.jedGraph.hourlyDemand.length > 0) {
        lastUpdateTimeCandidate.push(new Date(data.jedGraph.hourlyDemand[0]?.createdAt).getTime())
    }
    const lastUpdateTime = lastUpdateTimeCandidate.sort((a, b) => (b - a))[0]
    const lastUpdateDate = moment(new Date(lastUpdateTime)).tz("Asia/Tokyo").format("YYYY年MM月DD日 HH時mm分")
    const area = data.jedGraph.areaByCode
    const statFontColor = useColorModeValue("black", "gray.200")
    const statBgColor = useColorModeValue("white", "gray.900")

    const demandStats = data.jedGraph.peakElectricity?.map((peak) => {
        const label = (peak?.type === "AMOUNT") ? "予想最大電力" : "予想ピーク使用率"
        return (
            <DemandStat key={peak?.type} percentage={peak?.percentage} amount={peak?.amount} supply={peak?.supply}>
                <Text d={{base: 'block', md: 'inline'}}>{label}</Text>
                <Text d={{base: 'block', md: 'inline'}}>({peak?.expectedHour})</Text>
            </DemandStat>
        )
    })

    const hourlyDemandTables = data.jedGraph.hourlyDemand?.map((hourly) => {
        const timeShown = moment(hourly?.absTime).tz("Asia/Tokyo").format("MM月DD日 H時台")
        const color = getProgressColor(hourly?.percentage || 0)
        return (
            <Tr key={`hourly_${hourly?.hour}`}>
                <Td>{timeShown}</Td>
                <Td>{hourly?.amount} / {hourly?.supply} 万kW</Td>
                <Td color={color}>{hourly?.percentage}%</Td>
            </Tr>
        )
    })

    return (
        <Layout>
            <LastUpdateBox lastUpdate={lastUpdateDate} />
            <Box key={area?.code} my="2" p="2" borderRadius="lg" boxShadow="lg" bg={statBgColor} color={statFontColor} maxWidth="3xl" mx={{base: "2", md: "auto"}}>
                <Heading as="h2" size="lg" textAlign="center" borderBottom="1px" borderBottomColor="gray.200" pb="3" mb="3">
                    {area?.name}エリア
                </Heading>
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
                <Center as="nav" mt="8">
                    <LinkBox>
                        <Button colorScheme="blue" leftIcon={<LinkIcon />}>
                            <LinkOverlay isExternal href={area?.officialWeb}>
                                {area?.longName}のサイトへ
                            </LinkOverlay>
                        </Button>
                    </LinkBox>
                </Center>
                <LinkBox as="nav" borderTop="1px" borderTopColor="gray.200" pt="3" mt="3">
                    <Flex align="center">
                        <ArrowLeftIcon />
                        <Text ml="2">
                            <LinkOverlay as={GatsbyLink} to="/">トップページに戻る</LinkOverlay>
                        </Text>
                        <Spacer />
                    </Flex>
                </LinkBox>
            </Box>
        </Layout>
    )
}

export default AreaPage

export const AreaQuery = graphql`
query AreaPage ($code: String!, $targetDate: String!) {
  jedGraph {
    areaByCode(code: $code) {
        id
        code
        name
        longName
        officialWeb
        hasWindData
    }
    peakElectricity(areaCode: $code, date: $targetDate) {
        type
        amount
        supply
        percentage
        expectedHour
    }
    hourlyDemand(areaCode: $code, limit: 12) {
        absTime
        hour
        amount
        supply
        percentage
        createdAt
    }
    #fiveMinDemand(areaCode: $code, limit: 24) {
    #    absTime
    #    amount
    #    solar
    #    wind
    #    createdAt
    #}
  }
}
`