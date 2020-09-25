import { Box, Text } from "ink"
import React from "react"
import { StepResource } from "../../parser"

interface Props {
    resource: StepResource
}

export function DefaultResource({ resource }: Props) {
    return (
        <Box borderStyle="single" flexDirection="column" paddingX={1}>
            <Text bold underline>
                {resource.name}
            </Text>
        </Box>
    )
}
