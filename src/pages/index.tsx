import { ArrowRightIcon } from "@chakra-ui/icons"
import { Box, Stat, StatGroup, Text, StatLabel, StatNumber, Heading, SimpleGrid, CircularProgress, CircularProgressLabel, Flex, Spacer, Link } from "@chakra-ui/react"
import { graphql, PageProps } from "gatsby"
import * as React from "react"
import Layout from "../components/layout"
import getProgressColor from "../utilities/getProgressColor"

const IndexPage: React.FC<PageProps<GatsbyTypes.FrontpageQuery>> = ({data}) => {
  const areaInfoBoxes = data.jedGraph.allArea.map((area) => {
    let hourlyView = (
      <>
        <StatLabel>直近の1時間使用率</StatLabel>
        <StatNumber>データがありません</StatNumber>
      </>
    )
    if (area.hourly !== undefined && area.hourly[0] !== undefined) {
      const {hour, percentage, amount, supply} = area.hourly[0]
      const hourlyColor = getProgressColor(percentage)
      hourlyView = (
        <>
            <StatLabel pb={{base: '1.5em', md: 'inherit'}}>{hour}時台の使用状況</StatLabel>
            <StatNumber>
              <CircularProgress value={percentage} color={hourlyColor} size="100px" float={{base: 'none', md: 'right'}}>
                <CircularProgressLabel>
                  <Text fontSize={{base: 'xl', md: 'inherit'}}>{percentage}%</Text>
                  <Text d={{base: 'block', md: 'none'}} fontSize="xs">({amount}/{supply})</Text>
                </CircularProgressLabel>
              </CircularProgress>
              <Text d={{base: 'none', md: 'block'}}>{amount}/{supply} 万kW</Text>
            </StatNumber>
        </>
      )
    }
    let peakView = (
      <>
        <StatLabel>本日のピーク使用率</StatLabel>
        <StatNumber>データがありません</StatNumber>
      </>
    )
    if (area.peak !== undefined && area.peak[0] !== undefined) {
      const {expectedHour, percentage, amount, supply} = area.peak[0]
      const peakColor = getProgressColor(percentage)
      peakView = (
        <>
            <StatLabel>
              <Text d={{base: 'block', md: 'inline'}}>ピーク使用率</Text>
              <Text d={{base: 'block', md: 'inline'}}>({expectedHour})</Text>
            </StatLabel>
            <StatNumber>
              <CircularProgress value={percentage} color={peakColor} size="100px" float={{base: 'none', md: 'right'}}>
                <CircularProgressLabel>
                  <Text fontSize={{base: 'xl', md: 'inherit'}}>{percentage}%</Text>
                  <Text d={{base: 'block', md: 'none'}} fontSize="xs">({amount}/{supply})</Text>
                </CircularProgressLabel>
              </CircularProgress>
              <Text d={{base: 'none', md: 'block'}}>{amount}/{supply} 万kW</Text>
            </StatNumber>
        </>
      )
    }
    return (
      <Box key={area.code} m="2" p="2" borderRadius="lg" boxShadow="lg">
        <Heading as="h3" size="md" textAlign="center" borderBottom="1px" borderBottomColor="gray.200" pb="3" mb="3">
          {area.name}エリア
        </Heading>
        <StatGroup>
          <Stat mr="1.5">
            {hourlyView}
          </Stat>
          <Stat ml="1.5">
            {peakView}
          </Stat>
        </StatGroup>
        <Box as="nav" borderTop="1px" borderTopColor="gray.200" pt="3" mt="3">
          <Link href={area.officialWeb}>
            <Flex align="center">
              <Spacer />
              <Text mr="2">詳細を確認する</Text>
              <ArrowRightIcon />
            </Flex>
            <Box textAlign="right">
              ({area.longName}のサイトに移動します)
            </Box>
          </Link>
        </Box>
      </Box>
    )
  })
  return (
    <Layout>
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
  }
}
`
