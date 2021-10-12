/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
import * as React from "react"
import { Flex, Alert, AlertIcon, Text, Box, Button } from "@chakra-ui/react"
import { RepeatIcon } from "@chakra-ui/icons"

interface LastUpdateBoxProps {
    lastUpdate: string,
    updateAction?: Function,
    loading?: boolean,
}

const LastUpdateBox: React.FC<LastUpdateBoxProps> = ({lastUpdate, updateAction, loading}) => {
  const defaultUpdateAction = () => {
    window.location.reload()
  }

  const textShown = loading ? '読み込み中...' : `最終更新: ${lastUpdate}`

  return (
    <Flex align="center" direction={{base: 'column', md: 'row'}} mx="2">
      <Alert status="info" flex="1">
        <AlertIcon />
        <Text>
          {textShown}
        </Text>
      </Alert>
      <Box w={{base: 'full', md: 'fit-content'}}>
        <Button colorScheme="teal" variant="outline" w="full" onClick={() => (updateAction || defaultUpdateAction)()} leftIcon={<RepeatIcon />}>
          最新の情報に更新
        </Button>
      </Box>
    </Flex>
  )
}

export default LastUpdateBox
