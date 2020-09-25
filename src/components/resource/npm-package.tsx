import { Box, Text } from "ink"
import React from "react"
import { StepResource } from "../../parser"

interface Props {
    resource: StepResource
}

export function NPMPackage({ resource }: Props) {
    return (
        <Box borderStyle="single" flexDirection="column" paddingX={1}>
            <Text bold underline>
                Install npm package
            </Text>
            <Text>{resource.args.name}</Text>
        </Box>
    )
}
