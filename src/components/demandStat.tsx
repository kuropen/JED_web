import { CircularProgress, CircularProgressLabel } from "@chakra-ui/progress"
import { Stat, StatLabel, StatNumber, StatProps } from "@chakra-ui/stat"
import { Text } from "@chakra-ui/layout"
import * as React from "react"
import getProgressColor from "../utilities/getProgressColor"

interface DemandStatProps extends StatProps {
    percentage?: number,
    amount?: number,
    supply?: number,
}

const DemandStat: React.FC<React.PropsWithChildren<DemandStatProps>> = (props) => {
    const {percentage, amount, supply} = props
    if (percentage === undefined || amount === undefined || supply === undefined) {
        return (<React.Fragment />)
    }

    const color = getProgressColor(percentage)

    return (
        <Stat>
            <StatLabel>
                {props.children}
            </StatLabel>
            <StatNumber>
                <CircularProgress value={percentage} color={color} size="100px" float={{base: 'none', md: 'right'}} mr="2">
                    <CircularProgressLabel>
                        <Text fontSize={{base: 'xl', md: 'inherit'}}>{percentage}%</Text>
                        <Text d={{base: 'block', md: 'none'}} fontSize="xs">({amount}/{supply})</Text>
                    </CircularProgressLabel>
                </CircularProgress>
                <Text d={{base: 'none', md: 'block'}}>{amount}/{supply} 万kW</Text>
            </StatNumber>
        </Stat>
    )
}

export default DemandStat
