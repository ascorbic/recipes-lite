import { Box, Text } from "ink"
import React from "react"
import { StepAction } from "../../parser"

interface Props {
    action: StepAction
}

export function GatsbyPlugin({ action }: Props) {
    return (
        <Box borderStyle="single" flexDirection="column" paddingX={1}>
            <Text bold underline>
                Enable Gatsby plugin
            </Text>
            <Text>{action.args.name}</Text>
        </Box>
    )
}
