import { Box, Text } from "ink"
import React from "react"
import { StepAction } from "../../parser"

interface Props {
    action: StepAction
}

export function NPMPackage({ action }: Props) {
    return (
        <Box borderStyle="single" flexDirection="column" paddingX={1}>
            <Text bold underline>
                Install npm package
            </Text>
            <Text>{action.args.name}</Text>
        </Box>
    )
}
