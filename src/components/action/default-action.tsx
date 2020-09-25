import { Box, Text } from "ink"
import React from "react"
import { StepAction } from "../../parser"

interface Props {
    action: StepAction
}

export function DefaultAction({ action }: Props) {
    return (
        <Box borderStyle="single" flexDirection="column" paddingX={1}>
            <Text bold underline>
                {action.name}
            </Text>
        </Box>
    )
}
