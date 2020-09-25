import { Box, Text } from "ink"
import React from "react"
import { StepResource } from "../../parser"

interface Props {
    resource: StepResource
}

export function File({ resource }: Props) {
    return (
        <Box borderStyle="single" flexDirection="column" paddingX={1}>
            <Text bold underline>
                Create file
            </Text>
            <Text>{resource.args.path}</Text>
        </Box>
    )
}
