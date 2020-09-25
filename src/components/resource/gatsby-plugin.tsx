import { Box, Text } from "ink"
import React from "react"
import { StepResource } from "../../parser"

interface Props {
    resource: StepResource
}

export function GatsbyPlugin({ resource }: Props) {
    return (
        <Box borderStyle="single" flexDirection="column" paddingX={1}>
            <Text bold underline>
                Enable Gatsby plugin
            </Text>
            <Text>{resource.args.name}</Text>
        </Box>
    )
}
