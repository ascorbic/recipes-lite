import { Box, Text } from "ink"
import React from "react"
import { StepAction } from "../../parser"

interface Props {
    action: StepAction
}

export function File({ action }: Props) {
    return (
        <Box borderStyle="single" flexDirection="column" paddingX={1}>
            <Text bold underline>
                Create file
            </Text>
            <Text>{action.args.path}</Text>
        </Box>
    )
}
