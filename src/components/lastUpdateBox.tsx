import * as React from "react"
import { Flex, Alert, AlertIcon, Text, Box, Button } from "@chakra-ui/react"
import { RepeatIcon } from "@chakra-ui/icons"

interface LastUpdateBoxProps {
    lastUpdate: string
}

const LastUpdateBox: React.FC<LastUpdateBoxProps> = ({lastUpdate}) => {
    return (
      <Flex align="center" direction={{base: 'column', md: 'row'}} mx="2">
        <Alert status="info" flex="1">
          <AlertIcon />
          <Text>
            最終更新: {lastUpdate}
          </Text>
        </Alert>
        <Box w={{base: 'full', md: 'fit-content'}}>
          <Button colorScheme="teal" variant="outline" w="full" onClick={() => window.location.reload()}>
            <RepeatIcon />
            <Text ml="2">
              最新の情報に更新
            </Text>
          </Button>
        </Box>
      </Flex>
    )
}

export default LastUpdateBox
