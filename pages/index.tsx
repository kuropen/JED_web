import { Box, Flex, Heading, SimpleGrid, Spacer } from '@chakra-ui/layout'
import { StatGroup, StatLabel, useColorModeValue, VisuallyHidden, Text, Alert, AlertDescription, AlertIcon, AlertTitle, Link } from '@chakra-ui/react'
import type { GetStaticProps, NextPage } from 'next'
import NextLink from 'next/link'
import React from 'react'
import Layout from '../components/layout'
import homeQuery, {HomeQueryResponse, HomeQueryResponseArea, HomeQueryResponseAreaFragment } from '../queries/homeQuery'
import client from '../utilities/apollo-client'
import moment from 'moment-timezone'
import LastUpdateBox from '../components/lastUpdateBox'
import DemandStat from '../components/demandStat'
import { QueryResult, useQuery } from '@apollo/client'
import extractLastUpdate from '../utilities/extractLastUpdate'
import { ArrowRightIcon } from '@chakra-ui/icons'
import loadingBox from '../components/loadingBox'

interface HomePageProps extends Partial<HomeQueryResult> {
}

interface HomeQueryResult {
  allArea: HomeQueryResponseAreaFragment[],
  lastUpdate: string,
}

const Home: NextPage<HomePageProps> = (props) => {
  const statFontColor = useColorModeValue("black", "gray.200")
  const statBgColor = useColorModeValue("white", "gray.900")

  let dataSource: HomeQueryResult = {
    allArea: props.allArea || [],
    lastUpdate: extractLastUpdate(props.allArea)
  }
  const { data, loading, error, refetch }: QueryResult<HomeQueryResponse> = useQuery(homeQuery)
  if (!loading && data !== undefined) {
    dataSource = {
      allArea: data.allArea,
      lastUpdate: extractLastUpdate(data.allArea)
    }
  }

  const {allArea, lastUpdate} = dataSource

  let areaInfoBoxes;
  if (allArea.length === 0 || loading) {
    areaInfoBoxes = loadingBox
  }
  if (error) {
    areaInfoBoxes = (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr="2">読み込みエラーが発生しました。</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    )
  }

  areaInfoBoxes = allArea.map((area) => {
    const peak = (area.peak !== undefined) ? area.peak[0] : null
    const hourly = (area.hourly !== undefined) ? area.hourly[0] : null

    let statBox

    if (peak && hourly) {
      statBox = (
        <StatGroup>
          <DemandStat headTagName="h4" mr="1.5" percentage={hourly.percentage} amount={hourly.amount} supply={hourly.supply}>
            <StatLabel pb={{base: '1.5em', md: 'inherit'}}>{hourly.hour}時台の使用状況</StatLabel>
          </DemandStat>
          <DemandStat headTagName="h4" ml="1.5" percentage={peak.percentage} amount={peak.amount} supply={peak.supply}>
            <Box>
              <Text d={{base: 'block', md: 'inline'}}>予想ピーク使用率</Text>
              <Text d={{base: 'block', md: 'inline'}}>({peak.expectedHour})</Text>
            </Box>
          </DemandStat>
        </StatGroup>
      )
    } else {
      statBox = loadingBox
    }
    return (
      <Box key={area.code} as="section" m="2" p="2" borderRadius="lg" boxShadow="lg" bg={statBgColor} color={statFontColor}>
        <Heading as="h3" size="md" textAlign="center" borderBottom="1px" borderBottomColor="gray.200" pb="3" mb="3">
          {area.name}エリア
        </Heading>
        {statBox}
        <Box as="nav" borderTop="1px" borderTopColor="gray.200" pt="3" mt="3">
          <Flex align="center">
            <Spacer />
            <Text mr="2">
              <Link as={NextLink} href={`/${area.code}`}>詳細を確認する</Link>
            </Text>
            <ArrowRightIcon />
          </Flex>
        </Box>          
      </Box>
    )
  })

  const lastUpdateShown = moment(lastUpdate).tz("Asia/Tokyo").format("YYYY年MM月DD日 HH時mm分")
  return (
    <Layout>
      <Heading as="h2">
        <VisuallyHidden>全国の電力使用状況</VisuallyHidden>
      </Heading>
      <LastUpdateBox loading={loading} lastUpdate={lastUpdateShown} updateAction={() => refetch()} />
      <SimpleGrid columns={{base: 1, lg: 2}}>
        {areaInfoBoxes}
      </SimpleGrid>
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const {data} = await client.query<HomeQueryResponse>(
    {
      query: homeQuery,
    }
  )
  
  const props: HomePageProps = {
    allArea: data.allArea,
    lastUpdate: extractLastUpdate(data.allArea),
  }

  return {
    props: props
  }
}
