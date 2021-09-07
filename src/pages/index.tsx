import { ArrowRightIcon } from "@chakra-ui/icons"
import { Box, StatGroup, Text, StatLabel, Heading, SimpleGrid, Flex, Spacer, LinkOverlay, LinkBox, useColorModeValue, VisuallyHidden } from "@chakra-ui/react"
import { graphql, PageProps } from "gatsby"
import moment from "moment-timezone"
import * as React from "react"
import Layout from "../components/layout"
import LastUpdateBox from "../components/lastUpdateBox"
import DemandStat from "../components/demandStat"
import GatsbyLink from "gatsby-link"
import { HourlyDemandDefaultValues, PeakElectricityDefaultValues } from "../utilities/defaultValues"

const IndexPage: React.FC<PageProps<GatsbyTypes.FrontpageQuery>> = ({data}) => {
  const areaInfoBoxes = data.jedGraph.allArea.map((area) => {
    const statFontColor = useColorModeValue("black", "gray.200")
    const statBgColor = useColorModeValue("white", "gray.900")
    const peak = (area.peak !== undefined && area.peak[0] !== undefined) ? area.peak[0] : PeakElectricityDefaultValues
    const hourly = (area.hourly !== undefined && area.hourly[0] !== undefined) ? area.hourly[0] : HourlyDemandDefaultValues

    return (
      <Box key={area.code} as="section" m="2" p="2" borderRadius="lg" boxShadow="lg" bg={statBgColor} color={statFontColor}>
        <Heading as="h3" size="md" textAlign="center" borderBottom="1px" borderBottomColor="gray.200" pb="3" mb="3">
          {area.name}エリア
        </Heading>
        <StatGroup>
          <DemandStat mr="1.5" percentage={hourly.percentage} amount={hourly.amount} supply={hourly.supply}>
            <StatLabel pb={{base: '1.5em', md: 'inherit'}}>{hourly.hour}時台の使用状況</StatLabel>
          </DemandStat>
          <DemandStat ml="1.5" percentage={peak.percentage} amount={peak.amount} supply={peak.supply}>
            <Box>
              <Text d={{base: 'block', md: 'inline'}}>予想ピーク使用率</Text>
              <Text d={{base: 'block', md: 'inline'}}>({peak.expectedHour})</Text>
            </Box>
          </DemandStat>
        </StatGroup>
        <LinkBox as="nav" borderTop="1px" borderTopColor="gray.200" pt="3" mt="3">
          <Flex align="center">
            <Spacer />
            <Text mr="2">
              <LinkOverlay as={GatsbyLink} to={`/${area.code}`}>詳細を確認する</LinkOverlay>
            </Text>
            <ArrowRightIcon />
          </Flex>
        </LinkBox>
      </Box>
    )
  })

  const lastUpdate: string | Date = data.jedGraph.hourlyDemand ? data.jedGraph.hourlyDemand[0]?.createdAt : new Date()
  const lastUpdateShown = moment(lastUpdate).tz("Asia/Tokyo").format("YYYY年MM月DD日 HH時mm分")
  return (
    <Layout>
      <Heading as="h2">
        <VisuallyHidden>全国の電力使用状況</VisuallyHidden>
      </Heading>
      <LastUpdateBox lastUpdate={lastUpdateShown} />
      <SimpleGrid columns={{base: 1, lg: 2}}>
        {areaInfoBoxes}
      </SimpleGrid>
    </Layout>
  )
}

export default IndexPage

export const IndexQuery = graphql`
query Frontpage {
  jedGraph {
		allArea {
			code
      name
      longName
      officialWeb
      peak {
				date
        expectedHour
        percentage
        amount
        supply
      }
      hourly {
        hour
				absTime
        percentage
        amount
        supply
      }
    }
    hourlyDemand(limit: 1) {
      createdAt
    }
  }
}
`
