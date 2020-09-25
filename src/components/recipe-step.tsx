import { Box, Text } from "ink"
import React from "react"
import { StepInfo } from "../parser"
import { ResourceBox } from "./resource"
import { Markdown } from "./markdown"

interface Props {
    step: StepInfo
}

export function RecipeStep({ step }: Props) {
    return (
        <Box
            borderStyle="round"
            flexDirection="column"
            paddingX={2}
            paddingTop={1}
            flexBasis="100%"
        >
            <Markdown source={step.description} />
            {!!step.resources.length && (
                <Box flexDirection="column">
                    <Text bold underline>
                        Resources
                    </Text>
                    {step.resources.map((resource, index) => (
                        <ResourceBox
                            resource={resource}
                            key={`${resource.name}-${index}`}
                        />
                    ))}
                </Box>
            )}
        </Box>
    )
}
